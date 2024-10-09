import axios from "axios";
export const backendUrl=import.meta.env.VITE_BackendUrl;

export const authCheck=async()=>{
    try{
         const data=await axios.get(backendUrl+"authentication",{
            withCredentials:true,
         });
        console.log(data);
        return data;
    }catch(err){
        if(err.response.data.error){
    console.log(err.response.data.error);
    return {};
    }
    }
}