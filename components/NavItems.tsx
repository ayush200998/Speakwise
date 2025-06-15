"use client"

import Link from 'next/link'
import React from 'react'
import { useParams, usePathname } from 'next/navigation'
import { Home, Users, BookOpen } from 'lucide-react'

const navItems = [
    {
        label: 'Home',
        href: '/',
        icon: Home,
    },
    {
        label: 'Companions',
        href: '/companions',
        icon: Users,
    },
    {
        label: 'My Journey',
        href: '/my-journey',
        icon: BookOpen,
    },
]

interface NavItemsProps {
  mobile?: boolean
  onItemClick?: () => void
}

const NavItems = ({ mobile = false, onItemClick }: NavItemsProps) => {
  const params = useParams()
  const pathname = usePathname()

  const isActiveRoute = (href: string) => {
    // For home route
    if (href === '/' && pathname === '/') {
      return true
    }
    
    // For other routes, check if pathname starts with href
    if (href !== '/' && pathname.startsWith(href)) {
      return true
    }
    
    // Additional check using params for dynamic routes
    if (params && Object.keys(params).length > 0) {
      // If we have params, we're in a dynamic route
      const baseRoute = pathname.split('/')[1]
      const targetRoute = href.split('/')[1]
      return baseRoute === targetRoute
    }
    
    return false
  }

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick()
    }
  }

  if (mobile) {
    return (
      <div className='flex flex-col space-y-2'>
        {navItems.map((item) => {
          const isActive = isActiveRoute(item.href)
          const IconComponent = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleItemClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold' 
                  : 'text-foreground hover:bg-muted hover:text-blue-700 dark:hover:text-blue-400'
              }`}
            >
              <IconComponent size={20} />
              <span className="text-base">{item.label}</span>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <nav className='flex items-center gap-4'>
      {navItems.map((item) => {
        const isActive = isActiveRoute(item.href)
        const IconComponent = item.icon
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link flex items-center gap-2 ${
              isActive 
                ? 'active text-blue-700 dark:text-blue-400 font-semibold' 
                : 'text-foreground hover:text-blue-700 dark:hover:text-blue-400'
            }`}
          >
            <IconComponent size={18} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default NavItems