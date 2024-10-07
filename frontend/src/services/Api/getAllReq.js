import axios from "axios";

export const getAllReq=async(what)=>{
    try{
        const backendUrl=import.meta.env.VITE_BackendUrl;
        if(!what) return {error:"No required parameter passed"};
        const compUrl=backendUrl+what;
        const allData=await axios.get(compUrl);
        if(!allData.data.length) return {error:"No Data"};
        return allData.data;
    }catch(err){
console.log("Error in getAllReq:",err);
    }
}