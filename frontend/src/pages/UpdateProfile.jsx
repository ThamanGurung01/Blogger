// import React from 'react'
import Form from "../components/Form"
import { useContext } from "react";
import { authContext } from "../context/authContext";

const UpdateProfile = () => {
  const {isHamBurger}=useContext(authContext);
  return (
    <div  className={`${isHamBurger?"hidden sm:block":""}`}>
        <Form formType={"updateProfile"}/>
    </div>
  )
}

export default UpdateProfile