import { db } from "@/config/db";
import { CourseMaterialsTable, usersTable } from "@/config/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Get the 'createdBy' query parameter from the URL
    const { searchParams } = new URL(req.url);
    const createdBy = searchParams.get("createdBy");

  

    // Make sure 'createdBy' exists before proceeding
    if (!createdBy) {
        return NextResponse.json({ error: "Missing 'createdBy' query parameter" }, { status: 400 });
    }

    try {
        // Fetch data from the database using 'createdBy'
        const result = await db.select().from(CourseMaterialsTable).
        where(eq(CourseMaterialsTable.createdBt, createdBy))
        .orderBy(desc(CourseMaterialsTable.id))
        ;
        
        const tokenCount=await db.select({ tokenCount: usersTable.tokenCount }).from(usersTable).where(eq(usersTable.email,createdBy))
        const isMember=await db.select({ isMember: usersTable.isMember }).from(usersTable).where(eq(usersTable.email,createdBy))
        if(result && tokenCount&&isMember){
            return NextResponse.json({ result,tokenCount,isMember });

        }
    } catch (error: any) {
        console.error('Error occurred:', error.message || error);  // Log the exact error message
        return NextResponse.json({ error: 'An error occurred while fetching the course list' }, { status: 500 });
    }
}
