// "use client"
import React from 'react'
import Navbar from '@/components/navbar'
import Home from '@/components/home'


export default function Page() {
  
  return (
    <div className='w-[100%] h-[100vh] bg-[#000000] '>
      {/* <Joyride steps={steps}/> */}
      
      <Navbar />
       
      <Home />
    </div>
  )
}
