import { generateCourse } from "@/config/AiModel";
import { db } from "@/config/db";
import { CourseMaterialsTable } from "@/config/schema";
import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { courseId,
        courseType,
        topic,
        difficultyLevel,
        createdBy } = await req.json()

    const aiPrompt = `Generate a comprehensive and detailed study material for ${topic},
         focusing on advanced concepts suited for an ${courseType} at a ${difficultyLevel} difficulty level. Include a well-organized list of chapters, 
         each with a concise but thorough summary of key concepts, methods, and examples. The material should cover all essential aspects of ${topic},
          with a focus on covering all key features. Output the study material in JSON format, structured with chapters and their respective summaries, 
        ensuring clarity and depth suitable for an ${courseType}. Also, generate an overall summary of the course.

Make sure to follow these naming conventions for the JSON structure:
- Use "course_title" for the course title,make it short as possible. dont use _ .
 and generate a suitable emoji for course_title
- Use "chapter_title" for the chapter title, dont use _ for sepperating words, make title short as possible.
and generate suitable emoji for each chapter
- Use "summary" (in lowercase) for chapter summaries.
- Use "overall_summary" (in lowercase) for the overall summary of the course.
- Ensure all keys are consistent and named according to the above structure.`;



    // console.log(aiPrompt);

    const aiResp = await generateCourse.sendMessage(aiPrompt)
    //console.log("ai resp",aiResp);

    const responseText = JSON.parse(aiResp?.response?.candidates?.[0]?.content?.parts?.[0]?.text);   // console.log(aiResult);

    const dbResult = await db.insert(CourseMaterialsTable).values({
        courseId,
        courseType,
        createdBt: createdBy,
        courseLayout: responseText,
        topic,
        difficultyLevel
    }).returning()

     const result=await inngest.send({
        name:'notes.generate',
        data:{
           course:dbResult[0],
           email:createdBy
        }
     })

    return NextResponse.json({ results: dbResult })

}