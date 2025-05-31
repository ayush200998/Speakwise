'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ThemeToggle } from './theme-toggle'
import NavItems from './ui/NavItems'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'
import { Menu, X } from 'lucide-react'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='navbar'>
      <div className="flex items-center">
        <Link href='/' className="flex items-center gap-3 group">
          <Image
            src='/icons/app-icon-favicon.svg'
            alt='logo'
            width={46}
            height={46}
            className="transition-transform group-hover:scale-110"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              SpeakWise
            </h1>
            <p className="text-xs text-muted-foreground font-medium -mt-1">
              AI Learning Platform
            </p>
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className='navbar-links hidden md:flex'>
        <SignedIn>
          <NavItems />
        </SignedIn>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <SignedOut>
          <SignInButton mode="modal">
            <Button size="sm">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <div className="flex items-center justify-between">
                  <DrawerTitle className="text-lg font-semibold">
                    Navigation
                  </DrawerTitle>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerHeader>
              <div className="px-4 pb-6">
                <div className="flex flex-col space-y-4">
                  <NavItems mobile onItemClick={() => setIsOpen(false)} />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar