// import React from 'react'
import "../styles/Navbar.css"
import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div className="navbar">
         <Link to="/"><h1 className='heading1'>Blogger</h1></Link>
    </div>
  )
}

export default Navbar