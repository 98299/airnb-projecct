const listing=require("../model/model.js");
const Review=require("../model/comment.js");
module.exports.review=async(req,res)=>{
 
    let finding=await listing.findById(req.params.id);
     let newreview=new Review (req.body.review);
     finding.reviews.push(newreview);
     await newreview.save();
     await finding.save();
     req.flash("success","review added");
     res.redirect(`/listing/${finding._id}`);
  }

  module.exports.delreview=async(req,res)=>{
    let{id,reviewid}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews: reviewid}});
    await Review.findByIdAndDelete(reviewid);
    req.flash("success","review deleted");
    res.redirect(`/listing/${id}`);
}