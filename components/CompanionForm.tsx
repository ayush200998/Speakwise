'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sparkles, ArrowLeft, Loader2 } from 'lucide-react'
import { createCompanion } from '@/lib/actions/companion.actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { subjectsV2 } from '@/constants'

const formSchema = z.object({
  icon: z.string().optional(),
  name: z.string().min(2, {
    message: "Companion name must be at least 2 characters.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  topic: z.string().min(5, {
    message: "Topic description must be at least 5 characters.",
  }),
  voice: z.string({
    required_error: "Please select a voice type.",
  }),
  style: z.string({
    required_error: "Please select a speaking style.",
  }),
  duration: z.number().min(5, {
    message: "Duration must be at least 5 minutes.",
  }).max(180, {
    message: "Duration cannot exceed 180 minutes.",
  }),
})

const CompanionForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      console.log(values)

      const companion = await createCompanion(values);

      if (companion) {
        toast.success('Companion created successfully');
        router.push(`/companions/${companion.id}`);
      } else {
        toast.error('Failed to create companion');
      }
    } catch (error) {
      console.error('Error creating companion:', error);
      toast.error('Failed to create companion');
    } finally {
      setIsLoading(false);
    }
  }

  const handleBack = () => {
    router.back(); // Go back to previous page
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        {/* Header with Back Button */}
        <div className="text-center relative">
          <div className="absolute left-0 top-0 flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Companion Builder
          </h1>
          <p className="text-muted-foreground">
            Create your personalized AI learning companion
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Companion Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Companion name
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter the companion name - ex: Calculus King" 
                    {...field} 
                    className="bg-background border-border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Subject
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background border-border w-full">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjectsV2.map((subject: string) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* What should this companion teach? */}
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  What should this companion teach?
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter the topic you want to learn - ex: Derivatives"
                    {...field}
                    className="bg-background border-border min-h-[80px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Voice Settings Row - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Voice Type */}
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Voice Type
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border h-11 px-4 w-full min-w-[180px]">
                        <SelectValue placeholder="Female" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Speaking Style */}
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Speaking Style
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border h-11 px-4 w-full min-w-[180px]">
                        <SelectValue placeholder="Formal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Session duration in mins
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="30"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      className="bg-background border-border h-11 px-4 w-full min-w-[180px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              variant="default"
              disabled={isLoading}
              className="w-full h-12 text-base gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating Companion...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Build Companion
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CompanionForm