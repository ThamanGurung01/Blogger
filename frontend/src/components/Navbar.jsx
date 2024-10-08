// import React from 'react'
import "../styles/Navbar.css"
import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div className="navbar">
         <Link to="/"><h1 className='heading1'>Blogger</h1></Link>
         <ul>
          <li><Link to="/">Blogs</Link></li>
          <li><Link to="/myPosts">My Posts</Link></li>
          <li><Link to="/aboutUs">About Us</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/signup">SignUp</Link></li>
          <li><Link to="/login">Login</Link></li>
          </ul>
    </div>
  )
}

export default Navbar