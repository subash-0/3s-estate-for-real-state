import React, { useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js';
const CreateListing = () => {
    const [files, setFiles] = useState([]);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploadImage, setUploadImage] = useState(false);
    const [formData, setFormData] = useState({
        imageUrls:[],

    })
    console.log(formData)
    const handleImageUpload=(e)=>{
            e.preventDefault();
            if(files.length>0 && files.length+ formData.imageUrls?.length<7){
                setUploadImage(true);
                setImageUploadError(false)
                const promises = [];
                for(let i=0;i<files?.length;i++){
                    promises.push(storeImage(files[i]))
                }
                Promise.all(promises).then((urls)=>{
                    setFormData({...formData, imageUrls:formData.imageUrls.concat(urls)});
                    setImageUploadError(false);
                    setUploadImage(false);
                }).catch((err)=>{
                    setImageUploadError('Image Upload failed (2 mb max/image)')
                })
            }else{
                setImageUploadError('You can only upload 6 images per listing')
                setUploadImage(false)
            }
    }
    const storeImage= async(files)=>{
        return new Promise((resolve,reject)=>{
            const storage = getStorage(app);
            const fileName = new Date().getTime()+files.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef,files);
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                const progess =     (snapshot.bytesTransferred/snapshot.totalBytes) *100;
                console.log(`Upload file completed ${progess} %`)
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                        resolve(downloadUrl);
                    })
                }
            )

        })

    }

    const handleRemoveImage=(i)=>{
        setFormData({
            ...formData,
            imageUrls:formData.imageUrls.filter((_,index)=>index!==i)
        })
    }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
            <input type="text" className='border p-3 rounded-lg' placeholder='Name' name="name" id="name" maxLength='62' minLength='10' required />
            <textarea type="text" className='border p-3 rounded-lg' placeholder='Description' id="description" required />
            <input type="text" className='border p-3 rounded-lg' placeholder='Address' name="name" id="name" maxLength='62' minLength='10' required />
            <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="" id="sell" className='w-5' />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="" id="rent" className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="" id="parking" className='w-5' />
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="" id="furnished" className='w-5' />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="" id="offer" className='w-5' />
                        <span>Offer</span>
                    </div>
            </div>
            <div className='flex flex-wrap gap-4 '>
                    <div className=" flex items-center gap-2">
                        <input type="number" className='p-3 w-20 border-gray-300 rounded-lg' name="" id="bedrooms" min='1' max='5'  />
                        <p>Beds</p>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input type="number" className='p-3 w-20 border-gray-300 rounded-lg' name="" id="bathrooms" min='1' max='5' />
                        <p>Baths</p>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input type="number" className='p-3 w-20 border-gray-300 rounded-lg' name="" id="regularPrice" />
                        <div className="flex flex-col items-center">
                        <p>Regular Price</p>
                        <span className='text-sm'>$/month</span>
                        </div>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input type="number" className='p-3 w-20 border-gray-300 rounded-lg' name="" id="discountPrice" />   
                        <div className="flex flex-col items-center">
                        <p>Discount Price</p>
                        <span className='text-sm'>$/month</span>
                        </div>
                    </div>
                 
            </div>
            </div>
            <div className='flex flex-col flex-1 gap-4 '>
                <p className='font-semibold '>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max:6)</span>
                </p>
                <div className='flex gap-4'>
                    <input type="file" onChange={(e)=>setFiles(e.target.files)} id='images' accept='image/*' multiple className='p-3 border border-gray-300 rounded-xl w-full' />
                    <button disabled={uploadImage} onClick={handleImageUpload} className='p-3 text-green-700  border border-green-700 rounded uppercase  hover:shadow-lg disabled:opacity-80'>
                        {uploadImage?'Uploading..':'upload'}
                    </button>

          
                </div>
                <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
            {
                formData.imageUrls?.length>0 && formData.imageUrls?.map((url,i)=>(
                    <div key={url} className=" flex justify-between p-3 border items-center">
                    <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
                    <button onClick={()=>handleRemoveImage(i)} className='text-red-700 text-sm uppercase hover:opacity-75 disabled:opacity-80'>Delete</button>
                    </div>
                ))
            }
            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
            
            </div>
        </form>
    </main>
  )
}

export default CreateListing