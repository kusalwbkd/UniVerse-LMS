import { courseFeatures } from '@/app/dashboard/menulist'
import React from 'react'
import MaterialCardItem from './MaterialCardItem'
import Link from 'next/link'


const StudyMaterialSection = ({courseId}:{courseId:string}) => {

  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl'>Study Materials</h2>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-4'>
          {courseFeatures.map((item,index)=>(
         
             <MaterialCardItem item={item} key={index} />
            
          ))}
        </div>

    </div>
  )
}

export default StudyMaterialSection

{/* <Link href={`/course/${courseId}/${item.path}`} key={index}>
<MaterialCardItem item={item} />
</Link> */}