const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./comment.js");
const { required } = require("joi");
const listingschema= new Schema({
  title :{
    type:String,
    required:true
  } ,
  description : String,
  image : {
    type:String,
    default:"https://donpk.com/wp-content/uploads/2017/01/nature-wallpaper-hd-pictures-free-download-2.jpg",
    set:(v) => v===""? "https://donpk.com/wp-content/uploads/2017/01/nature-wallpaper-hd-pictures-free-download-2.jpg":v,
   },
  price :{
    type:Number,
     min:[0,"price is not negative"],
  } ,
  location :  String,
  country : String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review"
    }
    
  ],
  owner: {
       type:Schema.Types.ObjectId,
       ref:"User"
    },
  
   category:{
      type:String,
      enum:["training","rooms","amazing pool","farms","cabins","tree house"],
      required:true
    }

});
listingschema.post("findOneAndDelete",async(result)=>{
    if (result){
     await Review.deleteMany({id:{$in : result.reviews}});
   }
 
 
 });
 
const listing=mongoose.model("listing",listingschema);
module.exports=listing;

