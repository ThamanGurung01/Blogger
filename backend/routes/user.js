const express=require("express");
const router=express.Router();

//import controllers
const {handleGetAllUsers,handleGetUser,handleCreateUser,handleUpdateUser,handleDeleteUser} =require("../controllers/user")

//route
router.route("/").get(handleGetAllUsers).post(handleCreateUser);
router.route("/:id").get(handleGetUser).patch(handleUpdateUser).delete(handleDeleteUser);
router.get("/login",(req,res)=>{})
module.exports=router;