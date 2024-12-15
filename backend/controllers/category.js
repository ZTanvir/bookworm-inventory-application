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
  const converImageSrc = req.file.path;
  await categoriesQuery.addCategory(
    categoryName,
    categoryDescription,
    converImageSrc
  );
  res.redirect("/api/categorypage/create");
};
const updateCategory = async (req, res, next) => {
  const id = req.params.id;
  const { name, description } = req.body;
  console.log(id, name, description);
  await categoriesQuery.updateCategory(id, name, description);
  res.sendStatus(200);
};
const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  await categoriesQuery.deleteCategory(categoryId);
  res.sendStatus(204);
};

module.exports = {
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
