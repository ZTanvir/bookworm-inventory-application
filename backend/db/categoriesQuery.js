const pool = require("./pool");

const getAllCategories = async () => {
  const rows = await pool.query("SELECT * FROM categories");
  return rows;
};

const addCategory = async (categoryName, description, imgSec) => {
  await pool.query(
    "INSERT INTO categories(name,descriptions,cover_img_src) VALUES($1,$2,$3)",
    [categoryName, description, imgSec]
  );
};

const getSingleCategory = async (categoryId) => {
  const rows = await pool.query("SELECT * FROM categories WHERE id =  $1", [
    categoryId,
  ]);
  return rows;
};

const updateCategory = async (categoryId, categoryName, categoryDetails) => {
  await pool.query(
    "UPDATE categories SET name=$2,descriptions=$3 WHERE id=$1",
    [categoryId, categoryName, categoryDetails]
  );
};

const deleteCategory = async (categoryId) => {
  await pool.query("DELETE FROM categories WHERE id = $1", [categoryId]);
};

module.exports = {
  getAllCategories,
  addCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
