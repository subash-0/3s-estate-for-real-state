import {FaSearch} from 'react-icons/fa'
import {FaHome,FaSignInAlt,FaUser} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom"
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
const Header = () => {
  const {currentUser} = useSelector(state=>state.user);
  const [searchTerm, setsearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit =(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searhTermfromuRL = urlParams.get('searchTerm');
    if(searhTermfromuRL) setsearchTerm(searhTermfromuRL);
  
  }, [location.search])
  
  return (
    <header className='bg-slate-400 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to={"/"}>
        
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
      <span className='text-slate-500'>3S</span>
      <span className='text-slate-700'>-Finder</span>
      </h1>
      </Link>
    
      <form onSubmit={handleSubmit} className='bg-slate-100 p-2 rounded-2xl flex items-center justify-center'>
        <input type="text" placeholder='Search ...' className='bg-transparent focus:outline-none p-1 w-34 sm:w-64' value={searchTerm}  onChange={(e)=>setsearchTerm(e.target.value)}/>
        <button >
        <FaSearch  className='rounded-full p-2 bg-transparent text-3xl'/>
        </button>
      </form>
      
      </div>
      <div className='flex justify-center items-center  shadow-md'>
      <ul className='flex gap-5 fixed bottom-2 z-40  hover:opacity-100 p-3 px-5 justify-center items-center   rounded-full uppercase bg-transparent hover:backdrop-blur-lg drop-shadow-sm'>
        <Link to={"/"}>
        <li className='hover:bg-slate-500 p-2  hover:text-white rounded-full flex gap-3 items-center justify-center'> <FaHome/> </li>
        </Link>
        <Link to={"/about"}>
        <li className='hover:bg-slate-500 p-2  hover:text-white rounded-full flex gap-3 items-center justify-center'> <FaUser/></li>
        </Link>
        <Link  to={"/profile"}>
            {currentUser ? <img src={currentUser.avatar} className='rounded-full h-8 w-8 object-coverhover hover:bg-slate-500 p-1 hover:text-white bg-gradient-to-r from-pink-500 to-yellow-500' alt="Profile IMage" /> :<li className='hover:bg-slate-500 p-2 hover:text-white rounded-full flex gap-3 items-center justify-center'> <FaSignInAlt/></li>}
        </Link>
     
      </ul>
      </div>
    </header>
  )
}

export default Header