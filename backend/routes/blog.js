const express=require("express");
const router=express.Router();
const multer=require("multer");
const path=require("path");
//import controllers
const {getAllBlog,getBlog,blogCreation,blogUpdation,blogDeletion} =require("../controllers/blog")

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
router.route("/").get(getAllBlog).post(upload.single("profilePicture"),blogCreation);
router.route("/:id").get(getBlog).patch(blogUpdation).delete(blogDeletion);
module.exports=router;