const UserModel = require("../models/user-model");
const TokenModel = require("../models/token-model");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const {
  attachCookiesToResponse,
  attachMultCookiesToResponse,
  createTokenPayload,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require("../utils");
const crypto = require("crypto");

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailAlreadyExist = await UserModel.findOne({ email });
    if (emailAlreadyExist) {
      throw new BadRequestError("Email has been used. Please use another");
    }

    const isFirstAccount = (await UserModel.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";
    const verificationToken = crypto.randomBytes(40).toString("hex");

    const user = await UserModel.create({
      ...req.body,
      role,
      verificationToken,
    });

    const origin = "http://localhost:3000";

    await sendVerificationEmail(
      user.name,
      user.email,
      user.verificationToken,
      origin
    );

    res.status(StatusCodes.CREATED).json({
      message: "Success! Please check your email to verify your account",
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken, email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    if (user.verificationToken !== verificationToken) {
      throw new UnauthorizedError("Still invalid credentials");
    }

    user.isVerified = true;
    user.verified = Date.now();
    user.verificationToken = "";
    await user.save();

    res.status(StatusCodes.OK).json({ message: "Email verified" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please fill in the form");
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFoundError(`${email} has not been registered yet`);
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Wrong password");
    }

    if (!user.isVerified) {
      throw new UnauthorizedError("Please verify your account");
    }

    const tokenPayload = createTokenPayload(user);

    let refreshToken = "";

    const existingToken = await TokenModel.findOne({ user: user._id });
    if (existingToken) {
      const { isValid } = existingToken;
      if (!isValid) {
        throw new UnauthorizedError("Invalid Credentials");
      }

      refreshToken = existingToken.refreshToken;
      attachMultCookiesToResponse(res, tokenPayload, refreshToken);
      res.status(StatusCodes.OK).json({ user: tokenPayload });
      return;
    }

    refreshToken = crypto.randomBytes(40).toString("hex");
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];
    const userToken = { refreshToken, ip, userAgent, user: user._id };

    await TokenModel.create(userToken);

    attachMultCookiesToResponse(res, tokenPayload, refreshToken);
    res.status(StatusCodes.OK).json({ user: tokenPayload });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await TokenModel.findOneAndDelete({ user: req.user.id });

    res.cookie("accessToken", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.cookie("refreshToken", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ message: "User has been logout" });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new BadRequestError("Please provide a valid email");
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      const passwordToken = crypto.randomBytes(40).toString("hex");
      const origin = "http://localhost:3000";
      await sendResetPasswordEmail(
        user.name,
        user.email,
        passwordToken,
        origin
      );

      const oneMinute = 1000 * 60;
      const passwordTokenExpirationDate = new Date(Date.now() + oneMinute * 10);

      user.passwordToken = createHash(passwordToken);
      user.passwordTokenExpirationDate = passwordTokenExpirationDate;
      await user.save();
    }

    res.status(StatusCodes.OK).json({
      message: "Please check your email for the reset password link",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password, token, email } = req.body;
    if (!password || !token || !email) {
      throw new BadRequestError("Please provide all value");
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      const currentDate = new Date();
      if (
        user.passwordToken === createHash(token) &&
        user.passwordTokenExpirationDate > currentDate
      ) {
        user.password = password;
        user.passwordToken = null;
        user.passwordTokenExpirationDate = null;
        await user.save();
      }
    }

    res.status(StatusCodes.OK).json({ message: "Password has been reseted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
