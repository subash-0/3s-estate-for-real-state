import React from 'react'
import { FaGithub,FaFacebook,FaLinkedin,} from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { MdEmail, MdOutlinePhone } from "react-icons/md";
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <div className='bg-slate-400 text-white py-10 relative h-auto   w-full'>
        <div className="flex flex-wrap gap-5   bottom-0 justify-evenly">
            <div className="">
                <h1 className='text-2xl font-semibold'>Usefull Links</h1>
                <div className="px-5 p-2 flex flex-col gap-1 uppercase">
                    <Link to={'/'} className='hover:underline'>Home</Link>
                    <Link to={'/about'} className='hover:underline'>About</Link>
                    <Link to={'/search'} className='hover:underline'>Search</Link>
                    <Link to={'/profile'} className='hover:underline'>Profile</Link>
                </div>
            </div>
            <div className="">
              
              <h1 className='text-2xl font-semibold'>Creator</h1>
              <div className="py-3">
                <Link to={'https://firebasestorage.googleapis.com/v0/b/fir-estate-5d44f.appspot.com/o/1708763216251avator2-removebg.png?alt=media&token=8f1cd784-8b89-4f99-b805-81368b2bfac8'} target='_blank'>
              <img src="https://firebasestorage.googleapis.com/v0/b/fir-estate-5d44f.appspot.com/o/1708763216251avator2-removebg.png?alt=media&token=8f1cd784-8b89-4f99-b805-81368b2bfac8" alt="Subash"  className='h-[6rem] w-[8rem] rounded-lg aspect-square shadow-sm' />
              </Link>
              <Link to={'https://www.facebook.com/SK.Thecoder'} target='_blank' className='hover:underline'>
              Subash Kumar Yadav
              </Link>
              <p className='flex flex-wrap'>MAHA GADHIMAI-09, BARA</p>
              <p className='flex flex-wrap'>BE-BCT <span className='text-sm px-2 mt-1'>RUNNING</span></p>
            </div>
            </div>
            <div className="">
              <h1 className='text-2xl font-semibold'>Contact</h1>
              <div className=" my-3">
                <Link to='tel:+977-9811202751' className='text-white flex gap-2 items-center hover:underline' target='_blank'><MdOutlinePhone />
                +977-98-11202751
                </Link>
                <Link to='mailto:subashwp2@gmail.com' className='text-white flex gap-2 items-center hover:underline' target='_blank'><MdEmail />
                subashwp2@gmail.com
                </Link>
                <Link to='https://github.com/subash-0' className='text-white flex gap-2 items-center hover:underline' target='_blank'><FaGithub />
                subash-0
                </Link>
                <Link to='https://www.linkedin.com/in/subash-kumar-yadav' className='text-white flex gap-2 items-center hover:underline' target='_blank'><FaLinkedin />
                Subash Kumar Yadav
                </Link>
                <Link to='https://www.facebook.com/SK.Thecoder' className='text-white flex gap-2 items-center hover:underline' target='_blank'><FaFacebook />
                Subash Kumar Yadav
                </Link>
                <Link to='https://yadavsk.netlify.app/' className='text-white flex gap-2 items-center hover:underline' target='_blank'><FcBusinessman />
                Subash Kumar Yadav
                </Link>
              </div>
            </div>

        </div>
    </div>
  )
}

export default Footer