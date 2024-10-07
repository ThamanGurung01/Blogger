import './styles/App.css'
import Navbar from './components/Navbar'
// import AddBlog from './pages/AddBlog'
// import UpdateBlog from './pages/UpdateBlog'
// import Signup from './pages/Signup'
import Posts from './pages/Posts'
// import Login from "./pages/Login"
function App() {

  return (
    <div className=''>
     <Navbar/>
     <Posts/>
     {/* <Signup/> */}
     {/* <Login/> */}
     {/* <AddBlog/> */}
     {/* <UpdateBlog/> */}
    </div>
  )
}

export default App
