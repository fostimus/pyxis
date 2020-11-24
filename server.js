require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const session = require("express-session");
const passport = require("./passport");

const port = process.env.PORT || 4000;

app.set("view engine", "ejs");

/**
 * Middleware
 */
app.use(require("express-ejs-layouts"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

// middleware - session config
app.use(
  session({
    // session is stored in the DB
    secret: "mjijuytdwecgt6564t6yjhui19191u",
    resave: false, // will not resave sessions
    saveUninitialized: false, // only create a session when a property is added to the session
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

// middleware - passport config
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */
app.get("/", (req, res) => {
  const signUpModal = {
    name: "signUpModal",
    title: "./modals/signUpTitle.ejs",
    body: "./modals/signUp.ejs"
  };
  res.render("index", { signUpModal: signUpModal });
});

app.post("/search", (req, res) => {
  console.log("Search string received: ", req.body);
  res.send(req.body);
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

console.log("Listening to port....", port);
app.listen(port);
