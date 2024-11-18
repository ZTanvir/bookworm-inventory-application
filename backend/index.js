const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Home page" });
});

module.exports = app;
