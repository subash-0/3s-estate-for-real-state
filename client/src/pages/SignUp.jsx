import React from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <div>
        <form className='flex flex-col gap-4 '>
          <input type="text" placeholder='User name' id="username" className='border p-3 rounded-lg' />
          <input type="email" placeholder='Valid email ...' id="email" className='border p-3 rounded-lg' />
          <input type="password" placeholder='Your password' id="passwrod" className='border p-3 rounded-lg' />
          <button   className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70'>Sign Up</button>
        </form>
        <div className='flex gap-2 my-4 items-center justify-center'>
          <p>Have an account ? </p>
          <Link to={"/sign-in"}><span className='text-blue-400'>Sign In</span></Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp