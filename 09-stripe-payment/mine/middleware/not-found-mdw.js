const notFoundMDW = (req, res) => {
  return res.send("The route you search for does not exist");
};

module.exports = notFoundMDW;
