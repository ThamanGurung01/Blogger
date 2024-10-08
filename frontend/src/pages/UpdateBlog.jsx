import {useParams} from "react-router-dom";
import BlogForm from "../components/BlogForm"

const UpdateBlog = () => {
  const {id}=useParams();
    // const id="670223bee77d1cb1ccd90bc1";
  return (
    <div>
        <BlogForm formType="update" blogId={id}/>
    </div>
  )
}

export default UpdateBlog