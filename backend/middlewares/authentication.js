const { jwtVerify } = require("../services/jwt");

const authentication=(req,res,next)=>{
try{
    const token=req.cookies["token"];
    if(!token) next();
    const userData=jwtVerify(token);
    req.user=userData;
    next();
}catch(err){
    if(err.name="JsonWebTokenError") return res.status(401).json({error:"Invalid token"});
    console.log("Server Error Occured in authentication",err);
next(err);
}
}
module.exports=authentication;