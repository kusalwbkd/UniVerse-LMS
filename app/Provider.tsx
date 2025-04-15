
"use client"
import { db } from '@/config/db'
import { usersTable } from '@/config/schema'
import { inngest } from '@/inngest/client'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { ReactNode, useEffect } from 'react'
import axios from "axios"

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUser()



  useEffect(() => {
    user && checkIsNewUser()
  }, [user])





  const checkIsNewUser = async () => {
    const response = await axios.post('/api/create-user', { user })
  }




  return (
    <div>
      {children}
    </div>
  )
}

export default Provider