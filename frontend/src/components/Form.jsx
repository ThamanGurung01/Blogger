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
    const backendUrl=import.meta.env.VITE_BackendUrl;
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
    const imageUrl=backendUrl+userData.data.profileImageURL;
    setUserData(userData.data);
    setImageUrl(imageUrl);
}
    }
    useEffect(()=>{
        if(formType==="updateProfile"){
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
    <div>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="form-loginSignup" >
<div className="input-container">
{formType==="signup"||formType==="updateProfile"?( <>{formType==="signup"?<h1 className="form-heading">SignUp</h1>:<h1 className="form-heading">Profile Update</h1>}<label htmlFor="profile" className="profileLabel">Profile Picture:</label><input type="file" id="profile" style={{display:"none"}} onChange={(e)=>handleFileChange(e)} />
            <img src={imageUrl} className="signup-image" alt="profileView" onClick={handleFileClick}/><input {...register("fullName",{
                required:"Name is required",
                minLength:{
                    value:5,
                    message:"Name must be at least 5 characters",
                },
                pattern:{
                    value:/^[A-Za-z]+(?: [A-Za-z]+)?$/,
                    message:"Invalid Name",
                }
            })} type="text" className="form-input" placeholder="Name" id="name" />
            {errors.fullName&&<div className="error">{errors.fullName.message} *</div>}
            </> ): <h1 className="form-heading">Login</h1> }
          {formType==="updateProfile"?"":<input {...register("email",{
                required:"Email is required",
                pattern:{
                    value:/^[A-Za-z]+[1-9]*@gmail\.com$/,
                    message:"Invalid Email",
                }
            })} type="text" className="form-input" placeholder="Email" id="email" />}
            {errors.email&&<div className="error">{errors.email.message} *</div>}
            <input {...register("password",{
                required:"Password is required",
                minLength:{
                    value:5,
                    message:"Password must be at least 5 characters"
                }
            })} type="password" className="form-input" placeholder="Password" id="password" />
            {errors.password&&<div className="error">{errors.password.message} *</div>}
            {formType=="login"?"":(<><div className="gender"><label>Gender:</label><input className="form-input" {...register("gender",{
                required:"Choose your gender",
            })} id="male" type="radio" name="gender" value={"male"}/><label htmlFor="male">Male</label>
            <input className="form-input" {...register("gender")} id="female" type="radio" name="gender" value={"female"}/><label htmlFor="female">Female</label></div>
            {errors.gender&&<div className="error">{errors.gender.message} *</div>}</>)}
</div>
            <button disabled={isSubmitting} type="submit" className="btn submit-btn">{isSubmitting?"Submitting...":formType==="signup"?"Signup":formType=="updateProfile"?"Update":"Login"}</button>
            {message!=="Email already Exists"&&<div className="success">{message}</div>}
            {message==="Email already Exists"&&<div className="error">{message}!</div>}
        </form>
    </div>
  )
}
Form.propTypes={
    formType:PropTypes.string.isRequired,
}

export default Form