require("dotenv").config();

const express = require("express");
require("express-async-errors");
const app = express();
const notFoundHandler = require("./middleware/not-found-handler");
const errorHandler = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products-router");

app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">Products Page</a>`);
});
app.use("/api/v1/products", productsRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening to port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
