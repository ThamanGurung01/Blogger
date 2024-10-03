const express=require("express");
const router=express.Router();
const multer=require("multer");
const path=require("path");
//import controllers
const {handleGetAllUsers,handleGetUser,handleCreateUser,handleUpdateUser,handleDeleteUser,handleLogin} =require("../controllers/user")

//multer
const storage=multer.diskStorage({
destination:function (req,file,cb){
    cb(null,path.resolve("./public/images/"));
},
filename:function (req,file,cb){
    const fileName=`${Date.now()}-${file.originalname}`;
    cb(null,fileName);
}
});
const upload=multer({storage});

//route
router.route("/").get(handleGetAllUsers).post(upload.single("profilePicture"),handleCreateUser);
router.route("/:id").get(handleGetUser).patch(handleUpdateUser).delete(handleDeleteUser);
router.post("/login",handleLogin)
module.exports=router;