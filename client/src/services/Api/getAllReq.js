import axios from "axios";

export const getAllReq=async(what,id=null)=>{
    try{
            const backendUrl=import.meta.env.VITE_BackendUrl;
        let compUrl=backendUrl+what;
        let allData={};
        if (id&&what==="blog") {
            compUrl+="/userBlog/"+id;
        allData=await axios.get(compUrl,{
            withCredentials:true,
        });
        } else {
        allData=await axios.get(compUrl,{
            withCredentials:true,
        });
        }
        return allData.data||[];
    }catch(err){
console.error("Error in getAllReq:", err);
    return null;
    }
}