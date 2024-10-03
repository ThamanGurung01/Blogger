import {useForm} from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";

const Form = ({formType}) => {
    const [imageUrl,setImageUrl]=useState("http://localhost:8000/images/avatar.png");

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
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm();
    const onSubmit=async(data)=>{
        const profilePicture = document.getElementById("profile").files[0];
        if (profilePicture) {
            data={...data,profilePicture:profilePicture};
        }
        await new Promise((resolve)=>{
            setTimeout(resolve,1000)
        });
        console.log(data);
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit(onSubmit)} >
            <label htmlFor="profile">Profile Picture:</label><br /><input {...register("profilePicture")} type="file" id="profile" style={{display:"none"}} onChange={(e)=>handleFileChange(e)} />
            <img src={imageUrl} alt="profileView" onClick={handleFileClick}/>
            {formType==="signup"?( <><input {...register("fullName",{
                required:"Name is required",
                minLength:{
                    value:5,
                    message:"Name must be at least 5 characters",
                },
                pattern:{
                    value:/^[A-Za-z]+$/,
                    message:"Invalid Name",
                }
            })} type="text" placeholder="Name" /><br/>
            {errors.fullName&&<div>{errors.fullName.message}</div>}
            </> ):""}
            <input {...register("email",{
                required:"Email is required",
                pattern:{
                    value:/^[A-Za-z]+[1-9]*@gmail\.com$/,
                    message:"Invalid Email",
                }
            })} type="text" placeholder="Email" /> <br />
            {errors.email&&<div>{errors.email.message}</div>}
            <input {...register("password",{
                required:"Password is required",
                minLength:{
                    value:5,
                    message:"Password must be at least 5 characters"
                }
            })} type="password" placeholder="Password" /> <br />
            {errors.password&&<div>{errors.password.message}</div>}
            <input {...register("gender",{
                required:"Select one",
            })} id="male" type="radio" name="gender" value={"male"}/><label htmlFor="male">Male</label>
            <input {...register("gender")} id="female" type="radio" name="gender" value={"female"}/><label htmlFor="female">Female</label><br />
            {errors.gender&&<div>{errors.gender.message}</div>}
            <button disabled={isSubmitting} type="submit">{isSubmitting?"Submitting...":formType==="signup"?"Signup":"Login"}</button>
        </form>
    </div>
  )
}
Form.propTypes={
    formType:PropTypes.string.isRequired,
}

export default Form