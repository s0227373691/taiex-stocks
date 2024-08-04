const router = require("express").Router();
const controller = require("../controllers/ticker.controller");

router.post("/sync", controller.syncExternalData);

module.exports = router;
