const bcrypt= require("bcrypt");

const checkPassword=async(hashedPassword,password)=>{
    console.log(password,hashedPassword);
return await bcrypt.compare(password,hashedPassword);
}
module.exports=checkPassword;