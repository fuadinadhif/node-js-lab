require("dotenv").config();
// npm packages
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// database
const connectDB = require("./db/connectDB");
// middlewares
const notFoundMDW = require("./middleware/not-found-mdw");
const errorMWD = require("./middleware/error-mdw");
// routers
const authRouter = require("./routes/auth-route");
const userRouter = require("./routes/user-route");
const productRouter = require("./routes/product-route");
const reviewRouter = require("./routes/review-route");
const orderRouter = require("./routes/order-route");

app.use(express.json());
app.use(express.static("./public")); // to use assets on public folder
app.use(cookieParser(process.env.JWT_SECRET)); // to use req.cookies
app.use(fileUpload()); // to use req.files
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send("Welcome to e-Commerce API");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use(notFoundMDW);
app.use(errorMWD);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening to port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
