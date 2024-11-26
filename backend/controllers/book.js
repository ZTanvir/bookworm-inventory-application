const getAllBooks = (req, res, next) => {
  res.json({ message: "Book list" });
};
const getSingleBook = (req, res, next) => {
  res.json({ message: "Book 1" });
};
const addNewBook = (req, res, next) => {
  res.json({ message: "new Book" });
};
const updateSingleBook = (req, res, next) => {
  res.json({ message: "book update" });
};
const deleteSingleBook = (req, res, next) => {
  res.json({ message: "book delete" });
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addNewBook,
  updateSingleBook,
  deleteSingleBook,
};
