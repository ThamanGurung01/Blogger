import axios from "axios";

const backendUrl=import.meta.env.VITE_BackendUrl;
export const login=async(data)=>{
try{
     const loginRequest=await axios.post(backendUrl+"user/login",data);
return loginRequest;
}catch(err){
console.log("error in login",err);
}
}