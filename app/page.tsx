import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'

const Page = () => {
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
        <CompanionCard
          id='123'
          name='Nuera the brain explorer'
          topic='Neural network of brain'
          subject='Science'
          duration={45}
          colorIndex={0}
        />
        <CompanionCard
          id='124'
          name='Shakespeare the wordsmith'
          topic='Exploring the beauty of English literature'
          subject='Language'
          duration={30}
          colorIndex={1}
        />
        <CompanionCard
          id='125'
          name='Einstein the physicist'
          topic='Understanding the theory of relativity'
          subject='Science'
          duration={60}
          colorIndex={2}
        />
      </section>

      <section
        id='companion-list-and-cta-container' className='companion-list-cta-grid'
      >
        <CompanionList
          title='Recent Sessions'
          companions={recentSessions}
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page