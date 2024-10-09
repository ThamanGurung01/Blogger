import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { authCheck } from "../services/auth/authenticationCheck";
import { authContext } from "./authContext";

const AuthenticationContext = ({children}) => {
  const [user,setUser]=useState({});
  const [loggedIn,isLoggedIn]=useState(false);
  const getUserData=async()=>{
    const user=await authCheck();
    if(!user.length){
      isLoggedIn(false);
    }else{
      isLoggedIn(true);
    setUser(user);
  }
  }
  useEffect(()=>{
    getUserData();
  },[])
  return (
    <authContext.Provider value={{user,loggedIn}}>
      {children}
    </authContext.Provider>
  )
}
AuthenticationContext.propTypes={
  children:PropTypes.node,
}

export default AuthenticationContext