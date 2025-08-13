'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CalendarIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function HostBookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for bookings
  const bookings = [
    {
      id: 'B1001',
      experienceId: '1',
      experienceTitle: 'Urban Street Art Tour',
      experienceImage: 'https://source.unsplash.com/random/800x600/?street-art',
      guestName: 'Alex Johnson',
      guestImage: 'https://source.unsplash.com/random/256x256/?man-face',
      date: '2023-11-15',
      time: '10:00 AM',
      guests: 2,
      totalAmount: 90,
      status: 'confirmed',
      bookedAt: '2023-10-28',
      specialRequests: 'I have a slight mobility issue. Can we avoid steep hills?',
      contactInfo: 'alex.j@example.com | +1 (555) 123-4567',
    },
    {
      id: 'B1002',
      experienceId: '1',
      experienceTitle: 'Urban Street Art Tour',
      experienceImage: 'https://source.unsplash.com/random/800x600/?street-art',
      guestName: 'Maria Garcia',
      guestImage: 'https://source.unsplash.com/random/256x256/?woman-face',
      date: '2023-11-18',
      time: '2:00 PM',
      guests: 4,
      totalAmount: 180,
      status: 'pending',
      bookedAt: '2023-10-30',
      specialRequests: '',
      contactInfo: 'maria.g@example.com | +1 (555) 987-6543',
    },
    {
      id: 'B1003',
      experienceId: '3',
      experienceTitle: 'Hidden Waterfall Hike',
      experienceImage: 'https://source.unsplash.com/random/800x600/?waterfall',
      guestName: 'James Wilson',
      guestImage: 'https://source.unsplash.com/random/256x256/?man-face',
      date: '2023-11-20',
      time: '9:00 AM',
      guests: 3,
      totalAmount: 165,
      status: 'confirmed',
      bookedAt: '2023-10-25',
      specialRequests: 'We are bringing our dog. Is that okay?',
      contactInfo: 'james.w@example.com | +1 (555) 456-7890',
    },
    {
      id: 'B1004',
      experienceId: '3',
      experienceTitle: 'Hidden Waterfall Hike',
      experienceImage: 'https://source.unsplash.com/random/800x600/?waterfall',
      guestName: 'Emily Chen',
      guestImage: 'https://source.unsplash.com/random/256x256/?woman-face',
      date: '2023-11-05',
      time: '9:00 AM',
      guests: 2,
      totalAmount: 110,
      status: 'completed',
      bookedAt: '2023-10-15',
      specialRequests: '',
      contactInfo: 'emily.c@example.com | +1 (555) 234-5678',
    },
    {
      id: 'B1005',
      experienceId: '1',
      experienceTitle: 'Urban Street Art Tour',
      experienceImage: 'https://source.unsplash.com/random/800x600/?street-art',
      guestName: 'David Kim',
      guestImage: 'https://source.unsplash.com/random/256x256/?man-face',
      date: '2023-10-30',
      time: '10:00 AM',
      guests: 1,
      totalAmount: 45,
      status: 'cancelled',
      bookedAt: '2023-10-10',
      specialRequests: '',
      contactInfo: 'david.k@example.com | +1 (555) 876-5432',
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Bookings' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.experienceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getStatusBadgeClass = (status: string) => {
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
        return <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8 md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Bookings
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage reservations, communicate with guests, and track your schedule
              </p>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <ArrowPathIcon className={`-ml-0.5 mr-1.5 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
                Refresh
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                placeholder="Search by guest name, experience, or booking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bookings list */}
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            {filteredBookings.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <li key={booking.id} className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="relative h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={booking.guestImage}
                              alt={booking.guestName}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h2 className="text-lg font-medium text-gray-900">{booking.guestName}</h2>
                          <div className="flex items-center">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1">
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </span>
                            <span className="ml-2 text-sm text-gray-500">Booking #{booking.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="flex space-x-2">
                          <Link
                            href={`/host/bookings/${booking.id}`}
                            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            View Details
                          </Link>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            <ChatBubbleLeftIcon className="mr-1.5 h-4 w-4 text-gray-500" aria-hidden="true" />
                            Message
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                              <Image
                                src={booking.experienceImage}
                                alt={booking.experienceTitle}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">{booking.experienceTitle}</h3>
                            <Link href={`/experience/${booking.experienceId}`} className="text-xs text-primary-600 hover:text-primary-500">
                              View Experience
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <h3 className="text-xs font-medium uppercase text-gray-500">Booking Details</h3>
                        <ul className="mt-2 space-y-1">
                          <li className="flex items-center text-sm text-gray-700">
                            <CalendarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            {booking.date} at {booking.time}
                          </li>
                          <li className="flex items-center text-sm text-gray-700">
                            <UserGroupIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                          </li>
                          <li className="flex items-center text-sm text-gray-700">
                            <CurrencyDollarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            ${booking.totalAmount} total
                          </li>
                        </ul>
                      </div>

                      {booking.specialRequests && (
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="text-xs font-medium uppercase text-gray-500">Special Requests</h3>
                          <p className="mt-2 text-sm text-gray-700">{booking.specialRequests}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                      <div className="text-sm text-gray-500">
                        <span>Booked on {booking.bookedAt}</span>
                        <span className="mx-2">•</span>
                        <span>{booking.contactInfo}</span>
                      </div>
                      <div className="md:hidden">
                        <div className="flex space-x-2">
                          <Link
                            href={`/host/bookings/${booking.id}`}
                            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No bookings found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'You don\'t have any bookings yet.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
