'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { useTheme } from 'next-themes'

export function ClerkAuthProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#3b82f6', // Blue primary color
          colorBackground: theme === 'dark' ? '#0a0a0a' : '#ffffff',
          colorInputBackground: theme === 'dark' ? '#1a1a1a' : '#f8f9fa',
          colorInputText: theme === 'dark' ? '#ffffff' : '#000000',
        },
        elements: {
          formButtonPrimary: 
            'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white',
          card: 'shadow-xl border-0',
          headerTitle: 'text-2xl font-bold',
          headerSubtitle: 'text-muted-foreground',
          socialButtonsBlockButton: 
            'border-2 border-border hover:bg-muted transition-colors',
          formFieldInput: 
            'border-2 border-border focus:border-primary transition-colors',
          footerActionLink: 'text-primary hover:text-primary/80',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
} 