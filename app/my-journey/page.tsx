import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const MyJourneyPage = async () => {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          My Learning Journey
        </h1>
        <p className="text-muted-foreground">
          Track your progress and review your learning sessions with AI companions.
        </p>
      </div>
    </div>
  )
}

export default MyJourneyPage 