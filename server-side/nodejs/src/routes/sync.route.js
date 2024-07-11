const router = require("express").Router();
const syncController = require("../controllers/sync.controller");

router.get("/", (req, res) => {
  res.json({
    data: {
      historical: {
        stat: "OK",
      },
    },
  });
});

router.post("/historical", syncController.fullHistorical);
router.get("/historical/count", syncController.historicalCount);

module.exports = router;
