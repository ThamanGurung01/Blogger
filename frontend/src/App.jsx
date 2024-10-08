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
function App() {

  return (
    <div className=''>
     <Navbar/>
      <Routes>
      <Route path='/' element={<Post postType="blogs"/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/addBlog' element={<AddBlog/>}/>
      <Route path='/viewBlog/:id' element={<ViewPost/>}/>
      <Route path='/updateBlog/:id' element={<UpdateBlog/>}/>
      <Route path='/myPosts' element={<Post postType="userBlog"/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/aboutUs' element={<AboutUs/>}/>
      </Routes>
    </div>
  )
}

export default App
