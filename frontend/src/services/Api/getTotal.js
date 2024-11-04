import axios from "axios";
export const getTotal=async(what,id=null)=>{
try{
    const backendUrl=import.meta.env.VITE_BackendUrl;
    if(!what) return;
    const compUrl=id?backendUrl+what+"/"+id:backendUrl+what;
    const response=await axios.get(compUrl,{withCredentials:true});
    return response;
}catch(Err){
return Err;
}
}