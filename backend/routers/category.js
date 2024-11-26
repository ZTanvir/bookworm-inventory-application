const express = require("express");
const categoryRoute = express.Router();
const categoryController = require("../controllers/category");

categoryRoute.get("/categories", categoryController.getAllCategories);
// get a single categories
categoryRoute.get("/category/:id", categoryController.getSingleCategory);
// add new categories
categoryRoute.post("/category/new", categoryController.addCategory);
// update a category
categoryRoute.put("/category/update/:id", categoryController.updateCategory);
// delete a category
categoryRoute.delete("/category/delete/:id", categoryController.deleteCategory);

module.exports = categoryRoute;
