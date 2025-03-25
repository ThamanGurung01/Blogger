import axios from "axios";
export const blogClick=async(blogId)=>{
try{
    if(!blogId) return "No BlogID";
    const backendUrl=import.meta.env.VITE_BackendUrl;
    const compUrl=`${backendUrl}user/blogClick/${blogId}`;
    const response=await axios.get(compUrl,{withCredentials:true});
    return response;
}catch(Err){
return Err;
}
}