import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CourseMaterial } from '@/types'
import { CheckCircle, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { courseImageMap, difficultyIcons } from '../menulist';
import Link from 'next/link';

interface CourseItemProps {
  course: CourseMaterial;
}
const CourseItem = ({ course }: CourseItemProps) => {
  const timestamp = new Date(course?.createdAt);
  const formattedDate = timestamp.toISOString().split('T')[0].replace(/-/g, '/');



  return (
    <div className='border rounded-lg shadow-md p-5'>
      <div>
        <div className='flex justify-between items-center'>
          <Image
            src={courseImageMap[course?.courseType as keyof typeof courseImageMap] || '/online-learning.png'}
            alt='course picture'
            width={50}
            height={50}
          />
          <h2 className={`text-[12px] p-2 px-3 rounded-full text-gray-900 font-bold ${course.difficultyLevel === 'Hard' && 'bg-red-200'} 
        ${course.difficultyLevel === 'Moderate' && 'bg-yellow-200'}
        ${course.difficultyLevel === 'Easy' && 'bg-green-200'}
        text-center`}>{course?.difficultyLevel}</h2>
          <h2 className='text-[10px] p-1 px-2 rounded-full text-white bg-primary text-center'>{formattedDate}</h2>
        </div>
        <h2 className='mt-3 font-medium text-lg truncate '>{course?.courseLayout[0]?.course_title}</h2>
        <p className='text-xs line-clamp-2 text-gray-500 mt-2'>{course?.courseLayout[0]?.overall_summary}</p>
        <div className='mt-3'>
          <Progress value={0} />
        </div>
        <div className='mt-3 justify-end flex'>
          {course?.status === 'Generating' ? (
            <h2 className='p-1 px-2 rounded-full bg-gray-400 text-white flex gap-2 items-center text-sm'>
              <RefreshCcw className='h-5 w-5 animate-spin' />
              Generating...
            </h2>
          ) : (
            <Link href={`/course/${course?.courseId}`}>
              <Button  className='cursor-pointer'>View</Button>
            </Link>
          )}

        </div>
      </div>
    </div>
  )
}

export default CourseItem