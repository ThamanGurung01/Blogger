import {useState} from 'react'
import PropTypes from "prop-types";
import fallBackImage from "../assets/uploadPhoto.png";
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogForm = ({formType}) => {
  const [imageUrl,setImageUrl]=useState(fallBackImage);
  const [value, setValue] = useState('');

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
  const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm();
  const onSubmit=async(data)=>{
try{
  console.log(data);
  reset();
  if(formType=="add")
  {
  //     signup(data).then(()=>{
  //     reset();
  //     setImageUrl(fallBackImage);
  // });
}else if(formType=="update"){
  // login(data).then(()=>{
  //     reset();});
  }
}catch(Err){
  console.log("error in signing up:",Err);
}
  }
  return (
    <div>
      <h1>Posts</h1>
    <form action="" onSubmit={handleSubmit(onSubmit)} >
  <input type="file" id="cover" style={{display:"none"}} onChange={(e)=>handleFileChange(e)} />
        <img src={imageUrl} width={"200px"} alt="coverView" onClick={handleFileClick}/>
        <input {...register("title",{
            required:"Title is required",
            minLength:{
                value:4,
                message:"Title must be at least 4 characters",
            }
        })} type="text" placeholder="Title" /><br/>
        {errors.title&&<div>{errors.title.message}</div>}
       {/* quill */}
       <ReactQuill theme="snow" value={value} onChange={setValue} />


        <button disabled={isSubmitting} type="submit">{isSubmitting?"Submitting...":formType==="add"?"Upload":"Update"}</button>
    </form>
    {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
</div>
  )
}
BlogForm.propTypes={
  formType:PropTypes.string.isRequired,
}
export default BlogForm