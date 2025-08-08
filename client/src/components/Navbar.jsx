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
  }else{
    setIsHamBurger(false);
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
    <div className={`navbar`}>
        <div className="flex flex-col gap-5">
          <Link className="lg:flex items-center gap-3 px-4 py-2 shadow-xl rounded-xl drop-shadow-xl bg-gradient-to-l from-cyan-300 via-blue-300 to-purple-300 hidden" to="/" onClick={()=>{isHamBurger?setIsHamBurger(false):""}}>
        <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-lg shadow-lg">B</div>
        <span className="text-xl font-semibold">Blogger</span></Link>
         <div className="top-navbar">
         <Link to="/" onClick={()=>{isHamBurger?setIsHamBurger(false):""}}><h1 className='heading1'>Blogger</h1></Link>
         <span className="hamburger-exit" onClick={toggleHamburger}>{isHamBurger?"X":"M"}</span>
         </div>
         <ul className={`list-container min-h-10 flex flex-col lg:inline-flex lg:min-h-12 ${isHamBurger ? "" : "hidden"}`}>
          <li>
            <Link
              to="/"
              className={`px-4 py-2 transition-colors duration-200 rounded-lg lg:px-[5.5rem] lg:py-3
              ${location.pathname === "/" ? "lg:bg-blue-500 lg:text-white" : "lg:hover:bg-gray-200"}`}
              onClick={toggleHamburger}>
              Blogs
            </Link>
          </li>

          {loggedIn && (
            <>
              <li>
                <Link
                  to="/myPosts"
                  className={`px-4 py-2 rounded-lg lg:px-14 lg:py-3 transition-colors duration-200 
                  ${location.pathname === "/myPosts" ? "lg:bg-blue-500 lg:text-white" : "lg:hover:bg-gray-200"}`}
                  onClick={toggleHamburger}>
                  My Posts
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className={`px-4 py-2 rounded-lg lg:px-[5.5rem] lg:py-3 transition-colors duration-200
                  ${location.pathname === "/profile" ? "lg:bg-blue-500 lg:text-white" : "lg:hover:bg-gray-200"}`}
                  onClick={toggleHamburger}
                >
                  Profile
                </Link>
              </li>
            </>
          )}

          {!loggedIn && (
            <li>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg lg:px-8 lg:py-3 transition-colors duration-200 
                ${location.pathname === "/login" ? "lg:bg-blue-500 lg:text-white" : "lg:hover:bg-gray-200"}`}
                onClick={toggleHamburger}>
                Login / Register
              </Link>
            </li>
          )}

          {loggedIn && (
            <li className="lg:hidden">
              <button
                onClick={handleLogOut}
                className="px-4 py-2 rounded-lg lg:px-[5.5rem] lg:py-3 transition-colors duration-200 lg:hover:bg-red-500 lg:hover:text-white">
                Sign Out
              </button>
            </li>
          )}
        </ul>

        </div>
          {loggedIn&&<button className="hidden lg:block bg-red-500 text-white shadow-xl px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-red-700 hover:text-white" onClick={handleLogOut}>SignOut</button>}
    </div>
  )
}
Navbar.propTypes={
loggedIn:PropTypes.bool,
}

export default Navbar