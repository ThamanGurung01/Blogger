import {useEffect, useState} from 'react'
import PropTypes from "prop-types";
import fallBackImage from "../assets/uploadPhoto.png";
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postReq } from '../services/Api/postReq';
import { getReq } from '../services/Api/getReq';
import { patchReq } from '../services/Api/patchReq';
import "../styles/BlogForm.css"

const BlogForm = ({formType,blogId}) => {
  const [blogData,setBlogData]=useState({});
  const [imageUrl,setImageUrl]=useState(fallBackImage||blogData.coverImage);
  const [content, setContent] = useState("");
  const [response,setResponse]=useState();
  const [displayLoading,setDisplayLoading]=useState(true);
  const modules = {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean'],
    ],
  };

// const backendUrl=import.meta.env.VITE_BackendUrl;

  async function fetchBlogData(){
try{
  if(formType==="update"&&blogId){
    setDisplayLoading(true);
    setTimeout(()=>{ setDisplayLoading(false);},500);
    const data=await getReq("blog",blogId);
    setBlogData(data.data);
    setContent(data.data.description);
    reset({ title: data.data.title });
    setImageUrl(data.data.coverImage || fallBackImage);
  }
}catch(Err){
  console.log(Err);
}
  }

useEffect(()=>{
  fetchBlogData();
},[blogId]);

  const handleFileClick=()=>{
      document.getElementById("cover").click();
  }
  const handleFileChange=(e)=>{
      const coverPicture=e.target.files[0];
      if (coverPicture) {
          setImageUrl(URL.createObjectURL(coverPicture));
      }
  }

//form
  const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm({
    defaultValues:{
      title:blogData.title
    }
  });
  const onSubmit=async(data)=>{
try{
  data={...data,description:content}
  const Picture = document.getElementById("cover").files[0];
  if(formType=="add")
  {
    const response=await postReq(data,"blog",Picture);
    setResponse(response.data);
    setContent("");
    reset();
    setImageUrl(fallBackImage);
}else if(formType=="update"){
  if(blogId){
    const response=await patchReq(data,"blog",Picture,blogId);
    setResponse(response.data);
  }
  }
  setTimeout(()=>{
    setResponse("");
  },1000);
}catch(Err){
  console.log("error in signing up:",Err);
}
  }
  return (
  <>
  { formType==="update"&&displayLoading?<p className="blogFormLoading initialPage">Loading...</p>: <div className='form-page initialPage'>
      <h1 className='heading2 blogForm-heading'>Posts</h1>
    <form
    className='flex flex-col items-center'
    action="" onSubmit={handleSubmit(onSubmit)} >
  <input type="file" id="cover" style={{display:"none"}} onChange={(e)=>handleFileChange(e)} />
        <img src={imageUrl} className='blogFormImage' onError={(e)=>{
              e.target.onerror=null;
              e.target.src="/uploadBlogPhoto.png";
            }} alt="coverView" onClick={handleFileClick}/>
        <input className='blog-input' {...register("title",{
            required:"Title is required",
            minLength:{
                value:4,
                message:"Title must be at least 4 characters",
            }
        })} type="text" placeholder="Title" />
        {errors.title&&<div className='error blogError'>{errors.title.message}*</div>}
       {/* quill */}
       <div className='quill-container'><ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} /></div>
       {response&&<span className={` blogResponse ${response?.status?"success":"error"}`}>{response?.status ?? response?.error ?? ""}</span>}
       <div className="btn-container"><button className='btn blogForm-btn' disabled={isSubmitting} type="submit">{isSubmitting?"Submitting...":formType==="add"?"Upload":"Update"}</button></div>
    </form>
</div>}
</>
  )
}
BlogForm.propTypes={
  formType:PropTypes.string.isRequired,
  blogId:PropTypes.string,
}
export default BlogForm