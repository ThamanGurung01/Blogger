   const cloudinary=require("./cloudinary");
   const imagePublicId=require("./imagePublicId");
  async function deleteOldImage(oldImageUrl,folderName){
try{
    const ImageName=imagePublicId(oldImageUrl,folderName);
    const oldImage=folderName+"/"+ImageName;
    await cloudinary.uploader.destroy(oldImage);
}catch(error){
    console.error("Error uploading ",error);
    return res.status(500).json({error:"error deleting from cloudinary"});
}
}
module.exports=deleteOldImage;