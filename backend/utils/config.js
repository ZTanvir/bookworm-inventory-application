require("dotenv").config();

const PORT = process.env.PORT;
const dbConnectionInfo = process.env.PG_CONNECTION_STRING;

module.exports = { PORT, dbConnectionInfo };
