const router = require("express").Router();
const historical = require("../controllers/historical.controller");

router.get("/", historical.query);
router.get("/:symbol/all/:timeframe", historical.getAll);

module.exports = router;
