const ProductModel = require("../models/product-model");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.create(req.body);
    return res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find({});
    return res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct, getAllProducts };
