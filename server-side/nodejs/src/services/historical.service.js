const client = require("../config/fugle.config");
const Historical = require("../models/historical.model");

async function query({ symbol, timeframe }) {
  try {
    if (symbol === undefined || symbol === null)
      return { stat: "failed", msg: "Required symbol parameter" };

    const data = await Historical.find(
      { symbol, timeframe },
      { _id: false, __v: false, symbol: false, timeframe: false }
    ).sort({ date: 1 });

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function update({ symbol, timeframe, data }) {
  try {
    return data.map(async (el) => {
      const date = new Date(el.date);
      await Historical.findOneAndUpdate(
        { symbol, timeframe, date },
        { ...el, date },
        {
          new: true,
          upsert: true,
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  query,
  update,
};
