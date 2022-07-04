const { createToken, validateToken } = require("./create-validate-token");
const {
  attachCookiesToResponse,
  attachMultCookiesToResponse,
} = require("./attach-cookies");
const createTokenPayload = require("./create-token-payload");
const checkPermission = require("./check-permission");
const sendEmail = require("./send-email");
const sendVerificationEmail = require("./send-verification-email");
const sendResetPasswordEmail = require("./send-reset-password-email");
const createHash = require("./create-hash");

module.exports = {
  createToken,
  validateToken,
  attachCookiesToResponse,
  attachMultCookiesToResponse,
  createTokenPayload,
  checkPermission,
  sendEmail,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
};
