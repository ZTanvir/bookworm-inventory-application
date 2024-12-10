const categoriesQuery = require("../db/categoriesQuery");

const getAllCategories = async (req, res, next) => {
  const { rows } = await categoriesQuery.getAllCategories();
  res.json(rows);
};
const getSingleCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  const { rows } = await categoriesQuery.getSingleCategory(categoryId);
  rows.length > 0
    ? res.sendStatus(200).json(rows)
    : res.json("message:category not found");
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
