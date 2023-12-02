const router = require('express').Router()
const client = require('../fugle')

router.get('/:market', (req, res) => {
    (async () => {
        const markets = req.params.market.split(',')
        const result = await Promise.all(
            markets.map(market => client.stock.snapshot.quotes({ market }))
        )
        res.json(result)
    })()
})

module.exports = router

