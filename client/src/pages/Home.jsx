import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';

import 'swiper/css/bundle';
import { ListingComponent } from '../components';
const Home = () => {
  SwiperCore.use(Navigation)
  const [offerListings, setOfferListings] = useState([])
  const [salesListings, setSalesListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  console.log(offerListings)
  useEffect(() => {
    const fetchOfferListing =async ()=>{
      try {
        const res = await fetch('/api/v1/listing/getall?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListing();
      } catch (error) {
      }
    }
    const fetchRentListing =async ()=>{
      try {
        const res = await fetch('/api/v1/listing/getall?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSalesListing();
      } catch (error) {
      }
    }
    const fetchSalesListing =async ()=>{
      try {
        const res = await fetch('/api/v1/listing/getall?type=sale&limit=4');
        const data = await res.json();
        setSalesListings(data);
      } catch (error) {
      }
    }
    fetchOfferListing();
  }, [])
  
  return (
    <div >
      {/* top */}
      <div className=" flex flex-col gap-6 p-28  px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find A <span className='text-slate-500'>Perfect</span> 
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          3S Finder is the best place to find a perfect room/flat to live
          <br />
          We have wide range of places for you to choose
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-700 font-bold hover:underline'>Let's get Started...</Link>
      </div>
      <Swiper navigation>
         
                {offerListings && offerListings?.length>0 && offerListings?.map((list,i)=>(
                    <SwiperSlide key={i} >
                        <div className="h-[500px] w-full" style={{background:`url(${list.imageUrl[0]}) center no-repeat`, backgroundSize:'cover'}}>
                       
                        </div>
                    </SwiperSlide>
                ))}
           </Swiper>
           <div className='max-w-7xl mx-auto p-3 flex-col gap-8 my-10'>
                  {
                    offerListings && offerListings?.length>0 && (
                      <div className="my-10">
                        <div className="">
                          <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                          <Link to={'/search?offer=true'} className='text-sm text-blue-800 hover:underline'>
                            Show more offers
                          </Link>
                          <div className=' flex gap-3 my-4 flex-wrap'>
                            {offerListings.map((listing,i)=>(

                          <ListingComponent key={i} list={listing}   />
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  {
                    rentListings && rentListings?.length>0 && (
                      <div className=" my-10">
                        <div className="">
                          <h2 className='text-2xl font-semibold text-slate-600'>Recent places for Rent</h2>
                          <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover:underline'>
                           Show more places for rent
                          </Link>
                          <div className=' flex gap-3 my-4 flex-wrap'>
                            {rentListings.map((listing,i)=>(

                          <ListingComponent key={i} list={listing}   />
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  }
           </div>
      
      </div>
  )
}

export default Home