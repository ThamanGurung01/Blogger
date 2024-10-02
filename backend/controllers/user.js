const User=require("../models/user");

async function handleGetAllUsers(req,res){
const allUsers=await User.find({});
    return res.json(allUsers);
}
async function handleGetUser(req,res){

    return res.json({status:"success user by id"});
}
async function handleCreateUser(req,res){
  try{
    const {fullName,email,password,gender}=req.body;
    await User.create({
        fullName,email,password,gender,
    })
    return res.status(201).json({status:"success created"});
  }catch (err){
    return res.status(500).json({error:"Server Error"+err})
  }
}
async function handleUpdateUser(req,res){

    return res.json({status:"success update"});
}
async function handleDeleteUser(req,res){

    return res.json({status:"success delete"});
}

module.exports={handleGetAllUsers,handleGetUser,handleCreateUser,handleUpdateUser,handleDeleteUser};