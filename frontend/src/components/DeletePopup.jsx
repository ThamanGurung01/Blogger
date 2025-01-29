import { useContext } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import "../styles/DeletePopup.css"
import { authContext } from '../context/authContext';
import {deleteBlogReq} from '../services/Api/deleteBlogReq';
const DeletePopup = () => {
  const {showPopup,setShowPopup}=useContext(authContext);
  const navigate=useNavigate();
    const {id}=useParams();
    if(!id) console.log("error no id view Post");
  const [blogId,setBlogId]=useState();
    const openPopup=()=>{
        setShowPopup(true);
    }
    const closePopup=()=>{
        setShowPopup(false);
    }
    const deleteBlog=async()=>{
      if(blogId){
    await deleteBlogReq("blog",id);
        navigate("/");
      }else{
        console.log("no blog id ",blogId);
      }
        closePopup();
    }
 useEffect(()=>{
if(id){
  setBlogId(id);
}
    },[id])
  return (
    <div className=''>
        <button className='delete-btn' onClick={openPopup}>Delete</button>
        {showPopup&&
        <div className='popup-container'>
            <div className='popup'>
            <button className="ml-60 mb-2 text-red-600 text-xl font-bold" onClick={closePopup}>X</button>
            <span className='text-center'>Are you sure you want to delete?</span> 
<div className='flex justify-around mt-4'><button className='popup-btn' onClick={deleteBlog}>Yes</button> <button
className='popup-btn' onClick={closePopup}>Cancel</button></div>
            </div>
        </div>
        }
    </div>
  )
}

export default DeletePopup