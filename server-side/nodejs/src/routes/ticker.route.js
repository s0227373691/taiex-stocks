const router = require('express').Router()
const client = require('../config/fugle.config')
const delay = require('../utils/delay')

router.get('/:symbol', (req, res) => {
    (async () => {
        const data = await client.stock.intraday.ticker({ symbol: req.params.symbol })
        res.json(data)
    })()
})

module.exports = router

