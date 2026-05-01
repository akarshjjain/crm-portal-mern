import React from 'react'
import { useAuth } from '../../context/authContext';

const Navbar = () => {
    const {user}= useAuth();
    return (
    <div className="flex items-center text-white justify-between h-12 bg-[#2832C2] px-5 " >
      <p>Welcome {user.name}</p>
      <button className='px-4 py-1 bg-[#1520A6] hover:bg-[#051094]'>Logout</button>
    </div>
  )
}

export default Navbar
