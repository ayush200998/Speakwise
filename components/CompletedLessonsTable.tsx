'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table'
import { Clock, ChevronDown, ChevronRight } from 'lucide-react'
import { subjectsColors } from '@/constants'

interface CompletedLesson {
  id: string
  name: string
  topic: string
  subject: string
  duration: number
}

interface CompletedLessonsTableProps {
  lessons: CompletedLesson[]
}

const CompletedLessonsTable: React.FC<CompletedLessonsTableProps> = ({ lessons }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/30">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-foreground">Completed lessons</h2>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-muted rounded-md transition-all duration-200 hover:scale-110"
          >
            <div className={`transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-0'}`}>
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-muted-foreground transition-all duration-200" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground transition-all duration-200" />
              )}
            </div>
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table with smooth animation */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isCollapsed 
            ? 'max-h-0 opacity-0' 
            : 'max-h-[2000px] opacity-100'
        }`}
      >
        <div className="transform transition-transform duration-300 ease-in-out">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/30 bg-muted/20">
                <TableHead className="font-semibold text-foreground text-sm py-4 px-6 w-1/2">
                  Lessons
                </TableHead>
                <TableHead className="font-semibold text-foreground text-sm py-4 px-6 text-center w-1/4">
                  Subject
                </TableHead>
                <TableHead className="font-semibold text-foreground text-sm py-4 px-6 text-right w-1/4">
                  Duration
                </TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {lessons.length > 0 ? (
                lessons.map((lesson, index) => {
                  const iconBackgroundColor = subjectsColors[lesson.subject?.toLowerCase() as keyof typeof subjectsColors] || "#E5E5E5"
                  
                  return (
                    <TableRow 
                      key={`${lesson.id}-${index}`}
                      className={`group hover:bg-muted/30 transition-all duration-200 border-b border-border/20 last:border-b-0 hover:scale-[1.01] hover:shadow-sm ${!isCollapsed ? 'animate-fade-in-up' : ''}`}
                      style={{ 
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      {/* Lesson Info */}
                      <TableCell className="py-4 px-6 max-w-0 w-full">
                        <div className="flex items-center gap-4 min-w-0">
                          <div
                            className="rounded-xl p-3 flex-shrink-0 shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-md"
                            style={{ backgroundColor: iconBackgroundColor }}
                          >
                            <Image
                              src={`/icons/${lesson.subject?.toLowerCase()}.svg`}
                              alt={lesson.subject || 'Subject'}
                              width={24}
                              height={24}
                              className="drop-shadow-sm"
                            />
                          </div>

                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="font-semibold text-foreground text-base truncate transition-colors duration-200 group-hover:text-primary">
                              {lesson.name}
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              Topic: {lesson.topic}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Subject Badge */}
                      <TableCell className="py-4 px-6 text-center w-1/4">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-foreground text-background transition-all duration-200 group-hover:scale-105 group-hover:shadow-md">
                          {lesson.subject?.charAt(0).toUpperCase() + lesson.subject?.slice(1)}
                        </span>
                      </TableCell>

                      {/* Duration */}
                      <TableCell className="py-4 px-6 text-right w-1/4">
                        <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground text-base transition-colors duration-200 group-hover:text-primary">
                            {lesson.duration} mins
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="py-12 text-center">
                    <div className="text-muted-foreground space-y-2 transition-all duration-300">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50 transition-all duration-300 hover:opacity-70" />
                      <p className="text-lg font-medium">No completed lessons yet</p>
                      <p className="text-sm">Start learning with AI companions to see your progress here</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>


    </div>
  )
}

export default CompletedLessonsTable 