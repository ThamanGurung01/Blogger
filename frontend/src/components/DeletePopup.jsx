import { useContext } from 'react'
import "../styles/DeletePopup.css"
import { authContext } from '../context/authContext';
const DeletePopup = () => {
  const {showPopup,setShowPopup}=useContext(authContext);
    const openPopup=()=>{
        setShowPopup(true);
        console.log("showPopup");
    }
    const closePopup=()=>{
        setShowPopup(false);
        console.log("closePopup");
    }
    const deleteBlog=()=>{
        console.log("deleted");
        closePopup();
    }
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