const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    profileImageURL:{
        type:String,
        default:"/images/avatar.png",
    },
    role:{
        type:String,
        default:"USER",
    },
},{timestamps:true});

userSchema.pre("save",async function(next){
    // console.log("Pre-save hook triggered");
    // console.log("User data before hashing:", this);
if(!this.isModified("password")) return next();
try{
const saltRounds=10;
const salt=await bcrypt.genSalt(saltRounds);
this.password=await bcrypt.hash(this.password,salt);
return next();
}catch(err){
    next(err);
}
});

const User=mongoose.model("user",userSchema);
module.exports=User;