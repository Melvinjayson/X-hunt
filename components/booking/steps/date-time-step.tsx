"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CalendarIcon } from "lucide-react"
import type { Experience } from "@/lib/types"
import type { BookingData } from "../booking-modal"

interface DateTimeStepProps {
  experience: Experience
  bookingData: BookingData
  updateBookingData: (updates: Partial<BookingData>) => void
}

const TIME_SLOTS = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

export function DateTimeStep({ experience, bookingData, updateBookingData }: DateTimeStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(bookingData.selectedDate || undefined)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    updateBookingData({
      selectedDate: date || null,
      selectedTime: "", // Reset time when date changes
    })
  }

  const handleTimeSelect = (time: string) => {
    updateBookingData({ selectedTime: time })
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Disable past dates
    if (date < today) return true

    // Disable dates outside availability window
    const startDate = new Date(experience.availability.startDate)
    const endDate = new Date(experience.availability.endDate)
    if (date < startDate || date > endDate) return true

    // Disable blackout dates
    return experience.availability.blackoutDates.some((blackoutDate) => {
      const blackout = new Date(blackoutDate)
      return date.toDateString() === blackout.toDateString()
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Clock className="h-5 w-5 mr-2" />
              Select Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Please select a date first</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {TIME_SLOTS.map((time) => (
                  <Button
                    key={time}
                    variant={bookingData.selectedTime === time ? "default" : "outline"}
                    className="justify-center"
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected Summary */}
      {selectedDate && bookingData.selectedTime && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Selected Date & Time</h4>
                <p className="text-muted-foreground">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {bookingData.selectedTime}
                </p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Duration: {experience.duration.hours}h
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Availability Info */}
      <div className="text-sm text-muted-foreground space-y-2">
        <p>
          <strong>Available:</strong> {new Date(experience.availability.startDate).toLocaleDateString()} -{" "}
          {new Date(experience.availability.endDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Cancellation:</strong> {experience.cancellationPolicy}
        </p>
      </div>
    </div>
  )
}
