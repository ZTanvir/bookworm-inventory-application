const express = require("express");
const bookViews = express.Router();
const bookViewsController = require("../controllers/book-views");

bookViews.get("/category/create", bookViewsController.createNewCategoryGet);
bookViews.get("/categories", bookViewsController.getAllCategories);

module.exports = bookViews;
