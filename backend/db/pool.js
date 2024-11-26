const config = require("../utils/config");
const { Pool } = require("pg");

const connectionString = config.dbConnectionInfo;

module.exports = new Pool({
  connectionString,
});
