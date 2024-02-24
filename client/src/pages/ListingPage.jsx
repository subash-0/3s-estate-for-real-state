import React, { useEffect, useState } from 'react'
import { FaWifi } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";
import {useParams} from 'react-router-dom'
import { MdLocationOn, MdPhone} from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {useSelector} from 'react-redux'
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import {Contact} from '../components'
import {Link} from 'react-router-dom'
const ListingPage = () => {
    const {currentUser} = useSelector((state)=>state.user);
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const params = useParams();
    const [constact, setConstact] = useState(false);
    const listId = params.listId;
    useEffect(() => {
      const fetchListing = async ()=>{
        try {
            const result = await fetch(`/api/v1/listing/getListing/${listId}`);
            const data = await result.json();
            if(data.success === false){
                setError(data.message)
                setLoading(false)
                return;
            }
            setListing(data)
            setLoading(false)
            setError(false)
            
        } catch (error) {
            setError(true)
        }
      
      }
      fetchListing();
    }, [listId])
    
    
  return (
    <main className='min-h-screen'>
        {loading && <p className='text-green-700 text-center text-sm'>Loading ...</p>  }
        {error && <p className='text-green-700 text-clip text-sm'>Something went wrong!</p>  }
        {listing && !loading && !error &&(
           <>
           <Swiper navigation>
           <button className='fixed bg-white p-2 rounded-full right-2 top-[120px] shadow-md hover:opacity-95 cursor-pointer z-10 text-2xl text-green-700'>
                            <IoIosShareAlt />
                        </button>
                {listing.imageUrl.map((url,i)=>(
                    <SwiperSlide key={i} >
                        <div className="h-[500px] w-full" style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}>
                       
                        </div>
                    </SwiperSlide>
                ))}
           </Swiper>
         
           <div className='p-3 max-w-screen-2xl mx-auto'>
           
           {listing && (
                <h1 className='text-2xl font-semibold mt-10 flex gap-3 flex-wrap'>
                    {listing?.name}
                     <p>- रु.</p>
                    {
                    listing.type ==='offer'?
                    listing?.discountPrice.toLocaleString('en-US') :
                    listing?.regularPrice.toLocaleString('en-US') 
                    }
                    {
                        listing.type === 'rent' && '/month'
                    }
                    <p className='text-sm max-w-fit text-white'>
                        {listing?.type ==='rent'? listing?.status? <p className='px-3 p-1 bg-green-700 rounded-lg'>vacant</p>:<p className='px-3 p-1 bg-red-700 rounded-lg'>booked</p> :listing?.status? <p className='px-3 p-1 bg-green-700 rounded-lg'>unsold</p>:<p className='px-3 p-1 bg-red-700 rounded-lg'>sold</p> }
                        
                    </p>
                </h1>
            )}
            <div className='flex gap-4 my-1'>
            <p className='flex items-center my-6 gap-2 text-slate-600  text-sm'>
            <Link target='_blank' to={`https://maps.google.com/?q=${listing?.address}`} className='flex items-center gap-2 text-sm hover:underline '>
                  <MdLocationOn  className='h-4 w-4 text-green-700'/> <p className='truncate text-gray-600'>{listing?.address}</p>
                </Link>
            </p>
            <p className='flex items-center my-6 gap-2 text-slate-600  text-sm'>
            <Link target='_blank' to={`tel:${listing?.owernerPhone}`} className='flex items-center gap-2 text-sm hover:underline '>
                  <MdPhone  className='h-4 w-4 text-green-700'/> <p className='truncate text-gray-600'>+977-{listing?.owernerPhone}</p>
                </Link>
            </p>
            </div>
           

            <div className='flex gap-4'>
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                   {listing?.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {
                    listing?.offer && (
                        <p className="bg-green-700 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                            रु.{(+listing?.regularPrice -+listing?.discountPrice).toLocaleString('en-US')}
                        </p>
                    )
                }
            </div>

            <p className=" text-slate-800 my-7"><span className='font-semibold text-black'>Description - </span>{listing?.description} </p>

            <ul className='text-green-900 font-semibold text-sm flex gap-4 sm:gap-6 mb-10 flex-wrap'>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                   <FaBed  className='text-lg'/> 
                   {+listing?.bathrooms <= 1 ? `${listing?.bathrooms} Bed` : `${listing?.bathrooms} Beds`}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                    {listing?.type ==='rent'? <div className="flex items-center gap-3">
                    <FaKitchenSet  className='text-lg'/> 
                   {+listing?.bedrooms <= 1 ? `${listing?.bedrooms} Kitchen` : `${listing?.bedrooms} Kitchens`}
                    </div>:<div className='flex items-center gap-3'>
                    <FaBath  className='text-lg'/> 
                   {+listing?.bedrooms <= 1 ? `${listing?.bedrooms} Bath` : `${listing?.bedrooms} Baths`}
                        </div>}
                   
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                    {listing?.type ==='rent'?
                    <div className="flex items-center gap-3"> <FaWifi  className='text-lg'/>
                    {+listing?.parkings ? 'WI-FI' : 'NO WI-FI'} </div>
                    :
                    <div className="flex items-center gap-3"> <FaParking  className='text-lg'/> 
                    {+listing?.parkings ? `Parkings` : `No Parkings`} </div>
                    }
                   
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                   <FaChair  className='text-lg'/> 
                   {+listing?.furnished ? `Furnished` : `Unfurnished`}
                </li>
            </ul>

            <div className="mb-20">
                {
                    !constact && listing?.userRef!==currentUser?._id &&(
                        <div className=" flex gap-4 sm:6">
                         <button onClick={()=>setConstact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 w-full p-3 '>Contact LandLord via Email</button>
                        <Link to={`tel:${listing?.owernerPhone}`} target='_blank' className='bg-slate-700 text-white text-center rounded-lg uppercase hover:opacity-95 w-full p-3 '>CONTACT VIA PHONE</Link>
                        </div>
                      
                    )
                }
                {constact && <Contact listing = {listing} />}
               
            </div>
           </div>
        

           </>
        )}
    </main>
  )
}

export default ListingPage