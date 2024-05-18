const router = require("express").Router();

const Product = require('../models/product.model')
const {update} = require('../services/product.service')

router.get("/:market", (req, res) => {
  (async () => {
    const products = await Product.find()
    update(req.params.market)

    res.json(products);
  })();
});

module.exports = router;
