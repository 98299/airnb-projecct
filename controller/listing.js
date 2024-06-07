const listing=require("../model/model.js");

module.exports.index=async (req,res)=>{
    const sample= await listing.find();
    res.render("listing/index.ejs",{sample});
}
module.exports.filterByCategory = async (req, res) => {
  const { category } = req.params;
  const filteredListings = await listing.find({ category });
  res.render("listing/index.ejs", { sample: filteredListings });
};

 module.exports.newindex=(req,res)=>{
    if(!req.isAuthenticated()){
      
      req.flash("error","you must be logged in to create a listing");
      res.redirect("/login");
    }
    res.render("listing/new.ejs");
   
  }

  module.exports.listshow=async(req,res)=>{
    const newdata=new listing(req.body.listing);
   newdata.owner=req.user._id
     await newdata.save();
    req.flash("success","new list created");
     res.redirect("/listing");
  
  }

  module.exports.show=async(req,res)=>{
    const{id}=req.params
    const result=await listing.findById(id).populate("reviews").populate("owner");
    if(!result){
      req.flash("error","this url is not exists");
      res.redirect("/listing");
    }
    console.log(result);
    res.render("listing/show.ejs",{result});
  
  }

  module.exports.edit=async(req,res)=>{
    if(!req.isAuthenticated()){
      req.flash("error","you must be logged in to edit a listing");
      res.redirect("/login");
    }
    let{id}=req.params;
    const result=await listing.findById(id);
    if(!result){
      req.flash("error","this page is not exists");
      res.redirect("/listing");
    }
    res.render("listing/edit.ejs",{result});
  }
  module.exports.editing=async(req,res)=>{
    let{id}=req.params;
   await listing.findByIdAndUpdate(id ,{...req.body.listing});
   req.flash("success","update successful");
    res.redirect("/listing");
  }
  module.exports.delete=async(req,res)=>{
    if(!req.isAuthenticated()){
      req.flash("error","you must be logged in to delete a listing");
      res.redirect("/login");
      
      res.redirect("/listing")
    }
    
    let {id}=req.params;
   await listing.findByIdAndDelete(id);
    req.flash("success","done delete");
     res.redirect("/listing")
  }