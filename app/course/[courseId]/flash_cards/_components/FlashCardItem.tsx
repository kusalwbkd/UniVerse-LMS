import { FlashCardTypes } from '@/types';
import React from 'react'
import ReactCardFlip from 'react-card-flip';

  

 type Flip={
    isFlipped:boolean
    handleClick:any,
    item:FlashCardTypes
}

const FlashCardItem = ({isFlipped,handleClick,item}:Flip) => {

  return (
    <div>

  
<ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
  {/* Front */}
  <div 
    className='p-4 bg-yellow-100 text-orange-800 shadow-lg flex flex-col justify-between items-center rounded-lg h-[250px] w-[200px] cursor-pointer
     md:h-[350px] md:w-[300px]'
    onClick={handleClick}
  >
    {/* Top section */}
    <div className='w-full md:text-left text-center text-xs md:text-xl '>
      <h2 className='font-bold text-sm md:text-base text-black'>{item?.chapter}</h2>
    </div>

    {/* Middle section */}
    <div className='flex-1 flex items-center justify-center text-center'>
      <h2 className='overflow-x-auto md:text-xl text-[8px]'>{item?.front}</h2>
    </div>
  </div>

  {/* Back */}
  <div 
    className='p-5 bg-sky-100 text-sky-800 shadow-lg flex items-center justify-center rounded-lg h-[250px] w-[200px] cursor-pointer
    md:h-[350px] md:w-[300px] md:text-xl text-[10px]'
    onClick={handleClick}
  >
    {item?.back}
  </div>
</ReactCardFlip>


    </div>
  )
}

export default FlashCardItem