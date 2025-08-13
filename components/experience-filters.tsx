"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

const categories = [
  "hiking",
  "climbing",
  "water-sports",
  "cycling",
  "wildlife",
  "cultural",
  "extreme",
  "photography",
  "food-tours",
  "multi-day",
]

const difficulties = ["beginner", "intermediate", "advanced", "expert"]

const durations = [
  { label: "Half day (1-4 hours)", value: "half-day" },
  { label: "Full day (5-8 hours)", value: "full-day" },
  { label: "Multi-day (2+ days)", value: "multi-day" },
]

export function ExperienceFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [location, setLocation] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    )
  }

  const toggleDuration = (duration: string) => {
    setSelectedDurations((prev) => (prev.includes(duration) ? prev.filter((d) => d !== duration) : [...prev, duration]))
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedDifficulties([])
    setSelectedDurations([])
    setPriceRange([0, 500])
    setLocation("")
  }

  const activeFiltersCount =
    selectedCategories.length + selectedDifficulties.length + selectedDurations.length + (location ? 1 : 0)

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full">
          <Filter className="h-4 w-4 mr-2" />
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
      </div>

      {/* Filters Panel */}
      <div className={`space-y-6 ${isOpen ? "block" : "hidden lg:block"}`}>
        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Active Filters</CardTitle>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category.replace("-", " ")}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
                {selectedDifficulties.map((difficulty) => (
                  <Badge
                    key={difficulty}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => toggleDifficulty(difficulty)}
                  >
                    {difficulty}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
                {location && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setLocation("")}>
                    {location}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Location Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="Enter city or region" value={location} onChange={(e) => setLocation(e.target.value)} />
          </CardContent>
        </Card>

        {/* Price Range */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Price Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Slider value={priceRange} onValueChange={setPriceRange} max={500} min={0} step={10} className="w-full" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={category} className="text-sm capitalize cursor-pointer">
                    {category.replace("-", " ")}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Difficulty */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Difficulty Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {difficulties.map((difficulty) => (
                <div key={difficulty} className="flex items-center space-x-2">
                  <Checkbox
                    id={difficulty}
                    checked={selectedDifficulties.includes(difficulty)}
                    onCheckedChange={() => toggleDifficulty(difficulty)}
                  />
                  <Label htmlFor={difficulty} className="text-sm capitalize cursor-pointer">
                    {difficulty}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Duration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {durations.map((duration) => (
                <div key={duration.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={duration.value}
                    checked={selectedDurations.includes(duration.value)}
                    onCheckedChange={() => toggleDuration(duration.value)}
                  />
                  <Label htmlFor={duration.value} className="text-sm cursor-pointer">
                    {duration.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
