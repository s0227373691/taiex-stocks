const delay = require("../utils/delay");
const tickerService = require("../services/ticker.service");

async function syncExternalData(req, res) {
    const response = await tickerService.syncExternalData()
    res.json(response);
}


module.exports = {
    syncExternalData,
};
