const express = require("express");
const bookRouters = express.Router();
const bookControllers = require("../controllers/book");

// get all the book
bookRouters.get("/all", bookControllers.getAllBooks);
// get a single book
bookRouters.get("/single/:id", bookControllers.getSingleBook);
// add new book
bookRouters.post("/new", bookControllers.addNewBook);
// update a book
bookRouters.put("/update/:id", bookControllers.updateSingleBook);
// delete a book
bookRouters.delete("/delete/:id", bookControllers.deleteSingleBook);
// get all categories
bookRouters.get("/categories", bookControllers.getAllCategories);
// get a single categories
bookRouters.get("/categories/:id", bookControllers.getSingleCategory);
// add new categories
bookRouters.post("/categories/new", bookControllers.addCategory);
// update a category
bookRouters.put("/categories/update/:id", bookControllers.updateCategory);
// delete a category
bookRouters.delete("/categories/delete/:id", bookControllers.deleteCategory);

module.exports = bookRouters;
