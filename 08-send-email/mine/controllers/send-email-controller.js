const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");

const sendEmail = async (req, res, next) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ae2zpw3g3duqgho7@ethereal.email",
        pass: "ZquwWQ4ahzqxu13Kcg",
      },
    });

    let info = await transporter.sendMail({
      from: '"Nadhif" <fuadinadhif@gmail.com>',
      to: "<foobar@gmail.com>, <another.fool@gmail.com>",
      subject: "Testing The Testis",
      html: "<b>Healthy?</b><p>I hope so my bro</p>",
    });

    return res.status(StatusCodes.OK).json({ info });
  } catch (error) {
    next(error);
  }
};

module.exports = sendEmail;
