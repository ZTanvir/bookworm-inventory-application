const categoriesDb = require("../db/categoriesQuery");
const helper = require("../utils/helper");
const bookQuery = require("../db/bookquery");
const logger = require("../utils/logger");
const { check, validationResult } = require("express-validator");

const validateNewItem = [
  check("name").notEmpty().withMessage("Please add a name.").trim().escape(),
  check("descriptions")
    .notEmpty()
    .withMessage("Please add descriptions.")
    .trim()
    .escape(),
  check("authors")
    .notEmpty()
    .withMessage("Please add authors.")
    .trim()
    .escape(),
  check("pages")
    .isInt()
    .withMessage("Only natural number is allowed Ex:102,48 "),
  check("price")
    .isInt()
    .withMessage("Only natural number is allowed Ex:628,148 "),
  check("release").isDate().withMessage("Please add a valid date."),
  check("category").notEmpty().withMessage("Please check a category"),
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
    // add this custom error msg if cover image file not found
    if (!req.file) {
      error["errors"].push({
        type: "field",
        value: "",
        msg: "Please select a cover image.",
        path: "bookCoverImg",
        location: "body",
      });
    }
    if (!error.isEmpty()) {
      return res.status(400).render("pages/new-items", {
        pageTitle: "Create Category",
        categories: rows,
        validateErrors: error["errors"],
        helperFunctions: helper,
        formdata: req.body,
      });
    }

    let { name, descriptions, authors, pages, price, release } = req.body;
    let { category } = req.body;
    // single checkbox category value also store in array
    category = !category.length >= 0 && [...category];
    const cover_img_src = req.file.path;
    //  store form value in database
    // add book to books table
    try {
      await bookQuery.insertBook(
        name,
        descriptions,
        authors,
        pages,
        release,
        price,
        cover_img_src
      );
    } catch (error) {
      logger.error("Error when add book to books table:");
    }
    // get the book id from books table
    let bookId = null;
    try {
      const result = await bookQuery.findBookByName(name);
      bookId = result[0].id;
    } catch (error) {
      console.error("Error when searching for book id in books table:", error);
    }

    // get the category id from categories table
    /* as we directly pass the category id value to our input checkbox field so
      we don't need to reassure it again by searching to the category table
    */
    // store book id and category id to book_categories table
    if (category.length > 0) {
      let allRequest = [];
      for (const item of category) {
        allRequest.push(await bookQuery.addBookToCategory(bookId, item));
      }
      try {
        await Promise.all(allRequest);
      } catch (error) {
        logger.error(
          "Error when adding book id and category id to book_categories table:",
          error
        );
      }
    }
    // return res.redirect("/");
  },
];
