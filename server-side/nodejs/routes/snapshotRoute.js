const router = require('express').Router()
const client = require('../fugle')

router.get('/:market', (req, res) => {
    (async () => {
        const snapshot = await client.stock.snapshot.quotes({ market: req.params.market })
        res.json(snapshot)
    })()
})

module.exports = router

