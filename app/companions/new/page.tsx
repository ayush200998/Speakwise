import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import CompanionForm from '@/components/CompanionForm'
import { checkIfUserCanCreateCompanion } from '@/lib/actions/companion.actions'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GemIcon } from 'lucide-react'

const CompanionsPageForm = async () => {
  const { userId } = await auth()
  const canCreateCompanion = await checkIfUserCanCreateCompanion();

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="h-[calc(100vh-5rem)] bg-background overflow-y-auto no-scrollbar">
      {canCreateCompanion ? (
        <CompanionForm />
      ) : (
         <div className='h-full w-full flex flex-col gap-3 justify-center items-center'>
            <Image
              src='/images/limit.svg'
              alt='limit'
              width={360}
              height={230}
            />
            <h2 className='font-bold'>
              You have reached the limit.
            </h2>
            <p className='text-sm text-muted-foreground'>
              Please upgrade to a paid plan to create more companions.
            </p>
            <Link href='/subscription'>
              <Button
                variant='shine'
                size='lg'
                className='w-full'
              >
                <GemIcon />
                Upgrade
              </Button>
            </Link>
         </div>
      )}
    </div>
  )
}

export default CompanionsPageForm