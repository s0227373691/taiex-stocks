const express = require('express')
const cors = require('cors')
const session = require('express-session')
require('./src/config/db.config')
const app = express()
const PORT = 8555

const constantRoute = require("./src/routes/constant.route")
const tickersRoute = require("./src/routes/tickers.route")
const tickerRoute = require("./src/routes/ticker.route")
const historicalRoute = require("./src/routes/historical.route")
const snapshotRoute = require("./src/routes/snapshot.route")

const LogRocket = require('logrocket');
LogRocket.init('YOUR_APP_ID');

app.use(cors());
app.use(session({
    secret: 'mySecret',
    name: 'user', // optional
    saveUninitialized: false,
    resave: true,
    cookie: { historical: { isBusy: false } }
}))

app.use("/constant", constantRoute);
app.use("/tickers", tickersRoute);
app.use("/ticker", tickerRoute);
app.use("/historical", historicalRoute);
app.use("/snapshot", snapshotRoute);

app.listen(PORT, () => console.log(`Listening on port http://127.0.0.1:${PORT}`))