const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/favicon.ico", (req, res) => res.status(204));
app.get("/", (req, res) => {
  res.send('<h1>API Lists</h1><a href="/api/products">Products</a>');
});
app.get("/api/products", (req, res) => {
  const filterProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(filterProducts);
});
app.get("/api/products/:productID", (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    res.status(404).send("<h1>Product doesn't exist</h1>");
  }
  res.json(singleProduct);
});
app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  res.send("<p>Someday, reviews will be shown here</p>");
});
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search)
    );
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    res.status(200).json({ data: [] });
  }
  res.status(200).json(sortedProducts);
});

app.listen(5000);
