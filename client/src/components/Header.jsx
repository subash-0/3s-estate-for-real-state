import {FaSearch} from 'react-icons/fa'
import {FaHome,FaSignInAlt,FaUser} from "react-icons/fa";
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux'
const Header = () => {
  const {currentUser} = useSelector(state=>state.user);
  console.log(currentUser)
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to={"/"}>
        
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
      <span className='text-slate-500'>3S</span>
      <span className='text-slate-700'>Estate</span>
      </h1>
      </Link>
    
      <form action="" className='bg-slate-100 p-3 rounded-2xl flex items-center justify-center'>
        <input type="text" placeholder='Search ...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
        <FaSearch  className='rounded-full p-2 bg-white text-3xl'/>
      </form>
      
      </div>
      <div className='flex justify-center items-center '>
      <ul className='flex gap-4 fixed bottom-2 justify-center items-center   rounded-full uppercase bg-blue-100 hover:drop-shadow-sm'>
        <Link to={"/"}>
        <li className='hover:bg-slate-500 p-4 px-5 hover:text-white rounded-xl flex gap-3 items-center justify-center'> <FaHome/> <span>Home</span> </li>
        </Link>
        <Link to={"/about"}>
        <li className='hover:bg-slate-500 p-4 px-5 hover:text-white rounded-xl flex gap-3 items-center justify-center'> <FaUser/> <span>About</span> </li>
        </Link>
        <Link  to={"/profile"}>
            {currentUser ? <img src={currentUser.avatar} className='rounded-full h-9 w-9 object-coverhover hover:bg-slate-500 p-1 hover:text-white mx-5' alt="Profile IMage" /> :<li className='hover:bg-slate-500 p-4 px-5 hover:text-white rounded-xl flex gap-3 items-center justify-center'> <FaSignInAlt/> <span>SignIn</span> </li>}
        </Link>
     
      </ul>
      </div>
    </header>
  )
}

export default Header