'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Mock booking data
const mockBooking = {
  id: 'BK-2024-001',
  status: 'confirmed',
  experienceTitle: 'Mission District Street Art Tour',
  experienceImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
  guestName: 'Sarah Johnson',
  guestEmail: 'sarah.johnson@email.com',
  guestPhone: '+1 (555) 123-4567',
  guestAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
  participants: 2,
  bookingDate: '2024-01-15',
  experienceDate: '2024-01-20',
  experienceTime: '2:00 PM',
  duration: '2 hours',
  totalAmount: 50,
  hostEarnings: 42.50,
  platformFee: 7.50,
  paymentStatus: 'paid',
  specialRequests: 'Vegetarian lunch option preferred. One participant uses a wheelchair.',
  meetingPoint: '16th Street BART Station, Mission District',
  notes: 'Guest mentioned they are photography enthusiasts and would love extra time for photos.',
  createdAt: '2024-01-10T10:30:00Z'
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed':
      return React.createElement(CheckCircleIcon, { className: 'h-5 w-5 text-green-600' });
    case 'pending':
      return React.createElement(ClockIcon, { className: 'h-5 w-5 text-yellow-600' });
    case 'completed':
      return React.createElement(CheckCircleIcon, { className: 'h-5 w-5 text-blue-600' });
    case 'cancelled':
      return React.createElement(XCircleIcon, { className: 'h-5 w-5 text-red-600' });
    default:
      return React.createElement(ExclamationTriangleIcon, { className: 'h-5 w-5 text-gray-600' });
  }
};

