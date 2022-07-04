const { createToken } = require("./create-validate-token");

const attachCookiesToResponse = (res, tokenPayload) => {
  const token = createToken(tokenPayload);

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("accessToken", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

const attachMultCookiesToResponse = (res, tokenPayload, refreshToken) => {
  const accessTokenJWT = createToken(tokenPayload);
  const refreshTokenJWT = createToken({
    tokenPayload,
    refreshToken,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now()),
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });
};

module.exports = { attachCookiesToResponse, attachMultCookiesToResponse };
