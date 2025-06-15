import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { getUserSessions, getUserCreatedCompanions } from '@/lib/actions/companion.actions'
import UserProfileSection from '@/components/UserProfileSection'
import CompletedLessonsTable from '@/components/CompletedLessonsTable'
import UserCompanionsTable from '@/components/UserCompanionsTable'

interface CompletedLesson {
  id: string
  name: string
  topic: string
  subject: string
  duration: number
}

interface RawSessionData {
  id?: string
  name?: string
  topic?: string
  subject?: string
  duration?: number
}

const MyJourneyPage = async () => {
  const { userId } = await auth()
  const user = await currentUser()
  
  if (!userId || !user) {
    redirect('/sign-in')
  }

  // Fetch user sessions with proper error handling
  let userSessions: RawSessionData[] = []
  try {
    const sessions = await getUserSessions(userId, 50)
    // Check if the response contains an error
    if (sessions && typeof sessions === 'object' && 'error' in sessions) {
      console.error('Error fetching user sessions:', sessions.error)
      userSessions = []
    } else {
      // getUserSessions returns an array of companion objects, but the type system doesn't know this
      userSessions = Array.isArray(sessions) ? sessions as RawSessionData[] : []
    }
  } catch (error) {
    console.error('Error fetching user sessions:', error)
    userSessions = []
  }

  // Fetch companions created by the user
  let createdCompanions: RawSessionData[] = []
  try {
    const companions = await getUserCreatedCompanions(userId)
    // Check if the response contains an error
    if (companions && typeof companions === 'object' && 'error' in companions) {
      console.error('Error fetching created companions:', companions.error)
      createdCompanions = []
    } else {
      createdCompanions = Array.isArray(companions) ? companions as RawSessionData[] : []
    }
  } catch (error) {
    console.error('Error fetching created companions:', error)
    createdCompanions = []
  }

  // Process the sessions data - getUserSessions returns an array of companion objects
  const completedLessons: CompletedLesson[] = userSessions
    .filter((lesson: RawSessionData) => lesson && typeof lesson === 'object')
    .map((lesson: RawSessionData) => ({
      id: lesson.id || '',
      name: lesson.name || 'Unknown Lesson',
      topic: lesson.topic || 'No topic',
      subject: lesson.subject || 'general',
      duration: lesson.duration || 0
    }))

  // Process the created companions data
  const userCompanions: CompletedLesson[] = createdCompanions
    .filter((companion: RawSessionData) => companion && typeof companion === 'object')
    .map((companion: RawSessionData) => ({
      id: companion.id || '',
      name: companion.name || 'Unknown Companion',
      topic: companion.topic || 'No topic',
      subject: companion.subject || 'general',
      duration: companion.duration || 0
    }))

  // Calculate stats
  const totalLessons = completedLessons.length
  const totalDuration = completedLessons.reduce((acc, lesson) => acc + lesson.duration, 0)
  const companionsCreatedCount = createdCompanions.length

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* User Profile Section */}
        <UserProfileSection 
          user={user}
          stats={{
            lessonsCompleted: totalLessons,
            companionsCreated: companionsCreatedCount,
            totalMinutes: totalDuration
          }}
        />

        {/* Completed Lessons Table */}
        <CompletedLessonsTable lessons={completedLessons} />

        {/* User Companions Table */}
        <UserCompanionsTable companions={userCompanions} />
      </div>
    </div>
  )
}

export default MyJourneyPage 