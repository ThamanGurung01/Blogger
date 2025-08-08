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
      {displayLoading ? (
        <p className="flex justify-center items-center min-h-[50vh] text-lg font-medium text-gray-600">
          Loading...
        </p>
      ) : (
        <div className={`flex flex-col sm:flex-row gap-6 p-6 max-w-5xl mx-auto mt-20 lg:mt-5${
            isHamBurger ? "hidden sm:flex" : ""
          }`}
        >
          {users && (
            <div className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-6 w-full sm:w-1/3">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Profile</h1>
              <img
                src={users?.profileImageURL}
                alt="profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avatar.png";
                }}
                className="w-28 h-28 object-cover rounded-full border border-gray-300"
              />
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  {users?.fullName}
                </p>
                <p className="text-sm text-gray-500">{users?.email}</p>
              </div>
              {profileType === "userProfile" && (
                <Link
                  to={`/updateProfile/${users?._id}`}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  Update Profile
                </Link>
              )}
            </div>
          )}

          <div className="bg-white shadow-lg rounded-2xl p-6 w-full sm:w-2/3">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Statistics</h1>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-blue-600">{totalBlogs}</p>
                <p className="text-gray-600 text-sm">Posts</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-600">{totalClicks}</p>
                <p className="text-gray-600 text-sm">Clicks</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-purple-600">{totalComments}</p>
                <p className="text-gray-600 text-sm">Comments</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

}
Profile.propTypes={
  profileType:PropTypes.string,
}
export default Profile