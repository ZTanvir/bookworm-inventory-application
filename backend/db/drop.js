const readline = require("node:readline");
const config = require("../utils/config");
const { Client } = require("pg");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const connectionString = config.dbConnectionInfo;

async function main() {
  console.log("seeding...");
  console.log("dropping table...");

  const tbName = await askQuestion("Name of the table you want to drop:");

  const sql = `DROP TABLE ${tbName}`;

  const client = new Client({
    connectionString,
  });

  await client.connect();
  await client.query(sql);
  await client.end();
  rl.close();

  console.log("done");
}

main();
