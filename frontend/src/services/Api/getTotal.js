import axios from "axios";
export const getTotal=async(what)=>{
try{
    const backendUrl=import.meta.env.VITE_BackendUrl;
    const compUrl=backendUrl+what;
    const response=await axios.get(compUrl,{withCredentials:true});
    return response;
}catch(Err){
return Err;
}
}