const Indicator = require("../models/indicator.model");

function query(params) {
  return Indicator.find({ type: params.type });
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
