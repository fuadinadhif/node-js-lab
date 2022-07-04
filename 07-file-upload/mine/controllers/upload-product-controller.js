const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductLocal = async (req, res, next) => {
  try {
    if (!req.files) {
      throw new CustomError.BadRequestError("Please upload an Image");
    }

    if (!req.files.image.mimetype.startsWith("image")) {
      throw new CustomError.BadRequestError(
        "Please upload file with type of 'image'"
      );
    }

    const maxSize = 1024;
    if (req.files.image.size > 1024) {
      throw new CustomError.BadRequestError(
        `Image's size should be less than ${maxSize} byte`
      );
    }

    const productImage = req.files.image;
    const imagePath = path.join(
      __dirname,
      "/../public/uploads/" + `${productImage.name}`
    );
    await productImage.mv(imagePath);
    return res
      .status(StatusCodes.OK)
      .json({ image: { src: "/uploads/" + `${productImage.name}` } });
  } catch (error) {
    next(error);
  }
};

const uploadProductCloudinary = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "john-file-upload",
      }
    );
    console.log(req);
    fs.unlinkSync(req.files.image.tempFilePath); // remove temp files
    return res
      .status(StatusCodes.OK)
      .json({ image: { src: result.secure_url } });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadProductCloudinary;
