import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if(!email){
          return NextResponse.json({ error: "Missing 'email' query parameter" }, { status: 400 });
    }

    const user=await db.select().from(usersTable).where(eq(usersTable.email,email))
    if(!user){
        return NextResponse.json({ error: "user not found" }, { status: 404 });
  }
  const { customerId, ...safeUser } = user[0]; // remove customerId

  return NextResponse.json({ user: safeUser });
 
}