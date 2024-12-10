const pool = require("./pool");

const getAllCategories = async () => {
  const rows = await pool.query("SELECT * FROM categories");
  return rows;
};

const addCategory = async (categoryName, description) => {
  await pool.query("INSERT INTO categories(name,descriptions) VALUES($1,$2)", [
    categoryName,
    description,
  ]);
};

const getSingleCategory = async (categoryId) => {
  const rows = await pool.query("SELECT * FROM categories WHERE id =  $1", [
    categoryId,
  ]);
  return rows;
};

const deleteCategory = async (categoryId) => {
  await pool.query("DELETE FROM categories WHERE id = $1", [categoryId]);
};

module.exports = {
  getAllCategories,
  addCategory,
  getSingleCategory,
  deleteCategory,
};
