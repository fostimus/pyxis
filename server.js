const express = require("express");
const app = express();

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
  res.send("Pyxis rocks!");
});

console.log("Listening to port....", port);
app.listen(port);
