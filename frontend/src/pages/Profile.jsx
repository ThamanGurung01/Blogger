import { useContext, useEffect, useState} from "react";
import { authCheck } from "../services/auth/authenticationCheck";
import { getTotal } from "../services/Api/getTotal";
import { authContext } from "../context/authContext";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {getUserData} from "../services/Api/getUserData";
import "../styles/Profile.css"
const Profile = ({profileType}) => {
  // const backendUrl=import.meta.env.VITE_BackendUrl;
  const [users,setUser]=useState(null);
  const [totalBlogs,setTotalBlogs]=useState(0);
  const [totalClicks,setTotalClicks]=useState(0);
  const [totalComments,setTotalComments]=useState(0);
  const [displayLoading,setDisplayLoading]=useState(true);
  const {isHamBurger}=useContext(authContext);
  const {id}=useParams();
  // console.log(displayLoading);
  const getUserDatas=async()=>{
    setDisplayLoading(true);
    setTimeout(()=>{ setDisplayLoading(false);},500);
    const user=await authCheck();
    if(user&&user.length!=0){
      setUser(user.data);
    }
  }
  const getOtherUser=async(id)=>{
    setDisplayLoading(true);
    setTimeout(()=>{ setDisplayLoading(false);},500);
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
      fetchTotalId(id);
    }else if(users&&profileType==="userProfile"){
      fetchTotal();
    };
  },[users,id,profileType])
  return (
   <>
{    displayLoading?<p className="profileLoading">Loading...</p>:<div className={`profile ${isHamBurger?"hidden sm:block":""}`}>
      {users&&
      <div className="userDetail">
      <h1 className="profileHeading">Profile</h1>
      <img src={users?.profileImageURL} alt="profile" onError={(e)=>{
          console.log(e.target.src);
          e.target.onerror=null;
          e.target.src="avatar.png";
      }} className="userImage"/>
<span className="userName">Name: {users?.fullName}</span>
<span className="userEmail">Email: {users?.email}</span>
<div className="update-container">{profileType==="userProfile"?<Link className="update-btn btn" to={"/updateProfile/"+users?._id}>update</Link>:""}</div>
      </div>}
      <div className="userStatistic">
      <h1 className="profileHeading">Statistics</h1>
        <p className="statistics">Posts: {totalBlogs}</p>
        <p className="statistics">Clicks: {totalClicks}</p>
        <p className="statistics">Comments: {totalComments}</p>
        </div>
    </div>}
    </>
  )
}
Profile.propTypes={
  profileType:PropTypes.string,
}
export default Profile