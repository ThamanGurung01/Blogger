//imports
require("dotenv").config();
const express=require("express");
const app=express();
const cors=require("cors");

//import custom module
const userRoute=require("./routes/user");
const connection=require("./config/db");
//env
const PORT=process.env.PORT;
const mongoDbURL=process.env.MongoDb_URL;

//db connection
try{
connection(mongoDbURL).then(()=>{
    console.log("MONGODB CONNECTED SUCCESSFULLY");
}).catch((err)=>{
    console.log(err);
});
}catch(err){
    console.log(err);
}

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.get("/",(req,res)=>{
    return res.json({page:"homepage"});
});

app.use("/user",userRoute);



//server
app.listen(PORT,()=>{
    console.log("SERVER STARTED");
})