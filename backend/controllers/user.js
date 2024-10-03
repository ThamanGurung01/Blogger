
const User=require("../models/user");
const checkPassword =require("../services/password");

async function handleGetAllUsers(req,res){
try{
  const allUsers=await User.find({});
  if(!allUsers.length) return res.status(404).json({error:"No users found"});
    return res.json(allUsers);
}catch(err){
  console.log("Error fetching all users:",err);
  return res.status(500).json({error:"Server error occured while fetching all users"});
}
}


async function handleGetUser(req,res){

    return res.json({status:"success user by id"});
}
async function handleCreateUser(req,res){
  try{
    const {fullName,email,password,gender}=req.body;
    console.log(req);
    if(!fullName||!email||!password||!gender) return res.status(400).json({error:"Input all fields"});
    const existingUser=await User.findOne({email});
    if(existingUser) return res.status(409).json({eror:"Email already Exists"})
    await User.create({
        fullName,email,password,gender,
    })
    return res.status(201).json({status:"success created"});
  }catch (err){
    console.log("Error creating user:",err);
    return res.status(500).json({error:"Server Error Occured"})
  }
}
async function handleUpdateUser(req,res){

    return res.json({status:"success update"});
}
async function handleDeleteUser(req,res){

    return res.json({status:"success delete"});
}

async function handleLogin(req,res){
  const {email,password}=req.body;
  if(!email||!password) return res.status(400).json("Email & Password are Required!");
try{
  const user=await User.findOne({email});
  if(!user) return res.status(401).json("Incorrect Email or Password!");
  const isPasswordValid=await checkPassword(user.password,password);
  if(!isPasswordValid) return res.status(401).json("Incorrect Password!");
  return res.status(200).json({status:"Logged In"});
}catch(err){
  console.log(err.message);
  return res.status(500).json({error:"Server Error"});
}
}

module.exports={handleGetAllUsers,handleGetUser,handleCreateUser,handleUpdateUser,handleDeleteUser,handleLogin};