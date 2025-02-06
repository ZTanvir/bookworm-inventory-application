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
  const categoryId = req.params.id;
  const { rows } = await categoriesDb.getSingleCategory(categoryId);
  if (rows.length > 0) {
    const pageTitle = rows[0].name;
    res.render("pages/category-descriptions", {
      pageTitle,
      categoryDetails: rows,
    });
  } else {
    res.render("pages/category-descriptions", {
      pageTitle: "Not found",
      categoryDetails: [],
      errorMessage: "Item not found.",
    });
  }
};

exports.createNewItemGet = async (req, res) => {
  let { rows } = await categoriesDb.getAllCategories();
  if (rows.length > 0) {
    rows = rows.map(({ id, name }) => ({ id, name }));
  }

  /* rows will return empty array  */
  res.render("pages/new-items", {
    pageTitle: "Create Category",
    categories: rows,
  });
};

exports.createNewItemPost = async (req, res) => {
  console.log(req.body);
};
