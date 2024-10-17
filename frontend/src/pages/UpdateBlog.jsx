import {useParams} from "react-router-dom";
import BlogForm from "../components/BlogForm"

const UpdateBlog = () => {
  const {id}=useParams();
  return (
    <div>
        <BlogForm formType="update" blogId={id}/>
        <div>hello</div>
    </div>
  )
}

export default UpdateBlog