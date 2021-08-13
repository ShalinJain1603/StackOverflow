if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const OutlookStrategy = require("passport-outlook").Strategy;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

const outlookroutes = require("./Routes/outlook");
const questionroutes = require("./Routes/questions");
const answerroutes = require("./Routes/answer");

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
      callbackURL: "http://localhost:4000/auth/outlook/callback",
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
  res.send("Connected to backend-server");
  // res.render("testing");
});

app.use("/", outlookroutes);
app.use("/api/question", questionroutes);
app.use("/api/question", answerroutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
