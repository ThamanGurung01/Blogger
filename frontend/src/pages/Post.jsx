import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types';
import { getAllReq } from '../services/Api/getAllReq';
// import  DOMPurify from "dompurify";
import "../styles/Quill.css";
import "../styles/Post.css";
import {Link} from "react-router-dom";
import { authContext } from '../context/authContext';
import { authCheck } from "../services/auth/authenticationCheck";

const Post = ({postType}) => {
  const backendUrl=import.meta.env.VITE_BackendUrl;
const [blogs,setBlogs]=React.useState([]);
const [user,setUser]=React.useState(null);
const {loggedIn,loading,isHamBurger}=useContext(authContext);
const [userId,setUserId]=useState(null);
const [displayLoading,setDisplayLoading]=useState(true);
  const fetchBlogData=async()=>{
    setDisplayLoading(true);
    setTimeout(()=>{ setDisplayLoading(false);},500);
    setBlogs(null);
    if(userId&&postType==="userBlog"){
      await getAllReq("blog",userId).then((data)=>{
      setBlogs(data);
      });
  }else if(postType==="blogs") {
    await getAllReq("blog").then((data)=>{
      setBlogs(data);
    });
  }
}

const getUserData=async()=>{
    const user=await authCheck();
    if(user&&user.length!=0){
      setUser(user.data);
      setUserId(user.data._id);
    }
  }
    React.useEffect(() => {
    if (loggedIn && !user) {
      getUserData();
    }
  }, [loggedIn, user,loading]);

  React.useEffect(() => {
    fetchBlogData(); 
  }, [postType, userId,loading]);
  return (
    <div className={`container-post ${isHamBurger?"hidden lg:flex":""}`}>
      <h1 className="heading2">{postType==="userBlog"?"My Posts":"Posts"}</h1>
      <div className='upload'>{loggedIn&&<Link className='upload-link btn' to="/addBlog">Upload</Link>}</div>
        {blogs && blogs.length > 0 ?displayLoading?<p className="loading">Loading...</p>:blogs?.map((blog,index)=>(
          <div key={index} className='post'>
            {postType!=="userBlog"&&blog?.createdBy?.profileImageURL&&<Link to={blog?.createdBy?._id===userId?"/profile":"/profile/"+blog?.createdBy?._id} className='creator'><img src={backendUrl+blog?.createdBy?.profileImageURL} className="inline profileImage" width={"30px"} alt="profile picture"/> <p className="inline posterName" >{blog?.createdBy?.fullName}</p></Link>}
         <Link to={"/viewBlog/"+blog._id}>
          <h1 className='blogTitle'>{blog?.title}</h1>
            {blog.coverImage&&<img src={blog.coverImage} className='inline coverImage  rounded-b-md' alt="Blog CoverImage" />}
            </Link>
          </div>
          )
         ): displayLoading?<p className="loading">Loading...</p>:<p className="NoBlogs">No blogs!</p> }
    </div>
  )
}
Post.propTypes={
  postType:PropTypes.string,
}
export default Post;