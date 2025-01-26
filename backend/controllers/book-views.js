const categoriesDb = require("../db/categoriesQuery");
const logger = require("../utils/logger");

exports.createNewCategoryGet = (req, res) => {
  res.render("pages/new-category", {
    pageTitle: "Add new category",
    errors: [],
  });
};
exports.getAllCategories = async (req, res) => {
  // call db for all book categories list
  try {
    const { rows } = await categoriesDb.getAllCategories();
    logger.info("List of all rows:", rows);
    res.render("pages/categories", {
      pageTitle: "Category List",
      categoryList: rows,
    });
  } catch (error) {
    logger.error("Book categories not found");
    res.render("pages/categories", {
      pageTitle: "Category List",
      categoryList: [],
    });
  }
};
