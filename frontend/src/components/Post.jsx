// import React from 'react'
import PropTypes from "prop-types";
const Post = ({post}) => {
  return (
    <div>
        <div>{post.something}</div>
        <h1>Post</h1>
    </div>
  )
}

Post.propTypes={
post:PropTypes.shape({
    something:PropTypes.string,
}),
}
export default Post;