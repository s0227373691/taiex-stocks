const router = require("express").Router();
const market = require("../controllers/market.controller");

router.get("/", market.queryPerp);

module.exports = router;
