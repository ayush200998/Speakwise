'use client'

import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useDebounce from '@/hooks/useDebounce'

interface SearchInputProps {
  placeholder?: string
  className?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  className
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState('');
    
    // Debounce the search query
    const debouncedSearchQuery = useDebounce(searchQuery);

    // Initialize search query from URL params on component mount
    useEffect(() => {
        const currentTopic = searchParams.get('topic');
        if (currentTopic) {
            setSearchQuery(currentTopic);
        }
    }, [searchParams]);

    // Update URL when debounced search query changes
    useEffect(() => {
        if (debouncedSearchQuery.trim()) {
            router.push(`${pathname}?topic=${encodeURIComponent(debouncedSearchQuery.trim())}`);
        } else {
            router.push(`${pathname}`);
        }
    }, [debouncedSearchQuery, pathname, router]);
     
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

export default SearchInput