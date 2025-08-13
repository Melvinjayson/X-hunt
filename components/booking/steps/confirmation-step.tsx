"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, MapPin, Users, Mail, Phone, Download, Share2 } from "lucide-react"
import type { Experience } from "@/lib/types"
import type { BookingData } from "../booking-modal"

interface ConfirmationStepProps {
  experience: Experience
  bookingData: BookingData
  onClose: () => void
}

export function ConfirmationStep({ experience, bookingData, onClose }: ConfirmationStepProps) {
  const bookingId = `XH-${Date.now().toString().slice(-6)}`
  const totalParticipants =
    bookingData.participants.adults + bookingData.participants.children + bookingData.participants.infants

  return (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-green-600 mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground">
          Your adventure is booked and confirmed. We've sent the details to your email.
        </p>
      </div>

      {/* Booking Details */}
      <Card className="text-left">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Booking Details</span>
            <Badge variant="secondary">#{bookingId}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Experience Info */}
          <div className="flex items-start space-x-4">
            <img
              src={experience.images[0] || "/placeholder.svg"}
              alt={experience.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold">{experience.title}</h4>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                <span>
                  {experience.location.city}, {experience.location.country}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">
                    {bookingData.selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">{bookingData.selectedTime}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Participants</p>
                  <p className="text-sm text-muted-foreground">
                    {totalParticipants} people ({bookingData.participants.adults} adults
                    {bookingData.participants.children > 0 && `, ${bookingData.participants.children} children`}
                    {bookingData.participants.infants > 0 && `, ${bookingData.participants.infants} infants`})
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-sm text-muted-foreground">{bookingData.contactInfo.name}</p>
                  <p className="text-sm text-muted-foreground">{bookingData.contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{bookingData.contactInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {bookingData.contactInfo.specialRequests && (
            <>
              <Separator />
              <div>
                <p className="font-medium mb-1">Special Requests</p>
                <p className="text-sm text-muted-foreground">{bookingData.contactInfo.specialRequests}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Payment Summary */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Paid</span>
              <span className="font-semibold">${bookingData.totalAmount}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Payment processed successfully via credit card ending in ****
              {bookingData.paymentInfo.cardNumber.slice(-4)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="text-left">
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div>
              <p className="font-medium">Check your email</p>
              <p className="text-sm text-muted-foreground">
                We've sent booking confirmation and detailed instructions to {bookingData.contactInfo.email}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div>
              <p className="font-medium">Prepare for your adventure</p>
              <p className="text-sm text-muted-foreground">
                Review the requirements and what to bring. Your host will contact you 24 hours before.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div>
              <p className="font-medium">Enjoy your experience</p>
              <p className="text-sm text-muted-foreground">Show up on time and get ready for an amazing adventure!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" className="flex items-center bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>
        <Button variant="outline" className="flex items-center bg-transparent">
          <Share2 className="h-4 w-4 mr-2" />
          Share Experience
        </Button>
        <Button onClick={onClose}>Continue Exploring</Button>
      </div>

      {/* Support Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Need help? Contact us at support@x-hunt.com or call +1 (555) 123-4567</p>
      </div>
    </div>
  )
}
