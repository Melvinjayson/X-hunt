"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Lock, Shield, Calendar, Users, MapPin } from "lucide-react"
import type { Experience } from "@/lib/types"
import type { BookingData } from "../booking-modal"

interface PaymentStepProps {
  experience: Experience
  bookingData: BookingData
  updateBookingData: (updates: Partial<BookingData>) => void
  pricing: {
    subtotal: number
    serviceFee: number
    total: number
  }
  onComplete: () => void
  isLoading: boolean
}

export function PaymentStep({
  experience,
  bookingData,
  updateBookingData,
  pricing,
  onComplete,
  isLoading,
}: PaymentStepProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")

  const updatePaymentInfo = (field: string, value: string) => {
    updateBookingData({
      paymentInfo: {
        ...bookingData.paymentInfo,
        [field]: value,
      },
    })
  }

  const updateBillingAddress = (field: string, value: string) => {
    updateBookingData({
      paymentInfo: {
        ...bookingData.paymentInfo,
        billingAddress: {
          ...bookingData.paymentInfo.billingAddress,
          [field]: value,
        },
      },
    })
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4">
            <img
              src={experience.images[0] || "/placeholder.svg"}
              alt={experience.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold line-clamp-1">{experience.title}</h4>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{experience.location.city}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{bookingData.selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>
                    {bookingData.participants.adults +
                      bookingData.participants.children +
                      bookingData.participants.infants}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${pricing.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>${pricing.serviceFee}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${pricing.total}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Payment Options */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={paymentMethod === "card" ? "default" : "outline"}
              className="h-12"
              onClick={() => setPaymentMethod("card")}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Card
            </Button>
            <Button
              variant={paymentMethod === "paypal" ? "default" : "outline"}
              className="h-12"
              onClick={() => setPaymentMethod("paypal")}
            >
              PayPal
            </Button>
            <Button
              variant={paymentMethod === "apple" ? "default" : "outline"}
              className="h-12"
              onClick={() => setPaymentMethod("apple")}
            >
              Apple Pay
            </Button>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={bookingData.paymentInfo.cardNumber}
                    onChange={(e) => updatePaymentInfo("cardNumber", formatCardNumber(e.target.value))}
                    maxLength={19}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardholder-name">Cardholder Name</Label>
                  <Input
                    id="cardholder-name"
                    placeholder="John Doe"
                    value={bookingData.paymentInfo.cardholderName}
                    onChange={(e) => updatePaymentInfo("cardholderName", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input
                    id="expiry-date"
                    placeholder="MM/YY"
                    value={bookingData.paymentInfo.expiryDate}
                    onChange={(e) => updatePaymentInfo("expiryDate", formatExpiryDate(e.target.value))}
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={bookingData.paymentInfo.cvv}
                    onChange={(e) => updatePaymentInfo("cvv", e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <h4 className="font-semibold">Billing Address</h4>
                <div className="space-y-4">
                  <Input
                    placeholder="Street Address"
                    value={bookingData.paymentInfo.billingAddress.street}
                    onChange={(e) => updateBillingAddress("street", e.target.value)}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      value={bookingData.paymentInfo.billingAddress.city}
                      onChange={(e) => updateBillingAddress("city", e.target.value)}
                    />
                    <Input
                      placeholder="State"
                      value={bookingData.paymentInfo.billingAddress.state}
                      onChange={(e) => updateBillingAddress("state", e.target.value)}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="ZIP Code"
                      value={bookingData.paymentInfo.billingAddress.zipCode}
                      onChange={(e) => updateBillingAddress("zipCode", e.target.value)}
                    />
                    <Input
                      placeholder="Country"
                      value={bookingData.paymentInfo.billingAddress.country}
                      onChange={(e) => updateBillingAddress("country", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You'll be redirected to PayPal to complete your payment</p>
              <Badge variant="secondary">PayPal integration coming soon</Badge>
            </div>
          )}

          {paymentMethod === "apple" && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Use Touch ID or Face ID to pay with Apple Pay</p>
              <Badge variant="secondary">Apple Pay integration coming soon</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terms and Security */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={bookingData.agreedToTerms}
              onCheckedChange={(checked) => updateBookingData({ agreedToTerms: checked as boolean })}
            />
            <Label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the{" "}
              <button type="button" className="text-primary hover:underline">
                Terms of Service
              </button>
              ,{" "}
              <button type="button" className="text-primary hover:underline">
                Cancellation Policy
              </button>
              , and{" "}
              <button type="button" className="text-primary hover:underline">
                Privacy Policy
              </button>
            </Label>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Protected by 256-bit SSL encryption</span>
          </div>
        </CardContent>
      </Card>

      {/* Complete Booking Button */}
      <Button
        onClick={onComplete}
        disabled={!bookingData.agreedToTerms || isLoading}
        className="w-full h-12 text-lg"
        size="lg"
      >
        {isLoading ? "Processing Payment..." : `Pay $${pricing.total} & Book Now`}
      </Button>
    </div>
  )
}
