// import React from 'react'
import "../styles/Navbar.css"
import { Link ,useNavigate} from "react-router-dom"
import { authContext } from '../context/authContext'
import PropTypes from "prop-types"
import { deleteCookie, getCookie, setCookie } from "../utils/cookie"
import {logout} from "../services/Api/logout"
import { useContext, useEffect } from "react"
const Navbar = () => {

  const {loggedIn,isLoggedIn,setUser,loading}=useContext(authContext);
  const navigate=useNavigate();
  const handleLogOut=async()=>{
    try{  
    deleteCookie("isLoggedIn");
    await logout().then(()=>{
      isLoggedIn(false);
      setCookie("false");
      setUser(null);
      navigate("/");
    })
  }catch(err){
    console.log("Logout:",err);
  }}
  useEffect(()=>{
    const cookie=getCookie("isLoggedIn");
    if(cookie==="true") {isLoggedIn(true)}else{isLoggedIn(false)};
  },[loggedIn,isLoggedIn,loading])

  return (
    <div className="navbar">
         <Link to="/"><h1 className='heading1'>Blogger</h1></Link>
         <ul>
          <li><Link to="/">Blogs</Link></li>
          {loggedIn&&<><li><Link to="/myPosts">My Posts</Link></li><li><Link to="/profile">Profile</Link></li></>}
          {!loggedIn&&<>
          <li><Link to="/login">Login / Register</Link></li></>}
          {loggedIn&&<li><button onClick={handleLogOut}>SignOut</button></li>}
          </ul>
    </div>
  )
}
Navbar.propTypes={
loggedIn:PropTypes.bool,
}

export default Navbar