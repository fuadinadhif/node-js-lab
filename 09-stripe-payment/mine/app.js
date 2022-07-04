require("dotenv").config();
// npm packages
const express = require("express");
const app = express();
// middleware
const notFoundMDW = require("./middleware/not-found-mdw");
const errorMDW = require("./middleware/error-mdw");
// controller
const stripeController = require("./controllers/stripe-pay-controller");

app.use(express.static("./public"));
app.use(express.json({}));
app.post("/create-payment-intent", stripeController);
app.use(notFoundMDW);
app.use(errorMDW);

const port = process.env.PORT || 4242;
const start = () => {
  try {
    app.listen(port, () => console.log(`Server listening to port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
