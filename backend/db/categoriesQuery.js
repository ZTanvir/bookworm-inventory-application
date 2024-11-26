const pool = require("./pool");

const addCategory = async (categoryName) => {
  await pool.query("INSERT INTO categories(name) VALUES($1)", [categoryName]);
};

module.exports = {
  addCategory,
};
