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

// join 3 table query
`
SELECT books.name,categories.name FROM books FULL JOIN book_categories ON books.id = book_categories.book_id FULL JOIN categories ON book_categories.category_id = categories.id;`;

module.exports = { insertBook, findBookByName, addBookToCategory };
