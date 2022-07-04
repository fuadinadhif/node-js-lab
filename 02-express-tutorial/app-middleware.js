// * USE FOR AUTHORIZE AND LOGGER MIDDLEWARE
const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");

app.get("/favicon.ico", (req, res) => {
  res.status(204);
});

app.use([logger, authorize]);

app.get("/", (req, res) => {
  console.log(req.user);
  res.send("<h1>Home</h1>");
});
app.get("/about", (req, res) => {
  res.send("<h1>About</h1");
});
app.get("/api/products", (req, res) => {
  res.send("<h1>Products</h1");
});
app.get("/api/reviews", (req, res) => {
  res.send("<h1>Reviews</h1");
});

app.listen(5000);
