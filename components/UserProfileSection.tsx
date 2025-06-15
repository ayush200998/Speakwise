import React from 'react'
import Image from 'next/image'
import { User } from '@clerk/nextjs/server'
import { CheckCircle, Users, Clock } from 'lucide-react'

interface UserStats {
  lessonsCompleted: number
  companionsCreated: number
  totalMinutes: number
}

interface UserProfileSectionProps {
  user: User
  stats: UserStats
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ user, stats }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-card rounded-2xl p-6 shadow-sm border border-border/50">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={user.imageUrl}
            alt={user.firstName || 'User'}
            width={80}
            height={80}
            className="rounded-full border-4 border-background shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-background flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-muted-foreground text-sm">
            {user.emailAddresses[0]?.emailAddress}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 lg:gap-6">
        {/* Lessons Completed */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-4 border border-green-200/50 dark:border-green-800/50 min-w-[140px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {stats.lessonsCompleted}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                Lessons Completed
              </div>
            </div>
          </div>
        </div>

        {/* Companions Created */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50 min-w-[140px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {stats.companionsCreated}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                Companions Created
              </div>
            </div>
          </div>
        </div>

        {/* Total Time */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 rounded-xl p-4 border border-purple-200/50 dark:border-purple-800/50 min-w-[140px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {Math.round(stats.totalMinutes)}
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                Total Minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileSection 