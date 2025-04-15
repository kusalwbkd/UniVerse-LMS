import { db } from "@/config/db";
import { PaymentRecordTable, usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

export async function POST(req:NextRequest){
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!)
    const {priceId,email} = await req.json()

    const customer=await stripe.customers.create({})

    const session = await stripe.checkout.sessions.create
({
  mode: 'subscription',
  //customer:customer.id,
 customer_email: email,
  line_items: [
    {
      price: priceId,
      // For metered billing, do not pass quantity
      quantity: 1,
    },
  ],
  // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
  // the actual Session ID is returned in the query parameter when your customer
  // is redirected to the success page.
  success_url
: process.env.HOST_NAME+'payment-success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url
: process.env.HOST_NAME,
});



    
    return NextResponse.json({session})

}