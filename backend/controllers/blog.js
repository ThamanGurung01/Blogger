const Blog=require("../models/blog")
const tempUser="66fec7daf0a025a6006ef903";

async function getAllBlog(req,res){

    return res.json({status:"all blogs"});
}
async function getBlog(req,res){

    return res.json({status:"blog"});
}
async function blogCreation(req,res){
    try{
        const {title,description}=req.body;
        if(!title||!description) return res.status(400).json({error:"Input all fields"});
    const newBlog={
        title,description,createdBy:tempUser
    }
    if(req.file) newBlog.coverImage=`/blogImages/${req.file.filename}`;
        await Blog.create(newBlog);
        return res.status(201).json({status:"success created"});
      }catch (err){
        console.log("Error creating user:",err);
        return res.status(500).json({error:"Server Error Occured"})
      }
}
async function blogUpdation(req,res){

    return res.json({status:"blog updated"});
}
async function blogDeletion(req,res){

    return res.json({status:"blog deletion"});
}
module.exports={getAllBlog,getBlog,blogCreation,blogUpdation,blogDeletion};