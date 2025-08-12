'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { Tab } from '@headlessui/react'; // Temporarily disabled due to compatibility issues
import { 
  CalendarIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  DocumentTextIcon, 
  PlusCircleIcon, 
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon
} from '@heroicons/react/24/outline';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function HostDashboard() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);

  // Mock data for experiences
  const experiences = [
    {
      id: 1,
      title: 'Urban Street Art Tour',
      description: 'Explore the vibrant street art scene with a local artist.',
      image: 'https://images.unsplash.com/photo-1551732998-9573f695fdbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      location: 'Brooklyn, NY',
      price: 45,
      duration: '2 hours',
      category: 'Art & Culture',
      status: 'active',
      bookings: 12,
      revenue: 540,
      rating: 4.8,
      reviewCount: 24,
      upcoming: 3,
    },
    {
      id: 2,
      title: 'Craft Cocktail Workshop',
      description: 'Learn to mix signature cocktails with a professional mixologist.',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      location: 'Manhattan, NY',
      price: 65,
      duration: '1.5 hours',
      category: 'Food & Drink',
      status: 'active',
      bookings: 8,
      revenue: 520,
      rating: 4.6,
      reviewCount: 15,
      upcoming: 2,
    },
    {
      id: 3,
      title: 'Hidden Waterfall Hike',
      description: 'Discover secret waterfalls on this guided nature hike.',
      image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      location: 'Catskills, NY',
      price: 55,
      duration: '4 hours',
      category: 'Outdoors',
      status: 'draft',
      bookings: 0,
      revenue: 0,
      rating: 0,
      reviewCount: 0,
      upcoming: 0,
    },
  ];

  // Mock data for bookings
  const bookings = [
    {
      id: 101,
      experienceId: 1,
      experienceTitle: 'Urban Street Art Tour',
      guestName: 'Alex Johnson',
      guestCount: 2,
      date: '2023-11-15',
      time: '10:00 AM',
      status: 'confirmed',
      totalPaid: 90,
    },
    {
      id: 102,
      experienceId: 1,
      experienceTitle: 'Urban Street Art Tour',
      guestName: 'Maria Garcia',
      guestCount: 3,
      date: '2023-11-18',
      time: '2:00 PM',
      status: 'confirmed',
      totalPaid: 135,
    },
    {
      id: 103,
      experienceId: 2,
      experienceTitle: 'Craft Cocktail Workshop',
      guestName: 'James Wilson',
      guestCount: 4,
      date: '2023-11-20',
      time: '7:00 PM',
      status: 'confirmed',
      totalPaid: 260,
    },
    {
      id: 104,
      experienceId: 1,
      experienceTitle: 'Urban Street Art Tour',
      guestName: 'Sarah Miller',
      guestCount: 1,
      date: '2023-11-22',
      time: '10:00 AM',
      status: 'pending',
      totalPaid: 45,
    },
  ];

  // Mock data for earnings
  const earnings = {
    total: 1060,
    pending: 45,
    monthly: [
      { month: 'Jun', amount: 320 },
      { month: 'Jul', amount: 480 },
      { month: 'Aug', amount: 640 },
      { month: 'Sep', amount: 540 },
      { month: 'Oct', amount: 720 },
      { month: 'Nov', amount: 1060 },
    ],
    nextPayout: {
      date: '2023-11-30',
      amount: 1015,
    },
  };

  // Mock data for insights
  const insights = {
    totalBookings: 20,
    totalGuests: 42,
    averageRating: 4.7,
    totalReviews: 39,
    popularExperience: 'Urban Street Art Tour',
    topLocation: 'Brooklyn, NY',
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Dashboard header */}
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Host Dashboard
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your experiences, bookings, and earnings
              </p>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <Link
                href="/host/experiences/new"
                className="ml-3 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <PlusCircleIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                Create Experience
              </Link>
            </div>
          </div>

          {/* Stats cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Total Earnings</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{formatCurrency(earnings.total)}</dd>
              <dd className="mt-2 text-sm text-gray-500">Next payout: {formatCurrency(earnings.nextPayout.amount)} on {formatDate(earnings.nextPayout.date)}</dd>
            </div>

            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Total Bookings</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{insights.totalBookings}</dd>
              <dd className="mt-2 text-sm text-gray-500">{insights.totalGuests} guests hosted</dd>
            </div>

            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Average Rating</dt>
              <dd className="mt-1 flex items-baseline">
                <div className="flex items-center">
                  <p className="text-3xl font-semibold tracking-tight text-gray-900">{insights.averageRating}</p>
                  <div className="ml-2 flex">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`h-5 w-5 ${rating < Math.floor(insights.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </dd>
              <dd className="mt-2 text-sm text-gray-500">{insights.totalReviews} reviews received</dd>
            </div>

            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Active Experiences</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {experiences.filter(exp => exp.status === 'active').length}
              </dd>
              <dd className="mt-2 text-sm text-gray-500">
                {experiences.filter(exp => exp.status === 'draft').length} drafts in progress
              </dd>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div>
              <div className="flex space-x-1 rounded-xl bg-white p-1 shadow">
                <button
                  onClick={() => setSelectedTab(0)}
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selectedTab === 0 ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                  Experiences
                </button>
                <button
                  onClick={() => setSelectedTab(1)}
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selectedTab === 1 ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                  Bookings
                </button>
                <button
                  onClick={() => setSelectedTab(2)}
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selectedTab === 2 ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                  Earnings
                </button>
                <button
                  onClick={() => setSelectedTab(3)}
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selectedTab === 3 ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                  Insights
                </button>
              </div>
              <div className="mt-4">
                {/* Experiences Panel */}
                {selectedTab === 0 && (
                  <div className="rounded-xl bg-white p-3 shadow">
                  <div className="overflow-hidden">
                    <ul role="list" className="divide-y divide-gray-200">
                      {experiences.map((experience) => (
                        <li key={experience.id} className="p-4 sm:px-6">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 h-16 w-16 relative rounded-md overflow-hidden">
                              <Image
                                src={experience.image}
                                alt={experience.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <p className="truncate text-sm font-medium text-primary-600">{experience.title}</p>
                                <div className="ml-2 flex flex-shrink-0">
                                  <p className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeClass(experience.status)}`}>
                                    {experience.status.charAt(0).toUpperCase() + experience.status.slice(1)}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                  <p className="flex items-center text-sm text-gray-500">
                                    <MapPinIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    {experience.location}
                                  </p>
                                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                    <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    {experience.duration}
                                  </p>
                                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                    <CurrencyDollarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    {formatCurrency(experience.price)} per person
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <p className="flex items-center">
                                    <UserGroupIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    {experience.bookings} bookings
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <Link
                                href={`/host/experiences/${experience.id}`}
                                className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                View details
                              </Link>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  </div>
                )}

                {/* Bookings Panel */}
                {selectedTab === 1 && (
                  <div className="rounded-xl bg-white p-3 shadow">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Guest</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Experience</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Guests</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {bookings.map((booking) => (
                          <tr key={booking.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{booking.guestName}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.experienceTitle}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(booking.date)} at {booking.time}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.guestCount}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatCurrency(booking.totalPaid)}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeClass(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <Link href={`/host/bookings/${booking.id}`} className="text-primary-600 hover:text-primary-900">
                                Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                )}

                {/* Earnings Panel */}
                {selectedTab === 2 && (
                  <div className="rounded-xl bg-white p-3 shadow">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Earnings Overview</h3>
                      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                          <dt className="truncate text-sm font-medium text-gray-500">Total Earnings</dt>
                          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{formatCurrency(earnings.total)}</dd>
                        </div>
                        <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                          <dt className="truncate text-sm font-medium text-gray-500">Pending Payout</dt>
                          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{formatCurrency(earnings.pending)}</dd>
                        </div>
                        <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                          <dt className="truncate text-sm font-medium text-gray-500">Next Payout</dt>
                          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{formatCurrency(earnings.nextPayout.amount)}</dd>
                          <dd className="mt-1 text-sm text-gray-500">on {formatDate(earnings.nextPayout.date)}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Monthly Earnings</h3>
                      <div className="mt-5 h-64 bg-gray-50 p-4 rounded-lg shadow">
                        <div className="h-full flex items-end">
                          {earnings.monthly.map((month, index) => (
                            <div key={month.month} className="w-1/6 h-full flex flex-col justify-end items-center">
                              <div 
                                className="w-12 bg-primary-600 rounded-t-md" 
                                style={{ height: `${(month.amount / Math.max(...earnings.monthly.map(m => m.amount))) * 80}%` }}
                              ></div>
                              <div className="mt-2 text-xs font-medium text-gray-500">{month.month}</div>
                              <div className="text-xs text-gray-500">{formatCurrency(month.amount)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Earnings by Experience</h3>
                      <div className="mt-5 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Experience</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bookings</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Revenue</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {experiences.map((experience) => (
                              <tr key={experience.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{experience.title}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{experience.bookings}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatCurrency(experience.revenue)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {/* Insights Panel */}
                {selectedTab === 3 && (
                  <div className="rounded-xl bg-white p-3 shadow">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Performance Metrics</h3>
                      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                          <dt className="truncate text-sm font-medium text-gray-500">Total Bookings</dt>
                          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{insights.totalBookings}</dd>
                        </div>
                        <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                          <dt className="truncate text-sm font-medium text-gray-500">Total Guests</dt>
                          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{insights.totalGuests}</dd>
                        </div>
                        <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                          <dt className="truncate text-sm font-medium text-gray-500">Average Rating</dt>
                          <dd className="mt-1 flex items-baseline">
                            <div className="flex items-center">
                              <p className="text-3xl font-semibold tracking-tight text-gray-900">{insights.averageRating}</p>
                              <div className="ml-2 flex">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                  <StarIcon
                                    key={rating}
                                    className={`h-5 w-5 ${rating < Math.floor(insights.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                            </div>
                          </dd>
                          <dd className="mt-2 text-sm text-gray-500">{insights.totalReviews} reviews</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Popular Experiences</h3>
                        <div className="mt-5 overflow-hidden rounded-lg bg-gray-50 shadow">
                          <div className="p-6">
                            <h4 className="text-base font-semibold text-gray-900">Most Booked Experience</h4>
                            <p className="mt-1 text-2xl font-bold text-primary-600">{insights.popularExperience}</p>
                            <p className="mt-2 text-sm text-gray-500">This experience has received the most bookings and generates the highest revenue.</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Geographic Insights</h3>
                        <div className="mt-5 overflow-hidden rounded-lg bg-gray-50 shadow">
                          <div className="p-6">
                            <h4 className="text-base font-semibold text-gray-900">Top Location</h4>
                            <p className="mt-1 text-2xl font-bold text-primary-600">{insights.topLocation}</p>
                            <p className="mt-2 text-sm text-gray-500">This location attracts the most guests and has the highest engagement.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Recommendations</h3>
                      <div className="mt-5 rounded-md bg-blue-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Optimization Tips</h3>
                            <div className="mt-2 text-sm text-blue-700">
                              <ul className="list-disc space-y-1 pl-5">
                                <li>Consider adding more availability for your "Urban Street Art Tour" as it's your most popular experience.</li>
                                <li>Your "Craft Cocktail Workshop" has a high revenue per booking. Consider increasing its price slightly.</li>
                                <li>Complete your "Hidden Waterfall Hike" draft to diversify your experience offerings.</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}