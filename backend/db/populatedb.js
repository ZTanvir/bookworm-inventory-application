const config = require("../utils/config");

const { Client } = require("pg");

const sql = `
CREATE TABLE IF NOT EXISTS categories(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  descriptions TEXT NOT NULL,
  cover_img_src TEXT NOT NULL 
);
CREATE TABLE IF NOT EXISTS books(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  authors TEXT NOT NULL,
  number_of_pages INT NOT NULL,
  released DATE NOT NULL,
  price INTEGER NOT NULL,
  cover_img_src TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS book_categories(
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL,
  category_id INT NOT NULL,
  CONSTRAINT fk_book FOREIGN KEY(book_id) REFERENCES books(id) ON DELETE CASCADE,
  CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
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
