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

module.exports = {
  getAllCategories,
  addCategory,
};
