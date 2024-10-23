import { useEffect, useState } from "react";
import { authCheck } from "../services/auth/authenticationCheck";
import { getTotal } from "../services/Api/getTotal";


const Profile = () => {
  const backendUrl=import.meta.env.VITE_BackendUrl;
  const [users,setUser]=useState(null);
  const [totalBlogs,setTotalBlogs]=useState(0);
  const [totalClicks,setTotalClicks]=useState(0);
  const [totalComments,setTotalComments]=useState(0);


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
  const fetchTotal=async()=>{
    const totalBlogs=await getTotal("totalBlogs");
setTotalBlogs(totalBlogs.data);
const totalClicks=await getTotal("totalClicks");
setTotalClicks(totalClicks.data);
const totalComments=await getTotal("totalComments");
setTotalComments(totalComments.data);
  }
  useEffect(()=>{
    if(users) fetchTotal();
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
        <p>Posts: {totalBlogs}</p>
        <p>Clicks: {totalClicks}</p>
        <p>Comments: {totalComments}</p>
        </div>
    </div>
  )
}

export default Profile