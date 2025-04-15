import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link
     className='bg-primary rounded-md h-12 w-12 flex justify-center items-center text-2xl font-bold text-white'
     href={'/dashboard'}
     >
       <h2>Un</h2>
    </Link>
  )
}

export default Logo