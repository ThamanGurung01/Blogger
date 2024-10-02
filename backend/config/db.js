const mongoose=require("mongoose");

const connectDB=async(dbUrl)=>{
    return await mongoose.connect(dbUrl);
}

module.exports=connectDB;