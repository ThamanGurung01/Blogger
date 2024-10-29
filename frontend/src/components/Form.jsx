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
    if(formType=="signup"||formType=="updateProfile")
    {
    const Picture = document.getElementById("profile").files[0];
    if(formType=="signup"){
        const reqResponse=await postReq(data,"user",Picture);
    console.log(reqResponse);
}else{
        const reqResponse=await patchReq(data,"user",Picture,userData._id);
        console.log(reqResponse);
}
}else if(formType=="login"){
    await login(data).then((e)=>setResponse(e.data.status));
}
    reset();
    setImageUrl(fallBackImage);
}catch(Err){
    console.log("error in signing up:",Err);
}
    }
    const fetchUserData=async()=>{
        const userData=await authCheck();
        const imageUrl=backendUrl+userData.data.profileImageURL;
        setUserData(userData.data);
        setImageUrl(imageUrl);
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
            setCookie("true");
            isLoggedIn(true);
            navigate("/");
        }
    },[response])


  return (
    <div>
        <form action="" onSubmit={handleSubmit(onSubmit)} >
            {formType==="signup"||formType==="updateProfile"?( <><label htmlFor="profile">Profile Picture:</label><br /><input type="file" id="profile" style={{display:"none"}} onChange={(e)=>handleFileChange(e)} />
            <img src={imageUrl} width={"200px"} alt="profileView" onClick={handleFileClick}/><input {...register("fullName",{
                required:"Name is required",
                minLength:{
                    value:5,
                    message:"Name must be at least 5 characters",
                },
                pattern:{
                    value:/^[A-Za-z]+(?: [A-Za-z]+)?$/,
                    message:"Invalid Name",
                }
            })} type="text" placeholder="Name" /><br/>
            {errors.fullName&&<div>{errors.fullName.message}</div>}
            </> ):""}
          {formType==="updateProfile"?"": <><input {...register("email",{
                required:"Email is required",
                pattern:{
                    value:/^[A-Za-z]+[1-9]*@gmail\.com$/,
                    message:"Invalid Email",
                }
            })} type="text" placeholder="Email" /> <br /></>}
            {errors.email&&<div>{errors.email.message}</div>}
            <input {...register("password",{
                required:"Password is required",
                minLength:{
                    value:5,
                    message:"Password must be at least 5 characters"
                }
            })} type="password" placeholder="Password" /> <br />
            {errors.password&&<div>{errors.password.message}</div>}
            {formType=="login"?"":(<><label>Gender:</label><input {...register("gender",{
                required:"Choose your gender",
            })} id="male" type="radio" name="gender" value={"male"}/><label htmlFor="male">Male</label>
            <input {...register("gender")} id="female" type="radio" name="gender" value={"female"}/><label htmlFor="female">Female</label><br />
            {errors.gender&&<div>{errors.gender.message}</div>}</>)}
            <button disabled={isSubmitting} type="submit">{isSubmitting?"Submitting...":formType==="signup"?"Signup":formType=="updateProfile"?"Update":"Login"}</button>
        </form>
    </div>
  )
}
Form.propTypes={
    formType:PropTypes.string.isRequired,
}

export default Form