import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase';
const Profile = () => {
  const {currentUser} = useSelector(state=>state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if(file){
    handleUploadfile(file)
  }
  }, [file])
  console.log(formData)
  const handleUploadfile=(file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot)=>{
      const progess = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePercentage(Math.round(progess))
    },
    (error)=>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL)=>{
        setFormData({...formData, avatar:downloadURL})
      });
    }
    );

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} name="" id="" hidden accept='image/*'/>
        <img className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2' onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile Image" />
        <p className='text-sm self-center'>
          {fileUploadError ?<span className='text-red-700%'>{'Error Image upload <Image should be of 2 Mb>'}</span>
          : filePercentage>0 && filePercentage<100
          ?
          <span className='text-green-700'> uploading {filePercentage} % </span>
          
          : filePercentage === 100 
          ? <span className='text-green-500'> Image upload Success full !</span>
          :""
         }
        </p>
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