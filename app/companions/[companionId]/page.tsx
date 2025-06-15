import { getCompanionDetails } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { subjectBorderColors, subjectColors, subjectsColors } from "@/constants";
import CompanionDetails from "@/components/CompanionDetails";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CompanionDetailsPage = async ({ params }: { params: { companionId: string } }) => {
  const { companionId } = await params;
  const companionDetails = await getCompanionDetails(companionId);
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (companionDetails.error) {
    redirect('/companions');
  }

  // Get colors based on subject
  const borderColorClass = subjectBorderColors[companionDetails.subject as keyof typeof subjectBorderColors] || subjectBorderColors.default
  const subjectColorClass = subjectColors[companionDetails.subject as keyof typeof subjectColors] || subjectColors.default
  const iconBackgroundColor = subjectsColors[companionDetails.subject.toLowerCase() as keyof typeof subjectsColors] || "#E5E5E5"

  return (
    <div
      id='companions-library-container'
      className='flex flex-col gap-6 w-full h-[calc(100vh-5rem)] p-6 px-10 bg-background transition-colors duration-300'
    >
      <div className={`relative bg-card text-card-foreground p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-l-4 ${borderColorClass} border-r-border border-b-border group overflow-hidden`}>
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10 max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <div className="flex items-center space-x-5 max-sm:w-full">
            {/* Back button */}
            <Link 
              href="/companions"
              className="group flex items-center justify-center w-10 h-10 bg-gradient-to-r from-muted/80 to-muted/60 hover:from-accent/80 hover:to-accent/60 rounded-lg border border-border/50 hover:border-accent/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300" />
            </Link>
            
            {/* Enhanced image container with background color */}
            <div 
              className="rounded-xl p-3 shadow-md group-hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: iconBackgroundColor }}
            >
              <Image
                src={`/icons/${companionDetails.subject}.svg`}
                alt={`${companionDetails.subject} icon`}
                width={24}
                height={24}
                className="text-pink-600 dark:text-pink-400"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2 max-sm:flex-wrap max-sm:gap-2">
                <h2 className="text-xl font-bold text-foreground transition-colors duration-300 max-sm:text-lg">
                  {companionDetails.name}
                </h2>
                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm transition-all duration-300 hover:scale-105 ${subjectColorClass}`}>
                  {companionDetails.subject}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-2xl max-sm:max-w-none max-sm:text-base max-sm:leading-normal">
                {companionDetails.topic}
              </p>
            </div>
          </div>
          
          {/* Enhanced time display with icon */}
          <div className="flex items-center space-x-2 bg-muted px-4 py-3 rounded-xl shadow-sm max-sm:w-full max-sm:justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-foreground">
              {companionDetails.duration} minutes
            </span>
          </div>
        </div>
      </div>

      <CompanionDetails
        {...companionDetails}
        companionId={companionId}
        userName={user.firstName}
        userImage={user.imageUrl}
      />
    </div>
  )
}

export default CompanionDetailsPage