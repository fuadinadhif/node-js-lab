require("dotenv").config();
// npm packages
const express = require("express");
const app = express();
const sendEmail = require("./controllers/send-email-controller");
// middleware
const notFoundMDW = require("./middleware/not-found-mdw");
const errorMDW = require("./middleware/error-mdw");

app.get("/", (req, res) => {
  res.send(`<h1>Send Email</h1><a href='/send'>click to send an email</a>`);
});
app.get("/send", sendEmail);
app.use(notFoundMDW);
app.use(errorMDW);

const port = process.env.PORT || 3000;
const start = () => {
  try {
    app.listen(port, () => console.log(`Server connected to port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
