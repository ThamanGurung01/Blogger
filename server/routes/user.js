const express=require("express");
const router=express.Router();
const multer=require("multer");
const path=require("path");
const authentication=require("../middlewares/authentication");

//import controllers
const {handleGetAllUsers,handleGetUser,handleCreateUser,handleUpdateUser,handleDeleteUser,blogCommentCreation,blogClick,getComments} =require("../controllers/user");

//multer
const storage=multer.memoryStorage();
const upload=multer({storage});

//route
router.route("/").get(authentication,handleGetAllUsers).post(upload.single("Picture"),handleCreateUser);
router.route("/:id").get(handleGetUser).patch(authentication,upload.single("Picture"),handleUpdateUser).delete(authentication,handleDeleteUser);
router.route("/blogClick/:id").get(authentication,blogClick);
router.route("/blogComment/:id").post(authentication,blogCommentCreation).get(getComments);
//stastics router
module.exports=router;