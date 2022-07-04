const sendEmail = require("./send-email");

const sendResetPasswordEmail = async (name, email, passwordToken, origin) => {
  const resetEmail = `${origin}/user/reset-password?token=${passwordToken}&email=${email}`;
  const message = `<p>Please click the following link to reset your password. It can only be used for 10 minutes: <a href="${resetEmail}">Reset Email</a></p>`;

  return sendEmail(
    email,
    "Reset Password",
    `<h4>Hello, ${name}.</h4> ${message}`
  );
};

module.exports = sendResetPasswordEmail;
