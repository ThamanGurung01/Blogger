// import React from 'react'
import { Link } from "react-router-dom"
import Form from "../components/Form"
import { useContext } from "react";
import { authContext } from "../context/authContext";

const Signup = () => {
  const {isHamBurger}=useContext(authContext);
  return (
    <div  className={`${isHamBurger?"hidden sm:block":""}`}>
        <Form formType={"signup"}/>
    <p>{"Already have an account ?"}</p><Link to="/login">Login</Link>

    </div>
  )
}

export default Signup