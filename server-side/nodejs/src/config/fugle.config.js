const { RestClient } = require("@fugle/marketdata");

const client = new RestClient({
  apiKey: process.env.FUGLE_API_KEY,
});

module.exports = client;
