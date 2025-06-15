import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const companions = await getAllCompanions({
    limit: 3,
  });
  const recentCompanionSessions = await getRecentSessions(10);

  return (
    <main
      id='home-page-container'
      className='h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar'
    >
      <h2
        className='header-title'
      >
        Popular Companions
      </h2>

      <section id='companion-cards-container' className='companions-grid'>
        {companions.companions?.map((companion) => (
          <CompanionCard
            key={companion.id}
            id={companion.id}
            name={companion.name}
            topic={companion.topic}
            subject={companion.subject}
            duration={companion.duration}
          />
        ))}
      </section>

      <section
        id='companion-list-and-cta-container' className='companion-list-cta-grid'
      >
        <CompanionList
          title='Recent Sessions'
          companions={recentCompanionSessions as Companion[]}
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page