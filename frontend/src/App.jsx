import {Route,Routes } from 'react-router-dom'

import './styles/App.css'
import Navbar from './components/Navbar'
import ViewPost from './pages/ViewPost'
import AddBlog from './pages/AddBlog'
import UpdateBlog from './pages/UpdateBlog'
import Signup from './pages/Signup'
import Post from './pages/Post'
import Login from "./pages/Login"
import Profile from './pages/Profile'
import { Navigate } from "react-router-dom";
import { useEffect, useState,useContext } from 'react'
import { getCookie } from './utils/cookie'
import { authContext } from './context/authContext'
import UpdateProfile from './pages/UpdateProfile'

function App() {
const {loggedIn,isLoggedIn}=useContext(authContext);
const [isCookieLoggedIn,setCookie]=useState("false");
useEffect(()=>{
  setCookie(getCookie("isLoggedIn"));
if(isCookieLoggedIn==="true"){
  isLoggedIn(true);
}else{
  isLoggedIn(false);
}
},[isCookieLoggedIn,loggedIn]);
  return (
    <div className=''>
     <Navbar loggedIn={loggedIn}/>
      <Routes>
      <Route path='*' element={<Post postType="blogs"/>}/>
      <Route path='/login' element={!loggedIn?<Login/>:<Navigate to="/"/>}/>
      <Route path='/signup' element={!loggedIn?<Signup/>:<Navigate to="/"/>}/>
      <Route path='/addBlog' element={loggedIn?<AddBlog/>:<Navigate to="/login"/>}/>
      <Route path='/viewBlog/:id' element={<ViewPost/>}/>
      <Route path='/updateBlog/:id' element={loggedIn?<UpdateBlog/>:<Navigate to="/login"/>}/>
      <Route path='/myPosts' element={loggedIn?<Post postType="userBlog"/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={loggedIn?<Profile/>:<Navigate to="/login"/>}/>
      <Route path='/updateProfile/:id' element={loggedIn?<UpdateProfile/>:<Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App
