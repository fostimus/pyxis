const express = require("express");
const app = express();
const db = require("./models");

const port = process.env.PORT || 4000;

app.set("view engine", "ejs");

/**
 * Middleware
 */
app.use(require("express-ejs-layouts"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/search", (req, res) => {
  console.log("Search string received: ", req.body);
  res.send(req.body);
});

console.log("Listening to port....", port);
app.listen(port);
