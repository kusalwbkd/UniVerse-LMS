"use client"
import { options } from '@/app/dashboard/menulist'
import { FormDataType } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'

const SelectOption = ({ formData, setFormData }: { 
    formData: FormDataType; 
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}) => {
    const[selected,setSelected]=useState<number|null>()
  return (
    <div>
        <h2 className='text-center mb-2 text-lg'>For which you want to create a Study material</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-5'>
            {options.map((option,index)=>(
                <div key={index} className={`p-4 flex flex-col items-center justify-center border rounded-xl
                hover:border-primary cursor-pointer ${index===selected? 'border-[2px] border-primary':''}`}
                onClick={(e)=>{
                    setSelected(index),
                    setFormData((prev) => ({
                        ...prev,
                        selectedCategory: option.name, // Corrected: 'description' key as a string
                    }))
                }}
                >
                    <Image src={option.icon} alt={option.name} width={50} height={50}/>
                    <h2 className='text-sm mt-2'>{option.name}</h2>

                </div>
            ))}
        </div>

    </div>
  )
}

export default SelectOption