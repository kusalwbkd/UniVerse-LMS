import { db } from "@/config/db";
import { PaymentRecordTable, usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Stripe instance
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!)

// Required config to disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEB_HOOK_KEY!;
  const signature = req.headers.get("stripe-signature");

  let rawBody = await req.text(); // This gives raw string from ReadableStream

  let event: Stripe.Event;
 // const customer=await stripe.customers.create({})

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature!, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const { type, data } = event;

  switch (type) {
    case "checkout.session.completed":
    //  const session = data.object as Stripe.Checkout.Session;
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.customer as string;
    const email = session.customer_email as string;
      const paymentResponse=await db.insert(PaymentRecordTable).values({
        customerId,
        sessionId:session.id
      })
      
      await db
      .update(usersTable)
      .set({
        customerId,
        isMember: true,
      })
      .where(eq(usersTable.email, email));
      break;

    case "invoice.paid":
      console.log("✅ Invoice paid");
      break;

    case "invoice.payment_failed":
      console.log("❌ Payment failed");
      break;

    default:
      console.log(`Unhandled event type: ${type}`);
  }

  return NextResponse.json({ received: true });
}
