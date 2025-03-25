import axios from "axios";
export const blogComment=async(blogId,data=null)=>{
try{
    const backendUrl=import.meta.env.VITE_BackendUrl;
const compUrl=backendUrl+"user/blogComment/"+blogId;
if(!data){
 const comments=await axios.get(compUrl,{withCredentials:true});
 return comments;
}else{
    const response=await axios.post(compUrl,{description:data},{withCredentials:true});
    return response;
}
}catch(Err){
    console.error(Err);
return Err;
}
}