const bcrypt= require("bcrypt");

const checkPassword=async(hashedPassword,password)=>{
return await bcrypt.compare(password,hashedPassword);
}
module.exports=checkPassword;