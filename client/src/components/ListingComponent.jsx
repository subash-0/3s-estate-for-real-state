import React from 'react'
import {Link} from 'react-router-dom'
import { LiaBedSolid } from "react-icons/lia";
import {  MdLocationOn, MdWifi, MdWifiOff} from 'react-icons/md'
import { TbParkingOff, TbParking, TbToolsKitchen2,TbToolsKitchen2Off, TbBath, TbBathOff, TbArmchair2,TbArmchair2Off } from "react-icons/tb";
const ListingComponent = ({list}) => {
  
  return (
    <div className='bg-white shadow-lg hover:shadow-2xl w-full sm:w-[19rem] rounded-lg overflow-hidden'>
        <Link to={`/listing/${list._id}`}>
            <img src={list?.imageUrl} alt="listing cover" className='h-[16rem] w-full object-cover sm:h-[15rem]  hover:scale-105 transition-all duration-300' />
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>{list?.name}</p>
                <Link to={`https://maps.google.com/?q=${list?.address}`} className='flex items-center gap-2 text-sm hover:underline '>
                  <MdLocationOn  className='h-4 w-4 text-green-700'/> <p className='truncate text-gray-600'>{list?.address}</p>
                </Link>
                <div className='text-sm text-gray-600'>
                  <p className='line-clamp-2'>{list?.description}</p>
                </div>
                <div className='flex text-slate-700 gap-2 items-center font-semibold mt-2'> 
                <p className='text-xl'>रु.
                 </p>{list?.offer ? (+list?.regularPrice- +list?.discountPrice).toLocaleString('en-US'): list?.regularPrice.toLocaleString('en-US')}
                 {list?.type ==='rent'?'/month':'' }
                 { list?.type==='rent'?list?.status?<p className='p-1 bg-green-700 text-white rounded-lg text-sm'>vacant</p>:
                 <p className='p-1 bg-red-700 text-white rounded-lg text-sm'>booked</p>:list?.status?<p className='p-1 bg-green-700 text-white rounded-lg text-sm'>unsold</p>:<p className='p-1 bg-red-700 px-2 text-white rounded-lg text-sm'>sold</p>
                 }
                </div>
                <div className='flex gap-4 items-center text-green-700'>
                  
                   <div className=" flex items-center gap-1 text-sm">
                        {list?.bathrooms>0?<LiaBedSolid  className='h-4 w-4'/>:''} 
                    </div>
                   <div className=" flex items-center gap-1 text-sm">

                        {list?.type ==='rent'? list?.parkings?<MdWifi />:<MdWifiOff /> :list?.parkings?<TbParking />:<TbParkingOff />} 
                      </div>
                      <div className='flex items-center gap-1 whitespace-nowrap '>
                    {list?.type ==='rent'? <div className="flex items-center gap-3">
                   {+list?.bedrooms>0? <TbToolsKitchen2 />: <TbToolsKitchen2Off />}
                    </div>:<div className='flex items-center gap-3'>
                   {+list?.bedroomss>0 ? <TbBath /> : <TbBathOff />}
                        </div>}
                    </div>

                    <div className="flex items-center gap-3">

                  {list?.furnished?<TbArmchair2 />:<TbArmchair2Off />}
                    </div>
                 
                </div>
               
            </div>
        </Link>
    </div>
  )
}

export default ListingComponent