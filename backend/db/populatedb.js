const config = require("../utils/config");
const { Client } = require("pg");
console.log("config file", config);

const sql = `CREATE TABLE IF NOT EXISTS authors(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
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
