import React, { useContext, useState } from 'react'
import {getReq} from '../services/Api/getReq';
import  DOMPurify from "dompurify";
import "../styles/Quill.css";
import "../styles/ViewPost.css";
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
        if(blog?.createdBy?._id===userId){
        setIsUsersBlog(true);
      }
    },[blog,userId]);
  return (
    <div className="container-post">
        <h1 className="heading2">Posts</h1>
        <div>
            <div className='post'>
            <Link to={blog?.createdBy?._id===userId?"/profile":"/profile/"+blog?.createdBy?._id} className='creator'>{blog?.createdBy?.profileImageURL&&<img src={backendUrl+blog?.createdBy?.profileImageURL} className="inline profileImage" alt="profile picture"/>} <p className="inline posterName" >{blog?.createdBy?.fullName}</p></Link>
            <h1 className='blogTitle'>{blog?.title}</h1>
            {blog?.coverImage&&<img src={backendUrl+blog?.coverImage} className='coverImage' alt="Blog coverImage" />}
            <div className='quillContainer blogDescription' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.description) }} />
            <div className='center postUpdate'>            
  {loggedIn&&isUsersBlog&&<Link to={"/updateBlog/"+blog._id} className='btn'>Update</Link>}
  </div>
            </div>
            <div className="comment">
              {loggedIn&&
              <div className="form">
              <form className='comment-form' onSubmit={(e)=>submitComment(e)}>
                <div className='center'><label htmlFor="description" className='comment-title'>Comment</label></div>
              <div className='input-btn'>
              <input type="text" className="comment-input" name="description" id="description" onChange={handleDescription} value={description}/>
              <button className="btn comment-btn" type="submit" disabled={submitted}>comment</button>
              </div>
                </form>
              </div>
              }
              <div className="comment-show post">
                <h1 className='comment-title'>----Comments----</h1>
              {comments.length > 0 ? (
              comments.map((comment, index) => (
<div key={index} className='comments'>
<Link to={comment?.commentedBy?._id===userId?"/profile":"/profile/"+comment?.commentedBy?._id} className='creator'><img src={backendUrl+comment?.commentedBy?.profileImageURL} className="inline profileImage" alt="profile picture"/> <p className="inline posterName" >{comment?.commentedBy?.fullName}</p></Link>
<p className='comment-description'>{comment.description}</p>
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