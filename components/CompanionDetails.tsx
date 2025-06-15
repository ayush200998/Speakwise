'use client';

import Image from 'next/image';
import { vapi } from '@/lib/vapi.sdk';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef, useState } from 'react';
import { subjectColors } from '@/constants';
import { cn, configureAssistant } from '@/lib/utils';
import soundwaves from '@/constants/soundwaves.json';
import { Button } from './ui/button';
import { Play, Square, Pause } from 'lucide-react';
import { addToSessionHistory } from '@/lib/actions/companion.actions';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const CompanionDetails = ({
  name,
  subject,
  topic,
  style,
  voice,
  userName,
  userImage,
  companionId,
} : CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef])

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setIsPaused(false); // Reset pause state when call starts
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      setIsPaused(false); // Reset pause state when call ends
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      console.log('[Companion Details]: message', message);
      // Handle transcript messages
      if (message.type === 'transcript') {
        if (message.transcriptType === 'final' && message.transcript && message.transcript.trim()) {
          const newMessage = {
            role: message.role,
            content: message.transcript.trim(),
          }
          setMessages((prevMessages) => [newMessage, ...prevMessages]);
        }
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);

    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log('Error', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    }
  }, [companionId]);

  const toggleMicrophone = () => {
    // Only allow microphone toggle if call is active
    if (callStatus !== CallStatus.ACTIVE) {
      return;
    }
    
    try {
      const isMutedCheckFromVapi = vapi.isMuted();
      vapi.setMuted(!isMutedCheckFromVapi);
      setIsMuted(!isMutedCheckFromVapi);
    } catch (error) {
      console.error('Error toggling microphone:', error);
    }
  }

  const togglePauseResume = () => {
    // Only allow pause/resume if call is active
    if (callStatus !== CallStatus.ACTIVE) {
      return;
    }
    
    try {
      if (isPaused) {
        // Resume the conversation immediately
        setIsPaused(false);
      } else {
        // Pause immediately - update UI state
        setIsPaused(true);
      }
    } catch (error) {
      console.error('Error toggling pause/resume:', error);
    }
  }

  const handleStartCall = () => {
    setCallStatus(CallStatus.CONNECTING);
    setMessages([]); // Clear previous messages

    const assistantOverrides = {
      variableValues: { topic, subject, style },
      clientMessages: ['transcript', 'function-call', 'hang', 'speech-update'],
      serverMessages: ['transcript', 'function-call'],
    };  


    // @ts-expect-error - Vapi types are not fully compatible with TypeScript
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  }

  const handleEndCall = () => { 
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  }

  return (
    <section
      id='companion-details-section'
      className='flex flex-col w-full h-[65vh] transition-colors duration-300 gap-8'
    >
      <section 
        className='flex gap-8 max-sm:flex-col max-sm:gap-6'
      >
        <div
          className='companion-section relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-500'
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 w-16 h-16 rounded-full border border-foreground/20" />
            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full border border-foreground/10" />
          </div>

          <div
            className='companion-avatar relative overflow-hidden shadow-2xl border-4 border-white/20'
            style={{
              backgroundColor: subjectColors[subject as keyof typeof subjectColors] || '#E5E5E5',
            }}
          >
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-black/5 to-black/10" />
            
            <div
              className={cn(
                'absolute transition-all duration-1000 z-10 transform',
                [CallStatus.INACTIVE, CallStatus.FINISHED].includes(callStatus) ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse scale-105'
              )}
              style={{
                backgroundColor: subjectColors[subject as keyof typeof subjectColors] || '#E5E5E5',
              }}
            >
              <Image 
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className='max-sm:w-fit drop-shadow-2xl filter brightness-110'
              />
            </div>

            <div
              className={cn(
                'absolute transition-all duration-1000 z-10',
                callStatus === CallStatus.ACTIVE ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoPlay={false}
                className='companion-lottie'
              />
            </div>

            {/* Status ring indicator */}
            <div className={cn(
              "absolute inset-0 rounded-lg border-2 transition-all duration-300",
              callStatus === CallStatus.ACTIVE ? "border-green-400 animate-pulse" : 
              callStatus === CallStatus.CONNECTING ? "border-yellow-400 animate-spin" : 
              "border-transparent"
            )} />
          </div>
          
          <div className="text-center space-y-3 px-6 relative z-10">
            <div className="space-y-2">
              <p className='text-2xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text max-sm:text-xl'>
                {name}
              </p>
              <div className="flex items-center justify-center gap-3 text-sm">
                <div className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  callStatus === CallStatus.ACTIVE ? (isPaused ? "bg-orange-500 animate-pulse shadow-lg shadow-orange-500/50" : "bg-green-500 animate-pulse shadow-lg shadow-green-500/50") :
                  callStatus === CallStatus.CONNECTING ? "bg-yellow-500 animate-bounce" :
                  "bg-blue-500 animate-pulse"
                )} />
                <span className="text-muted-foreground font-medium">
                  {callStatus === CallStatus.ACTIVE ? (isPaused ? 'Session paused' : 'Teaching in progress') :
                   callStatus === CallStatus.CONNECTING ? 'Connecting...' :
                   `Ready to teach ${subject}`}
                </span>
              </div>
            </div>
            
            {/* Subject badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">{subject}</span>
            </div>
          </div>
        </div>

        <div className='user-section'>
          <div className='user-avatar group relative bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-500 hover:border-border/80'>
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            
            <div className="relative z-10">
              <div className="relative">
                <div className="p-1 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-inner">
                  <Image
                    src={userImage}
                    alt={userName}
                    width={130}
                    height={130}
                    className='rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
                
                {/* Enhanced status indicator */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-3 border-background flex items-center justify-center shadow-lg">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              
              <div className="text-center space-y-2 mt-4">
                <div className="inline-flex items-center gap-2 px-2 py-1 bg-muted/50 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <p className='text-xs text-muted-foreground font-semibold uppercase tracking-wide'>Student</p>
                </div>
                <p className='text-xl font-bold group-hover:text-primary transition-colors duration-300'>{userName}</p>
              </div>
            </div>
          </div>

          {/* Mic and Pause buttons row */}
          <div className="flex lg:flex-row flex-col gap-4 lg:gap-3">
            <button
              className='btn-mic group relative overflow-hidden bg-gradient-to-br from-muted via-muted/95 to-muted/90 hover:from-accent/80 hover:to-accent/60 border border-border/50 hover:border-accent/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
            >
              {/* Button background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="relative">
                  <Image
                    src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                    alt='microphone'
                    width={36}
                    height={36}
                    className="transition-all duration-300 group-hover:scale-110 group-disabled:grayscale"
                  />
                  
                  {/* Active call indicator */}
                  {callStatus === CallStatus.ACTIVE && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
                  )}
                </div>
                
                <p className='text-lg font-semibold max-md:hidden transition-all duration-300 group-hover:text-accent-foreground'>
                  {callStatus === CallStatus.ACTIVE ? (isMuted ? 'Unmute' : 'Mute') : 'Mic'}
                </p>
              </div>
            </button>

            <button
              className='btn-mic group relative overflow-hidden bg-gradient-to-br from-muted via-muted/95 to-muted/90 hover:from-orange-500/80 hover:to-orange-500/60 border border-border/50 hover:border-orange-500/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={togglePauseResume}
              disabled={callStatus !== CallStatus.ACTIVE}
            >
              {/* Button background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="relative">
                  {isPaused ? (
                    <Play className="w-9 h-9 text-orange-600 dark:text-orange-400 transition-all duration-300 group-hover:scale-110 group-disabled:grayscale" />
                  ) : (
                    <Pause className="w-9 h-9 text-orange-600 dark:text-orange-400 transition-all duration-300 group-hover:scale-110 group-disabled:grayscale" />
                  )}
                  
                  {/* Active call indicator */}
                  {callStatus === CallStatus.ACTIVE && isPaused && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full animate-pulse shadow-lg shadow-orange-500/50" />
                  )}
                </div>
                
                <p className='text-lg font-semibold max-md:hidden transition-all duration-300 group-hover:text-accent-foreground'>
                  {callStatus === CallStatus.ACTIVE ? (isPaused ? 'Resume' : 'Pause') : 'Pause'}
                </p>
              </div>
            </button>
          </div>

          <Button
            variant={[CallStatus.INACTIVE, CallStatus.FINISHED].includes(callStatus) ? 'shine' : 'destructive'}
            className={cn(
              'h-14 max-md:h-full max-md:w-[50%] gap-3 font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group border-0',
              [CallStatus.INACTIVE, CallStatus.FINISHED].includes(callStatus) && 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white',
              callStatus === CallStatus.CONNECTING && 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
              callStatus === CallStatus.ACTIVE && 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
            )}
            onClick={callStatus === CallStatus.ACTIVE ? handleEndCall : handleStartCall}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="relative z-10 flex items-center gap-3">
              {callStatus === CallStatus.ACTIVE ? (
                <>
                  <Square className="h-5 w-5" />
                  <span>End Session</span>
                </>
              ) : callStatus === CallStatus.CONNECTING ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span>Start Session</span>
                </>
              )}
            </div>
          </Button>
        </div>
      </section>

      <section className='transcript bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300'>
        <div className="p-5 border-b border-border/30 bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30 relative overflow-hidden">
          {/* Enhanced header background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-blue-400/10" />
          
          <div className="flex items-center justify-between relative z-10">
            <h3 className="text-lg font-bold flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse shadow-lg shadow-blue-500/30 dark:shadow-blue-400/20" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-30" />
              </div>
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text transparent">Live Transcript</span>
              <div className="px-2 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 rounded-full text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-700/50">
                LIVE
              </div>
            </h3>
            
            {messages.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground bg-muted/50 dark:bg-muted/70 px-3 py-1.5 rounded-full border border-border/50 backdrop-blur-sm">
                  {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className='transcript-message no-scrollbar p-6 space-y-6 min-h-[200px]'>
          {messages.length > 0 ? (
            messages.map((message, index) => {
              if (message.role === 'assistant') {
                return (
                  <div
                    key={`${message.content}-${index}`}
                    className='flex items-start gap-4 animate-in slide-in-from-left duration-500'
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white/20 dark:border-gray-600/20 relative"
                      style={{
                        backgroundColor: subjectColors[subject as keyof typeof subjectColors] || '#3B82F6',
                      }}
                    >
                      <span className="relative z-10 drop-shadow-sm">T</span>
                      <div className="absolute inset-0 bg-black/10 rounded-full" />
                    </div>
                    <div className="flex-1 space-y-2 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold" style={{ color: subjectColors[subject as keyof typeof subjectColors] || '#3B82F6' }}>
                          {name.split(' ')[0].replace(/[.,]/g, '')}
                        </p>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span className="text-xs text-muted-foreground font-medium">Tutor</span>
                        <div className="ml-auto text-xs text-muted-foreground/60">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-muted/30 to-muted/10 dark:from-muted/40 dark:to-muted/20 p-4 rounded-2xl rounded-tl-md border border-border/30 dark:border-border/50 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm">
                        <p className="text-sm leading-relaxed text-foreground/90 dark:text-foreground/95">{message.content}</p>
                      </div>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div
                    key={`${message.content}-${index}`}
                    className='flex items-start gap-4 flex-row-reverse animate-in slide-in-from-right duration-500'
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white/20 dark:border-gray-600/20 relative">
                      <span className="relative z-10 drop-shadow-sm">S</span>
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/20 rounded-full" />
                    </div>
                    <div className="flex-1 space-y-2 max-w-[80%]">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="text-xs text-muted-foreground/60">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">Student</span>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <p className="text-sm font-bold text-green-600 dark:text-green-400">{userName}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 p-4 rounded-2xl rounded-tr-md border border-green-200/50 dark:border-green-700/40 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm">
                        <p className="text-sm leading-relaxed text-right text-green-900/90 dark:text-green-100/95">{message.content}</p>
                      </div>
                    </div>
                  </div>
                )
              }
            })
          ) : (
            <div className="text-center py-16 space-y-6">
              <div className="relative mx-auto w-20 h-20">
                <div className="w-20 h-20 bg-gradient-to-br from-muted/50 to-muted/30 dark:from-muted/60 dark:to-muted/40 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-border/30">
                  <svg className="w-10 h-10 text-muted-foreground dark:text-muted-foreground/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-lg font-bold text-muted-foreground dark:text-muted-foreground/90">Ready for conversation</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wide">Waiting for session</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground/70 dark:text-muted-foreground/60 max-w-md mx-auto leading-relaxed">
                  Click &quot;Start Session&quot; to begin your learning journey. Your live conversation will appear here in real-time with beautiful message bubbles.
                </p>
              </div>
            </div>
          )}
        </div>

        {messages.length > 5 && <div className='transcript-fade' />}
      </section>
    </section>
  );
};

export default CompanionDetails;