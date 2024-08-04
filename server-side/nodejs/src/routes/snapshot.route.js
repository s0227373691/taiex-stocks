const router = require("express").Router();

const Product = require("../models/product.model");
const productService = require("../services/product.service");

router.get("/:market", (req, res) => {
  (async () => {
    const products = await Product.find();
    productService.update(req.params.market);

    res.json(products);
  })();
});

module.exports = router;
