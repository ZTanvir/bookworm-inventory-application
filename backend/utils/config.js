const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "..", ".env") });

const PORT = process.env.PORT;
const dbConnectionInfo = process.env.PG_CONNECTION_STRING;

module.exports = { PORT, dbConnectionInfo };
