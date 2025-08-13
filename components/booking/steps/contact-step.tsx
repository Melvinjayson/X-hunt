"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, MessageSquare } from "lucide-react"
import type { BookingData } from "../booking-modal"

interface ContactStepProps {
  bookingData: BookingData
  updateBookingData: (updates: Partial<BookingData>) => void
}

export function ContactStep({ bookingData, updateBookingData }: ContactStepProps) {
  const updateContactInfo = (field: string, value: string) => {
    updateBookingData({
      contactInfo: {
        ...bookingData.contactInfo,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <p className="text-sm text-muted-foreground">
            We'll use this information to send you booking confirmations and important updates.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contact-name"
                  placeholder="Enter your full name"
                  value={bookingData.contactInfo.name}
                  onChange={(e) => updateContactInfo("name", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="Enter your email"
                  value={bookingData.contactInfo.email}
                  onChange={(e) => updateContactInfo("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="contact-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={bookingData.contactInfo.phone}
                onChange={(e) => updateContactInfo("phone", e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special-requests">Special Requests (Optional)</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="special-requests"
                placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                value={bookingData.contactInfo.specialRequests}
                onChange={(e) => updateContactInfo("specialRequests", e.target.value)}
                className="pl-10 min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Privacy:</strong> Your information is secure and will only be shared with your experience host.
            </p>
            <p>
              <strong>Communication:</strong> We'll send booking confirmations and important updates to your email.
            </p>
            <p>
              <strong>Phone:</strong> Used for urgent communications related to your booking.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
