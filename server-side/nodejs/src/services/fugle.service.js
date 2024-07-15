
const client = require("../config/fugle.config");
const delay = require("../utils/delay");

async function fetchTickers({ type, exchange, market }) {
    return await client.stock.intraday.tickers({
        type,
        exchange,
        market
    });

}

async function fetchFullEquity() {
    const twseEquitys = await fetchTickers({ type: 'EQUITY', exchange: 'TWSE' })
    await delay(1000)
    const tpexEquitys = await fetchTickers({ type: 'EQUITY', exchange: 'TPEx' })
    await delay(1000)

    const tikersTwseEquity = twseEquitys?.data.map(twseEquity => ({
        ...twseEquity,
        date: twseEquitys.date,
        type: twseEquitys.type,
        exchange: twseEquitys.exchange,
    })).filter(el => el.name)

    const tikersTpexEquity = tpexEquitys?.data.map(tpexEquity => ({
        ...tpexEquity,
        date: tpexEquitys.date,
        type: tpexEquitys.type,
        exchange: tpexEquitys.exchange,
    })).filter(el => el.name)

    return { tikers: [...tikersTwseEquity, ...tikersTpexEquity] }
}

async function fetchFullIndex() {
    const twseIndex = await fetchTickers({ type: 'INDEX', exchange: 'TWSE' })
    await delay(1000)
    const tpexIndex = await fetchTickers({ type: 'INDEX', exchange: 'TPEx' })
    await delay(1000)

    return { tikers: [twseIndex, tpexIndex] }
}

module.exports = {
    fetchTickers,
    fetchFullEquity,
    fetchFullIndex
}