import { db } from "@/config/db";
import { ChapterNotesTable, CourseMaterialsTable, MaterialsTypeTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if(!courseId){
          return NextResponse.json({ error: "Missing 'courseId' query parameter" }, { status: 400 });

    }

    const course = await db.select().from(CourseMaterialsTable).where(eq(CourseMaterialsTable.courseId, courseId))
    if (!course || course.length === 0) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
      }

    const qa = await db
      .select()
      .from(MaterialsTypeTable)
      .where(
        and(
          eq(MaterialsTypeTable.type, 'Q&A'),
          eq(MaterialsTypeTable.courseId, courseId)
        )
      );

      if (!qa || qa.length === 0) {
        return NextResponse.json({ error: "quiz not found" }, { status: 404 });
      }
    return NextResponse.json({
        result: {
          
            qa,
           
          },
    })

}