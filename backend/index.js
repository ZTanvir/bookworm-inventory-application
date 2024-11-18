const express = require("express");
const app = express();
const bookRouters = require("./routers/book");

app.use("/api/book", bookRouters);
app.get("/", (req, res) => {
  res.json({ message: "Home page" });
});

module.exports = app;
