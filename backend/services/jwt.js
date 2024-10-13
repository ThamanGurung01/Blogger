require("dotenv").config();
const jwt=require("jsonwebtoken");
    const secretKey=process.env.JsonSecretKey;
const jwtSign=({_id,fullName,email,gender,profileImageURL})=>{
    if( !fullName||!email||!gender||!profileImageURL) return {error:"No data"};
    const payload={
        _id,fullName,email,gender,profileImageURL
    }
    const token=jwt.sign(payload,secretKey);
    return token;
}
const jwtVerify=(token)=>{
    if(!token) return {error:"eror token needed"};
    const userData= jwt.verify(token,secretKey);
    return userData;
}
module.exports={jwtSign,jwtVerify};