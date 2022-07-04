const productModel = require("../models/product-model");

const getAllProductsStatic = async (req, res) => {
  const products = await productModel.find({ featured: true });
  return res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // matched properties filters
  if (featured) queryObject.featured = true;
  if (name) queryObject.name = { $regex: name, $options: "i" };

  // numeric filters
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|<=|=|=>|>)\b/g;
    let filters = numericFilters.replace(regEx, (match) => {
      return `-${operatorMap[match]}-`;
    });

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = productModel.find(queryObject);

  // sort results
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("name");
  }

  // filter results
  if (fields) {
    fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  // paginate results
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(
    (await productModel.find(queryObject)).length / limit
  );
  result = result.skip(skip).limit(limit);

  const products = await result;
  return res
    .status(200)
    .json({ nbHits: products.length, page, totalPage, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
