"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, Users } from "lucide-react"

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("")

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading font-bold text-3xl mb-4">Find Your Perfect Adventure</h2>
            <p className="text-muted-foreground">Search through hundreds of unique experiences</p>
          </div>

          {/* Search Form */}
          <div className="bg-background rounded-2xl p-6 shadow-lg border">
            <div className="grid md:grid-cols-4 gap-4">
              {/* What */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">What</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Hiking, climbing..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Where */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Where</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Destination"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* When */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">When</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="pl-10" />
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="2 guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button size="lg" className="px-12">
                <Search className="mr-2 h-5 w-5" />
                Search Adventures
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
