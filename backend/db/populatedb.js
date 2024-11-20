const { Client } = require("pg");
require("dotenv").config();
console.log(process.env.PORT);

const sql = `CREATE TABLE IF NOT EXISTS authors(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
);
`;

const connectionString = `${config.dbConnectionInfo}`;
console.log("connection string", connectionString);

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString,
  });
  try {
    await client.connect();
  } catch (error) {
    console.log("connection error", error);
  }
  await client.query(sql);
  await client.end();
  console.log("done");
}

main();
