const router = require("express").Router();
const client = require("../config/fugle.config");

router.get("/:market", (req, res) => {
  (async () => {
    const markets = req.params.market.split(",");
    const result = await Promise.all(
      markets.map(async (market) => {
        const snapshotData = await client.stock.snapshot.quotes({ market });
        return snapshotData.data.map((el) => ({ ...el, market }));
      })
    );
    const reducedResult = result.reduce((a, b) => a.concat(b));
    res.json(reducedResult);
  })();
});

module.exports = router;
