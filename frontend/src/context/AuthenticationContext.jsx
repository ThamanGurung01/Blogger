import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { authCheck } from "../services/auth/authenticationCheck";
import { authContext } from "./authContext";
import { setCookie } from "../utils/cookie";

const AuthenticationContext = ({children}) => {
  const [user,setUser]=useState({});
  // const [loggedIn,isLoggedIn]=useState(false);

  const cookieCheck=()=>{
      console.log(document.cookie);
  }
  const getUserData=async()=>{
    const user=await authCheck();
    if(!user){
      setCookie("false");
    }else{
      setCookie("true");
      setUser(user.data);
  }
  }
  useEffect(()=>{
    cookieCheck();
    getUserData();
  },[])
  return (
    <authContext.Provider value={{user}}>
      {children}
    </authContext.Provider>
  )
}
AuthenticationContext.propTypes={
  children:PropTypes.node,
}

export default AuthenticationContext