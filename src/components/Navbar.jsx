import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-purple-900 text-white py-1.5'>
       <div className="logo">
        <span className='text-xl font-bold mx-5 hover:text-black'>myTask</span>
       </div>
       <ul className="flex gap-7 mx-3 ">
        <li className='hover:font-bold  cursor-pointer transition-all '>Home</li>
        <li className='hover:font-bold  cursor-pointer transition-all '>Tasks</li>
       </ul>
    </nav>
  )
}

export default Navbar
