const config = require("../utils/config");
const { Pool } = require("pg");

const connectionString = config.DB_CONNECTION_STRING;

module.exports = new Pool({
  connectionString: config.DB_CONNECTION_STRING,
});
