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
    res.render("pages/categories", {
      pageTitle: "Category List",
      categoryList: rows,
    });
  } catch (error) {
    res.render("pages/categories", {
      pageTitle: "Category List",
      categoryList: [],
    });
  }
};

exports.getSingleCategory = async (req, res) => {
  // call db for a book categories details
  try {
    const { rows } = await categoriesDb.getAllCategories();
    res.render("pages/categories", {
      pageTitle: "Category List",
      categoryList: rows,
    });
  } catch (error) {
    res.render("pages/categories", {
      pageTitle: "Category List",
      categoryList: [],
    });
  }
};
