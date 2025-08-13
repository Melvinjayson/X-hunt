"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Mountain,
  Waves,
  Camera,
  Bike,
  TreePine,
  Compass,
  Zap,
  UtensilsCrossed,
  Heart,
  Users,
  UserCheck,
  Accessibility,
  Building,
  Palette,
  Music,
  ChefHat,
  Wine,
  BookOpen,
  Sparkles,
  HandHeart,
  GraduationCap,
  Laptop,
  Moon,
  Calendar,
  HeartHandshake,
  Briefcase,
  Crown,
  DollarSign,
} from "lucide-react"

const categories = [
  // Adventure & Outdoor
  { id: "hiking", name: "Hiking", icon: Mountain, color: "text-green-600" },
  { id: "climbing", name: "Climbing", icon: Mountain, color: "text-slate-600" },
  { id: "water-sports", name: "Water Sports", icon: Waves, color: "text-blue-600" },
  { id: "cycling", name: "Cycling", icon: Bike, color: "text-orange-600" },
  { id: "wildlife", name: "Wildlife", icon: TreePine, color: "text-emerald-600" },
  { id: "extreme", name: "Extreme", icon: Zap, color: "text-red-600" },
  { id: "multi-day", name: "Multi-Day", icon: Calendar, color: "text-indigo-600" },

  // Accessible & Inclusive
  { id: "family-friendly", name: "Family", icon: Users, color: "text-blue-500" },
  { id: "senior-friendly", name: "Seniors", icon: UserCheck, color: "text-purple-500" },
  { id: "accessible", name: "Accessible", icon: Accessibility, color: "text-teal-600" },

  // Wellness & Personal Growth
  { id: "wellness", name: "Wellness", icon: Heart, color: "text-pink-500" },
  { id: "spiritual", name: "Spiritual", icon: Sparkles, color: "text-violet-500" },

  // Cultural & Educational
  { id: "cultural", name: "Cultural", icon: Compass, color: "text-amber-600" },
  { id: "historical", name: "Historical", icon: BookOpen, color: "text-brown-600" },
  { id: "educational", name: "Educational", icon: GraduationCap, color: "text-blue-700" },

  // Creative & Artistic
  { id: "art-creative", name: "Art & Creative", icon: Palette, color: "text-purple-600" },
  { id: "music-dance", name: "Music & Dance", icon: Music, color: "text-pink-600" },
  { id: "photography", name: "Photography", icon: Camera, color: "text-purple-600" },

  // Food & Drink
  { id: "food-tours", name: "Food Tours", icon: UtensilsCrossed, color: "text-pink-600" },
  { id: "cooking-classes", name: "Cooking", icon: ChefHat, color: "text-orange-500" },
  { id: "wine-tasting", name: "Wine Tasting", icon: Wine, color: "text-red-500" },

  // Urban & Modern
  { id: "urban-exploration", name: "Urban", icon: Building, color: "text-gray-600" },
  { id: "technology", name: "Technology", icon: Laptop, color: "text-blue-600" },
  { id: "nightlife", name: "Nightlife", icon: Moon, color: "text-indigo-500" },

  // Special Occasions
  { id: "romantic", name: "Romantic", icon: HeartHandshake, color: "text-rose-500" },
  { id: "team-building", name: "Team Building", icon: Briefcase, color: "text-slate-500" },
  { id: "seasonal", name: "Seasonal", icon: Calendar, color: "text-green-500" },

  // Social Impact & Budget
  { id: "volunteer", name: "Volunteer", icon: HandHeart, color: "text-emerald-500" },
  { id: "luxury", name: "Luxury", icon: Crown, color: "text-yellow-500" },
  { id: "budget-friendly", name: "Budget", icon: DollarSign, color: "text-green-600" },
]

export function CategoryFilters() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl mb-4">Explore by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover adventures that match your interests, accessibility needs, and lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id

            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-transform text-center ${
                  isSelected ? "" : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedCategory(isSelected ? null : category.id)}
              >
                <Icon className={`h-6 w-6 ${isSelected ? "text-primary-foreground" : category.color}`} />
                <span className="text-xs font-medium leading-tight">{category.name}</span>
              </Button>
            )
          })}
        </div>

        {selectedCategory && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Showing experiences in:{" "}
              <span className="font-semibold text-primary">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
