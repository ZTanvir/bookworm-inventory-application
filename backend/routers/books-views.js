const express = require("express");
const bookViews = express.Router();
const crypto = require("crypto");
const multer = require("multer");
const bookViewsController = require("../controllers/book-views");

// Edit file name uploaded by users
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/book-img");
  },
  filename: function (req, file, cb) {
    const nameOfFile = `${crypto
      .randomBytes(4)
      .toString("hex")}${file.originalname.split(" ").join("")}`;
    cb(null, nameOfFile);
  },
});
const upload = multer({ storage: storage });

bookViews.get("/category/create", bookViewsController.createNewCategoryGet);
bookViews.get("/categories", bookViewsController.getAllCategories);
bookViews.get("/categories/:id", bookViewsController.getSingleCategory);
bookViews.get("/item/create", bookViewsController.createNewItemGet);
bookViews.post(
  "/item/create",
  upload.single("bookCoverImg"),
  bookViewsController.createNewItemPost
);

bookViews.get("/items", bookViewsController.getAllItems);

module.exports = bookViews;
