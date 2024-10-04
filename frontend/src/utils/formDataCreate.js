export const formDataCreate=(datas,profilePicture=null)=>{
    const formData=new FormData();
    Object.entries(datas).forEach(([key,value])=>{
            formData.append(key,value);
});
profilePicture?formData.append(("profilePicture"),profilePicture):"";
 return formData;
}
