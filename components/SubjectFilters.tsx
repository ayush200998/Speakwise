'use client'

import { useEffect, useState } from 'react'
import { subjectsV2 } from '@/constants'
import { Select, SelectValue, SelectContent, SelectItem, SelectTrigger } from './ui/select'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

const SubjectFilters = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const [selectedSubject, setSelectedSubject] = useState<string>('')

    useEffect(() => {
        const currentSubject = searchParams.get('subject')
        if (currentSubject) {
            setSelectedSubject(currentSubject)
        }
    }, [searchParams])

    useEffect(() => {
        if (selectedSubject && selectedSubject !== 'All Subjects') {
            router.push(`${pathname}?subject=${selectedSubject}`)
        } else {
            router.push(pathname)
        }
    }, [selectedSubject, pathname, router])

  return (
    <div
        id='subject-filters-container'
        className='flex items-center gap-2'
    >
        <Select onValueChange={setSelectedSubject} defaultValue={selectedSubject}>
          <SelectTrigger className="bg-background border-border w-full">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='All Subjects'>
              All Subjects
            </SelectItem>
            {subjectsV2.map((subject: string) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
    </div>
  )
}

export default SubjectFilters