import { CourseMaterial } from '@/types'
import React from 'react'

type courseIntro = {
    courseIntro: CourseMaterial[]
}

type Chapter = {
    chapter_title: string,
    summary: string
}
const Chapters = ({ courseIntro }: courseIntro) => {

    return (
        <div className='mt-5'>
            <h2 className='font-medium text-2xl'>
                Chapters with Summary
            </h2>

            <div className='flex flex-col gap-2 mt-3'>
                {courseIntro[0]?.courseLayout[0]?.chapters?.map((chapter: Chapter, index: number) => {
                    return (
                     <div  className='flex flex-col shadow-md border mb-2 p-4 rounded-lg gap-2 cursor-pointer' key={index}>
                        <h2 className='text-xl '>{chapter.chapter_title}</h2>
                        <p className='text-gray-500 text-md'>{chapter.summary}</p>
                     </div>
                )
                })}
            </div>
        </div>
    )
}

export default Chapters