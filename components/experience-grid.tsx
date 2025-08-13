"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, Users, Search, Grid, List } from "lucide-react"
import { mockExperiences } from "@/lib/mock-data"

export function ExperienceGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Filter and sort experiences
  const filteredExperiences = mockExperiences.filter(
    (experience) =>
      experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.location.city.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.pricing.basePrice - b.pricing.basePrice
      case "price-high":
        return b.pricing.basePrice - a.pricing.basePrice
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedExperiences.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedExperiences = sortedExperiences.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedExperiences.length)} of{" "}
        {sortedExperiences.length} experiences
      </div>

      {/* Experience Grid/List */}
      <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
        {paginatedExperiences.map((experience) => (
          <Link key={experience.id} href={`/experiences/${experience.id}`}>
            <Card
              className={`overflow-hidden hover:shadow-lg transition-shadow group ${viewMode === "list" ? "flex" : ""}`}
            >
              <div
                className={`relative overflow-hidden ${viewMode === "list" ? "w-64 flex-shrink-0" : "aspect-[4/3]"}`}
              >
                <img
                  src={experience.images[0] || "/placeholder.svg"}
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {experience.category.charAt(0).toUpperCase() + experience.category.slice(1).replace("-", " ")}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-background/90 rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{experience.rating}</span>
                  </div>
                </div>
              </div>

              <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">{experience.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{experience.shortDescription}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{experience.location.city}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{experience.duration.hours}h</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Max {experience.pricing.groupSize.max}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="font-heading font-bold text-lg">${experience.pricing.basePrice}</span>
                      <span className="text-muted-foreground text-sm ml-1">
                        /{experience.pricing.priceType.replace("_", " ")}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        experience.difficulty === "beginner"
                          ? "border-green-500 text-green-700"
                          : experience.difficulty === "intermediate"
                            ? "border-yellow-500 text-yellow-700"
                            : experience.difficulty === "advanced"
                              ? "border-orange-500 text-orange-700"
                              : "border-red-500 text-red-700"
                      }
                    >
                      {experience.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
