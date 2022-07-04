const errorHandler = async (error, req, res, next) => {
  console.log(error);
  return res.status(500).json({
    message: `Sorry, something went wrong. Please figure it yourself.`,
  });
};

module.exports = errorHandler;
