import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
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
                        <div className="h-[500px] w-full" style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>
                    </SwiperSlide>
                ))}
           </Swiper>
           </>
        )}
    </main>
  )
}

export default ListingPage