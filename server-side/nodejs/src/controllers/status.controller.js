const os = require("os");

const getStatus = async (req, res) => {
  function getUptime() {
    let totalSeconds = os.uptime();
    let days = Math.floor(totalSeconds / (3600 * 24));
    let hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  }

  res.json({
    status: "OK",
    uptime: getUptime(),
    timestamp: new Date().toISOString(),
  });
};

const getHealth = (req, res) => {
  const cpuUsage = os.loadavg()[0];
  const memoryUsage = ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;

  res.json({
    cpuUsage: cpuUsage.toFixed(2) + "%",
    memoryUsage: memoryUsage.toFixed(2) + "%",
  });
};

module.exports = {
  getStatus,
  getHealth,
};
