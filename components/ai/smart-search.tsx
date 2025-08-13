"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, Info } from "lucide-react"
import { searchEngine, type AISearchResult } from "@/lib/ai-services"
import { useDebounce } from "@/lib/performance"

interface SmartSearchProps {
  onSearch: (query: string, results: string[]) => void
  className?: string
}

export function SmartSearch({ onSearch, className }: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [searchResult, setSearchResult] = useState<AISearchResult | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [showAIInfo, setShowAIInfo] = useState(false)

  const debouncedSearch = useDebounce(async (searchQuery: string) => {
    if (searchQuery.length < 3) return

    setIsSearching(true)
    try {
      const result = await searchEngine.smartSearch(searchQuery)
      setSearchResult(result)
      onSearch(result.query, result.results)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsSearching(false)
    }
  }, 300)

  const handleInputChange = (value: string) => {
    setQuery(value)
    debouncedSearch(value)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    debouncedSearch(suggestion)
  }

  return (
    <div className={className}>
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Try 'mountain hiking for beginners' or 'weekend adventures near me'"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            className="pl-10 pr-12 h-12 text-lg"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {isSearching && (
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
            )}
            <Button variant="ghost" size="sm" onClick={() => setShowAIInfo(!showAIInfo)} className="p-1">
              <Sparkles className="h-4 w-4 text-blue-500" />
            </Button>
          </div>
        </div>

        {showAIInfo && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">AI-Powered Smart Search</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Our search understands natural language and provides inclusive, unbiased results. We use ethical AI to
                  help you find the perfect adventure while respecting your privacy.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="text-xs">
                    Natural Language
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Bias-Free
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Privacy-First
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {searchResult && searchResult.suggestions.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Try these suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {searchResult.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {searchResult && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Found {searchResult.results.length} experiences</span>
            <Badge variant="secondary" className="text-xs">
              {Math.round(searchResult.confidence * 100)}% confidence
            </Badge>
          </div>
        </div>
      )}
    </div>
  )
}
