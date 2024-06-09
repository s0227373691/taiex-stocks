const client = require("../config/fugle.config");
const Historical = require("../models/historical.model");

async function get(_market) {}

async function update({ symbol, timeframe, data }) {
  data.map(async (el) => {
    await Historical.findOneAndUpdate(
      { symbol, timeframe, date: el.date },
      el,
      {
        new: true,
        upsert: true,
      }
    );
  });
}

module.exports = {
  get,
  update,
};
