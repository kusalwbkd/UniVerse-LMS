import { courseImageMap } from '@/app/dashboard/menulist'
import { Progress } from '@/components/ui/progress'
import { useCouserProvider } from '@/context/StudyContext'
import { CourseMaterial } from '@/types'
import Image from 'next/image'
import React from 'react'

type courseIntro = {
    courseIntro: CourseMaterial[]
}
const CourseIntro = ({ courseIntro }: courseIntro) => {
    const{completedPercentage,
        setCompletedPercentage}=useCouserProvider()
   
    if (courseIntro.length) {
        return (
            <div className='flex gap-5 items-center p-5 border shadow-md rounded-lg'>
                <Image src={courseImageMap[courseIntro[0]?.courseType as keyof typeof courseImageMap] || '/online-learning.png'}
                    width={70} height={70}
                    alt='course-img'
                />
                <div>
                    <h2 className='font-bold text-2xl mt-3'>{courseIntro[0]?.topic}</h2>
                    <p className='mt-3'>{courseIntro[0]?.courseLayout[0]?.overall_summary}</p>
                    <Progress className='mt-3' value={(completedPercentage)/(courseIntro[0]?.courseLayout[0]?.chapters).length*100}/>
                    <h2 className='mt-3 text-lg text-primary'>Total Chapters : {(courseIntro[0]?.courseLayout[0]?.chapters).length}</h2>
                </div>

            </div>
        )
    }

}

export default CourseIntro