import axios from "axios";
import { formDataCreate } from "../../utils/formDataCreate";

const backendUrl=import.meta.env.VITE_BackendUrl;
export const postReq=async(data,postFor,picture=null)=>{
try{
    const formData=formDataCreate(data,picture);
     const signupRequest=await axios.post(backendUrl+postFor,formData,{
    headers:{
        "Content-Type":"multipart/form-data",
    }
 });
return signupRequest;
}catch(err){
console.log("error in creating",err);
}
}