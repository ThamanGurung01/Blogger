// import React from 'react'
import Form from "../components/Form"
import { useContext } from "react";
import { authContext } from "../context/authContext";
import "../styles/Profile.css"
const UpdateProfile = () => {
  const {isHamBurger}=useContext(authContext);
  return (
    <div  className={`form-page post ${isHamBurger?"hidden sm:block":""}`}>
        <Form formType={"updateProfile"}/>
    </div>
  )
}

export default UpdateProfile