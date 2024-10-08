import {Route,Routes } from 'react-router-dom'

import './styles/App.css'
import Navbar from './components/Navbar'
import ViewPost from './pages/ViewPost'
import AddBlog from './pages/AddBlog'
import UpdateBlog from './pages/UpdateBlog'
import Signup from './pages/Signup'
import Posts from './pages/Posts'
import Login from "./pages/Login"
function App() {

  return (
    <div className=''>
     <Navbar/>
      <Routes>
      <Route path='/' element={<Posts/>}/>
      <Route path='/signup' element={<Login/>}/>
      <Route path='/login' element={<Signup/>}/>
      <Route path='/addBlog' element={<AddBlog/>}/>
      <Route path='/viewBlog/:id' element={<ViewPost/>}/>
      <Route path='/updateBlog/:id' element={<UpdateBlog/>}/>
      </Routes>
    </div>
  )
}

export default App
