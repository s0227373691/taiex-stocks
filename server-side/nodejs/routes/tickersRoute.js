const router = require('express').Router()
const client = require('../fugle')
const delay = require('../utils/delay')

router.get('/', (req, res) => {
    (async () => {
        const data = await client.stock.intraday
            .tickers({ type: "EQUITY", exchange: "TWSE", isNormal: true })
        res.json(data)
    })()
})

module.exports = router

