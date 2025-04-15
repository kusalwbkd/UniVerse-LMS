"use client"
import Loading from '@/components/Loading'
import { CourseMaterial } from '@/types'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import CourseItem from './CourseItem'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { useCouserProvider } from '@/context/StudyContext'

const CourseList = () => {
    const { user } = useUser()

    const[courseList,setCourseList]=useState<CourseMaterial[]>([])
    const[loading,setLoading]=useState(false)
    const{tokenCount,setTokenCount,isMember,setIsMember}=useCouserProvider()

    useEffect(() => {
        user && getCourseList()
    }, [user])


    const getCourseList = async () => {
        setLoading(true)
        try {
            const result = await axios.get('/api/courses', {
                params: {
                    createdBy: user?.primaryEmailAddress?.emailAddress

                }


            })
            console.log("result",result?.data?.isMember[0]?.isMember);
           setCourseList(result?.data?.result)
           setTokenCount(result?.data?.tokenCount[0]?.tokenCount)
           setIsMember(result?.data?.isMember[0]?.isMember)
        } catch (error:any) {
            console.error('API error:', error.response?.data || error.message);
            toast.error('An error occured')
           
        }finally{
            setLoading(false)
        }
    }

    console.log("ismemeber",isMember);
    
    if(loading){
        return <Loading/>

    }

    if(courseList.length<1){
      return (
        <div className='mt-10 flex flex-col border p-4 rounded-md items-center'>
            <h2 className='font-bold text-2xl'>You don't have any study materials...please generate some</h2>
            <Image src={'/empty-folder.png'} alt='empty' width={100} height={100}/>
        </div>
      )
    }
    return (
        <div className='mt-10'>
            <div className='flex items-center justify-between'>
            <h2 className='font-bold text-2xl'>Your Study materials</h2>
            <Button variant={'outline'} 
            className='text-primary border-primary hover:text-primary cursor-pointer
            '
            onClick={getCourseList}
            > 
                <RefreshCcw className='text-primary'/>Refresh</Button>

            </div>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5'>
             {courseList.map((course,index)=>(
               <CourseItem course={course} key={index}/>
             ))}
           </div>
        </div>
    )
}

export default CourseList