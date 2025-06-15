'use client'

import { Button } from './ui/button'
import { Bookmark, Clock, Play, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { subjectBorderColors, subjectColors, subjectsColors } from '@/constants'

interface CompanionCardProps {
  id: string
  name: string
  topic: string
  subject: string
  duration: number
}

const CompanionCard: React.FC<CompanionCardProps> = ({ 
  id, // Used for future functionality like navigation/tracking
  name, 
  topic, 
  subject, 
  duration
}) => {
  const router = useRouter();
  const borderColorClass = subjectBorderColors[subject as keyof typeof subjectBorderColors] || subjectBorderColors.default
  const subjectColorClass = subjectColors[subject as keyof typeof subjectColors] || subjectColors.default
  const iconBackgroundColor = subjectsColors[subject.toLowerCase() as keyof typeof subjectsColors] || "#E5E5E5"

  return (
    <div 
      data-companion-id={id}
      className={`
        relative group bg-card text-card-foreground rounded-xl border-2 border-l-5 border-t-2 
        ${borderColorClass} border-r-border border-b-border
        p-6 shadow-sm hover:shadow-2xl transition-all hover:scale-[1.03] hover:-translate-y-2
        backdrop-blur-sm overflow-hidden h-full flex flex-col
        animate-in fade-in slide-in-from-bottom-4 duration-700
      `}>
      
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      
      {/* Bookmark Icon */}
      <div className="absolute top-4 right-4 z-50">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:scale-110 hover:rotate-12 transition-all duration-300 relative z-50"
        >
          <Bookmark className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full space-y-4 relative z-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between pr-8">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Subject Icon */}
              <div
                className="rounded-xl p-2.5 shadow-sm flex-shrink-0"
                style={{ backgroundColor: iconBackgroundColor }}
              >
                <Image
                  src={`/icons/${subject.toLowerCase()}.svg`}
                  alt={subject}
                  width={20}
                  height={20}
                />
              </div>
              <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300 truncate">
                {name}
              </h3>
            </div>
          </div>
          
          {/* Subject Badge */}
          <div className="flex items-center gap-2">
            <span className={`
              inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
              ${subjectColorClass} transition-all duration-300 hover:scale-105 hover:shadow-md
            `}>
              <BookOpen className="h-3 w-3 transition-transform duration-300 group-hover:rotate-12" />
              {subject}
            </span>
          </div>
        </div>

        {/* Topic Description */}
        <div className="space-y-2 flex-1">
          <p className="text-sm text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80 line-clamp-3">
            {topic}
          </p>
        </div>

        {/* Duration and Action */}
        <div className="flex items-center justify-between pt-2 mt-auto">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground transition-all duration-300 group-hover:text-foreground/80">
            <Clock className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            <span>{duration} min</span>
          </div>

          <Button 
            variant="default" 
            size="sm"
            className="gap-1.5 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => router.push(`/companions/${id}`)}
          >
            <Play className="h-3 w-3 transition-transform duration-300 group-hover:scale-110" />
            Launch Lesson
          </Button>
        </div>
      </div>

      {/* Enhanced gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
      
      {/* Pulsing border effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none" />
      
      {/* Floating particles effect */}
      <div className="absolute top-2 left-2 w-1 h-1 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce pointer-events-none" style={{ animationDelay: '0ms' }} />
      <div className="absolute top-6 left-8 w-1 h-1 bg-accent/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce pointer-events-none" style={{ animationDelay: '200ms' }} />
      <div className="absolute bottom-3 right-12 w-0.5 h-0.5 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce pointer-events-none" style={{ animationDelay: '400ms' }} />
    </div>
  )
}

export default CompanionCard