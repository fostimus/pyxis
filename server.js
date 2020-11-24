require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const session = require("express-session");
const passport = require("./passport");
const flash = require("connect-flash");

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

app.use(flash());

// middleware - passport config
app.use(passport.initialize());
app.use(passport.session());

const signUpModal = {
  name: "signUpModal",
  title: "./modals/signUpTitle.ejs",
  body: "./modals/signUp.ejs"
};

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.render("home", { index: true, signUpModal: signUpModal });
});

app.get("/home", (req, res) => {
  res.render("home", { index: true, signUpModal: signUpModal });
});

// didn't create a field for subscribed in database... dang it
app.post("/signup", (req, res) => {
  // find or create a user, providing the name and password as default values
  db.user
    .findOrCreate({
      where: {
        email: req.body.email
      },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        zipCode: req.body.zipCode,
        userType: "owner"
      }
    })
    .then(([user, created]) => {
      if (created) {
        // if created, success and login
        console.log("user created");
        res.redirect("/");

        // passport isn't working
        passport.authenticate("local", {
          successRedirect: "/",
          successFlash: "Account created and logged in"
        })(req, res);
      } else {
        // if not created, the email already exists
        // flash message isn't working
        req.flash("error", "Email already exists");
        res.redirect("/");
      }
    })
    .catch(error => {
      // if an error occurs, let's see what the error is
      req.flash("error", error.message);
      res.redirect("/");
    });
});

app.post("/search", (req, res) => {
  console.log("Search string received: ", req.body);
  res.send(req.body);
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { index: false, signUpModal: signUpModal });
});

console.log("Listening to port....", port);
app.listen(port);
