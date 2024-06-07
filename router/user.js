const express=require("express");
const router=express.Router();
const User=require("../model/user.js");
const wrapAsync=require("../util/wrapAsync.js");
const passport = require("passport");
const authenciate=require("../controller/users.js")
router.get("/signup",(authenciate.renderlogin))
router.post("/signup",wrapAsync(authenciate.loginpart));

router.get("/login",(authenciate.renderlog))

router.post("/login",passport.authenticate("local", { failureRedirect: '/login', failureFlash:true}),authenciate.logpart);
router.get("/logout",(authenciate.logout));
module.exports= router