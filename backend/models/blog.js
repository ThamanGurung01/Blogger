const mongoose=require("mongoose");
const blogSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
},
coverImage:{
    type:String,
    required:true,
},
createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
}
},{timestamps:true});

const Blog=mongoose.model("user",blogSchema);
module.exports=Blog;