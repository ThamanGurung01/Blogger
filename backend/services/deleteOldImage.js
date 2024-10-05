    const fs=require("fs");
    function deleteOldImage(oldImageUrl){
if(oldImageUrl&&!oldImageUrl.startsWith("defaultImage/")){
    fs.unlink("public/"+oldImageUrl,(err)=>{
        if(err){
            console.log("Error deleting old Image "+oldImageUrl+" :",err);
        }
    })
}
}
module.exports=deleteOldImage;