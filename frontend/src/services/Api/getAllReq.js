import axios from "axios";

export const getAllReq=async(what,id=null)=>{
    try{
            const backendUrl=import.meta.env.VITE_BackendUrl;
        let compUrl=backendUrl+what;
        let allData={};
        if (id&&what==="blog") {
            compUrl+="/user/"+id;
        allData=await axios.get(compUrl);
        } else {
        if(!what) return {error:"No required parameter passed"};
        allData=await axios.get(compUrl);
        if(!allData.data.length) return {error:"No Data"};
        }
        return allData.data;
    }catch(err){
console.log("Error in getAllReq:",err);
    }
}