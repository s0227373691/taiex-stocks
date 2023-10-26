const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8555

const constantRoute = require("./routes/constantRoute")
const tickersRoute = require("./routes/tickersRoute")
const tickerRoute = require("./routes/tickerRoute")
const historicalRoute = require("./routes/historicalRoute")
const snapshotRoute = require("./routes/snapshotRoute")

app.use(cors());
app.use("/constant", constantRoute);
app.use("/tickers", tickersRoute);
app.use("/ticker", tickerRoute);
app.use("/historical", historicalRoute);
app.use("/snapshot", snapshotRoute);
app.listen(PORT, () => console.log(`Listening on port http://127.0.0.1:${PORT}`))