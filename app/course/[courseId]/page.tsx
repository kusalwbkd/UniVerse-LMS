"use client"
import DashBoardHeader from '@/app/dashboard/_componenets/DashBoardHeader'
import Loading from '@/components/Loading'
import { CourseContentTableRow, CourseMaterial } from '@/types'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import CourseIntro from './_components/CourseIntro'
import StudyMaterialSection from './_components/StudyMaterialSection'
import Chapters from './_components/Chapters'
import { useCouserProvider } from '@/context/StudyContext'

const Course = () => {
  type Params = {
    courseId: string; // Assuming you expect 'courseId' to be a string
  };

  const{courseId}=useParams<Params>()
  const{loading,
    setLoading,
    courseIntro,
    setCourseIntro,
    courseFullDetails,
    setCourseFullDetails,
    flashCards,
    setFlashCards,
    quiz,
    setQuiz,
    quizAndAns,
    setQuizAndAns
}=useCouserProvider()

  useEffect(()=>{
    if(courseId){
      getCourse()
    }

  },[])
  
  const getCourse=async()=>{
    setLoading(true)
    try {
      const result=await axios.get(`/api/get-single-course?courseId=${courseId}`)

//console.log(result);
      
      setCourseIntro(result?.data?.result?.courseDetails)
      setCourseFullDetails(result?.data?.result?.courseContent)
      setFlashCards(result?.data?.result?.flashCards[0]?.content)
     setQuiz(result?.data?.result?.quiz[0]?.content)
    setQuizAndAns(result?.data?.result?.qa[0]?.content)
    } catch (error:any) {
      console.error('API error:', error.response?.data || error.message);
      toast.error('An error occured')
    }finally{
      setLoading(false)
    }
   
    

  }


  console.log(quiz);
  
  if(loading){
   return <Loading/>
  } 
  
  return (
    <div>
     
      <div>
      <CourseIntro courseIntro={courseIntro}/>
      <StudyMaterialSection courseId={courseId}/>
      <Chapters courseIntro={courseIntro}/>
      </div>
    
    </div>
  )
}

export default Course