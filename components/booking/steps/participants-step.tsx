"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Users, Info } from "lucide-react"
import type { Experience } from "@/lib/types"
import type { BookingData } from "../booking-modal"

interface ParticipantsStepProps {
  experience: Experience
  bookingData: BookingData
  updateBookingData: (updates: Partial<BookingData>) => void
}

export function ParticipantsStep({ experience, bookingData, updateBookingData }: ParticipantsStepProps) {
  const { adults, children, infants } = bookingData.participants
  const totalParticipants = adults + children + infants

  const updateParticipants = (type: "adults" | "children" | "infants", change: number) => {
    const newCount = Math.max(0, bookingData.participants[type] + change)

    // Enforce group size limits
    const newTotal =
      type === "adults"
        ? newCount + children + infants
        : type === "children"
          ? adults + newCount + infants
          : adults + children + newCount

    if (newTotal > experience.pricing.groupSize.max) return
    if (type === "adults" && newCount === 0) return // Must have at least 1 adult

    updateBookingData({
      participants: {
        ...bookingData.participants,
        [type]: newCount,
      },
    })
  }

  const calculatePricing = () => {
    const basePrice = experience.pricing.basePrice
    const adultTotal = adults * basePrice
    const childTotal = children * (basePrice * 0.7) // 30% discount for children
    const infantTotal = 0 // Infants are free

    return {
      adultTotal,
      childTotal,
      infantTotal,
      subtotal: adultTotal + childTotal + infantTotal,
    }
  }

  const pricing = calculatePricing()

  return (
    <div className="space-y-6">
      {/* Group Size Info */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Group Size</span>
            </div>
            <Badge variant="outline">
              {totalParticipants} of {experience.pricing.groupSize.max} max
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Minimum {experience.pricing.groupSize.min} people, maximum {experience.pricing.groupSize.max} people
          </p>
        </CardContent>
      </Card>

      {/* Participant Selection */}
      <div className="space-y-4">
        {/* Adults */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Adults</h4>
                <p className="text-sm text-muted-foreground">Age 18+</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateParticipants("adults", -1)}
                  disabled={adults <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateParticipants("adults", 1)}
                  disabled={totalParticipants >= experience.pricing.groupSize.max}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {adults > 0 && (
              <div className="mt-3 pt-3 border-t flex justify-between text-sm">
                <span>
                  ${experience.pricing.basePrice} × {adults}
                </span>
                <span className="font-medium">${pricing.adultTotal}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Children */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Children</h4>
                <p className="text-sm text-muted-foreground">Age 2-17 (30% discount)</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateParticipants("children", -1)}
                  disabled={children <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateParticipants("children", 1)}
                  disabled={totalParticipants >= experience.pricing.groupSize.max}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {children > 0 && (
              <div className="mt-3 pt-3 border-t flex justify-between text-sm">
                <span>
                  ${Math.round(experience.pricing.basePrice * 0.7)} × {children}
                </span>
                <span className="font-medium">${pricing.childTotal}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Infants */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Infants</h4>
                <p className="text-sm text-muted-foreground">Under 2 (Free)</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateParticipants("infants", -1)}
                  disabled={infants <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{infants}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateParticipants("infants", 1)}
                  disabled={totalParticipants >= experience.pricing.groupSize.max}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {infants > 0 && (
              <div className="mt-3 pt-3 border-t flex justify-between text-sm">
                <span>Free × {infants}</span>
                <span className="font-medium">$0</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pricing Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Pricing Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {adults > 0 && (
            <div className="flex justify-between">
              <span>
                {adults} Adult{adults > 1 ? "s" : ""}
              </span>
              <span>${pricing.adultTotal}</span>
            </div>
          )}
          {children > 0 && (
            <div className="flex justify-between">
              <span>
                {children} Child{children > 1 ? "ren" : ""}
              </span>
              <span>${pricing.childTotal}</span>
            </div>
          )}
          {infants > 0 && (
            <div className="flex justify-between">
              <span>
                {infants} Infant{infants > 1 ? "s" : ""}
              </span>
              <span>Free</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>${pricing.subtotal}</span>
          </div>
        </CardContent>
      </Card>

      {/* Important Info */}
      <div className="flex items-start space-x-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-blue-900">Important Information</p>
          <ul className="mt-1 text-blue-800 space-y-1">
            <li>• At least one adult (18+) must be present</li>
            <li>• Children must be accompanied by an adult</li>
            <li>• Infants under 2 years old are free</li>
            <li>• Maximum group size: {experience.pricing.groupSize.max} people</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
