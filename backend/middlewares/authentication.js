const { jwtVerify } = require("../services/jwt");

const authentication=(req,res,next)=>{
try{
    const token=req.cookies["token"];
    console.log("authenticate",token);
    if(!token) next();
    const userData=jwtVerify(token);
    req.user=userData;
    next();
}catch(err){
    console.log("Authentication error:",err);
next(err);
}
}
module.exports=authentication;