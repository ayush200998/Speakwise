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

// Subject color mapping for badges
const subjectColors = {
  science: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
  maths: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/50 dark:text-yellow-300 dark:border-yellow-800',
  language: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800',
  coding: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800',
  history: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800',
  economics: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300 dark:border-green-800',
  default: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/50 dark:text-gray-300 dark:border-gray-800',
}

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
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/40 bg-muted/20">
                <TableHead className="font-medium text-muted-foreground text-sm py-3 px-4">
                  Companion
                </TableHead>
                <TableHead className="font-medium text-muted-foreground text-sm py-3 px-4 text-center">
                  Subject
                </TableHead>
                <TableHead className="font-medium text-muted-foreground text-sm py-3 px-4 text-right">
                  Duration
                </TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {companions.map((companion) => {
                const subjectColorClass = subjectColors[companion.subject as keyof typeof subjectColors] || subjectColors.default
                
                return (
                  <TableRow 
                    key={companion.id}
                    className="group hover:bg-muted/50 transition-colors duration-200 border-b border-border/30"
                  >
                    {/* Companion Info */}
                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                            className="rounded-full p-2.5"
                            style={{ backgroundColor: companion.color }}
                        >
                            <Image
                            src={`/icons/${companion.subject}.svg`}
                            alt={companion.subject}
                            width={24}
                            height={24}
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="font-medium text-foreground text-sm">
                            {companion.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                            {companion.topic}
                            </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Subject Badge */}
                    <TableCell className="py-3 px-4 text-center">
                      <span className={`
                        inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
                        ${subjectColorClass} border
                      `}>
                        <BookOpen className="h-3 w-3" />
                        {companion.subject.charAt(0).toUpperCase() + companion.subject.slice(1)}
                      </span>
                    </TableCell>

                    {/* Duration */}
                    <TableCell className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">{companion.duration} min</span>
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