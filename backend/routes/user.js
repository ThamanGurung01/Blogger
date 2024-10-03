const express=require("express");
const router=express.Router();

//import controllers
const {handleGetAllUsers,handleGetUser,handleCreateUser,handleUpdateUser,handleDeleteUser,handleLogin} =require("../controllers/user")

//route
router.route("/").get(handleGetAllUsers).post(handleCreateUser);
router.route("/:id").get(handleGetUser).patch(handleUpdateUser).delete(handleDeleteUser);
router.post("/login",handleLogin)
module.exports=router;