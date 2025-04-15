'use client'
import Link from 'next/link'

const PaymentSuccess = () => {


    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">



            <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
            <p className="mt-2 text-gray-700 text-lg">
                Thank you for upgrading to Premium. You now have access to all features.
            </p>
            <Link href="/dashboard" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded">
                Go to Dashboard
            </Link>




        </div>
    )
}

export default PaymentSuccess
