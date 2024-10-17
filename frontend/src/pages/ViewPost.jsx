import "../styles/ViewPost.css"
import React, { useContext, useState } from 'react'
import {getReq} from '../services/Api/getReq';
import  DOMPurify from "dompurify";
import "../styles/Quill.css";
import {Link,useParams} from "react-router-dom";
import { authContext } from "../context/authContext";
import { authCheck } from "../services/auth/authenticationCheck";
const ViewPost = () => {
  const backendUrl=import.meta.env.VITE_BackendUrl;
  const {id}=useParams();
  if(!id) console.log("error no id view Post");
  const [blog,setBlog]=React.useState([{}]);
  const [userId,setUserId]=React.useState(null);
  const [isUsersBlog,setIsUsersBlog]=useState(false);
  const {loggedIn}=useContext(authContext);
    const fetchBlogData=async()=>{
      const data=await getReq("blog",id);
      setBlog(data.data);

    }
    const getUserData=async()=>{
      const user=await authCheck();
      if(user&&user.length!=0){
        setUserId(user.data._id);
      }
    }
    React.useEffect(()=>{
      fetchBlogData();

    },[]);
    React.useEffect(()=>{
      if(!userId){
        getUserData();
      }  
        if(blog.createdBy===userId){
        setIsUsersBlog(true);
      }
    },[blog,isUsersBlog,userId]);
  return (
    <div className="container-post">
        <h1 className="heading2">Posts</h1>
        <div>
            {blog?.coverImage&&<img src={backendUrl+blog?.coverImage} width={"200px"} alt="Blog CoverImage" />}
            <h1>{blog?.title}</h1>
            <div>
            <div className='quillContainer' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.description) }} />
            </div>
            {loggedIn&&isUsersBlog&&<Link to={"/updateBlog/"+blog._id}>Update</Link>}
        </div>
    </div>
  )
}

export default ViewPost