"use client"
import React, { useState } from 'react'
import SelectOption from './_componenets/SelectOption'
import { Button } from '@/components/ui/button'
import TopicInput from './_componenets/TopicInput'
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useCouserProvider } from '@/context/StudyContext'

const Create = () => {
    const [step, setStep] = useState(0)
    const router=useRouter()
const{tokenCount,setTokenCount,isMember,setIsMember}=useCouserProvider()
    const isNotValid=!isMember && tokenCount>=5
    const[formData,setFormData]=useState({
        selectedCategory:'',
        description:'',
        difficultyLevel:''

    })
    const[loading,setLoading]=useState(false)
    const{user}=useUser()

    if(!user){
       return null
    }


    const generateCourseOutline=async()=>{
        const courseId=uuidv4()
        setLoading(true)

        try {
            const result=await axios.post('/api/generate-course',{
                courseId,
                courseType:formData.selectedCategory,
                topic:formData.description,
                difficultyLevel:formData.difficultyLevel,
                createdBy:user?.primaryEmailAddress?.emailAddress
               })

               setFormData({
                selectedCategory:'',
                description:'',
                difficultyLevel:''
            })
           
            
            toast.success('Course generated!')
            router.replace('/dashboard')
            
        } catch (error) {
             console.log(error);
             toast.error('Error while generating....')
             
        }finally{
            setLoading(false)
           
        }
     
         
    }

   
    return (
        <div className='flex flex-col items-center lg:px-36 p-5 mt-20 md:px:24'>
            {!isNotValid ? (
                  <>
                     <h2 className='font-bold text-4xl text-primary'>Start Generating your study content</h2>
            <p className='text-gray-500 text-lg'>Fill all details for fullfill your wish</p>
            <div className='mt-10'>
                {step === 0 ? (
                    <SelectOption setFormData={setFormData} formData={formData} />
                ) : (
                   <TopicInput setFormData={setFormData} formData={formData}/>
                )}

            </div>

            <div className={`flex w-full mt-32 ${step === 0 ? 'justify-end' : 'justify-between'}`}>
                {step !== 0 && (
                    <Button variant="outline" className="cursor-pointer" onClick={() => setStep(0)}>
                        Previous
                    </Button>
                )}
                {step === 0 ? (
                    <Button className="cursor-pointer" onClick={() => setStep(1)} disabled={!formData.selectedCategory}>
                        Next
                    </Button>
                ) : (
                    <Button className="cursor-pointer" disabled={loading||!formData.description||!formData.difficultyLevel} onClick={()=>generateCourseOutline()}>
                        {loading ? <div className='flex gap-2'> <Loader className=' animate-spin'/> <h2> Generating...</h2></div>:'Generate'}
                    </Button>
                )}
            </div>
                  </>
            ):(
                <h2 className='font-bold text-4xl text-primary'>Your token count is over,please upgrade</h2>

            )}
         

        </div>
    )
}

export default Create