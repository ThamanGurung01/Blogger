import { useContext, useEffect, useState } from "react";
import { authCheck } from "../services/auth/authenticationCheck";
import { getTotal } from "../services/Api/getTotal";
import { authContext } from "../context/authContext";
import { Link } from "react-router-dom";


const Profile = () => {
  const backendUrl=import.meta.env.VITE_BackendUrl;
  const [users,setUser]=useState(null);
  const [totalBlogs,setTotalBlogs]=useState(0);
  const [totalClicks,setTotalClicks]=useState(0);
  const [totalComments,setTotalComments]=useState(0);
  const {isHamBurger}=useContext(authContext);


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
    <div className={`${isHamBurger?"hidden sm:block":""}`}>
      {users&&
      <div>
<img src={backendUrl+users.profileImageURL} alt="profile"/>
<span>Name: {users.fullName}</span> <br />
<span>Email: {users.email}</span><br />
      <Link className="border-2" to={"/updateProfile/"+users?._id}>update</Link>
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