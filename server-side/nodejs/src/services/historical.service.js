const client = require("../config/fugle.config");
const Historical = require("../models/historical.model");

async function query({ symbol, timeframe }) {
  try {
    if (symbol === undefined || symbol === null)
      return { stat: "failed", msg: "Required symbol parameter" };

    const data = await Historical.find(
      { symbol, timeframe },
      { _id: false, __v: false, symbol: false, timeframe: false }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function update({ symbol, timeframe, data }) {
  return data.map((el) =>
    Historical.findOneAndUpdate({ symbol, timeframe, date: el.date }, el, {
      new: true,
      upsert: true,
    })
  );
}

module.exports = {
  query,
  update,
};
