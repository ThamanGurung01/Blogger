const mongoose=require("mongoose");
const clickSchema=new mongoose.Schema({
      blog:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"blog",
   },
   clickedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
},
},{timestamps:true});

const Comment=mongoose.model("comment",clickSchema);
module.exports=Comment;