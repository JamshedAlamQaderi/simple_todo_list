const { networkInterfaces } = require("os");

const nets = networkInterfaces();
const results = {};
Object.keys(nets).forEach((key) => {
  nets[key].forEach((net) => {
    if (net.family === "IPv4") {
      results[key] = net.address;
    }
  });
});

module.exports = { local_ip: results[Object.keys(results)[0]] };
