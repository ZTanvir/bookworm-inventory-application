const express = require("express");
const app = express();
const morgan = require("morgan");
const bookRouters = require("./routers/book");
const bookCategories = require("./routers/category");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("tiny"));

app.use("/api", bookRouters);
app.use("/api", bookCategories);

app.get("/", (req, res) => {
  res.json({ message: "Home page" });
});

module.exports = app;
