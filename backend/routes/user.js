const express=require("express");
const router=express.Router();
const multer=require("multer");
const path=require("path");
//import controllers
const {handleGetAllUsers,handleGetUser,handleCreateUser,handleUpdateUser,handleDeleteUser} =require("../controllers/user")

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
router.route("/").get(handleGetAllUsers).post(upload.single("Picture"),handleCreateUser);
router.route("/:id").get(handleGetUser).patch(upload.single("Picture"),handleUpdateUser).delete(handleDeleteUser);
module.exports=router;