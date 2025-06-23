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
  // const backendUrl=import.meta.env.VITE_BackendUrl;
const [blogs,setBlogs]=React.useState([]);
const [user,setUser]=React.useState(null);
const {loggedIn,loading,isHamBurger}=useContext(authContext);
const [userId,setUserId]=useState(null);
const [displayLoading,setDisplayLoading]=useState(true);
const [fetchedOnce, setFetchedOnce] = useState(false);

const fetchBlogData = async (retryCount = 0) => {
  if (fetchedOnce) return;

  if (retryCount === 0) {
    setDisplayLoading(true);
    setBlogs(null);
  }

  const maxRetries = 6;
  const retryDelay = 5000;

  let urlType;
  if (postType === "userBlog" && userId) {
    urlType = ["blog", userId];
  } else if (postType === "blogs") {
    urlType = ["blog"];
  } else {
    console.warn("Missing or invalid parameters");
    setDisplayLoading(false);
    return;
  }
  try {
    const data = await getAllReq(...urlType);

    if (data === null) {
      if (retryCount < maxRetries) {
        setTimeout(() => fetchBlogData(retryCount + 1), retryDelay);
      } else {
        setBlogs([]);
        setDisplayLoading(false);
      }
      return;
    }
    setBlogs(data);
    setFetchedOnce(true);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    if (retryCount < maxRetries) {
      setTimeout(() => fetchBlogData(retryCount + 1), retryDelay);
    } else {
      setBlogs([]);
      setDisplayLoading(false);
    }
  } finally {
    if (retryCount === 0 || retryCount === maxRetries) {
      setDisplayLoading(false);
    }
  }
};



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
    setFetchedOnce(false);
  }, [postType, userId]);

  React.useEffect(() => {
    if ((postType === "blogs") || (postType === "userBlog" && userId)) {
      fetchBlogData();
    }
  }, [postType, userId]);
  
  return (
    <div className={`container-post ${isHamBurger?"hidden lg:flex":""}`}>
      <h1 className="heading2">{postType==="userBlog"?"My Posts":"Posts"}</h1>
      <div className='upload'>{loggedIn&&<Link className='upload-link btn' to="/addBlog">Upload</Link>}</div>
        {displayLoading|| blogs === null?<p className="loading">Loading...</p>:blogs.length > 0 ?blogs?.map((blog,index)=>(
          <div key={index} className='post'>
            {postType!=="userBlog"&&blog?.createdBy?.profileImageURL&&<Link to={blog?.createdBy?._id===userId?"/profile":"/profile/"+blog?.createdBy?._id} className='creator'><img src={blog?.createdBy?.profileImageURL} className="inline profileImage" width={"30px"} onError={
              (e)=>{
                e.target.onerror=null;
                e.target.src="/avatar.png";
              }
            } alt="profile picture"/> <p className="inline posterName" >{blog?.createdBy?.fullName}</p></Link>}
         <Link to={"/viewBlog/"+blog._id}>
          <h1 className='blogTitle'>{blog?.title}</h1>
            {blog.coverImage&&<img src={blog.coverImage} className='inline coverImage  rounded-b-md' onError={
              (e)=>{
                e.target.onerror=null;
                e.target.src="/uploadBlogPhoto.png";
              }
            } alt="Blog CoverImage" />}
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