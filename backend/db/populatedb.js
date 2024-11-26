const config = require("../utils/config");

const { Client } = require("pg");

const sql = `
CREATE TABLE IF NOT EXISTS authors(
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
  number_of_pages INT NOT NULL
);
CREATE TABLE IF NOT EXISTS ratings(
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL,
  description TEXT NOT NULL,
  CONSTRAINT bookId FOREIGN KEY(book_id) REFERENCES books(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS book_categories(
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL,
  category_id INT NOT NULL,
  CONSTRAINT fk_book FOREIGN KEY(book_id) REFERENCES books(id) ON DELETE CASCADE,
  CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS book_authors(
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL,
  author_id INT NOT NULL,
  CONSTRAINT fk_book_id FOREIGN KEY(book_id) REFERENCES books(id) ON DELETE CASCADE,
  CONSTRAINT fk_author_id FOREIGN KEY(author_id) REFERENCES authors(id) ON DELETE CASCADE
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
