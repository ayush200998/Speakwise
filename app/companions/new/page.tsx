import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import CompanionForm from '@/components/CompanionForm'

const CompanionsPageForm = async () => {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="h-[calc(100vh-5rem)] bg-background overflow-y-auto no-scrollbar">
      <CompanionForm />
    </div>
  )
}

export default CompanionsPageForm