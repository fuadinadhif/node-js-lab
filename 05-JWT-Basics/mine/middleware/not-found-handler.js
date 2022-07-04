const notFoundHandler = (req, res) => {
  return res.status(404).send("Sorry, the route you search for does not exist");
};

module.exports = notFoundHandler;
