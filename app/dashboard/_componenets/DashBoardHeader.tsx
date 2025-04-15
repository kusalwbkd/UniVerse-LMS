"use client"

import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { menuList } from '../menulist'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Progress } from '@radix-ui/react-progress'
import { useCouserProvider } from '@/context/StudyContext'

const DashBoardHeader = () => {
  const pathName=usePathname()
  const router=useRouter()
    const{tokenCount,setTokenCount,isMember,setIsMember}=useCouserProvider()
    const disabled=!isMember && tokenCount>=5

  return (
    <div className={`p-5  shadow-md flex   items-center sm:justify-between md:justify-end'}  `}>
     {pathName !=='/dashboard' && <div> <Button className='cursor-pointer hidden md:flex' onClick={()=>router.back()}>Back</Button> </div>}
     {pathName ==='/dashboard' &&  <div><Link href={'/create'}>
        <Button size={'sm'} disabled={disabled} className='w-full bg-primary cursor-pointer md:hidden'>+ Create New</Button>
        </Link> </div> }
     {menuList.map((menu,index)=>{
          return(
            <div key={index}  className={`flex gap-2 items-center mt-3 p-3 md:hidden  rounded-lg cursor-pointer
              text-sm justify-center
              `}>
            <Link  href={menu.path}
           >
         
              <h2>{menu.name}</h2>

            </Link>
            </div>
          )
        })}
      <div className='hidden md:flex'>

      <UserButton />
      </div>
     
    </div>
  )
}

export default DashBoardHeader