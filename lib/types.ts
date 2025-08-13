// User types and interfaces
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "user" | "host" | "admin"
  phone?: string
  bio?: string
  location?: string
  joinedAt: Date
  isVerified: boolean
  preferences: {
    categories: string[]
    priceRange: [number, number]
    difficulty: string[]
  }
  stats: {
    totalBookings: number
    totalSpent: number
    reviewsGiven: number
  }
}

// Experience types
export interface Experience {
  id: string
  title: string
  description: string
  shortDescription: string
  category: ExperienceCategory
  location: {
    city: string
    country: string
    coordinates: [number, number]
    address: string
  }
  pricing: {
    basePrice: number
    currency: string
    priceType: "per_person" | "per_group"
    groupSize: {
      min: number
      max: number
    }
  }
  duration: {
    hours: number
    days?: number
  }
  difficulty: "beginner" | "intermediate" | "advanced" | "expert"
  images: string[]
  hostId: string
  rating: number
  reviewCount: number
  features: string[]
  included: string[]
  requirements: string[]
  cancellationPolicy: string
  availability: {
    startDate: Date
    endDate: Date
    blackoutDates: Date[]
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type ExperienceCategory =
  | "hiking"
  | "climbing"
  | "water-sports"
  | "cycling"
  | "wildlife"
  | "cultural"
  | "extreme"
  | "photography"
  | "food-tours"
  | "multi-day"
  | "wellness"
  | "family-friendly"
  | "senior-friendly"
  | "accessible"
  | "urban-exploration"
  | "art-creative"
  | "music-dance"
  | "cooking-classes"
  | "wine-tasting"
  | "historical"
  | "spiritual"
  | "volunteer"
  | "educational"
  | "technology"
  | "nightlife"
  | "seasonal"
  | "romantic"
  | "team-building"
  | "luxury"
  | "budget-friendly"

// Booking types
export interface Booking {
  id: string
  userId: string
  experienceId: string
  hostId: string
  status: BookingStatus
  bookingDate: Date
  experienceDate: Date
  participants: {
    adults: number
    children: number
    infants: number
  }
  totalAmount: number
  currency: string
  paymentStatus: PaymentStatus
  paymentMethod: string
  specialRequests?: string
  contactInfo: {
    name: string
    email: string
    phone: string
  }
  cancellationReason?: string
  refundAmount?: number
  createdAt: Date
  updatedAt: Date
}

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "no-show"

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | "partially-refunded"

// Review types
export interface Review {
  id: string
  bookingId: string
  userId: string
  experienceId: string
  rating: number
  title: string
  comment: string
  images?: string[]
  helpfulVotes: number
  createdAt: Date
  response?: {
    comment: string
    createdAt: Date
  }
}

// Rewards and gamification
export interface UserRewards {
  userId: string
  points: number
  level: number
  badges: Badge[]
  achievements: Achievement[]
  streaks: {
    currentBookingStreak: number
    longestBookingStreak: number
    lastBookingDate?: Date
  }
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  earnedAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  progress: number
  target: number
  isCompleted: boolean
  reward: {
    points: number
    badge?: string
  }
}

// Host analytics
export interface HostAnalytics {
  hostId: string
  period: {
    startDate: Date
    endDate: Date
  }
  metrics: {
    totalBookings: number
    totalRevenue: number
    averageRating: number
    responseRate: number
    cancellationRate: number
    repeatCustomers: number
  }
  topExperiences: {
    experienceId: string
    bookings: number
    revenue: number
  }[]
  monthlyData: {
    month: string
    bookings: number
    revenue: number
  }[]
}

// Search and filter types
export interface SearchFilters {
  query?: string
  category?: ExperienceCategory[]
  location?: string
  priceRange?: [number, number]
  difficulty?: string[]
  duration?: {
    min?: number
    max?: number
  }
  rating?: number
  dateRange?: {
    startDate: Date
    endDate: Date
  }
  groupSize?: number
  sortBy?: "relevance" | "price-low" | "price-high" | "rating" | "newest"
}

export interface SearchResult {
  experiences: Experience[]
  totalCount: number
  facets: {
    categories: { name: string; count: number }[]
    locations: { name: string; count: number }[]
    priceRanges: { range: string; count: number }[]
    difficulties: { name: string; count: number }[]
  }
}
