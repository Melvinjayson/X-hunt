"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DateTimeStep } from "./steps/date-time-step"
import { ParticipantsStep } from "./steps/participants-step"
import { ContactStep } from "./steps/contact-step"
import { PaymentStep } from "./steps/payment-step"
import { ConfirmationStep } from "./steps/confirmation-step"
import type { Experience } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  experience: Experience
}

export interface BookingData {
  experienceId: string
  selectedDate: Date | null
  selectedTime: string
  participants: {
    adults: number
    children: number
    infants: number
  }
  contactInfo: {
    name: string
    email: string
    phone: string
    specialRequests: string
  }
  paymentInfo: {
    cardNumber: string
    expiryDate: string
    cvv: string
    cardholderName: string
    billingAddress: {
      street: string
      city: string
      state: string
      zipCode: string
      country: string
    }
  }
  totalAmount: number
  agreedToTerms: boolean
}

const STEPS = [
  { id: 1, title: "Date & Time", description: "Choose your preferred date" },
  { id: 2, title: "Participants", description: "How many people?" },
  { id: 3, title: "Contact Info", description: "Your details" },
  { id: 4, title: "Payment", description: "Secure payment" },
  { id: 5, title: "Confirmation", description: "Booking complete" },
]

export function BookingModal({ isOpen, onClose, experience }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { user, isAuthenticated } = useAuth()

  const [bookingData, setBookingData] = useState<BookingData>({
    experienceId: experience.id,
    selectedDate: null,
    selectedTime: "",
    participants: {
      adults: 2,
      children: 0,
      infants: 0,
    },
    contactInfo: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      specialRequests: "",
    },
    paymentInfo: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: user?.name || "",
      billingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
      },
    },
    totalAmount: 0,
    agreedToTerms: false,
  })

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }))
  }

  const calculateTotal = () => {
    const { adults, children } = bookingData.participants
    const basePrice = experience.pricing.basePrice
    const total = adults * basePrice + children * (basePrice * 0.7) // Children 30% discount
    const serviceFee = Math.round(total * 0.1)
    return {
      subtotal: total,
      serviceFee,
      total: total + serviceFee,
    }
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return bookingData.selectedDate && bookingData.selectedTime
      case 2:
        return bookingData.participants.adults > 0
      case 3:
        return bookingData.contactInfo.name && bookingData.contactInfo.email && bookingData.contactInfo.phone
      case 4:
        return (
          bookingData.paymentInfo.cardNumber &&
          bookingData.paymentInfo.expiryDate &&
          bookingData.paymentInfo.cvv &&
          bookingData.paymentInfo.cardholderName &&
          bookingData.agreedToTerms
        )
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleBookingComplete = async () => {
    setIsLoading(true)

    // Simulate booking API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update total amount
    const pricing = calculateTotal()
    updateBookingData({ totalAmount: pricing.total })

    setCurrentStep(5)
    setIsLoading(false)
  }

  const handleClose = () => {
    setCurrentStep(1)
    setBookingData({
      ...bookingData,
      selectedDate: null,
      selectedTime: "",
      participants: { adults: 2, children: 0, infants: 0 },
      contactInfo: {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        specialRequests: "",
      },
      agreedToTerms: false,
    })
    onClose()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DateTimeStep experience={experience} bookingData={bookingData} updateBookingData={updateBookingData} />
      case 2:
        return (
          <ParticipantsStep experience={experience} bookingData={bookingData} updateBookingData={updateBookingData} />
        )
      case 3:
        return <ContactStep bookingData={bookingData} updateBookingData={updateBookingData} />
      case 4:
        return (
          <PaymentStep
            experience={experience}
            bookingData={bookingData}
            updateBookingData={updateBookingData}
            pricing={calculateTotal()}
            onComplete={handleBookingComplete}
            isLoading={isLoading}
          />
        )
      case 5:
        return <ConfirmationStep experience={experience} bookingData={bookingData} onClose={handleClose} />
      default:
        return null
    }
  }

  if (!isAuthenticated) {
    return null // Should be handled by parent component
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-heading font-bold">
            {currentStep === 5 ? "Booking Confirmed!" : "Book Your Adventure"}
          </DialogTitle>
        </DialogHeader>

        {currentStep < 5 && (
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Step {currentStep} of {STEPS.length - 1}
                </span>
                <span>{Math.round((currentStep / (STEPS.length - 1)) * 100)}% Complete</span>
              </div>
              <Progress value={(currentStep / (STEPS.length - 1)) * 100} className="h-2" />
            </div>

            {/* Step Indicator */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                {STEPS.slice(0, -1).map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.id}
                    </div>
                    {index < STEPS.length - 2 && (
                      <div className={`w-8 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Step Info */}
            <div className="text-center">
              <h3 className="font-semibold text-lg">{STEPS[currentStep - 1].title}</h3>
              <p className="text-muted-foreground text-sm">{STEPS[currentStep - 1].description}</p>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="py-6">{renderStep()}</div>

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button onClick={handleNext} disabled={!canProceedToNext()}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleBookingComplete} disabled={!canProceedToNext() || isLoading}>
                {isLoading ? "Processing..." : "Complete Booking"}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
