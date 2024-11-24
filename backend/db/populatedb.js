const config = require("../utils/config");
require("dotenv").config();

const { Client } = require("pg");

const sql = `CREATE TABLE IF NOT EXISTS authors(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS books(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  number_of_pages int NOT NULL
)
`;

const connectionString = config.dbConnectionInfo;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString,
  });

  await client.connect();
  await client.query(sql);
  await client.end();

  console.log("done");
}

main();
