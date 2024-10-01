//imports
require("dotenv").config();
const express=require("express");
const app=express();
const cors=require("cors");

//env
const PORT=process.env.PORT;

//middlewares
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
app.get("/",(req,res)=>{
    return res.json({page:"homepage"});
})



//server
app.listen(PORT,()=>{
    console.log("SERVER STARTED");
})