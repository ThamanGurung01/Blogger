const express=require("express");
const router=express.Router();
const multer=require("multer");
const path=require("path");
const authentication=require("../middlewares/authentication");
//import controllers
const {getAllBlog,getAllUserBlog,getBlog,blogCreation,blogUpdation,blogDeletion} =require("../controllers/blog")

//multer
const storage=multer.diskStorage({
destination:function (req,file,cb){
    cb(null,path.resolve("./public/blogImages/"));
},
filename:function (req,file,cb){
    const fileName=`${Date.now()}-${file.originalname}`;
    cb(null,fileName);
}
});
const upload=multer({storage});

//route
router.route("/").get(getAllBlog).post(authentication,upload.single("Picture"),blogCreation);
router.route("/:id").get(getBlog).patch(authentication,upload.single("Picture"),blogUpdation).delete(authentication,blogDeletion);
router.route("/userBlog/:id").get(authentication,getAllUserBlog);
module.exports=router;