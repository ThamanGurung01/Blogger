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
    default:"defaultImage/uploadBlogPhoto.png",
},
createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
}
},{timestamps:true});

const Blog=mongoose.model("blog",blogSchema);
module.exports=Blog;