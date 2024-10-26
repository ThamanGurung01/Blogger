// import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'

const Login = () => {
  return (
    <div>
    <Form formType={"login"}/>
    <p>{"Don't have an account ?"}</p><Link to="/signup">SignUp</Link>
    </div>
  )
}

export default Login