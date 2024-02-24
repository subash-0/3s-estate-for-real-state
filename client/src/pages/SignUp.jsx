import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuEye,LuEyeOff } from "react-icons/lu";
import OAuth from '../components/OAuth';
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
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
    setLoading(true);
      let res = await fetch("/api/v1/auth/signup",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      })
      let data = await res.json();
      console.log(data);
        if(data.success===false){
          setError(data.message);
          setLoading(false);
        }else{
          setError(null)
          setLoading(false);
          navigate('/sign-in');
        }
      
  } catch (error) {
    setError(error.message)
    setLoading(false);
  }
  }
  return (
    <div className='p-3 max-w-lg mx-auto min-h-screen'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <div>
        <form className='flex flex-col gap-4 ' onSubmit={formHandle}>
          <input type="text" placeholder='User name' id="username" className='border p-3 rounded-lg' onChange={handlChange} required/>
          <input type="email" placeholder='Valid email ...' id="email" className='border p-3 rounded-lg' onChange={handlChange} required/>
          <div className="bg-white border p-2 rounded-lg flex items-center justify-center">
          <input type={passwordShow?"text":"password"} placeholder='Your password' id="password" className='bg-transparent focus:outline-none p-1 w-full' onChange={handlChange} required/>
          {passwordShow?<LuEyeOff className='hover:cursor-pointer' onClick={()=>setPasswordShow(false)} />:<LuEye className='hover:cursor-pointer' onClick={()=>setPasswordShow(true)} /> }
          </div>
          <input type="number" placeholder='Your phone number....' maxLength={10} id="phone" className='border p-3 rounded-lg' onChange={handlChange} required />
          <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70'>{loading?"Loading ...":"Sign Up"}</button>
          <OAuth />
        </form>
        <div className='flex gap-2 my-4 items-center justify-center'>
          <p>Have an account ? </p>
          <Link to={"/sign-in"}><span className='text-blue-400'>Sign In</span></Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  )
}

export default SignUp