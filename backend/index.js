const express = require("express");
const app = express();
const morgan = require("morgan");
const bookRouters = require("./routers/book");

app.use(morgan("tiny"));

app.use("/api/book", bookRouters);
app.get("/", (req, res) => {
  res.json({ message: "Home page" });
});

module.exports = app;
