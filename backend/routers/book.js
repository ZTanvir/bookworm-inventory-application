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

module.exports = bookRouters;
