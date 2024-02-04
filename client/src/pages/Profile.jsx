import React from 'react'
import {useSelector} from 'react-redux'
const Profile = () => {
  const {currentUser} = useSelector(state=>state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <img className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2' src={currentUser.avatar} alt="profile Image" />
        <input type="text" id='username' placeholder='User name' className='p-3 rounded-lg' />
        <input type="email" id='email' placeholder='email ' className='p-3 rounded-lg' />
        <input type="password" id='password' placeholder='Password ' className='p-3 rounded-lg' />
        <button className='bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='my-5 flex justify-between'>
        <span className='text-red-700 cursor-pointer hover:underline'>Delete Account</span>
        <span className='text-red-700 cursor-pointer hover:underline'>Sign Out</span>

      </div>
    </div>
  )
}

export default Profile