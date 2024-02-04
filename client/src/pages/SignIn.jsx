import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {signInStart, signFailure,signInSuccess} from "../redux/user/userSlice";
const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading,error}  = useSelector(state=>state.user)
  const dispath = useDispatch();
  const navigate = useNavigate();
  const handlChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }

  const formHandle = async (e)=>
  {
    e.preventDefault();
  try {
    dispath(signInStart())
      let res = await fetch("/api/v1/auth/signin",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      })
      let data = await  res.json();
      console.log(data);
        if(data.success===false){
          dispath(signFailure(data.message));
          return;
        }
          dispath(signInSuccess(data));
          navigate("/");
     
  } catch (error) {
    dispath(signFailure(error.message))
  }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <div>
        <form className='flex flex-col gap-4 ' onSubmit={formHandle}>
          <input type="text" placeholder='User name' id="username" className='border p-3 rounded-lg' onChange={handlChange} />
          <input type="password" placeholder='Your password' id="password" className='border p-3 rounded-lg' onChange={handlChange} />
          <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70'>{loading?"Loading ...":"Sign IN"}</button>
        </form>
        <div className='flex gap-2 my-4 items-center justify-center'>
          <p> Don't have an account ? </p>
          <Link to={"/sign-up"}><span className='text-blue-400'>Sign Up</span></Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  )
}

export default SignIn