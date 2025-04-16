"use client"
import Loading from '@/components/Loading'
import { useCouserProvider } from '@/context/StudyContext'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashCardItem from './_components/FlashCardItem'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CourseMaterial, FlashCardTypes } from '@/types'
import { toast } from 'sonner'



const FlashCards = () => {
  type Params = {
    courseId: string; // Assuming you expect 'courseId' to be a string

  };
  const {
    loading,
    setLoading,
    flashCards,
    setFlashCards,
    courseIntro


  } = useCouserProvider()

  const { courseId } = useParams<Params>()
  useEffect(() => {

    if( courseId && (flashCards?.length === 0 || !flashCards)){
      fetchFlashCards()
    }
     
      
    

  }, [])

  

  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [api, setApi] = useState<any>()
  const [selected, setSelected] = useState(0)
  const[filterdCards,SetFilteredCards]=useState<FlashCardTypes[]>(flashCards||[])
  console.log("from flashcard",filterdCards);

  useEffect(() => {
    if (!api) {
      return
    }
    api.on('select', () => {
      setIsFlipped(false)
    })

  }, [api])

  const fetchFlashCards = async () => {
    setLoading(true)
    try {
      const results = await axios.get(`/api/get-flash-cards?courseId=${courseId}`)
      const fetchedCards = results?.data?.result?.flashCards[0]?.content || []
      setFlashCards(fetchedCards)
      SetFilteredCards(fetchedCards) // set after fetched
    } catch (error) {
      console.log(error)
      toast.error('Error while displaying flashcards')
    } finally {
      setLoading(false)
    }
  }
  


  if (loading) {
    return <Loading />

  }
  const handleClick = () => {
    setIsFlipped((prev) => !prev)
  }
  const distinctChapters = ['All', ...new Set(flashCards?.map((card: any) => card.chapter))];

  //const distinctChapters: string[] = ['All', ...Array.from(new Set((flashCards || []).map(card => card.chapter)))];

    const changeTitle = (index: number, chapterTitle: string) => {
      setSelected(index)
      if (chapterTitle === 'All') {
        SetFilteredCards(flashCards)
      } else {
        const items = flashCards?.filter((i: any) => i.chapter === chapterTitle);

        SetFilteredCards(items)
      }
    }
    
  



  return (
    <div className='p-2'>
      <h2 className='font-bold text-2xl'>FlashCards</h2>
      <p>FlashCards will help to revise quickly</p>

      <div className=' mt-10'>
      <h2 className='font-bold text-xl hidden md:block'>Filter by content of Flashcards</h2>
        <div className=' gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 hidden md:grid'>
        {distinctChapters?.map((item:any,index:number)=>{
          return (
          
            <h2 key={index} 
            className={`py-2 px-2 cursor-pointer hover:bg-primary ${selected===index?'bg-primary text-white':' bg-blue-100 text-black'} hover:text-white  font-bold rounded-full text-[8px] md:text-xs mb-2 flex items-center justify-center text-center`}
            onClick={()=>changeTitle(index,item)}
            >
              {item}
            </h2>

          
          )
        })}
         
        </div>




        <div className='mt-5'>
          <Carousel setApi={setApi}>
            <CarouselContent>

              {filterdCards?.length && filterdCards?.map((item: FlashCardTypes, index: number) => (


                <CarouselItem className='flex items-center justify-center' key={index} >
                  <FlashCardItem isFlipped={isFlipped} handleClick={handleClick} item={item} />
                </CarouselItem>


              ))}

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>



    </div>
  )
}

export default FlashCards