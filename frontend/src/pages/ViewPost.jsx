import "../styles/ViewPost.css"
import React, { useContext, useState } from 'react'
import {getReq} from '../services/Api/getReq';
import  DOMPurify from "dompurify";
import "../styles/Quill.css";
import {Link,useParams} from "react-router-dom";
import { authContext } from "../context/authContext";
import { authCheck } from "../services/auth/authenticationCheck";
import { blogClick } from "../services/Api/blogClick";
import { blogComment } from "../services/Api/blogComment";

const ViewPost = () => {
  const backendUrl=import.meta.env.VITE_BackendUrl;
  const {id}=useParams();
  if(!id) console.log("error no id view Post");
  const [blog,setBlog]=React.useState({});
  const [userId,setUserId]=React.useState(null);
  const [isUsersBlog,setIsUsersBlog]=useState(false);
  const {loggedIn}=useContext(authContext);
  const [description,setDescription]=useState("");
  const [comments,setComments]=useState([]);
  const [response,setResponse]=useState(null);
  const [submitted,setSubmitted]=useState(false);
  const handleDescription=(e)=>{
    setDescription(e.target.value);
  }
  const submitComment=async(e)=>{
    e.preventDefault();
  console.log("otud");
  setSubmitted(true);
if(description&&id){
  console.log("hello");
  const response=await blogComment(id,description);
  setResponse(response.data);
  setDescription("");
  setSubmitted(false);
  setTimeout(()=>{setResponse(null)},2000);
  const updatedComments = await blogComment(id);
  setComments(updatedComments.data);
}else{
  setResponse({error:"Comment required"});
  setSubmitted(false);
  setTimeout(()=>{setResponse(null)},2000);
}

  }
    const fetchBlogData=async()=>{
      const data=await getReq("blog",id);
  const comment=await blogComment(id);
  setBlog(data.data);
  setComments(comment.data);
    }
    const getUserData=async()=>{
      const user=await authCheck();
      if(user&&user.length!=0){
        setUserId(user.data._id);
      }
    }
    React.useEffect(()=>{
if(id){
  fetchBlogData();
  blogClick(id);

}
    },[id]);
    React.useEffect(()=>{
      if(!userId){
        getUserData();
      }  
        if(blog.createdBy===userId){
        setIsUsersBlog(true);
      }
    },[blog,userId]);
  return (
    <div className="container-post">
        <h1 className="heading2">Posts</h1>
        <div>
            {blog?.coverImage&&<img src={backendUrl+blog?.coverImage} width={"200px"} alt="Blog CoverImage" />}
            <h1>{blog?.title}</h1>
            <div>
            <div className='quillContainer' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.description) }} />
            </div>
            {loggedIn&&isUsersBlog&&<Link to={"/updateBlog/"+blog._id}>Update</Link>} <br />
            <div className="comment">
              {loggedIn&&<div className="form">
                <form onSubmit={(e)=>submitComment(e)}>
                <label htmlFor="description">Comment</label><br />
              <input type="text" className="border-2" name="description" id="description" onChange={handleDescription} value={description}/><br />
              <button className="border-2" type="submit" disabled={submitted}>comment</button>
                </form>
              </div>}
              <div className="comment-show">
                <h1>----Comments----</h1>
              {comments.length > 0 ? (
              comments.map((comment, index) => (
<div key={index}>
<p>{comment.description}</p>
<img src={backendUrl+comment?.commentedBy?.profileImageURL} className="inline" width={"30px"} alt="profile picture"/> <p className="inline" >{comment?.commentedBy?.fullName}</p>
</div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
              </div>
            </div>
            {response && <p>{response.status ? response.status : response.error}</p>}
        </div>
    </div>
  )
}

export default ViewPost