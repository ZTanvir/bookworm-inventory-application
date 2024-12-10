const categoriesQuery = require("../db/categoriesQuery");

const getAllCategories = async (req, res, next) => {
  const { rows } = await categoriesQuery.getAllCategories();
  res.json(rows);
};
const getSingleCategory = (req, res, next) => {
  res.json({ message: "single categories" });
};
const addCategory = async (req, res, next) => {
  const { categoryName, categoryDescription } = req.body;
  await categoriesQuery.addCategory(categoryName, categoryDescription);
  res.sendStatus(201);
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
