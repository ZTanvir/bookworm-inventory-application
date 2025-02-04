const express = require("express");
const bookViews = express.Router();
const bookViewsController = require("../controllers/book-views");

bookViews.get("/category/create", bookViewsController.createNewCategoryGet);
bookViews.get("/categories", bookViewsController.getAllCategories);
bookViews.get("/categories/:id", bookViewsController.getSingleCategory);
bookViews.get("/item/create", bookViewsController.createNewItemGet);

module.exports = bookViews;
