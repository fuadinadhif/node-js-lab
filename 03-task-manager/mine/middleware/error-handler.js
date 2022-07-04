const { CustomAPIError } = require("../errors/customs-error");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode || 404).json({ msg: error.message });
  }
  // return res.status(error.statusCode || 404).json({ msg: error.message });
  // return res.status(error.statusCode).json({ msg: error.message });
  res.status(500).json({ msg: `Something went wrong, try again` });
};

module.exports = errorHandler;
