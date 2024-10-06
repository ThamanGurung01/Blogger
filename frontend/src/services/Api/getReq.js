import axios from "axios";
const backendUrl=import.meta.env.VITE_BackendUrl;

export const getReq=async(what,id)=>{
    try{
         const data=await axios.get(backendUrl+what+"/"+id);
        return data;
    }catch(err){
    console.log("error in fetching",err);
    }
}