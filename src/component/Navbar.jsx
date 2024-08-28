import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg';
function Navbar() {
  return (
      <div className='flex space-x-8 items-center pl-3 py-4'>
      <Link to="/">
          <img className='w-[50px]' src={Logo}></img>
      </Link>
        <Link className='text-blue-500 text-3xl font-bold' to="/">Home</Link>
        <Link className='text-blue-500 text-3xl font-bold' to="/watchlist">WatchList</Link>
    
    </div>
  )
}

export default Navbar