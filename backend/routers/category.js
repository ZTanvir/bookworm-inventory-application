const express = require("express");
const categoryRoute = express.Router();
const crypto = require("crypto");
const multer = require("multer");

// Edit file name uploaded by users
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/categories-img");
  },
  filename: function (req, file, cb) {
    const nameOfFile = `${crypto
      .randomBytes(4)
      .toString("hex")}${file.originalname.split(" ").join("")}`;
    cb(null, nameOfFile);
  },
});

const upload = multer({ storage: storage });

const categoryController = require("../controllers/category");

categoryRoute.get("/categories", categoryController.getAllCategories);
// get a single categories
categoryRoute.get("/category/:id", categoryController.getSingleCategory);
// add new categories
categoryRoute.post(
  "/category/new",
  upload.single("categoryimg"),
  categoryController.addCategory
);
// update a category
categoryRoute.put("/category/update/:id", categoryController.updateCategory);
// delete a category
// categoryRoute.delete("/category/delete/:id", categoryController.deleteCategory);

module.exports = categoryRoute;
