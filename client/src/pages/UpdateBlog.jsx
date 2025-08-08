import {useParams} from "react-router-dom";
import BlogForm from "../components/BlogForm"

const UpdateBlog = () => {
  const {id}=useParams();
  return (
    <div className="initialPage">
        <BlogForm formType="update" blogId={id}/>
    </div>
  )
}

export default UpdateBlog