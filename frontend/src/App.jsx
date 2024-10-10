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
import AboutUs from './pages/AboutUs'
import { Navigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { getCookie } from './utils/cookie'
function App() {
const [loggedIn,setLoggedIn]=useState(true);
useEffect(()=>{
  const isCookieLoggedIn=getCookie("isLoggedIn");
if(isCookieLoggedIn==="true"){
  setLoggedIn(true);
console.log(loggedIn);
}else{
  setLoggedIn(false);
}
},[])
  return (
    <div className=''>
     <Navbar loggedIn={loggedIn}/>
      <Routes>
      <Route path='*' element={<Post postType="blogs"/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/addBlog' element={loggedIn?<AddBlog/>:<Navigate to="/login"/>}/>
      <Route path='/viewBlog/:id' element={<ViewPost/>}/>
      <Route path='/updateBlog/:id' element={loggedIn?<UpdateBlog/>:<Navigate to="/login"/>}/>
      <Route path='/myPosts' element={loggedIn?<Post postType="userBlog"/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={loggedIn?<Profile/>:<Navigate to="/login"/>}/>
      <Route path='/aboutUs' element={<AboutUs/>}/>
      </Routes>
    </div>
  )
}

export default App
