const Blog = require("../models/blog");
const User=require("../models/user");
const deleteOldImage = require("../services/deleteOldImage");
const { jwtSign } = require("../services/jwt");
const checkPassword =require("../services/password");
const mongoose=require("mongoose");
const Comment=require("../models/comment");
const Click=require("../models/click");
async function handleGetAllUsers(req,res){
try{
  const allUsers=await User.find({}).sort({ createdAt: -1 });
  if(!allUsers.length) return res.status(404).json({error:"No users found"});
    return res.status(200).json(allUsers);
}catch(err){
  console.log("Error fetching all users:",err);
  return res.status(500).json({error:"Server error occured while fetching all users"});
}
}


async function handleGetUser(req,res){
  try{
    const userId=req.params.id;
    if(!userId||!mongoose.isValidObjectId(userId)) return res.status(400).json({error:"No id given or invalid id"});
    const user=await User.findById(userId).sort({ createdAt: -1 });
    if(!user) return res.status(404).json({error:"No users found"});
      return res.status(200).json(user);
  }catch(err){
    console.log("Error fetching user:",err);
    return res.status(500).json({error:"Server error occured while fetching user"});
  }
}

async function handleCreateUser(req,res){
  try{
    const {fullName,email,password,gender}=req.body;
    const existingUser=await User.findOne({email});
    if(existingUser) return res.status(409).json({error:"Email already Exists"});
const newUser={
  fullName,email,password,gender,
}
if(req.file) newUser.profileImageURL=`images/${req.file.filename}`;
    const data=await User.create(newUser);
    return res.status(201).json({status:"success created"});
  }catch (err){
    console.log("Error creating user:",err);
    return res.status(500).json({error:"Server Error Occured"})
  }
}

async function handleUpdateUser(req,res){
  try{
    const id=req.params.id;
    if(!id||!mongoose.isValidObjectId(id)) return res.status(401).json({error:"No id given or invalid id"});
    const {fullName,password,gender}=req.body;
    if(!fullName||!password||!gender) return res.status(400).json({error:"Input all fields"});
    const userData=await User.findById(id);
    if(!userData) return res.status(400).json({error:"No user data found"});
    const oldImage=userData.profileImageURL;
    const newUser={
      fullName,password,gender,
    }
if(req.file) {
    deleteOldImage(oldImage);
    newUser.profileImageURL=`images/${req.file.filename}`;}
    await User.updateOne({_id:id},newUser);
    return res.status(201).json({status:"successfully updated user"});
  }catch (err){
    console.log("Error updating user:",err);
    return res.status(500).json({error:"Server Error Occured"})
  }
}

async function handleDeleteUser(req,res){
  try{
    const userId=req.params.id;
    if(!userId||!mongoose.isValidObjectId(userId)) return res.status(400).json({error:"No id given or invalid id"});
    const user=await User.findByIdAndDelete(userId);
    if(!user) return res.status(404).json({error:"No user found"});
    const blogs = await Blog.find({ createdBy: userId });
    await Promise.all(blogs.map(blog => deleteOldImage(blog.coverImage)));
    await Blog.deleteMany({ createdBy: userId });
      return res.status(200).json({status:"Successfully deleted"});
  }catch(err){
    console.log("Error fetching user:",err);
    return res.status(500).json({error:"Server error occured while fetching user"});
  }
}

async function handleLogin(req,res){
  const {email,password}=req.body;
  if(!email||!password) return res.status(400).json("Email & Password are Required!");
try{
  const user=await User.findOne({email});
  if(!user) return res.status(401).json("Incorrect Email or Password!");
  const isPasswordValid=await checkPassword(user.password,password);
  if(!isPasswordValid) return res.status(401).json("Incorrect Password!");
  const token= jwtSign(user);
  res.cookie('token', token, {httpOnly: true,secure: false,sameSite: 'Lax',});
  return res.status(200).json({status:"Successfully LoggedIn"});
}catch(err){
  console.log(err.message);
  return res.status(500).json({error:"Server Error"});
}
}

async function getTotalBlog(req,res){
try{
  const user=req.user;
  const userId=user._id;
  if(!userId){
    return res.status(404).json({error:"No userId or not authenticated"});
  }
  const totalBlog=await Blog.countDocuments({createdBy:userId});
  console.log(totalBlog);
  return res.status(200).json(totalBlog);
}catch(err){
  console.log("total blog error:",err);
}
}
async function getTotalBlogClick(req,res){
  try{
      const {_id}=req.user;
      if(!_id) return res.status(404).json({status:"error in authenticated user data"});
      const existsBlog=await Blog.find({createdBy:_id});
      if(existsBlog.length===0) return res.status(200).json(0);
      let totalClick=0;
      for (const blog of existsBlog) {
        const clickCount = await Click.countDocuments({ blog: blog._id });
        totalClick += clickCount;
      }
      return res.status(201).json(totalClick);
    }catch (err){
      console.log("Error clicking server error:",err);
      return res.status(500).json({error:"Server Error Occured"})
    }
}
async function getTotalBlogComment(req,res){
  try{
    const {_id}=req.user;
    if(!_id) return res.status(404).json({status:"error in authenticated user data"});
    const Blogs=await Blog.find({createdBy:_id});
    let totalComment=0;
    for(const blog of Blogs){
      totalComment+=await Comment.countDocuments({
        blog:blog._id,
      });
    }
      return res.status(200).json(totalComment);
    }catch (err){
      console.log("Error getting total commenting: server error:",err);
      return res.status(500).json({error:"Server Error Occured"})
    }
}
async function blogClick(req,res){
  try{
    const blogId=req.params.id;
    if(!blogId) return res.status(400).json({status:"blog Id required"});
    console.log(req.user)
      const {_id}=req.user;
      if(!_id) return res.status(401).json({status:"error in authenticated user data"});
      const existingUser=await Click.findOne({
        blog:blogId,
        clickedBy:_id,
      });
      if(existingUser) return res.status(409).json({error:"Already clicked"});
      await Click.create({
        blog:blogId,
        clickedBy:_id,
      });
      console.log("success");
      return res.status(201).json({status:"success clicked"});
    }catch (err){
      console.error("Error clicking server error:",err);
      return res.status(500).json({error:"Server Error Occured"})
    }
}
async function blogCommentCreation(req,res){
  try{
    const blogId=req.params.id;
    if(!blogId) return res.status(400).json({error:"blog Id required"});
      const {_id}=req.user;
      if(!_id) return res.status(401).json({error:"error in authenticated user data"});
      const {description}=req.body;
      if(!description) return res.status(400).json({error:"Input all fields for comment"})
      await Comment.create({
        description,
        blog:blogId,
        commentedBy:_id,
      });
      return res.status(201).json({status:"success commented"});
    }catch (err){
      console.log("Error commenting: server error:",err);
      return res.status(500).json({error:"Server Error Occured"})
    }
}
async function getComments(req,res){
  try{
    const blogId=req.params.id;
    if(!blogId) return res.status(400).json({error:"blog Id required"});
      const comments=await Comment.find({
        blog:blogId,
      });
      if(!comments.length) return res.status(200).json({error:"No Comments found"});
      return res.status(200).json(comments);
    }catch (err){
      console.error("Error commenting: server error:",err);
      return res.status(500).json({error:"Server Error Occured"})
    }
}

module.exports={handleGetAllUsers,handleGetUser,handleCreateUser,handleUpdateUser,handleDeleteUser,handleLogin,getTotalBlog,getTotalBlogClick,getTotalBlogComment,blogCommentCreation,blogClick,getComments};