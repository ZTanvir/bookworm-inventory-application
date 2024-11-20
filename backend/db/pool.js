const { Pool } = require("pg");
const config = require("../utils/config");

const connectionString = config.DB_CONNECTION_STRING;

module.exports = new Pool({
  connectionString: config.DB_CONNECTION_STRING,
});
