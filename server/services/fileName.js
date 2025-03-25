const path=require("path");

function fileName(file){
const fileName=path.basename(file,path.extname(file));
return fileName;
}
module.exports=fileName;