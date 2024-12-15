const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const bookRouters = require("./routers/book");
const bookCategories = require("./routers/category");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "ejs");

app.use(morgan("tiny"));

app.use("/api", bookRouters);
app.use("/api", bookCategories);

app.get("/", (req, res) => {
  res.json({ message: "Home page" });
});

module.exports = app;
