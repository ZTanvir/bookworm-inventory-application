const categoriesQuery = require("../db/categoriesQuery");
const bookQuery = require("../db/bookquery");
const { body, validationResult } = require("express-validator");

// Validate category
const validateCategory = [
  body("categoryName")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Category name is too long."),
];

const getAllCategories = async (req, res, next) => {
  const { rows } = await categoriesQuery.getAllCategories();
  res.json(rows);
};

const getSingleCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  const { rows } = await categoriesQuery.getSingleCategory(categoryId);

  rows.length > 0 ? res.json(rows[0]) : res.json("message:category not found");
};

const addCategory = [
  validateCategory,
  async (req, res, next) => {
    const { categoryName, categoryDescription } = req.body;
    const coverImageSrc = req.file.path;
    const errors = validationResult(req);
    // user submitted incorrect data via form
    if (!errors.isEmpty()) {
      return res.status(400).render("pages/new-category", {
        pageTitle: "Add new category",
        errors: errors.array(),
      });
    }
    await categoriesQuery.addCategory(
      categoryName,
      categoryDescription,
      coverImageSrc
    );
    res.redirect("/inventory/categories");
  },
];

const updateCategory = async (req, res, next) => {
  const id = req.params.id;
  const { name, description } = req.body;
  await categoriesQuery.updateCategory(id, name, description);
  res.sendStatus(200);
};

const deleteCategory = async (req, res, next) => {
  const itemId = req.params.id;
  const booksDeleteQuery = [];
  try {
    // get all the book id that belongs to that category
    const booksId = await bookQuery.getBookIdByCategory(itemId);

    booksId.forEach((book) => booksDeleteQuery.push(book.book_id));
    // delete the category
    await categoriesQuery.deleteCategory(itemId);
    // delete all books that belong to that category
    for (let index = 0; index < booksDeleteQuery.length; index++) {
      console.log(booksDeleteQuery[index]);
      await bookQuery.deleteBook(booksDeleteQuery[index]);
    }
    res.sendStatus(200);
  } catch (error) {
    console.log("Error on deleteCategory", error);
  }
};

module.exports = {
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
