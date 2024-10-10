import axios from "axios";
export const backendUrl=import.meta.env.VITE_BackendUrl;

export const authCheck=async()=>{
    try{
         const data=await axios.get(backendUrl+"authentication",{
            withCredentials:true,
         });
        return data;
    }catch(error){
        if (error.name === "AxiosError") {
            console.log("AxiosError:", error.message);
            console.log("Error Code:", error.code);
            console.log("Request Config:", error.config);
          } else {
            console.log("Some other error:", error);
          }

    return null;

    }
}