import "../styles/ViewPost.css"
import React from 'react'
import {getReq} from '../services/Api/getReq';
import  DOMPurify from "dompurify";
import "../styles/Quill.css";
import {Link,useParams} from "react-router-dom";
const ViewPost = () => {
  const backendUrl=import.meta.env.VITE_BackendUrl;
  const {id}=useParams();
// const id="67035a40578fc188b921db1f";
const userId="6702036c2b7457cc26a335f3";
  if(!id) console.log("error no id view Post");
  const [blog,setBlog]=React.useState([{}]);
    const fetchBlogData=async()=>{
      const data=await getReq("blog",id);
      setBlog(data.data);
    }
    React.useEffect(()=>{
      fetchBlogData();
    },[]);
  return (
    <div className="container-post">
        <h1 className="heading2">Posts</h1>
        <div>
            {blog?.coverImage&&<img src={backendUrl+blog?.coverImage} width={"200px"} alt="Blog CoverImage" />}
            <h1>{blog?.title}</h1>
            <div>
            <div className='quillContainer' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.description) }} />
            </div>
            {blog.createdBy===userId?<Link to="/updateBlog">Update</Link>:""}
        </div>
    </div>
  )
}

export default ViewPost