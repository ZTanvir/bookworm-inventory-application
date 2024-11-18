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

const getAllCategories = (req, res, next) => {
  res.json({ message: "book categories" });
};
const getSingleCategory = (req, res, next) => {
  res.json({ message: "single categories" });
};
const addCategory = (req, res, next) => {
  res.json({ message: "new categories" });
};
const updateCategory = (req, res, next) => {
  res.json({ message: "categories update" });
};
const deleteCategory = (req, res, next) => {
  res.json({ message: "categories delete" });
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addNewBook,
  updateSingleBook,
  deleteSingleBook,
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
