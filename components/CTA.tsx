'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Plus, Sparkles, Mic, Brain, Zap, Star, Wand2 } from 'lucide-react'
import { useRouter } from 'next/navigation';

const CTA = () => {
  const router = useRouter();
  return (
    <div className="cta-section relative overflow-hidden group">
      {/* Simplified gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
      
      {/* Minimal pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Simplified floating elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
      
      {/* Animated icons */}
      <div className="absolute top-6 right-6 text-white/30 animate-spin" style={{ animationDuration: '8s' }}>
        <Sparkles className="h-6 w-6" />
      </div>
      <div className="absolute top-4 left-4 text-white/25 animate-bounce">
        <Brain className="h-5 w-5" />
      </div>
      <div className="absolute bottom-8 left-8 text-white/30 animate-pulse">
        <Zap className="h-4 w-4" />
      </div>
      <div className="absolute bottom-4 right-12 text-white/25 animate-ping">
        <Star className="h-3 w-3" />
      </div>
      <div className="absolute top-1/2 right-4 text-white/20 animate-bounce" style={{ animationDelay: '1.5s' }}>
        <Wand2 className="h-4 w-4" />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 space-y-4 transform transition-all duration-500 group-hover:scale-[1.02]">
        {/* Header section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
            <span className="text-yellow-200 text-xs font-semibold uppercase tracking-wider">
              Create Your AI Companion
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text">
            Build a Personalized Learning Companion
          </h3>
          
          <p className="text-white/90 text-sm leading-relaxed font-medium max-w-sm">
            Pick a name, subject, voice and personality and start learning through voice conversation that feels natural and fun.
          </p>
        </div>
         
                   {/* CTA Image */}
          <div className="flex justify-center pt-1">
             <Image 
                 src="/images/cta.svg"
                 alt="AI Learning Companion"
                 width={0}
                 height={0}
                 sizes="100vw"
                 className="w-[calc(100%-4rem)] h-auto"
             />
          </div>
          
          {/* CTA Button */}
         <div className="pt-1 mb-8">
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => router.push('/companions/new')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Plus className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-90" />
            <span className="relative z-10">Build New Companion</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
        </div>

        {/* Feature grid */}
         <div className="grid grid-cols-2 gap-2">
           <div className="flex items-center gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Mic className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-white text-xs font-semibold">Voice Chat</div>
              <div className="text-white/70 text-xs">Natural conversations</div>
            </div>
          </div>
          
                     <div className="flex items-center gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-white text-xs font-semibold">AI Powered</div>
              <div className="text-white/70 text-xs">Smart learning</div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Side glow effects */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white/5 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}

export default CTA