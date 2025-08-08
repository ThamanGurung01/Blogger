// import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import { useContext } from 'react';
import { authContext } from '../context/authContext';
import "../styles/Form.css"

const Login = () => {
  const {isHamBurger}=useContext(authContext);
  return (
    <div  className={`form-page initialPage ${isHamBurger?"hidden sm:block":""}`}>
    <Form formType={"login"}/>
    <div className='signup-link'><p>{"Don't have an account ? "}<Link className='form-signupLogin-links' to="/signup">SignUp</Link></p></div>
    </div>
  )
}

export default Login