const config = require("../utils/config");
const { Client } = require("pg");
const bookquery = require("../db/bookquery");

const connectionString = config.dbConnectionInfo;

async function main() {
  console.log("seeding...");
  console.log("dropping table...");

  const client = new Client({
    connectionString,
  });

  await client.connect();
  const name = "Brynn Michael";
  try {
    const id = await bookquery.findBookByName(name);
    console.log("client id", id);
  } catch (error) {
    console.error(error);
  }
  //   const id = await client.query("SELECT id FROM books WHERE name = $1", [name]);

  await client.end();

  console.log("done");
}

main();
