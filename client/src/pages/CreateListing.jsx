import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
const CreateListing = () => {
  const navigate = useNavigate();
  const {currentUser} = useSelector(state=>state.user);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 0,
    bathrooms: 1,
    regularPrice: 2500,
    discountPrice: 0,
    owernerPhone:'',
    offer: false,
    parkings: false,
    furnished: false,
    status:false,
  });
  console.log(formData);
  const handleImageUpload = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length + formData.imageUrl?.length < 7) {
      setUploadImage(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files?.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrl: formData.imageUrl.concat(urls),
          });
          setImageUploadError(false);
          setUploadImage(false);
        })
        .catch((err) => {
          setImageUploadError("Image Upload failed (2 mb max/image)");
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploadImage(false);
    }
  };
  const storeImage = async (files) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + files.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, files);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progess =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload file completed ${progess} %`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleRemoveImage = (i) => {
    setFormData({
      ...formData,
      imageUrl: formData.imageUrl.filter((_, index) => index !== i),
    });
  };

  const handChange = (e) => {
    if(e.target.id === 'sale' || e.target.id === 'rent'){
        setFormData({
            ...formData,
            type:e.target.id
        })
    }

    if(e.target.id === 'parkings' || e.target.id === 'furnished' || e.target.id === 'offer' || e.target.id === 'status'){
        setFormData({
            ...formData,
            [e.target.id] : e.target.checked
        })
    }
    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }

  };
  const handFormSubmit = async(e)=>{
    e.preventDefault();
    try {
      if(formData.imageUrl.length<1) return setError("You must upload an image.");
      if(+formData.regularPrice<+formData.discountPrice) return setError("Please check your price, again !");
      setLoading(true);
      setError(false);
      const res = await fetch('/api/v1/listing/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          ...formData,
          userRef:currentUser._id,
        })
      })
      const data = await res.json();
      setLoading(false);
      if(data.success == false){
        setError(data.message);
        return;

      }
      navigate(`/listing/${data._id}`);
        
    } catch (error) {
      setError(error.message);
      setLoading(false);
        
    }
  }
  return (
    <main className="p-3 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form  onSubmit={handFormSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Owner's name"
            name="name"
            id="name"
            maxLength="62"
            minLength="10"
            onChange={handChange}
            value={formData.name}
            required
          />
          <textarea
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Houses' hescription"
            id="description"
            onChange={handChange}
            value={formData.description}
            required
          />
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Address"
            name=""
            id="address"
            onChange={handChange}
            value={formData.address}
            required
          />
          <input
            type="number"
            className="border p-3 rounded-lg"
            placeholder="Owners' phone numbers"
            name=""
            maxLength='10'
            id="owernerPhone"
            onChange={handChange}
            value={formData.owernerPhone}
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2" >
              <input type="checkbox" name="" id="sale" className="w-5" onChange={handChange} checked={formData.type==='sale'} disabled />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="rent" className="w-5" onChange={handChange} checked={formData.type==='rent'} />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="status" className="w-5" onChange={handChange} checked={formData.status} />
              <span>{formData.type === 'rent'?'Vacant':'Unsold'}</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="parkings" className="w-5" onChange={handChange} checked={formData.parkings} />
              <span>{formData.type === 'rent'?'WI-FI':'Parking Spot'}</span>
            </div>
           
            <div className="flex gap-2">
              <input type="checkbox" name="" id="furnished" className="w-5" onChange={handChange} checked={formData.furnished} />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="offer" className="w-5"  onChange={handChange} checked={formData.offer}/>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 ">
          <div className=" flex items-center gap-2">
              <input
                type="number"
                className="p-3 w-20 border-gray-300 rounded-lg"
                name=""
                id="bathrooms"
                min="1"
                max="5"
                onChange={handChange}
                value={formData.bathrooms}
              />
              <p>Beds</p>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                className="p-3 w-20 border-gray-300 rounded-lg"
                name=""
                id="bedrooms"
                min="0"
                max="5"
                onChange={handChange}
                value={formData.bedrooms}
              />
              <p>{formData.type==='rent'?'Kitchen':"Bath"}</p>
            </div>
           
            <div className=" flex items-center gap-2">
              <input
                type="number"
                className="p-3 w-20 border-gray-300 rounded-lg"
                name=""
                id="regularPrice"
                min={"50"}
                max={"100000"}
                onChange={handChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-sm">$/month</span>
              </div>
            </div>
            {formData.offer &&  <div className=" flex items-center gap-2">
              <input
                type="number"
                className="p-3 w-20 border-gray-300 rounded-lg"
                name=""
                id="discountPrice"
                onChange={handChange}
                value={formData.discountPrice}
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-sm">$/month</span>
              </div>
            </div> }
           
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4 ">
          <p className="font-semibold ">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max:6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded-xl w-full"
            />
            <button
              disabled={uploadImage || loading}
              onClick={handleImageUpload}
              className="p-3 text-green-700  border border-green-700 rounded uppercase  hover:shadow-lg disabled:opacity-80"
            >
              {uploadImage ? "Uploading.." : <FaCloudUploadAlt />}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrl?.length > 0 &&
            formData.imageUrl?.map((url, i) => (
              <div
                key={url}
                className=" flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(i)}
                  className="text-red-700 text-sm uppercase hover:opacity-75 disabled:opacity-80"
                >
                 <MdDelete />
                </button>
              </div>
            ))}
          <button disabled={loading} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading?'Creating ....':'Create Listing'}
          </button>
          {error && <p className="text-sm text-red-700">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