export default function BookingDetailPage() {
  const params = useParams();

  return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
    React.createElement(Header),
    
    React.createElement('main', { className: 'mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8' },
      // Back button
      React.createElement('div', { className: 'mb-6' },
        React.createElement(Link, {
          href: '/host/bookings',
          className: 'inline-flex items-center text-sm text-gray-600 hover:text-gray-900'
        },
          React.createElement(ArrowLeftIcon, { className: 'mr-2 h-4 w-4' }),
          'Back to Bookings'
        )
      ),

      // Header
      React.createElement('div', { className: 'mb-8' },
        React.createElement('div', { className: 'flex items-center justify-between' },
          React.createElement('div', null,
            React.createElement('h1', { className: 'text-2xl font-bold text-gray-900' },
              'Booking Details'
            ),
            React.createElement('p', { className: 'mt-1 text-sm text-gray-600' },
              `Booking ID: ${mockBooking.id}`
            )
          ),
          React.createElement('div', { className: 'flex items-center gap-2' },
            getStatusIcon(mockBooking.status),
            React.createElement('span', {
              className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(mockBooking.status)}`
            },
              mockBooking.status.charAt(0).toUpperCase() + mockBooking.status.slice(1)
            )
          )
        )
      ),

      // Main content
      React.createElement('div', { className: 'grid grid-cols-1 gap-8 lg:grid-cols-3' },
        // Left column
        React.createElement('div', { className: 'lg:col-span-2 space-y-6' },
          // Experience details
          React.createElement('div', { className: 'overflow-hidden rounded-lg bg-white shadow' },
            React.createElement('div', { className: 'p-6' },
              React.createElement('h2', { className: 'text-lg font-semibold text-gray-900 mb-4' },
                'Experience Details'
              ),
              React.createElement('div', { className: 'flex gap-4' },
                React.createElement('div', { className: 'relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg' },
                  React.createElement(Image, {
                    src: mockBooking.experienceImage,
                    alt: mockBooking.experienceTitle,
                    fill: true,
                    className: 'object-cover'
                  })
                ),
                React.createElement('div', { className: 'flex-1' },
                  React.createElement('h3', { className: 'text-lg font-medium text-gray-900' },
                    mockBooking.experienceTitle
                  ),
                  React.createElement('div', { className: 'mt-2 space-y-1 text-sm text-gray-600' },
                    React.createElement('div', { className: 'flex items-center' },
                      React.createElement(CalendarIcon, { className: 'mr-2 h-4 w-4' }),
                      `${mockBooking.experienceDate} at ${mockBooking.experienceTime}`
                    ),
                    React.createElement('div', { className: 'flex items-center' },
                      React.createElement(ClockIcon, { className: 'mr-2 h-4 w-4' }),
                      mockBooking.duration
                    ),
                    React.createElement('div', { className: 'flex items-center' },
                      React.createElement(UserIcon, { className: 'mr-2 h-4 w-4' }),
                      `${mockBooking.participants} participant${mockBooking.participants > 1 ? 's' : ''}`
                    ),
                    React.createElement('div', { className: 'flex items-center' },
                      React.createElement(MapPinIcon, { className: 'mr-2 h-4 w-4' }),
                      mockBooking.meetingPoint
                    )
                  )
                )
              )
            )
          ),

          // Guest information
          React.createElement('div', { className: 'overflow-hidden rounded-lg bg-white shadow' },
            React.createElement('div', { className: 'p-6' },
              React.createElement('h2', { className: 'text-lg font-semibold text-gray-900 mb-4' },
                'Guest Information'
              ),
              React.createElement('div', { className: 'flex items-start gap-4' },
                React.createElement('div', { className: 'relative h-12 w-12 overflow-hidden rounded-full' },
                  React.createElement(Image, {
                    src: mockBooking.guestAvatar,
                    alt: mockBooking.guestName,
                    fill: true,
                    className: 'object-cover'
                  })
                ),
                React.createElement('div', { className: 'flex-1' },
                  React.createElement('h3', { className: 'text-lg font-medium text-gray-900' },
                    mockBooking.guestName
                  ),
                  React.createElement('div', { className: 'mt-2 space-y-2' },
                    React.createElement('div', { className: 'flex items-center text-sm text-gray-600' },
                      React.createElement(EnvelopeIcon, { className: 'mr-2 h-4 w-4' }),
                      React.createElement('a', {
                        href: `mailto:${mockBooking.guestEmail}`,
                        className: 'text-primary-600 hover:text-primary-500'
                      },
                        mockBooking.guestEmail
                      )
                    ),
                    React.createElement('div', { className: 'flex items-center text-sm text-gray-600' },
                      React.createElement(PhoneIcon, { className: 'mr-2 h-4 w-4' }),
                      React.createElement('a', {
                        href: `tel:${mockBooking.guestPhone}`,
                        className: 'text-primary-600 hover:text-primary-500'
                      },
                        mockBooking.guestPhone
                      )
                    )
                  )
                )
              )
            )
          ),

          // Special requests and notes
          mockBooking.specialRequests && React.createElement('div', { className: 'overflow-hidden rounded-lg bg-white shadow' },
            React.createElement('div', { className: 'p-6' },
              React.createElement('h2', { className: 'text-lg font-semibold text-gray-900 mb-4' },
                'Special Requests'
              ),
              React.createElement('p', { className: 'text-gray-700' },
                mockBooking.specialRequests
              )
            )
          ),

          mockBooking.notes && React.createElement('div', { className: 'overflow-hidden rounded-lg bg-white shadow' },
            React.createElement('div', { className: 'p-6' },
              React.createElement('h2', { className: 'text-lg font-semibold text-gray-900 mb-4' },
                'Host Notes'
              ),
              React.createElement('p', { className: 'text-gray-700' },
                mockBooking.notes
              )
            )
          )
        ),

        // Right column - Payment and actions
        React.createElement('div', { className: 'space-y-6' },
          // Payment summary
          React.createElement('div', { className: 'overflow-hidden rounded-lg bg-white shadow' },
            React.createElement('div', { className: 'p-6' },
              React.createElement('h2', { className: 'text-lg font-semibold text-gray-900 mb-4' },
                'Payment Summary'
              ),
              React.createElement('div', { className: 'space-y-3' },
                React.createElement('div', { className: 'flex justify-between text-sm' },
                  React.createElement('span', { className: 'text-gray-600' }, 'Total Amount'),
                  React.createElement('span', { className: 'font-medium' }, `$${mockBooking.totalAmount}`)
                ),
                React.createElement('div', { className: 'flex justify-between text-sm' },
                  React.createElement('span', { className: 'text-gray-600' }, 'Platform Fee'),
                  React.createElement('span', { className: 'text-red-600' }, `-$${mockBooking.platformFee}`)
                ),
                React.createElement('div', { className: 'border-t pt-3' },
                  React.createElement('div', { className: 'flex justify-between' },
                    React.createElement('span', { className: 'font-medium text-gray-900' }, 'Your Earnings'),
                    React.createElement('span', { className: 'font-medium text-green-600' }, `$${mockBooking.hostEarnings}`)
                  )
                ),
                React.createElement('div', { className: 'mt-3 pt-3 border-t' },
                  React.createElement('div', { className: 'flex items-center justify-between' },
                    React.createElement('span', { className: 'text-sm text-gray-600' }, 'Payment Status'),
                    React.createElement('span', {
                      className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        mockBooking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`
                    },
                      mockBooking.paymentStatus.charAt(0).toUpperCase() + mockBooking.paymentStatus.slice(1)
                    )
                  )
                )
              )
            )
          ),

          // Actions
          React.createElement('div', { className: 'overflow-hidden rounded-lg bg-white shadow' },
            React.createElement('div', { className: 'p-6' },
              React.createElement('h2', { className: 'text-lg font-semibold text-gray-900 mb-4' },
                'Actions'
              ),
              React.createElement('div', { className: 'space-y-3' },
                mockBooking.status === 'pending' && React.createElement('button', {
                  className: 'w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500'
                },
                  'Confirm Booking'
                ),
                mockBooking.status === 'confirmed' && React.createElement('button', {
                  className: 'w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500'
                },
                  'Mark as Completed'
                ),
                React.createElement('button', {
                  className: 'w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                },
                  'Message Guest'
                ),
                mockBooking.status !== 'cancelled' && mockBooking.status !== 'completed' && React.createElement('button', {
                  className: 'w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500'
                },
                  'Cancel Booking'
                )
              )
            )
          ),

          // Booking timeline
          React.createElement('div', { className: 'overflow-hidden rounded-lg bg-white shadow' },
            React.createElement('div', { className: 'p-6' },
              React.createElement('h2', { className: 'text-lg font-semibold text-gray-900 mb-4' },
                'Booking Timeline'
              ),
              React.createElement('div', { className: 'space-y-3 text-sm' },
                React.createElement('div', { className: 'flex items-center' },
                  React.createElement('div', { className: 'h-2 w-2 bg-blue-600 rounded-full mr-3' }),
                  React.createElement('span', { className: 'text-gray-600' },
                    `Booked on ${new Date(mockBooking.createdAt).toLocaleDateString()}`
                  )
                ),
                mockBooking.status === 'confirmed' && React.createElement('div', { className: 'flex items-center' },
                  React.createElement('div', { className: 'h-2 w-2 bg-green-600 rounded-full mr-3' }),
                  React.createElement('span', { className: 'text-gray-600' }, 'Confirmed')
                ),
                React.createElement('div', { className: 'flex items-center' },
                  React.createElement('div', { className: 'h-2 w-2 bg-gray-300 rounded-full mr-3' }),
                  React.createElement('span', { className: 'text-gray-400' },
                    `Scheduled for ${mockBooking.experienceDate}`
                  )
                )
              )
            )
          )
        )
      )
    ),
    
    React.createElement(Footer)
  );
}
