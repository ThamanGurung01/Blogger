const express=require("express");
const router=express.Router();
const multer=require("multer");
const path=require("path");
const authentication=require("../middlewares/authentication");
//import controllers
const {getAllBlog,getAllUserBlog,getBlog,blogCreation,blogUpdation,blogDeletion} =require("../controllers/blog")
const storage=multer.memoryStorage();

const upload=multer({storage});

//route
router.route("/").get(getAllBlog).post(authentication,upload.single("Picture"),blogCreation);
router.route("/:id").get(getBlog).patch(authentication,upload.single("Picture"),blogUpdation).delete(authentication,blogDeletion);
router.route("/userBlog/:id").get(authentication,getAllUserBlog);
module.exports=router;