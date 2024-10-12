import axios from "axios";
import { formDataCreate } from "../../utils/formDataCreate";

const backendUrl=import.meta.env.VITE_BackendUrl;
export const postReq=async(data,postFor,picture=null)=>{
try{
    const formData=formDataCreate(data,picture);
    console.log(formData);
    if(!postFor) console.log("no post for ",postFor);
    const compUrl=backendUrl+postFor;
    console.log(compUrl);
     const signupRequest=await axios.post(compUrl,formData,{
    headers:{
        "Content-Type":"multipart/form-data",
    },
    withCredentials:true,
 });
return signupRequest;
}catch(err){
console.log("error in creating",err);
}
}