"use client"
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { useCouserProvider } from '@/context/StudyContext'
import { UserResponse } from '@/types'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const UpgradePage = () => {
  const{user}=useUser()
  const email=user?.primaryEmailAddress?.emailAddress
  const[loading,setLoading]=useState(false)
  const[userDetails,setUserDetails]=useState<UserResponse>()
  const{tokenCount,setTokenCount,isMember,setIsMember}=useCouserProvider()
  const isNotValid=!isMember && tokenCount>=5
  useEffect(()=>{
     user && checkUserStatus()
  },[user])
  const checkUserStatus=async()=>{
    setLoading(true)
    try {
      const res = await fetch(`/api/check-user-status?email=${email}`);
      const {user} = await res.json();
     setUserDetails(user)      
    } catch (error) {
      toast.error('Error happend')
    }finally{
      setLoading(false)
    }
   
  }

  const onCheckOut=async()=>{
    const result=await axios.post('/api/payment/checkout',{
      priceId:process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
      email:user?.primaryEmailAddress?.emailAddress
    })
  
 
    
    window.open(result?.data?.session?.url)
  }
  if(loading){
   return <Loading/>
  }

  console.log("user details",userDetails);
  
  return (
    <div>
      <h2 className='text-3xl font-semibold'>Plans</h2>
   

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>

      {userDetails?.isMember ? (
            <div className='p-4 border rounded-lg flex flex-col items-center gap-4 shadow-md'>
                 <h2 className='text-xl font-bold text-center'> Your Current Plan</h2>
            <h2 className='text-xl font-bold text-center'>💎 Premium</h2>
            <h3 className='text-3xl font-bold text-center'>$9.99 / month</h3>
            <ul className='list-inside text-gray-700 space-y-1'>
              <li>📚 Unlimited Course Generations</li>
              <li>📄 Unlimited Resume Generations</li>
              <li>📅 Meeting Scheduling</li>
              <li>📧 Email Support</li>
              <li>🛟 Help Center Access</li>
            </ul>
            <div className='flex gap-2 mt-4'>
              <Link href={'/dashboard'}  className='cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>Let's Learn</Link>
             
            </div>
          </div>
      ):(
         isNotValid ?(
              <> 
              <div className='p-4 border rounded-lg flex flex-col items-center gap-4 shadow-md'>
              <h2 className='text-xl font-bold text-center'>🚀 Free</h2>
              <h3 className='text-3xl font-bold text-center'>0$ / month</h3>
              <ul className='list-inside text-gray-700 space-y-1'>
                <li>📚 5 Course Generations</li>
                <li>📄 5 Resume Generations</li>
                <li>📧 Email Support</li>
                <li>🛟 Help Center Access</li>
              </ul>
              <div className='flex gap-2 mt-4'>
              <Button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600' disabled >Get Started</Button>
              <Button className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'>Learn More</Button>
              
                
              </div>
              </div>
               
              <div className='p-4 border rounded-lg flex flex-col items-center gap-4 shadow-md'>
              <p>Upgrade your plan to get more features</p>
            <h2 className='text-xl font-bold text-center'>💎 Premium</h2>
            <h3 className='text-3xl font-bold text-center'>$9.99 / month</h3>
            <ul className='list-inside text-gray-700 space-y-1'>
              <li>📚 Unlimited Course Generations</li>
              <li>📄 Unlimited Resume Generations</li>
              <li>📅 Meeting Scheduling</li>
              <li>📧 Email Support</li>
              <li>🛟 Help Center Access</li>
            </ul>
            <div className='flex gap-2 mt-4'>
              <Button onClick={onCheckOut}  className='cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>Upgrade</Button>
              <Button className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'>Learn More</Button>

            </div>
              </div>

              </>
         ):(
             <>
            
        <div className='p-4 border rounded-lg flex flex-col items-center gap-4 shadow-md'>
        <h2 className='text-xl font-bold text-center'>🚀 Free</h2>
        <h3 className='text-3xl font-bold text-center'>0$ / month</h3>
        <ul className='list-inside text-gray-700 space-y-1'>
          <li>📚 5 Course Generations</li>
          <li>📄 5 Resume Generations</li>
          <li>📧 Email Support</li>
          <li>🛟 Help Center Access</li>
        </ul>
        <div className='flex gap-2 mt-4'>
        <Button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Get Started</Button>
        <Button className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'>Learn More</Button>
        
          
        </div>
        </div>

        <div className='p-4 border rounded-lg flex flex-col items-center gap-4 shadow-md'>
              <p>Upgrade your plan to get more features</p>
            <h2 className='text-xl font-bold text-center'>💎 Premium</h2>
            <h3 className='text-3xl font-bold text-center'>$9.99 / month</h3>
            <ul className='list-inside text-gray-700 space-y-1'>
              <li>📚 Unlimited Course Generations</li>
              <li>📄 Unlimited Resume Generations</li>
              <li>📅 Meeting Scheduling</li>
              <li>📧 Email Support</li>
              <li>🛟 Help Center Access</li>
            </ul>
            <div className='flex gap-2 mt-4'>
              <Button onClick={onCheckOut}  className='cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>Upgrade</Button>
              <Button className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'>Learn More</Button>

            </div>
              </div>

        </>
            
         )
       
      )}
      
       

      </div>


    </div>

  )
}

export default UpgradePage