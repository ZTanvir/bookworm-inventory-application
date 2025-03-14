const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const bookViews = require("./routers/books-views");
const bookQuery = require("./db/bookquery");
const categoryRoute = require("./routers/category");
const categoriesQuery = require("./db/categoriesQuery");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(morgan("tiny"));

app.use("/inventory", bookViews);
app.use("/inventory", categoryRoute);

app.get("/", async (req, res) => {
  const books = await bookQuery.getLimitedBook(4);
  const categories = await categoriesQuery.getLimitedCategory(4);
  res.render("home-page", {
    title: "Books Inventory",
    books,
    categories,
  });
});

app.all("*", (req, res) => {
  res.render("pages/page-not-found", {
    title: "Page not found",
  });
});

module.exports = app;
