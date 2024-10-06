const Blog=require("../models/blog")
const tempUser="6702036c2b7457cc26a335f3";
const deleteOldImage = require("../services/deleteOldImage");
const mongoose=require("mongoose");


async function getAllBlog(req,res){
    try{
       const blogs= await Blog.find({});
       if(!blogs) return res.status(400).json({error:"blog data"});
        return res.status(200).json(blogs);
      }catch (err){
        console.log("Error getting all users:",err);
        return res.status(500).json({error:"Server Error Occured"});
      }
}
async function getBlog(req,res){
    try{
        const blogId=req.params.id;
        if(!blogId||!mongoose.isValidObjectId(blogId)) return res.status(400).json({error:"No id given or invalid id"});
       const blog= await Blog.findById(blogId);
       if(!blog) return res.status(404).json({error:"No Blog found by Id: "+blogId});
          return res.status(200).json(blog);
      }catch(err){
        console.log("Error fetching blog:",err);
        return res.status(500).json({error:"Server error occured while fetching blog"});
      }
}
async function blogCreation(req,res){
    try{
        const {title,description}=req.body;
        if(!title||!description) return res.status(400).json({error:"Input all fields"});
    const newBlog={
        title,description,createdBy:tempUser
    }
    if(req.file) newBlog.coverImage=`blogImages/${req.file.filename}`;
        await Blog.create(newBlog);
        return res.status(201).json({status:"success created"});
      }catch (err){
        console.log("Error creating user:",err);
        return res.status(500).json({error:"Server Error Occured"})
      }
}
async function blogUpdation(req,res){
    try{
        const id=req.params.id;
        if(!id||!mongoose.isValidObjectId(id)) return res.status(401).json({error:"No id given or invalid id"});
        const {title,description}=req.body;
        if(!title||!description) return res.status(400).json({error:"Input all fields"});
        const blogData=await Blog.findById(id);
        if(!blogData) return res.status(400).json({error:"No blog data found"});
        const oldImage=blogData.coverImage;
    const newBlog={
        title,description
    }
    if(req.file) {
        deleteOldImage(oldImage);
        newBlog.coverImage=`blogImages/${req.file.filename}`}
        await Blog.updateOne({_id:id},newBlog);
        return res.status(201).json({status:"successfully updated"});
      }catch (err){
        console.log("Error updating blog:",err);
        return res.status(500).json({error:"Server Error Occured"})
      }
}
async function blogDeletion(req,res){
    try{
        const blogId=req.params.id;
        if(!blogId||!mongoose.isValidObjectId(blogId)) return res.status(400).json({error:"No id given or invalid id"});
        const blog=await Blog.findByIdAndDelete(blogId);
        if(blog){
            deleteOldImage(blog.coverImage);
        }else{
            return res.status(404).json({error:"No blogs found"});
        }
          return res.status(200).json({status:"Successfully deleted"});
      }catch(err){
        console.log("Error fetching blog:",err);
        return res.status(500).json({error:"Server error occured while fetching blog"});
      }
}
module.exports={getAllBlog,getBlog,blogCreation,blogUpdation,blogDeletion};