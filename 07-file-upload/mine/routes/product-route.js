const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
} = require("../controllers/product-controller");
const uploadProductCloudinary = require("../controllers/upload-product-controller");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/uploads").post(uploadProductCloudinary);

module.exports = router;
