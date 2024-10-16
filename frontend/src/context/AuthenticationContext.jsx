import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { authCheck } from "../services/auth/authenticationCheck";
import { authContext } from "./authContext";
import { getCookie, setCookie } from "../utils/cookie";

const AuthenticationContext = ({children}) => {
  const [user,setUser]=useState();
  const [loggedIn,isLoggedIn]=useState(false);
  const [loading,isLoading]=useState(true);
  const getUserData=async()=>{
    const user=await authCheck();
    isLoading(false);
    if(!user){
      setCookie("false");
    }else{
      setCookie("true");
      setUser(user.data);
  }
  }
  useEffect(()=>{
    getUserData();
    const cookie=getCookie("isLoggedIn");
    if(cookie==="true"){isLoggedIn(true)}else{isLoggedIn(false)};
  },[loggedIn]);
  return (
    <authContext.Provider value={{user,loggedIn,loading,isLoggedIn,setUser}}>
      {children}
    </authContext.Provider>
  )
}
AuthenticationContext.propTypes={
  children:PropTypes.node,
}

export default AuthenticationContext