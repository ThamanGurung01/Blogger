import axios from "axios";
import { formDataCreate } from "../../utils/formDataCreate";

const backendUrl=import.meta.env.VITE_BackendUrl;
export const patchReq=async(data,postFor,picture=null,id)=>{
try{
    const formData=formDataCreate(data,picture);
     const updateRequest=await axios.patch(backendUrl+postFor+"/"+id,formData,{
    headers:{
        "Content-Type":"multipart/form-data",
    },
    withCredentials:true
 });
return updateRequest;
}catch(err){
console.log("error in creating",err);
}
}