const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../util/wrapAsync.js");
const ExpressError=require("../util/expres.js");
const Review=require("../model/comment.js");
const {listingschema}=require("../schema.js");
const listing=require("../model/model.js");
const listreview=require("../controller/review.js")

router.post("/",wrapAsync(listreview.review)
)
  router.delete("/:reviewid",wrapAsync(listreview.delreview)
  );
  module.exports=router;