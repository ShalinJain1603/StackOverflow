if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const OutlookStrategy = require("passport-outlook").Strategy;
const path = require("path");
const isLoggedIn = require("./utils/isLoggedIn");

const app = express();
const PORT = process.env.PORT || 3000;

const outlookroutes = require("./Routes/outlook");
const dbUrl = "mongodb://localhost:27017/stackoverflow";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection Open");
  })
  .catch((err) => {
    console.log("Error occured");
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Passport-Outlook Config
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new OutlookStrategy(
    {
      clientID: process.env.OUTLOOK_CLIENT_ID,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/outlook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

// Session config
app.use(
  session({ secret: "stackoverflow", resave: false, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/", outlookroutes);
app.get("/demo", isLoggedIn, (req, res) => {
  res.render("demo");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
