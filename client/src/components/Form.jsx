import {useForm} from "react-hook-form";
import PropTypes from "prop-types";
import { useEffect, useState,useContext } from "react";
import { authContext } from '../context/authContext'

import fallBackImage from "../assets/avatar.png";
import { postReq } from "../services/Api/postReq";
import { login } from "../services/Api/login";
import {useNavigate} from "react-router-dom";
import { setCookie } from "../utils/cookie";
import { authCheck } from "../services/auth/authenticationCheck";
import { patchReq } from "../services/Api/patchReq";

const Form = ({formType}) => {
    const {isLoggedIn}=useContext(authContext);
    const navigate=useNavigate();
    const [imageUrl,setImageUrl]=useState(fallBackImage);
    const [response,setResponse]=useState(null);
    const [message,setMessage]=useState(null);
    const [userData,setUserData]=useState(null);
    const [displayLoading,setDisplayLoading]=useState(true);
    // const backendUrl=import.meta.env.VITE_BackendUrl;
    const handleFileClick=()=>{
        document.getElementById("profile").click();
    }
    const handleFileChange=(e)=>{
        const profilePicture=e.target.files[0];
        if (profilePicture) {
            setImageUrl(URL.createObjectURL(profilePicture));
        }
    }

//form
    const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm(
       {
         defaultValues: userData || {}
        }
    );
    const onSubmit=async(data)=>{
try{
    const inName=document.getElementById("name");
    const inEmail=document.getElementById("email");
    const inPassword=document.getElementById("password");
    inName?.blur();
    inEmail?.blur();
    inPassword?.blur();
    if(formType=="signup"||formType=="updateProfile")
    {
    const Picture = document.getElementById("profile").files[0];
    if(formType=="signup"){
        const reqResponse=await postReq(data,"user",Picture);
        reqResponse?.data?.status?setMessage("Successfully Created"):setMessage(reqResponse?.response?.data?.error);
}else{
        const reqResponse=await patchReq(data,"user",Picture,userData._id);
        reqResponse?.data?.status&&setMessage("Successfully Updated");
}
}else if(formType=="login"){
   const response= await login(data);
setResponse(response);
}
    setTimeout(()=>{
        setMessage(null)
    },2000);
    reset();
    setImageUrl(fallBackImage);
    await fetchUserData();
}catch(Err){
    console.log("error in signing up:",Err);
}
    }
    const fetchUserData=async()=>{
        const userData=await authCheck();
if(userData){
    const imageUrl=userData.data.profileImageURL;
    setUserData(userData.data);
    setImageUrl(imageUrl);
}
    }
    useEffect(()=>{
        if(formType==="updateProfile"){
            setDisplayLoading(true);
            setTimeout(()=>{ setDisplayLoading(false);},500);
        fetchUserData();
        }
    },[formType])
    useEffect(() => {
        if (userData) {
            reset(userData);
        }
    }, [userData, reset]);
    useEffect(()=>{
        if(response) {
            console.log(response);
            setCookie("true");
            isLoggedIn(true);
            navigate("/");
        }
    },[response])


  return (
    <>
   {formType==="updateProfile"&&displayLoading?<p className="formLoading">Loading...</p>: <div>
    <form
  action=""
  onSubmit={handleSubmit(onSubmit)}
  className="max-w-md mx-auto bg-white shadow-lg rounded-lg px-6 py-10 space-y-5 border border-gray-200"
>
  <div className="flex flex-col items-center space-y-4">
    {formType === "signup" || formType === "updateProfile" ? (
      <>
        <h1 className="text-2xl font-bold text-gray-800">
          {formType === "signup" ? "Sign Up" : "Update Profile"}
        </h1>
        <label
          htmlFor="profile"
          className="text-gray-600 font-medium cursor-pointer"
        >
          Profile Picture:
        </label>
        <input
          type="file"
          id="profile"
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e)}
        />
        <img
          src={imageUrl}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 cursor-pointer hover:opacity-80 transition"
          alt="profileView"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/avatar.png";
          }}
          onClick={handleFileClick}
        />
        <input
          {...register("fullName", {
            required: "Name is required",
            minLength: { value: 5, message: "Name must be at least 5 characters" },
            pattern: { value: /^[A-Za-z]+(?: [A-Za-z]+)?$/, message: "Invalid Name" }
          })}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Name"
          id="name"
        />
        {errors.fullName && <div className="text-red-500 text-sm">{errors.fullName.message} *</div>}
      </>
    ) : (
      <h1 className="text-2xl font-bold text-gray-800">Login</h1>
    )}

    {formType === "updateProfile" ? null : (
      <>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[A-Za-z]+[1-9]*@gmail\.com$/, message: "Invalid Email" }
          })}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          id="email"
        />
        {errors.email && <div className="text-red-500 text-sm">{errors.email.message} *</div>}
      </>
    )}

    <input
      {...register("password", {
        required: "Password is required",
        minLength: { value: 5, message: "Password must be at least 5 characters" }
      })}
      type="password"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Password"
      id="password"
    />
    {errors.password && <div className="text-red-500 text-sm">{errors.password.message} *</div>}

    {formType === "login" ? null : (
      <>
        <div className="flex items-center space-x-4">
          <label className="font-medium text-gray-700">Gender:</label>
          <label htmlFor="male" className="flex items-center space-x-1">
            <input
              className="form-input"
              {...register("gender", { required: "Choose your gender" })}
              id="male"
              type="radio"
              name="gender"
              value={"male"}
            />
            <span>Male</span>
          </label>
          <label htmlFor="female" className="flex items-center space-x-1">
            <input
              className="form-input"
              {...register("gender")}
              id="female"
              type="radio"
              name="gender"
              value={"female"}
            />
            <span>Female</span>
          </label>
        </div>
        {errors.gender && <div className="text-red-500 text-sm">{errors.gender.message} *</div>}
      </>
    )}
  </div>

  <button
    disabled={isSubmitting}
    type="submit"
    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
  >
    {isSubmitting ? "Submitting..." : formType === "signup" ? "Signup" : formType === "updateProfile" ? "Update" : "Login"}
  </button>

  {message && (
    <div className={`text-center mt-3 ${message === "Email already Exists" ? "text-red-500" : "text-green-500"}`}>
      {message}
    </div>
  )}
</form>
</div>}
</>
  )
}
Form.propTypes={
    formType:PropTypes.string.isRequired,
}

export default Form