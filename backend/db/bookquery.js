const pool = require("./pool");

const insertBook = async (
  name,
  description,
  authors,
  number_of_pages,
  released,
  price,
  cover_img_src
) => {
  await pool.query(
    "INSERT INTO books (name,description,authors,number_of_pages,released,price,cover_img_src) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [
      name,
      description,
      authors,
      number_of_pages,
      released,
      price,
      cover_img_src,
    ]
  );
};

const findBookByName = async (name) => {
  const { rows } = await pool.query("SELECT id FROM books WHERE name = $1;", [
    name,
  ]);
  return rows;
};

module.exports = { insertBook, findBookByName };
