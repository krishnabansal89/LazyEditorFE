import React from 'react'
import Navbar from '@/components/navbar'
import Home from '@/components/home'


export default function page() {
  return (
    <div className='w-[100%] h-[100vh] bg-[#000000] '>
      <Navbar />
      
      <Home />
    </div>
  )
}
