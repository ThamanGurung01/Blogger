const cloudinary=require("./cloudinary");
const fileName=require("./fileName");
async function insertImage(file,folderName){
    try{
        const result=await new Promise((resolve,reject)=>{
          const stream=cloudinary.uploader.upload_stream({
            folder:folderName,
            public_id:`${Date.now()}-${fileName(file.originalname)}`},
             (error,result)=>{
              if(error) reject(error);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        })
        return result;
       }catch(error){
        console.error("cloudinary upload failed ",error);
       return res.status(500).json({error:"cloudinary upload failed"});
       }
}
module.exports=insertImage;