const mongoose=require("mongoose");
const commentSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
   blog:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"blog",
   },
   commentedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
   }
},{timestamps:true});

const Comment=mongoose.model("comment",commentSchema);
module.exports=Comment;