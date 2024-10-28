// import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import { useContext } from 'react';
import { authContext } from '../context/authContext';

const Login = () => {
  const {isHamBurger}=useContext(authContext);
  return (
    <div  className={`${isHamBurger?"hidden sm:block":""}`}>
    <Form formType={"login"}/>
    <p>{"Don't have an account ?"}</p><Link to="/signup">SignUp</Link>
    </div>
  )
}

export default Login