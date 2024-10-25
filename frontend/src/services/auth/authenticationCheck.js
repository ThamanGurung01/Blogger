import axios from "axios";
export const backendUrl=import.meta.env.VITE_BackendUrl;

export const authCheck=async()=>{
    try{
      const compUrl=backendUrl+"authentication";
         const data=await axios.get(compUrl,{
            withCredentials:true,
         });
        return data;
    }catch(error){
        if (error.name === "AxiosError") {
            console.log("AxiosError:", error.message);
          } else {
            console.log("Some other error:", error);
          }

    return null;

    }
}