const client = require("../config/fugle.config");
const delay = require("../utils/delay");
const historicalService = require("../services/historical.service");

async function getAll(req, res) {
  let info = {};
  let allHistorical = [];
  const fetchHistorical = async (YYYY = new Date().getFullYear()) => {
    try {
      const response = await client.stock.historical.candles({
        symbol: req.params.symbol,
        timeframe: req.params.timeframe,
        from: `${YYYY}-01-01`,
        to: `${YYYY}-12-31`,
        fields: "open,high,low,close,volume,change",
      });
      if (response.message === "Resource Not Found") return;

      let { data, ...otherInfo } = response;
      info = otherInfo;
      await delay(1100);
      if (data === undefined) {
        await fetchHistorical(YYYY);
      } else {
        data = data.reverse();
        allHistorical = [...data, ...allHistorical];
        // console.log(allHistorical.length)
        await fetchHistorical(YYYY - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const main = async () => {
    if (req.session.cookie.historical.isBusy)
      return res.json({ status: 500, msg: "historical route is busy" });

    req.session.cookie.historical.isBusy = true;
    await fetchHistorical();
    req.session.cookie.historical.isBusy = false;
    res.json({ ...info, limit: allHistorical.length, data: allHistorical });
  };
  main();
}

async function query(req, res) {
  const query = req.query;
  const data = await historicalService.query({
    symbol: query.symbol,
    timeframe: query.timeframe,
  });

  res.json({
    symbol: query.symbol,
    timeframe: query.timeframe,
    data,
  });
}

module.exports = {
  getAll,
  query,
};
