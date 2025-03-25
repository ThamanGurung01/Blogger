import axios from "axios";

export const getAllReq=async(what,id=null)=>{
    try{
            const backendUrl=import.meta.env.VITE_BackendUrl;
        let compUrl=backendUrl+what;
        let allData={};
        if (id&&what==="blog") {
            compUrl+="/userBlog/"+id;
        allData=await axios.get(compUrl,{
            withCredentials:true,
        });
        } else {
            if(!what) return {error:"No required parameter passed"};
        allData=await axios.get(compUrl,{
            withCredentials:true,
        });
        if(!allData.data.length) return {error:"No Data"};
        }
        return allData.data;
    }catch(err){
console.log("Error in getAllReq:",err);
    }
}