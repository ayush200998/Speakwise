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
import { Sparkles } from 'lucide-react'
import { createCompanion } from '@/lib/actions/companion.actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

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
    console.log(values)

    const companion = await createCompanion(values);

    if (companion) {
      toast.success('Companion created successfully');
      router.push(`/companions/${companion.id}`);
    } else {
      toast.error('Failed to create companion');
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Companion Builder
        </h1>
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
                    <SelectItem value="Maths">Maths</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Language">Language</SelectItem>
                    <SelectItem value="Economics">Economics</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
                    <SelectItem value="Coding">Coding</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
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
              className="w-full h-12 text-base gap-2"
            >
              <Sparkles className="h-5 w-5" />
              Build Companion
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CompanionForm