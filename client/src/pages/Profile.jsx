import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { RiFileEditFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase';
import {Link} from 'react-router-dom'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, singOutUserFailure, singOutUserStart, singOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
const Profile = () => {
  const {currentUser, loading, error} = useSelector(state=>state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [listingError, setListingError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userUpadte, setUserUpadte] = useState(false)
  const [userListing, setUserListing] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if(file){
    handleUploadfile(file)
  }
  }, [file])
  console.log(formData)

  const handleChnage = (e)=>{
      setFormData({...formData,
      [e.target.id]:e.target.value,
  })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/v1/user/update/${currentUser?._id}`,{
        method:"PUT",
        credentials:"include",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      setUserUpadte(true);
      dispatch(updateUserSuccess(data));
      
    } catch (error) {
    dispatch(updateUserFailure(error.message));
      
    }
  }

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
  const handleDelete =async () =>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/v1/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data = await res.json();
      if(data.success == false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
     
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
      
    }
  }

  const handleSingOut = async () =>{
      try {
        dispatch(singOutUserStart());
        const res = await fetch('/api/v1/auth/signout');
        const data = await res.json();
        if(data.success == false){
          dispatch(singOutUserFailure(data.message));
          return;
        }
        dispatch(singOutUserSuccess(data))
      } catch (error) {
        dispatch(singOutUserFailure(error));
       
      }
  }
  const handleShowListing = async ()=>{
    try {
      setListingError(false);
      const res = await fetch(`/api/v1/user/showlisting/${currentUser._id}`);
      const data = await res.json();
      if(data.success == false){
        setListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setListingError(true)
    }
  }
const handleListingDelete =async(id)=>{
  try {
    const res = await fetch(`/api/v1/listing/delete/${id}`,{
      method:'DELETE',
    });
    const data = await res.json();
    if(data.success == false){
      console.log("Something went wrong !");
      return;
    }
    setUserListing((prev)=>prev.filter((listing)=>listing._id !== id));
  } catch (error) {
    
  }

}
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} name="" id="" hidden accept='image/*'/>
        <img className='bg-gradient-to-r from-pink-500 to-yellow-500 p-2 rounded-full w-24 h-24 object-cover aspect-square cursor-pointer self-center mt-2' onClick={()=>fileRef.current.click()} src={formData?.avatar || currentUser?.avatar} alt="profile Image" />
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
        <input type="text" id='username' defaultValue={currentUser.username} placeholder='User name' className='p-3 rounded-lg' onChange={handleChnage} />
        <input type="email" id='email' defaultValue={currentUser.email} placeholder='email ' className='p-3 rounded-lg' onChange={handleChnage} />
        <input type="password" id='password' placeholder='Password ' className='p-3 rounded-lg' onChange={handleChnage} />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80'>
          {loading ?'Loading ... ':'Update'}
        </button>
        <Link to={"/listing/create"} className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>Create Listing</Link>
      </form>
      <div className='my-5 flex justify-between'>
        <span onClick={handleDelete} className='text-red-700 cursor-pointer hover:underline'>Delete Account</span>
        <span onClick={handleSingOut} className='text-red-700 cursor-pointer hover:underline'>Sign Out</span>


      </div>
      <p className='text-red-700 mt-5'>{error?error:''}</p>
      <p className='text-green-700 mt-5'>{userUpadte?'User Updated Successfully !':''}</p>
      <button className='text-green-700 w-full' onClick={handleShowListing}>Show listing</button>
      <p className='text-red-700 text-sm mt-5'>
        {listingError?'Error showing Listing':''}
      </p>
      {
        userListing && userListing.length >0 && <div className="flex flex-col gap-4">
          <h1 className='text-center text-2xl  mt-7  font-semibold '>Your Listings</h1>
         { userListing.map((listing,i)=>(
          <div key={i} className="border rounded-lg p-3 shadow-sm flex justify-between items-center gap-4">
            <Link to={`/listing/${listing._id}`}>
            <img src={listing?.imageUrl[0]} alt="listing cover" className='h-16 w-16 object-contain' />
            </Link>
            <Link  to={`/listing/${listing._id}`} className='text-slate-700 font-semibold flex-1 hover:underline truncate cursor-pointer'>
            <p>
            {listing.name}
            </p>
            </Link>
           
            <div className='flex flex-col items-center gap-2'>
              <button className='text-red-700 uppercase border shadow-sm rounded-full p-1 hover:bg-red-700 hover:text-white cursor-pointer hover:underline' onClick={()=>handleListingDelete(listing._id)} > <MdDeleteOutline /></button>

              <Link to={`/listing/upate-listing/${listing._id}`}>
              <button className='text-green-700 uppercase border shadow-sm  hover:border-none rounded-full p-1 hover:bg-green-700 hover:text-white  text-sm cursor-pointer hover:underline'> <RiFileEditFill /></button>
              </Link>
            </div>
          </div>
        ))}
        </div>
      }
    </div>
  )
}

export default Profile