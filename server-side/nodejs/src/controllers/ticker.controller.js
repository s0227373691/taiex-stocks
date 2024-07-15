const delay = require("../utils/delay");
const tickerService = require("../services/ticker.service");

async function updateDB(req, res) {
    const response = await tickerService.downloadData()
    res.json(response);
}


module.exports = {
    updateDB,
};
