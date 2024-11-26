const pool = require("./pool");

const addCategory = async (categoryName, description) => {
  await pool.query("INSERT INTO categories(name,descriptions) VALUES($1,$2)", [
    categoryName,
    description,
  ]);
};

module.exports = {
  addCategory,
};
