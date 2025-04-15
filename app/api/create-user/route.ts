import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const{user}=await req.json()

    const result=await inngest.send({
        name:'user.create',
        data:{
            user:user
        }
    })
   return NextResponse.json({result})
}