const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailer-config");

const sendEmail = async (to, subject, html) => {
  // let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Nadhif Addict" <naddict@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
