"use client"

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const WelcomeBanner = () => {
  const{user}=useUser()
  return (
    <div className='p-5 text-white rounded-lg bg-primary flex items-center gap-10'>
      <Image src={'/banner1.svg'} width={200} height={200} alt='banner' className='hidden md:block'/>
      <div>
        <h2 className='font-bold text-3xl'>Hello, {user?.firstName}</h2>
        <p>Welcome Back,Let's learn Something New....</p>
      </div>
    </div>
  )
}

export default WelcomeBanner