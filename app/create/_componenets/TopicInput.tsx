import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FormDataType, SelectOptionProps } from '@/types'


const TopicInput = ({ formData, setFormData }: { 
    formData: FormDataType; 
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}) => {
    return (
        <div className='mt-10 '>
            <h2>Enter the description about study material you want to generate</h2>
            <Textarea
                placeholder="Start writing here"
                className="mt-2"
                onChange={(e) =>
                    setFormData((prev:FormDataType) => ({
                        ...prev,
                        description: e.target.value, // Corrected: 'description' key as a string
                    }))
                }
            />
            <h2 className='mt-5 mb-3'>Select the difficulty level</h2>
            <Select
               onValueChange={(value) =>
                setFormData((prev:FormDataType) => ({
                    ...prev,
                    difficultyLevel: value,
                }))
            }
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
            </Select>

        </div>
    )
}

export default TopicInput