require("dotenv").config();

const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found-handler");
const errorMiddleware = require("./middleware/error-handler");
const mainRouter = require("./routers/main-router");

app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1", mainRouter);
app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () => console.log("Server listening to port: 3000"));
  } catch (error) {
    console.log(error);
  }
};

start();
