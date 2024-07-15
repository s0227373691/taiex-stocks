const TickersModel = require('../models/tickers.model')
const fugleService = require('./fugle.service')


async function downloadData() {
    try {
        const equitys = await fugleService.fetchFullEquity()
        const equityPromises = equitys?.tikers.map(async (equity, i) =>
            TickersModel.findOneAndUpdate(
                { symbol: equity.symbol, name: equity.name },
                { symbol: equity.symbol, name: equity.name, type: equity.type, updateTime: new Date(equity.date) },
                {
                    new: true,
                    upsert: true,
                }
            )
        )

        return Promise.all(equityPromises)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    downloadData
}