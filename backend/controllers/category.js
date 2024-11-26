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
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
