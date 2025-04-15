"use client"
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { useCouserProvider } from '@/context/StudyContext'
import { Question, QuizItem } from '@/types';
import { ItemIndicator } from '@radix-ui/react-select';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const QaPage = () => {
    type Params = {
        courseId: string; // Assuming you expect 'courseId' to be a string

    };
    const {  quizAndAns,
      setQuizAndAns, loading, setLoading } = useCouserProvider()
    const [chapter, setChapter] = useState(0)
   
   

        const [filteredChapters, setFilteredChapters] = useState<QuizItem>(quizAndAns[0] || [])


    const { courseId } = useParams<Params>()

    useEffect(() => {
      if (courseId && (!quizAndAns || quizAndAns.length === 0)) {
        getQuiz()
      }
    }, [courseId, quizAndAns])
    
    const getQuiz = async () => {
        setLoading(true)
        try {
            const results = await axios.get(`/api/get-qa?courseId=${courseId}`)
            const fetchedQuiz = results?.data?.result?.qa[0]?.content || []
           // console.log("assa==>", results);

            setQuizAndAns(fetchedQuiz)
            setFilteredChapters(fetchedQuiz[0])
            //SetFilteredCards(fetchedCards) // set after fetched
        } catch (error) {
            console.log(error)
            toast.error('Error while displaying quiz')
        } finally {
            setLoading(false)
        }

    }

   // console.log("filtered quiz===",quiz);
    
    if (loading) {
        return <Loading />

    }


    const setChapterList = (index: number) => {
        setChapter(index)
        const chapters = quizAndAns[index]
        setFilteredChapters(chapters)

    }

    console.log("selected chapters", filteredChapters);


    return (
       
      
            <div className='-mx-10 md:-mx-48 flex gap-8 items-start'>
          
              <div className='max-h-screen shadow-md p-5 w-64 flex flex-col gap-4 rounded-md overflow-y-auto '>
                {quizAndAns?.length && quizAndAns.map((item: any, index: number) => {
                  return (
                    <h2
                      key={index}
                      onClick={() => setChapterList(index)}
                      className={`md:p-3 p-1 h-6 md:h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded-full w-full lg:text-center 
                        shadow-sm border-[2px] border-primary md:hover:scale-105 md:hover:shadow-lg
                        text-end
                        text-[8px]
                        lg:text-sm
                        cursor-pointer
                        transition-all ease-in-out flex items-center justify-center
                        hover:bg-primary hover:text-white hover:font-bold 
                        ${chapter === index ? 'bg-primary text-white font-bold' : ''}`}
                    >
                      {item?.chapter}
                    </h2>
                  )
                })}
              </div>
          
              <div className='md:p-5 bg-amber-200 rounded-md w-full p-2'>
                <div className='flex flex-col gap-5'>
                  <h2 className='md:text-2xl font-bold text-primary text-center text-xl'>
                    Here are Essential questions of chapter {chapter + 1}
                  </h2>
                  <ol className="flex flex-col gap-4">
                    {filteredChapters?.questions?.map((item: Question, index: number) => (
                      <li key={index}>
                        <h2 className="md:text-xl font-bold text-black text-sm">{item?.question}</h2>
                        <h2 className="font-semibold text-gray-500 md:text-sm text-xs">{item?.answer}</h2>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
          
            </div>
          )
          
          
    
}

export default QaPage