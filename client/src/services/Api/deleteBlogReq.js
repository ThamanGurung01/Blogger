import axios from "axios";
export const backendUrl=import.meta.env.VITE_BackendUrl;

export const deleteBlogReq=async(what,id)=>{
    try{
        console.log(what+" "+ id)
         const data=await axios.delete(backendUrl+what+"/"+id,{
            withCredentials:true,
         });
         console.log(data);
        return data;
    }catch(err){
    console.log("error in sending delete req",err);
    }
}