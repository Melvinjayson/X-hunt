'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CreditCardIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Mock experience data
const mockExperience = {
  id: 1,
  title: 'Mission District Street Art Tour',
  description: 'Explore vibrant murals and street art in San Francisco\'s Mission District',
  price: 25,
  duration: '2 hours',
  maxParticipants: 8,
  imageSrc: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
  host: {
    name: 'Maria Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    rating: 4.9,
    reviews: 127
  },
  availableDates: [
    '2024-01-20',
    '2024-01-21',
    '2024-01-22',
    '2024-01-25',
    '2024-01-26'
  ],
  availableTimes: [
    '10:00 AM',
    '2:00 PM',
    '4:00 PM'
  ]
};

export default function ExperienceBookingPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [participants, setParticipants] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setBookingComplete(true);
  };

  const totalPrice = mockExperience.price * participants;
  const platformFee = Math.round(totalPrice * 0.15 * 100) / 100;
  const finalTotal = totalPrice + platformFee;

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              Booking Confirmed!
            </h1>
            <p className="mt-2 text-gray-600">
              Your experience has been successfully booked.
            </p>
            
            <div className="mt-8 rounded-lg bg-white p-6 shadow text-left">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Booking Details
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{mockExperience.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Participants:</span>
                  <span className="font-medium">{participants}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Total Paid:</span>
                  <span className="font-semibold">${finalTotal}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4 justify-center">
              <Link
                href="/profile"
                className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-500"
              >
                View My Bookings
              </Link>
              <Link
                href="/explore"
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Explore More
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href={`/experience/${params.id}`}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Experience
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Experience Summary */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="relative h-48">
                <Image
                  src={mockExperience.imageSrc}
                  alt={mockExperience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h1 className="text-xl font-bold text-gray-900">
                  {mockExperience.title}
                </h1>
                <p className="mt-2 text-gray-600">
                  {mockExperience.description}
                </p>
                
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <ClockIcon className="mr-1 h-4 w-4" />
                    {mockExperience.duration}
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="mr-1 h-4 w-4" />
                    Up to {mockExperience.maxParticipants} people
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={mockExperience.host.avatar}
                      alt={mockExperience.host.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Hosted by {mockExperience.host.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      ★ {mockExperience.host.rating} ({mockExperience.host.reviews} reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Book Your Experience
                </h2>
                
                <form onSubmit={handleBooking} className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {mockExperience.availableDates.map((date) => (
                        <button
                          key={date}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`p-3 text-sm rounded-md border ${
                            selectedDate === date
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {mockExperience.availableTimes.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 text-sm rounded-md border ${
                            selectedTime === time
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Participants */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Participants
                    </label>
                    <select
                      value={participants}
                      onChange={(e) => setParticipants(Number(e.target.value))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      {Array.from({ length: mockExperience.maxParticipants }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Price Breakdown
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>${mockExperience.price} × {participants} participant{participants > 1 ? 's' : ''}</span>
                        <span>${totalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform fee</span>
                        <span>${platformFee}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>Total</span>
                        <span>${finalTotal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || isLoading}
                    className="w-full flex items-center justify-center rounded-md bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCardIcon className="mr-2 h-4 w-4" />
                        Book Now - ${finalTotal}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}