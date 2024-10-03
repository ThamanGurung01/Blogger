//imports
require("dotenv").config();
const express=require("express");
const app=express();
const cors=require("cors");
const path=require("path");
//import custom module
const userRoute=require("./routes/user");
const connection=require("./config/db");
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

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.resolve("./public")));
//routes
app.get("/",(req,res)=>{
    return res.json({page:"homepage"});
});

app.use("/user",userRoute);



//server
app.listen(PORT,()=>{
    console.log("SERVER STARTED");
})