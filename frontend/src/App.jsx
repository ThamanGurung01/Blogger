import './styles/App.css'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
// import Posts from './pages/Posts'
function App() {

  return (
    <div className=''>
     <Navbar/>
     {/* <Posts/> */}
     <Signup/>
    </div>
  )
}

export default App
