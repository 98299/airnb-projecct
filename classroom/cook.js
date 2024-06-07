
const express=require("express");
const app=express();
const session=require("express-session");
app.use(session({secret:"mysecretcode", resave:false,saveUninitialized:true}));
const flash=require("connect-flash");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(flash());
app.use((req,res,next)=>{
  res.locals.errorsmsg=req.flash("error");
  res.locals.sucessmsg=req.flash("success");
  next();
})
app.get("/reg",(req,res)=>{
    let{name="anomyous"}=req.query;
    req.session.name=name;
   if(name==="anomyous"){
    req.flash("error","user is not signed")
   }else{
    req.flash("success","user is logged in")
   }
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
   res.render("page.ejs",{name:req.session.name  })
});

//app.get("/resp",(req,res)=>{
  //  if(req.session.count){
    //    req.session.count++
 //   }else{
   //     req.session.count=1
   // }

   // res.send(`the count is ${req.session.count}`);
//})

//app.get("/test",(req,res)=>{
 // res.send("hii guys");
//})

app.listen(3000,(req,res)=>{
    console.log("server is working");
})