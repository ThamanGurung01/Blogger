// import React from 'react'
import { Link } from "react-router-dom"
import Form from "../components/Form"

const Signup = () => {
  return (
    <div>
        <Form formType={"signup"}/>
    <p>{"Already have an account ?"}</p><Link to="/login">Login</Link>

    </div>
  )
}

export default Signup