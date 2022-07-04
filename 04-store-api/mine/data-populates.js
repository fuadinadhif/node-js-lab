require("dotenv").config();

const connectDB = require("./db/connect");
const productModel = require("./models/product-model");
const productsData = require("./data-products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await productModel.deleteMany();
    await productModel.create(productsData);
    console.log("Successfully populates the database");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
