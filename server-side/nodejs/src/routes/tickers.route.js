const router = require("express").Router();
const client = require("../config/fugle.config");
const delay = require("../utils/delay");
const tickerController = require('../controllers/ticker.controller')

router.get("/:type", (req, res) => {
  (async () => {
    const type = req.params.type;

    console.log(1, type);
    const data = await client.stock.intraday.tickers({
      type,
      //   exchange: "OTC",
      exchange: "TWSE",
      isNormal: true,
    });
    res.json(data);
  })();
});

router.get('/updateDB', tickerController.updateDB)

module.exports = router;
