require("dotenv").config();
const jwt=require("jsonwebtoken");
    const secretKey=process.env.SecretKey;
const jwtSign=({fullName,email,gender,profileImageURL})=>{
    console.log(secretKey);
    if( !fullName||!email||!gender||!profileImageURL) return {error:"No data"};
    const payload={
        fullName,email,gender,profileImageURL
    }
    const token=jwt.sign(payload,secretKey);
    return token;
}
const jwtVerify=(token)=>{
    const userData= jwt.verify(token,secretKey);
    return userData;
}
module.exports={jwtSign,jwtVerify};