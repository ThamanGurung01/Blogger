import React from 'react'
import PropTypes from 'prop-types';
import { getAllReq } from '../services/Api/getAllReq';
// import  DOMPurify from "dompurify";
import "../styles/Quill.css";
import {Link,useParams} from "react-router-dom";
const Post = ({postType}) => {
  const backendUrl=import.meta.env.VITE_BackendUrl;
const [blogs,setBlogs]=React.useState([{}]);
  const fetchBlogData=async()=>{
    const data=await getAllReq("blog");
    console.log(data[0]._id);
    setBlogs(data);
  }
  React.useEffect(()=>{
    fetchBlogData();
  },[])
  return (
    <div>
        {blogs.map((blog,index)=>(
         <Link key={index} to={"/posts/"+blog._id}>
          <div>
            {blog.coverImage&&<img src={backendUrl+blog.coverImage} width={"200px"} alt="Blog CoverImage" />}
            <h1>{blog?.title}</h1>
            {/* <div>
            <div className='quillContainer' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.description) }} />
            </div> */}
          </div>
          </Link>
          )
         )}
    </div>
  )
}
Post.propTypes={
  postType:PropTypes.string,
}
export default Post;