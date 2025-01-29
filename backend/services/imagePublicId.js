const fileName=require("./fileName");
function imagePublicId(url,folderName){
try{
    const folderIndex = url.indexOf(folderName);
    if (folderIndex === -1) {
      return;
    }
    let filename = url.slice(folderIndex + folderName.length + 1);
    const publicImageId=fileName(filename);
    return publicImageId;
}catch(error){
    console.error("error in getting image public id ",error);
    return res.status(500).json({error:"error in getting public image id"});
}
}
module.exports=imagePublicId;