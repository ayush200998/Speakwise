import React from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table'
import { Clock, BookOpen } from 'lucide-react'
import Image from 'next/image'
import { subjectColorsLegacy, subjectsColors } from '@/constants'

interface Companion {
  id: string
  subject: string
  name: string
  topic: string
  duration: number
  color: string
}

interface CompanionListProps {
  title: string
  companions: Companion[]
}

const CompanionList: React.FC<CompanionListProps> = ({ title, companions }) => {
  return (
    <div className='companion-list'>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className='header-title'>
            {title}
          </h2>
        </div>

        {/* Table Container with enhanced styling */}
        <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/40 bg-muted/20">
                <TableHead className="font-medium text-muted-foreground text-sm py-3 px-4 w-1/2">
                  Companion
                </TableHead>
                <TableHead className="font-medium text-muted-foreground text-sm py-3 px-4 text-center w-1/4">
                  Subject
                </TableHead>
                <TableHead className="font-medium text-muted-foreground text-sm py-3 px-4 text-right w-1/4">
                  Duration
                </TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {companions.map((companion) => {
                const subjectColorClass = subjectColorsLegacy[companion.subject as keyof typeof subjectColorsLegacy] || subjectColorsLegacy.default
                const iconBackgroundColor = subjectsColors[companion.subject.toLowerCase() as keyof typeof subjectsColors] || "#E5E5E5"
                
                return (
                  <TableRow 
                    key={companion.id}
                    className="group hover:bg-muted/50 transition-colors duration-200 border-b border-border/30"
                  >
                    {/* Companion Info */}
                    <TableCell className="py-3 px-4 max-w-0 w-full">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                            className="rounded-full p-2.5 flex-shrink-0"
                            style={{ backgroundColor: iconBackgroundColor }}
                        >
                            <Image
                            src={`/icons/${companion.subject}.svg`}
                            alt={companion.subject}
                            width={24}
                            height={24}
                            />
                        </div>

                        <div className="space-y-1 min-w-0 flex-1">
                            <div className="font-medium text-foreground text-sm truncate">
                            {companion.name}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2">
                            {companion.topic}
                            </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Subject Badge */}
                    <TableCell className="py-3 px-4 text-center w-1/4">
                      <span className={`
                        inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
                        ${subjectColorClass} border
                      `}>
                        <BookOpen className="h-3 w-3" />
                        <span className="truncate">{companion.subject.charAt(0).toUpperCase() + companion.subject.slice(1)}</span>
                      </span>
                    </TableCell>

                    {/* Duration */}
                    <TableCell className="py-3 px-4 text-right w-1/4">
                      <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 flex-shrink-0" />
                        <span className="font-medium whitespace-nowrap">{companion.duration} min</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {/* Empty State */}
          {companions.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No recent sessions</p>
                <p className="text-sm">Start a new learning session to see it here</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/20 rounded-lg px-4 py-3 border border-border/30">
          <span className="font-medium">Total sessions: {companions.length}</span>
          <span className="font-medium">
            Total time: {companions.reduce((acc, comp) => acc + comp.duration, 0)} minutes
          </span>
        </div>
      </div>
    </div>
  )
}

export default CompanionList