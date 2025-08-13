"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  MapPin,
  Clock,
  Users,
  Calendar,
  Shield,
  Award,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react"
import type { Experience } from "@/lib/types"
import { mockUsers, mockReviews } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { BookingModal } from "@/components/booking/booking-modal"
import { LoginModal } from "@/components/auth/login-modal"
import { SignupModal } from "@/components/auth/signup-modal"

interface ExperienceDetailProps {
  experience: Experience
}

export function ExperienceDetail({ experience }: ExperienceDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const { isAuthenticated } = useAuth()

  const host = mockUsers.find((user) => user.id === experience.hostId)
  const reviews = mockReviews.filter((review) => review.experienceId === experience.id)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % experience.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + experience.images.length) % experience.images.length)
  }

  const handleReserveClick = () => {
    if (isAuthenticated) {
      setShowBookingModal(true)
    } else {
      setShowLoginModal(true)
    }
  }

  const switchToSignup = () => {
    setShowLoginModal(false)
    setShowSignupModal(true)
  }

  const switchToLogin = () => {
    setShowSignupModal(false)
    setShowLoginModal(true)
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
              <img
                src={experience.images[currentImageIndex] || "/placeholder.svg"}
                alt={experience.title}
                className="w-full h-full object-cover"
              />

              {experience.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {experience.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-background/80 hover:bg-background"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="secondary" size="icon" className="bg-background/80 hover:bg-background">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Experience Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">
                    {experience.category.charAt(0).toUpperCase() + experience.category.slice(1).replace("-", " ")}
                  </Badge>
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
                <h1 className="font-heading font-bold text-3xl mb-4">{experience.title}</h1>

                <div className="flex items-center space-x-6 text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{experience.rating}</span>
                    <span>({experience.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {experience.location.city}, {experience.location.country}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{experience.duration.hours} hours</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">
                      {experience.pricing.groupSize.min}-{experience.pricing.groupSize.max} people
                    </div>
                    <div className="text-sm text-muted-foreground">Group size</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Certificate</div>
                    <div className="text-sm text-muted-foreground">Provided</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading font-semibold text-xl mb-4">About this experience</h2>
                <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
              </div>

              {/* What's Included */}
              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">What's included</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {experience.included.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">Requirements</h3>
                <div className="space-y-2">
                  {experience.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Host Info */}
              {host && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Meet your host</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={host.avatar || "/placeholder.svg"} alt={host.name} />
                        <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{host.name}</h4>
                        <p className="text-muted-foreground text-sm mb-2">{host.bio}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{host.stats.totalBookings} experiences hosted</span>
                          <span>Joined {new Date(host.joinedAt).getFullYear()}</span>
                          {host.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-heading font-bold text-2xl">${experience.pricing.basePrice}</span>
                    <span className="text-muted-foreground ml-1">
                      /{experience.pricing.priceType.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{experience.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Check-in</label>
                    <Button variant="outline" className="w-full justify-start mt-1 bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Select date
                    </Button>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Guests</label>
                    <Button variant="outline" className="w-full justify-start mt-1 bg-transparent">
                      <Users className="h-4 w-4 mr-2" />2 guests
                    </Button>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleReserveClick}>
                  {isAuthenticated ? "Reserve" : "Sign in to Reserve"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">You won't be charged yet</p>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>${experience.pricing.basePrice} x 2 guests</span>
                    <span>${experience.pricing.basePrice * 2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${Math.round(experience.pricing.basePrice * 2 * 0.1)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      ${experience.pricing.basePrice * 2 + Math.round(experience.pricing.basePrice * 2 * 0.1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} experience={experience} />
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSwitchToSignup={switchToSignup} />
      <SignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} onSwitchToLogin={switchToLogin} />
    </>
  )
}
