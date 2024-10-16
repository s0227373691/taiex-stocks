const router = require("express").Router();
const indicatorController = require("../controllers/indicator.controller");

router.get("/", indicatorController.getIndicators);
router.get("/:type", indicatorController.getIndicators);
router.post("/", indicatorController.createIndicator);

module.exports = router;
