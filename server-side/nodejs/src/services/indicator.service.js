const Indicator = require("../models/indicator.model");

async function query() {
  const res = await Indicator.find();
  return res;
}

async function create({ type, period }) {
  const queryIndicator = await Indicator.findOne({ type, period });
  const hasIndicator = queryIndicator !== null;
  return hasIndicator ? null : Indicator.create({ type, period });
}

module.exports = {
  query,
  create,
};
