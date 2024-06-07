const mongoose=require("mongoose");
const intdata=require("./data.js");
const listing=require("./model/model.js");
const mongo_url='mongodb://127.0.0.1:27017/airbn';
main().then(()=>{
    console.log("connected to dbms")
}).catch((err)=>{
   console.log(err);
})
async function main(){
 await mongoose.connect(mongo_url);
} 
const intdb =async()=>{
    await listing.deleteMany({});
    intdata.data=intdata.data.map((obj)=>({...obj,owner:"665c1a3547852df4671526c4"}))
    await listing.insertMany(intdata.data);
    console.log("data printed")
}
intdb();