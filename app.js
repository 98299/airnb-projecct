if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const wrapAsync = require("./util/wrapAsync.js");
const ExpressError = require("./util/expres.js");
const mongoose = require("mongoose");
const listing = require("./model/model.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const User = require("./model/user.js");
const lastings = require("./router/route.js");
const reviews = require("./router/review.js");
const Userrouter = require("./router/user.js");
const { listingschema } = require("./schema.js");
const Review = require("./model/comment.js");

const dburl = process.env.ATLASDB_URL;

main().then(() => {
  console.log("connected to dbms");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(dburl);
}

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600
});

store.on("error", () => {
  console.log("error in session",err);
});

app.use(session({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.current = req.user; // Set the current user
  next();
});

app.get("/", (req, res) => {
  res.send("hii root");
});

// app.get("/demouser", async (req, res) => {
//   let fakeuser = new User({
//     email: "vy98@gmail.com",
//     username: "delta"
//   });
//   let newregister = await User.register(fakeuser, "helloworld");
//   res.send(newregister);
// });

app.use("/listing", lastings);
app.use("/listing/:id/reviews", reviews);
app.use("/", Userrouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(400, "page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.status(status).render("error.ejs", { err });
});

app.listen(8080, () => {
  console.log("port is working");
});
