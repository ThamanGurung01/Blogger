import { useContext, useEffect, useState} from "react";
import { authCheck } from "../services/auth/authenticationCheck";
import { getTotal } from "../services/Api/getTotal";
import { authContext } from "../context/authContext";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {getUserData} from "../services/Api/getUserData";
const Profile = ({profileType}) => {
  const backendUrl=import.meta.env.VITE_BackendUrl;
  const [users,setUser]=useState(null);
  const [totalBlogs,setTotalBlogs]=useState(0);
  const [totalClicks,setTotalClicks]=useState(0);
  const [totalComments,setTotalComments]=useState(0);
  const {isHamBurger}=useContext(authContext);
  const {id}=useParams();
  const getUserDatas=async()=>{
    const user=await authCheck();
    if(user&&user.length!=0){
      setUser(user.data);
    }
  }
  const getOtherUser=async(id)=>{
    const user=await getUserData(id);
    if(user&&user.length!=0){
      setUser(user.data);
    }
  }
  useEffect(()=>{
      if(profileType==="userProfile"){
      getUserDatas();
    }else if(profileType==="otherProfile"&&id){
    getOtherUser(id);
    }
  },[profileType,id])
  const fetchTotalId=async(id)=>{
    const totalBlogs=await getTotal("totalBlogs",id);
setTotalBlogs(totalBlogs.data);
const totalClicks=await getTotal("totalClicks",id);
setTotalClicks(totalClicks.data);
const totalComments=await getTotal("totalComments",id);
setTotalComments(totalComments.data);
  }
  const fetchTotal=async()=>{
    const totalBlogs=await getTotal("totalBlogs");
setTotalBlogs(totalBlogs.data);
const totalClicks=await getTotal("totalClicks");
setTotalClicks(totalClicks.data);
const totalComments=await getTotal("totalComments");
setTotalComments(totalComments.data);
  }
  useEffect(()=>{
    if(users&&id&&profileType==="otherProfile") {
      fetchTotalId(id)
    }else if(users&&profileType==="userProfile"){
      fetchTotal();
    };
  },[users,id,profileType])
  return (
    <div className={`${isHamBurger?"hidden sm:block":""}`}>
      {users&&
      <div>
<img src={backendUrl+users.profileImageURL} alt="profile"/>
<span>Name: {users.fullName}</span> <br />
<span>Email: {users.email}</span><br />
      {profileType==="userProfile"?<Link className="border-2" to={"/updateProfile/"+users?._id}>update</Link>:""}
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
Profile.propTypes={
  profileType:PropTypes.string,
}
export default Profile