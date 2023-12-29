const router = require("express").Router();
const client = require("../fugle");
const delay = require("../utils/delay");

router.get("/:type", (req, res) => {
  (async () => {
    const type = req.params.type;

    console.log(type);
    const data = await client.stock.intraday.tickers({
      type,
      //   exchange: "OTC",
      exchange: "TWSE",
      isNormal: true,
    });
    res.json(data);
  })();
});

module.exports = router;
