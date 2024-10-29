import axios from "axios";
export const getUserData=async(id)=>{
try{
    const backendUrl=import.meta.env.VITE_BackendUrl;
    const compUrl=backendUrl+"user/"+id;
    const response=await axios.get(compUrl,{withCredentials:true});
    return response;
}catch(Err){
return Err;
}
}