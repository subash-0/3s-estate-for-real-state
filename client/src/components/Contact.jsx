import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
const Contact = ({listing}) => {
  const [landLord, setLandLord] = useState(null)
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchLandLord = async()=>{
      try {
        const res = await fetch(`/api/v1/${listing.userRef}`);
        const data = await res.json();
        if(data.success === false){
          return;
        }
        setLandLord(data);
        
      } catch (error) {
      }
    }

    fetchLandLord();
  
  }, [listing.userRef])
  const handleChange =(e)=>{
    setMessage(e.target.value)
  }
  return (
    <div className="flex items-center justify-center hue-rotate-90">
    <div className='flex flex-col gap-3 drop-shadow-2xl z-10 bg-slate-200 p-3 rounded-lg'>
      <p>
        Contact <span className='font-semibold'>{landLord?.username}</span>{' '}
        for {''} <span className='font-semibold'>{listing?.name.toLowerCase()}</span>
      </p>
      <textarea name="message" id="message" placeholder='Type your message here' rows="2" value={message} onChange={handleChange}  className='w-full p-3 rounded-lg'>


      </textarea>
      <Link to={`mailto:${landLord?.email}?subject=Regarding  ${listing?.name}&body=${message}`}  target='_blank' className='bg-slate-700 text-white text-center p-3 rounded-lg  hover:opacity-95'>
      Send Message
      </Link>
    </div>
    </div>
  )
}

export default Contact