const {
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
} = require("../errors");
const { validateToken, attachMultCookiesToResponse } = require("../utils");
const TokenModel = require("../models/token-model");

const authenticateUser = async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = req.signedCookies;
    if (!accessToken && !refreshToken) {
      throw new BadRequestError("Please login first");
    }

    if (accessToken) {
      const payload = validateToken(accessToken);
      req.user = payload;
      return next();
    }

    const payload = validateToken(refreshToken);
    const existingToken = await TokenModel.findOne({
      user: payload.tokenPayload.id,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new UnauthorizedError("Authentication invalid");
    }

    attachMultCookiesToResponse(
      res,
      payload.tokenPayload,
      existingToken.refreshToken
    );
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new ForbiddenError("Restricted access");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { authenticateUser, authorizePermissions };
