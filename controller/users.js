
const User=require("../model/user.js");
module.exports.renderlogin=(req,res)=>{
    res.render("./user/user.ejs");
};
module.exports.loginpart=async(req,res)=>{
    try{
        let{email,username,password}=req.body;
    const newuser=new User({email,username});
    let newregister=await User.register(newuser,password);
    console.log(newregister);
    req.login(newregister,(err)=>{
      if(err){
        next(err);
      }
      req.flash("success","welcome to wanderlust !");
      res.redirect("/listing");

    })
    }
    catch(e){
      req.flash("error",e.message);
      res.redirect("/signup");
    }
}
module.exports.renderlog=(req,res)=>{
    res.render("./user/login.ejs");
};
module.exports.logpart=async(req,res)=>{

    req.flash("success","welcome to wanderlust!");
    res.redirect("/listing");
 }
  
 module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
     if(err){
      next(err);
     }
     req.flash("success","you are logged out");
     res.redirect("/listing");
    })
  }