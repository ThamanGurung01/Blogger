import axios from "axios";

export const logout=async ()=>{
    const backendUrl=import.meta.env.VITE_BackendUrl;
await axios.get(backendUrl+"logout",{withCredentials:true});
}