const router = require("express").Router();
const historical = require("../controllers/historical.controller");

router.get("/", historical.query);
router.get("/:symbol/all/:timeframe", historical.getAll);
router.get("/crypto/:exchange", historical.queryCrypto);
router.get("/candle/count", historical.queryCandleCount);
router.post("/sync", historical.syncData);

module.exports = router;
