import axios from "axios";
import { formDataCreate } from "../../utils/formDataCreate";

const backendUrl=import.meta.env.VITE_BackendUrl;
export const signup=async(data)=>{
try{
    const profilePicture = document.getElementById("profile").files[0];
    const formData=formDataCreate(data,profilePicture);
     const signupRequest=await axios.post(backendUrl+"user",formData,{
    headers:{
        "Content-Type":"multipart/form-data",
    }
 });
return signupRequest;
}catch(err){
console.log("error in creating",err);
}
}