const indicatorService = require("../services/indicator.service");

const getIndicators = async (req, res) => {
  const data = await indicatorService.query();
  res.json({ data });
};

const createIndicator = async (req, res) => {
  const body = req.body;
  if (body.type === undefined || body.period === undefined) {
    return res.json({
      status: "fail",
      error: "require type and period",
    });
  }
  const response = await indicatorService.create({
    type: body.type,
    period: body.period,
  });

  res.json({
    status: "OK",
    data: response,
  });
};

module.exports = {
  getIndicators,
  createIndicator,
};
