const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync.js");
const {listingschema}=require("../schema.js");
const ExpressError=require("../util/expres.js");
const listing=require("../model/model.js");
const User=require("../model/user.js");
const listingcontroller=require("../controller/listing.js");
//index route
router.get("/",wrapAsync(listingcontroller.index));
// Add a route to filter listings by category
router.get("/category/:category", wrapAsync(listingcontroller.filterByCategory));

// new route
router.get("/new",wrapAsync(listingcontroller.newindex)
)
//create
router.post( "/", wrapAsync(listingcontroller.listshow))


//show route
router.get("/:id",wrapAsync(listingcontroller.show)
)
router.get("/:id/edit",wrapAsync(listingcontroller.edit)
)
router.put("/:id",wrapAsync(listingcontroller.editing)
)
//delete route
router.delete("/:id",wrapAsync(listingcontroller.delete)
)
module.exports=router;
