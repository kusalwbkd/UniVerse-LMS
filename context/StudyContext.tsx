
"use client"
import { CourseContentTableRow, CourseMaterial, FlashCardTypes, QuizItem } from "@/types";
import { createContext, useContext, useState } from "react";

const CourseContext=createContext<any>(null)

 
export const CouserProvider=({children}:{
    children: React.ReactNode;
  })=>{
    const[loading,setLoading]=useState(false)
    const[courseIntro,setCourseIntro]=useState<CourseMaterial[]>([])
    const[courseFullDetails,setCourseFullDetails]=useState<CourseContentTableRow[]>([])
    const[flashCards,setFlashCards]=useState<FlashCardTypes[]>([])
    const[quiz,setQuiz]=useState<any>([])
    const[quizAndAns,setQuizAndAns]=useState<QuizItem[]>([])
    const[completedPercentage,setCompletedPercentage]=useState(0)
    const[tokenCount,setTokenCount]=useState(0)
    const[isMember,setIsMember]=useState(false)
     return <CourseContext.Provider value={{
        loading,
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
        setQuizAndAns,
        completedPercentage,
        setCompletedPercentage,
        tokenCount,setTokenCount,
        isMember,setIsMember

     }}>
        {children}
     </CourseContext.Provider>
}
export const useCouserProvider = () => {
    const context = useContext(CourseContext);
    if (!context) {
      throw new Error("useCouserProvider must be used within a CouserProvider");
    }
    return context;
  };