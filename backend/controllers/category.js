const categoriesQuery = require("../db/categoriesQuery");
const { body, validationResult } = require("express-validator");

// Validate category
const validateCategory = [
  body("categoryName")
    .trim()
    .isAlpha()
    .withMessage("Must only contain letters.")
    .isLength({ min: 1, max: 5 })
    .withMessage("Category name is too long"),
];

const getAllCategories = async (req, res, next) => {
  const { rows } = await categoriesQuery.getAllCategories();
  res.json(rows);
};
const getSingleCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  const { rows } = await categoriesQuery.getSingleCategory(categoryId);
  rows.length > 0
    ? res.sendStatus(200).json(rows)
    : res.json("message:category not found");
};
const addCategory = [
  validateCategory,
  async (req, res, next) => {
    const { categoryName, categoryDescription } = req.body;
    const coverImageSrc = req.file.path;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("category form errors:", errors.array());

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
    res.redirect("/");
  },
];

const updateCategory = async (req, res, next) => {
  const id = req.params.id;
  const { name, description } = req.body;
  console.log(id, name, description);
  await categoriesQuery.updateCategory(id, name, description);
  res.sendStatus(200);
};

module.exports = {
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
};
