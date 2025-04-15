"use client"
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { useCouserProvider } from '@/context/StudyContext'
import { CourseContentTableRow } from '@/types'
import { cleanHTML } from '@/utils/helper'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Notes = () => {
  type Params = {
    courseId: string; // Assuming you expect 'courseId' to be a string

  };

  useEffect(() => {
    if (courseId && !courseFullDetails?.length) {
      getCourse()
    }

  }, [])
  const {
    courseFullDetails,
    loading,
    setLoading,
    setCourseFullDetails,
    completedPercentage,setCompletedPercentage

  } = useCouserProvider()
  const [stepCount, setStepCount] = useState(1)
  const { courseId } = useParams<Params>()
  const router = useRouter()



  const getCourse = async () => {
    setLoading(true)
    try {
      const result = await axios.get(`/api/get-single-course?courseId=${courseId}`)
      console.log(result);

      setCourseFullDetails(result?.data?.result?.courseContent)

    } catch (error: any) {
      console.error('API error:', error.response?.data || error.message);
      toast.error('An error occured')
    } finally {
      setLoading(false)
    }



  }

  const handleOnclick=()=>{
    setCompletedPercentage(completedPercentage+1)
    setStepCount(stepCount + 1)
  }


  if (loading) {
    return <Loading />
  }

  if (!courseFullDetails?.length) {
    return null
  }



  return (
    <div>
      <div className='flex gap-5 items-center'>

        {stepCount !== 1 && <Button className=' cursor-pointer' variant={'outline'} size={'sm'} onClick={() => setStepCount(stepCount - 1)}>Back</Button>}
        {courseFullDetails?.map((item: CourseContentTableRow, index: number) => (
          <div key={index} className={`w-full h-2 rounded-full ${index < stepCount ? 'bg-primary' : 'bg-gray-200'}`}>
          </div>
        ))}
        {stepCount !== courseFullDetails?.length + 1 && <Button size={'sm'} onClick={() => handleOnclick()} className=' cursor-pointer bg-primary'>Next</Button>}
      </div>

      <div className='mt-10'>
        {stepCount <= courseFullDetails?.length ? (
          <>

            <h2 className='text-xl'>{` Chapter ${stepCount}`}</h2>
            <div
              className="prose max-w-none prose-headings:my-2 prose-p:my-2 prose-pre:my-4 prose-ul:my-2"
              dangerouslySetInnerHTML={{
                __html: cleanHTML(courseFullDetails[stepCount - 1]?.notes || "")
              }}
            />



          </>

        ) : (
          <div className='flex justify-center items-center flex-col gap-10'>
              <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold text-green-600">🎉 Notes Completed!</h2>
          <p className="mt-2 text-lg text-gray-600">Well done! You’ve reached the end of the Course notes.</p>
          
        </div>
            <Button onClick={() => router.back()} className='cursor-pointer'>Go to Course Page</Button>
          </div>
        )}






      </div>
    </div>
  )
}


export default Notes