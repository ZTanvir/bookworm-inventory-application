const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "..", ".env") });

const PORT = process.env.PORT;
const dbConnectionInfo =
  process.env.NODE_ENV === "production"
    ? process.env.VERCEL_DATABASE_URL
    : process.env.NODE_ENV === "developmentLocal"
    ? process.env.PG_CONNECTION_STRING
    : process.env.VERCEL_DATABASE_URL;

module.exports = { PORT, dbConnectionInfo };
