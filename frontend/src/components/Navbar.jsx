// import React from 'react'
import "../styles/Navbar.css"
import { Link ,useNavigate} from "react-router-dom"
// import { useContext } from 'react'
// import { authContext } from '../context/authContext'
import PropTypes from "prop-types"
import { deleteCookie } from "../utils/cookie"
import {logout} from "../services/Api/logout"
const Navbar = ({loggedIn}) => {
  // const {loggedIn}=useContext(authContext);
  const navigate=useNavigate();
  const handleLogOut=async()=>{
    deleteCookie("isLoggedIn");
    await logout().then(()=>{
      navigate("/");
    }).catch((err)=>{
      console.log("Logout:",err);
    })
  }
  return (
    <div className="navbar">
         <Link to="/"><h1 className='heading1'>Blogger</h1></Link>
         <ul>
          <li><Link to="/">Blogs</Link></li>
          {loggedIn&&<><li><Link to="/myPosts">My Posts</Link></li><li><Link to="/profile">Profile</Link></li></>}
          
          <li><Link to="/aboutUs">About Us</Link></li>
          {!loggedIn&&<><li><Link to="/signup">SignUp</Link></li>
          <li><Link to="/login">Login</Link></li></>}
          {loggedIn&&<li><button onClick={handleLogOut}>SignOut</button></li>}
          </ul>
    </div>
  )
}
Navbar.propTypes={
loggedIn:PropTypes.bool,
}

export default Navbar