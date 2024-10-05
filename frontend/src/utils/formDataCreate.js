export const formDataCreate=(datas,Picture=null)=>{
    const formData=new FormData();
    Object.entries(datas).forEach(([key,value])=>{
            formData.append(key,value);
});
Picture?formData.append(("Picture"),Picture):"";
 return formData;
}
