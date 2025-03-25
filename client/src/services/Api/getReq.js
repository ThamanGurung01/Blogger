import axios from "axios";
export const backendUrl=import.meta.env.VITE_BackendUrl;

export const getReq=async(what,id)=>{
    try{
         const data=await axios.get(backendUrl+what+"/"+id,{
            withCredentials:true,
         });
        return data;
    }catch(err){
    console.log("error in fetching",err);
    }
}