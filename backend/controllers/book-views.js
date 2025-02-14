const categoriesDb = require("../db/categoriesQuery");
const helper = require("../utils/helper");
const { check, validationResult } = require("express-validator");

const validateNewItem = [
  check("name").notEmpty().withMessage("Please add a name."),
  check("descriptions").notEmpty().withMessage("Please add descriptions."),
  check("authors").notEmpty().withMessage("Please add authors."),
  check("pages")
    .isInt()
    .withMessage("Only natural number is allowed Ex:102,48 "),
  check("price")
    .isInt()
    .withMessage("Only natural number is allowed Ex:628,148 "),
  check("release").isDate().withMessage("Please add a valid date."),
  check("category").notEmpty().withMessage("Please check a category"),
  check("bookCoverImg").notEmpty().withMessage("Please add an image."),
];

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
    validateErrors: [],
    result: null,
    formdata: {},
  });
};

exports.createNewItemPost = [
  validateNewItem,
  async (req, res) => {
    // Get category item from category table
    let { rows } = await categoriesDb.getAllCategories();
    if (rows.length > 0) {
      rows = rows.map(({ id, name }) => ({ id, name }));
    }

    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).render("pages/new-items", {
        pageTitle: "Create Category",
        categories: rows,
        validateErrors: error["errors"],
        helperFunctions: helper,
        formdata: req.body,
      });
    }
    console.log(req.body);
  },
];
