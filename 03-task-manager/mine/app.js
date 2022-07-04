require("dotenv").config();

const express = require("express");
const app = express();
const tasks = require("./routes/tasks-router");
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found-handler");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasks);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening to port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
