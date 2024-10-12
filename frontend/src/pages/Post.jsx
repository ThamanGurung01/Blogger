import React from 'react'
import PropTypes from 'prop-types';
import { getAllReq } from '../services/Api/getAllReq';
// import  DOMPurify from "dompurify";
import "../styles/Quill.css";
import {Link} from "react-router-dom";
const Post = ({postType}) => {
  const backendUrl=import.meta.env.VITE_BackendUrl;
const [blogs,setBlogs]=React.useState([{}]);
const id="6702036c2b7457cc26a335f3";
  const fetchBlogData=async()=>{
    let data={};
    if(id&&postType==="userBlog"){
      data=await getAllReq("blog",id);
    setBlogs(data);
  }else {
    data=await getAllReq("blog");
  }
  setBlogs(data);

}
  React.useEffect(()=>{
    fetchBlogData();
  },[id])

  return (
    <div className="container-post">
      <h1 className="heading2">Posts</h1>
      <Link to="/addBlog">Upload</Link>
        {blogs?.map((blog,index)=>(
          <div key={index}>
            {postType!="userBlog"&&<Link to="profile"><img src={backendUrl+blog?.createdBy?.profileImageURL} className="inline" width={"30px"} alt="profile picture"/> <p className="inline" >{blog?.createdBy?.fullName}</p></Link>}
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