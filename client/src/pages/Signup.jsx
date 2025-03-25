// import React from 'react'
import { Link } from "react-router-dom"
import Form from "../components/Form"
import { useContext } from "react";
import { authContext } from "../context/authContext";

const Signup = () => {
  const {isHamBurger}=useContext(authContext);
  return (
    <div  className={`form-page post ${isHamBurger?"hidden sm:block":""}`}>
        <Form formType={"signup"}/>
    <div className="login-link"><p>{"Already have an account ? "} <Link className="form-signupLogin-links" to="/login">Login</Link></p></div>
    </div>
  )
}

export default Signup