require("dotenv").config();

// npm packages
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// database
const connectDB = require("./db/connectDB");
// middleware
const notFoundMDW = require("./middleware/not-found-mdw");
const errorMDW = require("./middleware/error-mdw");
// routers
const productRouter = require("./routes/product-route");

app.use(express.static("./public")); // so we can serve public folder
app.use(express.json()); // so we can use req.body
app.use(fileUpload({ useTempFiles: true })); // so we can use req.files
app.use("/api/v1/products", productRouter);
app.use(notFoundMDW);
app.use(errorMDW);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening to port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
