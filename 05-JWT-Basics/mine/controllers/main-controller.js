const { BadRequest } = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new BadRequest("Please provide the Username and Password");
    }
    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30 days",
    });
    return res.status(200).json({ msg: `User created`, token });
  } catch (error) {
    next(error);
  }
};

const dashboard = async (req, res, next) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  const { username } = req.user;
  return res.status(200).json({
    message: `Hello, ${username}`,
    secret: `Here is your authorized data: Your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
