import React, { useEffect, useState } from 'react'
import { IoIosShareAlt } from "react-icons/io";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";
import {useParams} from 'react-router-dom'
import { MdLocationPin } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
const ListingPage = () => {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const params = useParams();
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
    <main>
        {loading && <p className='text-green-700 text-center text-sm'>Loading ...</p>  }
        {error && <p className='text-green-700 text-clip text-sm'>Something went wrong!</p>  }
        {listing && !loading && !error &&(
           <>
           <Swiper navigation>
                {listing.imageUrl.map((url,i)=>(
                    <SwiperSlide key={i}>
                        <div className="h-[500px] w-full" style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}>
                        <div className='absolute bg-white p-2 rounded-full right-2 top-2 text-2xl text-green-700'>
                            <IoIosShareAlt />
                        </div>
                        </div>
                    </SwiperSlide>
                ))}
           </Swiper>
           <div className='p-3 max-w-screen-2xl mx-auto'>
           {listing && (
                <h1 className='text-2xl font-semibold'>
                    {listing?.name}
                     -$
                    {
                    listing.type ==='offer'?
                    listing?.discountPrice.toLocaleString('en-US') :
                    listing?.regularPrice.toLocaleString('en-US') 
                    }
                    {
                        listing.type === 'rent' && '/month'
                    }
                </h1>
            )}
            <p className='flex items-center my-6 gap-2 text-slate-600  text-sm'>
                    <MdLocationPin /> 
                    {listing?.address}
            </p>

            <div className='flex gap-4'>
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                   {listing?.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {
                    listing?.offer && (
                        <p className="bg-green-700 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                            ${+listing?.regularPrice -+listing?.discountPrice}
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
                   <FaBath  className='text-lg'/> 
                   {+listing?.bathrooms <= 1 ? `${listing?.bathrooms} Bath` : `${listing?.bathrooms} Baths`}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                   <FaParking  className='text-lg'/> 
                   {+listing?.parkings ? `Parkings` : `No Parkings`}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                   <FaChair  className='text-lg'/> 
                   {+listing?.furnished ? `Furnished` : `Unfurnished`}
                </li>
            </ul>
           </div>
        

           </>
        )}
    </main>
  )
}

export default ListingPage