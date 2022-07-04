const sendEmail = require("./send-email");

const sendVerificationEmail = async (
  name,
  email,
  verificationToken,
  origin
) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>Please confirm your email by clicking on the following link: <a href="${verifyEmail}">Verify Email</a></p>`;

  return sendEmail(
    email,
    "Email Confirmation",
    `<h4>Hello, ${name}</h4> ${message}`
  );
};

module.exports = sendVerificationEmail;
