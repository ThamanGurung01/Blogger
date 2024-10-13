import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { getAllReq } from '../services/Api/getAllReq';
// import  DOMPurify from "dompurify";
import "../styles/Quill.css";
import {Link} from "react-router-dom";
import { authContext } from '../context/authContext';
const Post = ({postType}) => {
  const backendUrl=import.meta.env.VITE_BackendUrl;
const [blogs,setBlogs]=React.useState([{}]);
const {loggedIn,user}=useContext(authContext);
const id=user?._id;
  const fetchBlogData=async()=>{
    let data={};
    if(id&&postType==="userBlog"){
      console.log("userblog");
      console.log(user);
      data=await getAllReq("blog",id);
    setBlogs(data);
  }else {
    data=await getAllReq("blog");
      console.log("blog");
      console.log(user);
  }
  setBlogs(data);
}
  React.useEffect(()=>{
    fetchBlogData();
  },[id,user,postType,loggedIn]);

  return (
    <div className="container-post">
      <h1 className="heading2">Posts</h1>
      {loggedIn&&<Link to="/addBlog">Upload</Link>}
        {blogs?.map((blog,index)=>(
          <div key={index}>
            {postType!=="userBlog"&&blog?.createdBy?.profileImageURL&&<Link to="profile"><img src={backendUrl+blog?.createdBy?.profileImageURL} className="inline" width={"30px"} alt="profile picture"/> <p className="inline" >{blog?.createdBy?.fullName}</p></Link>}
         <Link to={"/viewBlog/"+blog._id}>
          <h1>{blog?.title}</h1>
            {blog.coverImage&&<img src={backendUrl+blog.coverImage} width={"200px"} alt="Blog CoverImage" />}
            </Link>
          </div>
          )
         )}
    </div>
  )
}
Post.propTypes={
  postType:PropTypes.string,
}
export default Post;