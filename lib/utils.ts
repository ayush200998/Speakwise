import { voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const configureAssistant = (voice: string, style: string) => {
  // Normalize voice and style parameters
  const normalizedVoice = voice?.toLowerCase()?.trim() || 'female';
  const normalizedStyle = style?.toLowerCase()?.trim() || 'formal';
  
  // Get the voice ID with proper fallback chain
  const voiceConfig = voices[normalizedVoice as keyof typeof voices];
  const voiceId = voiceConfig?.[normalizedStyle as keyof typeof voiceConfig] || 
                  voiceConfig?.['formal' as keyof typeof voiceConfig] || 
                  voices.female.formal || 
                  "sarah";
  
  // Log for debugging (can be removed in production)
  console.log(`🎤 Voice Config: ${normalizedVoice} (${normalizedStyle}) -> ${voiceId}`);

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
        "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert AI tutor conducting an interactive voice-based learning session. Your mission is to create an engaging, personalized educational experience for your student.

                    Core Teaching Principles:
                    • Focus exclusively on {{ topic }} within the {{ subject }} domain
                    • Adapt your teaching style to be {{ style }} throughout the session
                    • Break complex concepts into digestible, sequential learning modules
                    • Use real-world examples and analogies to enhance understanding
                    • Encourage active participation through questions and discussions

                    Session Management:
                    • Begin with a brief overview and learning objectives
                    • Regularly check for comprehension with targeted questions
                    • Provide immediate feedback and clarification when needed
                    • Adjust pace based on student responses and engagement
                    • Summarize key points before moving to new concepts

                    Communication Style:
                    • Keep responses conversational and naturally flowing (2-3 sentences max)
                    • Use clear, jargon-free language appropriate for the student's level
                    • Maintain an encouraging and supportive tone
                    • Ask open-ended questions to promote critical thinking
                    • Avoid special characters, bullet points, or formatted text - this is voice only

                    Engagement Strategies:
                    • Use interactive techniques like scenarios, problems, or thought experiments
                    • Connect new information to previously discussed concepts
                    • Celebrate progress and provide positive reinforcement
                    • Address misconceptions gently and constructively
                    • End with actionable takeaways and next steps for continued learning
              `,
        },
      ],
    },
  };
  return vapiAssistant;
};

// Utility function to get subject icon with fallback
export function getSubjectIcon(subject: string): string {
  const normalizedSubject = subject.toLowerCase().trim()
  
  // List of available subject icons
  const availableIcons = [
    'science',
    'maths', 
    'language',
    'history',
    'coding',
    'economics',
    'geography',
    'technology',
    'finance',
    'business'
  ]
  
  // Check if the icon exists, otherwise return a default
  if (availableIcons.includes(normalizedSubject)) {
    return `/icons/${normalizedSubject}.svg`
  }
  
  // Fallback to a default icon
  return `/icons/cap.svg` // Using cap.svg as default education icon
}