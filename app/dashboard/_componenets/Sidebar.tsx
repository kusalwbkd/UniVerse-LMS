"use client"
import React from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { menuList } from '../menulist'
import { useCouserProvider } from '@/context/StudyContext'
const Sidebar = () => {

 

  const pathName=usePathname()
    const{tokenCount,setTokenCount,isMember,setIsMember}=useCouserProvider()
    const disabled=!isMember && tokenCount>=5

  return (
    <div className='h-screen shadow-md p-5'>
      <div>
        <Logo/>
      </div>

      <div className='mt-10'>
        <Link href={'/create'}>
        <Button disabled={disabled}  className='w-full bg-primary cursor-pointer'>+ Create New</Button>
        </Link>
      </div>

      <div className='mt-5'>
        {menuList.map((menu,index)=>{
          return(
            <Link key={index}  href={menu.path}
            className={`flex gap-5 items-center mt-3 p-3 hover:bg-slate-200 rounded-lg cursor-pointer
            ${pathName==menu.path ? 'bg-slate-200':''}
            `}>
              <menu.icon/>
              <h2>{menu.name}</h2>

            </Link>
          )
        })}
      </div>

  {!isMember &&  (
      <div className='border p-3 absolute bottom-10 w-[90%] bg-slate-100 rounded-lg'>
      <h2 className='text-lg mb-2'>Avialable Credits : {(5-tokenCount)} </h2>
      <Progress value={(tokenCount/5)*100}/>
      <h2 className='text-sm'>{tokenCount} out of 5 credits used</h2>
      <Link href={'/dashboard/upgrade'} className='text-primary text-xs mt-3'>
      
      <h2>Upgrade to Create More</h2>
      </Link>
    </div>
  )}
    

    </div>
  )
}

export default Sidebar