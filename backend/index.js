//imports
require("dotenv").config();
const express=require("express");
const app=express();
const cors=require("cors");
const path=require("path");
const cookie=require("cookie-parser");
//import custom module
const userRoute=require("./routes/user");
const blogRoute=require("./routes/blog");
const connection=require("./config/db");
const { handleLogin } = require("./controllers/user");
const authentication =require("./middlewares/authentication");
const {getTotalBlog,getTotalBlogClick,getTotalBlogComment}=require("./controllers/user")
//env
const PORT=process.env.PORT||8001;
const mongoDbURL=process.env.MongoDb_URL||"mongodb://127.0.0.1:27017/blogger";

//db connection
(async()=>{
    try{
        await connection(mongoDbURL).then(()=>{
            console.log("MONGODB CONNECTED SUCCESSFULLY");
        });
        }catch(err){
            console.error("MongoDB connection error:", err.message);
            process.exit(1);
        }
})();
const FrontendUrl=process.env.FrontendUrl;
const corsOptions = {
    origin: FrontendUrl,
    credentials: true,
  };

//middlewares
app.use(cookie());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.resolve("./public")));
//routes
app.get("/",(req,res)=>{
    return res.json({page:"homepage"});
});
app.use("/user",userRoute);
app.use("/blog",blogRoute);
//total blog
app.get("/totalBlog",authentication,getTotalBlog);
app.get("/totalClick",authentication,getTotalBlogClick);
app.get("/totalComments",authentication,getTotalBlogComment);



app.post("/login",handleLogin);
app.get("/authentication",authentication,(req,res)=>{
    const data=req.user;
    if(!data) return res.status(401).json({error:"Login needed"});
return res.json(data);
})
app.get("/logout",(req, res) => {
try{
    res.clearCookie('token', {httpOnly: true,secure: false,sameSite: 'Lax'});
    console.log(res.cookie);
    return res.status(200).json({status:"Successfully loggedOut"});
}catch(err){
    return res.send(err);
}
})


//server
app.listen(PORT,()=>{
    console.log("SERVER STARTED");
})