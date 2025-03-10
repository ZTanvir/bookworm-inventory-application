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

const addBookToCategory = async (bookId, categoryId) => {
  await pool.query(
    `INSERT INTO book_categories(book_id,category_id) VALUES ($1,$2)`,
    [bookId, categoryId]
  );
};

const getItems = async () => {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows;
};

const getSingleItem = async (bookId) => {
  const { rows } = await pool.query(
    "SELECT * FROM book_categories_view WHERE id=$1",
    [bookId]
  );
  return rows;
};

const getLimitedBook = async (limit) => {
  const { rows } = await pool.query("SELECT * FROM books LIMIT $1 ", [limit]);
  return rows;
};

const deleteBook = async (bookId) => {
  await pool.query("DELETE FROM books WHERE id = $1", [bookId]);
};

const getBookIdByCategory = async (categoryId) => {
  const { rows } = await pool.query(
    "SELECT book_id FROM book_categories WHERE category_id = $1",
    [categoryId]
  );
  return rows;
};

module.exports = {
  insertBook,
  findBookByName,
  addBookToCategory,
  getItems,
  getSingleItem,
  getLimitedBook,
  deleteBook,
  getBookIdByCategory,
};
