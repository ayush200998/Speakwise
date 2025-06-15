import CompanionCard from '@/components/CompanionCard'
import SearchInput from '@/components/SearchInput'
import SubjectFilters from '@/components/SubjectFilters'
import { getAllCompanions } from '@/lib/actions/companion.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const CompanionsPage = async ({ searchParams }: PageProps) => {
  const { userId } = await auth()
  const filters = await searchParams;
  const subject = filters?.subject ? filters.subject : '';
  const topic = filters?.topic ? filters.topic : '';

  if (!userId) {
    redirect('/sign-in')
  }

  const companions = await getAllCompanions({
    subject,
    topic,
  });

  return (
    <div
      id='companions-page-container'
      className='flex flex-col gap-6 h-[calc(100vh-5rem)] p-4 px-10'
    >
      <div
        className='flex md:flex-row flex-col gap-2 md:justify-between md:items-center items-start justify-items-start'
      >
        <div>
          <h2 className="header-title">
            Learning Companions
          </h2>
          <p className="text-muted-foreground">
            Discover and interact with AI learning companions tailored to your subjects.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
          <div className='flex flex-row gap-2 flex-1 sm:flex-initial'>
            <SearchInput />
            <SubjectFilters />
          </div>
          <Link href="/companions/new">
            <Button 
              variant="default" 
              className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              <span className="font-semibold">Create</span>
            </Button>
          </Link>
        </div>
      </div>

      {companions.companions ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl'>
          {companions.companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              id={companion.id}
              name={companion.name}
              topic={companion.topic}
              subject={companion.subject}
              duration={companion.duration}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          <h2 className='header-title'>No companions found</h2>
          <p className='text-muted-foreground'>
            Try different filters or check back later.
          </p>
        </div>
      )}
    </div>
  )
}

export default CompanionsPage