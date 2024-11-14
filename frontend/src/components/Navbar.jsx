// import React from 'react'
import "../styles/Navbar.css"
import { Link ,useNavigate} from "react-router-dom"
import { authContext } from '../context/authContext'
import PropTypes from "prop-types"
import { deleteCookie, getCookie, setCookie } from "../utils/cookie"
import {logout} from "../services/Api/logout"
import { useContext, useEffect } from "react"
import { useWindowSize } from "../hooks/useWindowSize"
const Navbar = () => {
  const {loggedIn,isLoggedIn,setUser,loading,isHamBurger,setIsHamBurger}=useContext(authContext);
  const navigate=useNavigate();
  const {width}=useWindowSize();
  const toggleHamburger=()=>{
    if(width<1024){
    setIsHamBurger(c=>!c);
  }
  }
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
    <div className={`navbar ${isHamBurger?"min-h-screen lg:min-h-fit":""}`}>
         <div className="top-navbar">
         <Link to="/" onClick={()=>{isHamBurger?setIsHamBurger(false):""}}><h1 className='heading1'>Blogger</h1></Link>
         <span className="hamburger-exit" onClick={toggleHamburger}>{isHamBurger?"X":"M"}</span>
         </div>
         <ul className={`list-container lg:inline-flex lg:min-h-12 ${isHamBurger?"":"hidden"} ${loggedIn?"":"min-h-36"}`}>
          <li><Link to="/" onClick={toggleHamburger}>Blogs</Link></li>
          {loggedIn&&<><li><Link to="/myPosts" onClick={toggleHamburger}>My Posts</Link></li><li><Link to="/profile" onClick={toggleHamburger}>Profile</Link></li></>}
          {!loggedIn&&<>
          <li><Link to="/login" onClick={toggleHamburger}>Login / Register</Link></li></>}
          {loggedIn&&<li><button onClick={handleLogOut}>SignOut</button></li>}
          </ul>
    </div>
  )
}
Navbar.propTypes={
loggedIn:PropTypes.bool,
}

export default Navbar