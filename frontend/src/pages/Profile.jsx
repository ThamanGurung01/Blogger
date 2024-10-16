import { useEffect, useState } from "react";
import { authCheck } from "../services/auth/authenticationCheck";


const Profile = () => {
  const backendUrl=import.meta.env.VITE_BackendUrl;
  const [users,setUser]=useState(null);
  const getUserData=async()=>{
    const user=await authCheck();
    if(user&&user.length!=0){
      setUser(user.data);
    }
  }
  useEffect(()=>{
    if(!users){
      getUserData();
    }
  },[users])
  return (
    <div>
      {users&&
      <div>
<img src={backendUrl+users.profileImageURL} alt="profile"/>
<span>Name: {users.fullName}</span> <br />
<span>Email: {users.email}</span>
      </div>}
      <h1>Statistics</h1>
      <div>
        
      </div>
    </div>
  )
}

export default Profile