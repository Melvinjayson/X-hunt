'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  ChartPieIcon,
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
  CurrencyDollarIcon,
  StarIcon as StarIconOutline
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function HostInsightsPage() {
  const [timeframe, setTimeframe] = useState('month');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for insights
  const insightsData = {
    summary: {
      totalViews: 2450,
      bookingRate: 8.2,
      averageRating: 4.8,
      repeatGuests: 15,
    },
    topExperiences: [
      {
        id: '3',
        title: 'Hidden Waterfall Hike',
        image: 'https://source.unsplash.com/random/800x600/?waterfall',
        views: 980,
        bookings: 42,
        conversionRate: 4.3,
        revenue: 2310,
      },
      {
        id: '1',
        title: 'Urban Street Art Tour',
        image: 'https://source.unsplash.com/random/800x600/?street-art',
        views: 850,
        bookings: 18,
        conversionRate: 2.1,
        revenue: 810,
      },
      {
        id: '4',
        title: 'Rooftop Yoga & Meditation',
        image: 'https://source.unsplash.com/random/800x600/?yoga',
        views: 620,
        bookings: 8,
        conversionRate: 1.3,
        revenue: 240,
      },
    ],
    guestDemographics: [
      { group: 'Local', percentage: 35 },
      { group: 'Domestic Travelers', percentage: 45 },
      { group: 'International Travelers', percentage: 20 },
    ],
    ageGroups: [
      { group: '18-24', percentage: 15 },
      { group: '25-34', percentage: 40 },
      { group: '35-44', percentage: 25 },
      { group: '45-54', percentage: 12 },
      { group: '55+', percentage: 8 },
    ],
    bookingTimes: [
      { time: 'Morning (6AM-12PM)', percentage: 35 },
      { time: 'Afternoon (12PM-5PM)', percentage: 45 },
      { time: 'Evening (5PM-10PM)', percentage: 20 },
    ],
    popularDays: [
      { day: 'Monday', bookings: 5 },
      { day: 'Tuesday', bookings: 8 },
      { day: 'Wednesday', bookings: 10 },
      { day: 'Thursday', bookings: 12 },
      { day: 'Friday', bookings: 18 },
      { day: 'Saturday', bookings: 25 },
      { day: 'Sunday', bookings: 15 },
    ],
    reviews: [
      {
        id: 'R1001',
        guestName: 'Alex Johnson',
        guestImage: 'https://source.unsplash.com/random/256x256/?man-face',
        experienceTitle: 'Urban Street Art Tour',
        rating: 5,
        date: '2023-10-20',
        comment: 'This tour was absolutely amazing! Our guide was knowledgeable and passionate about street art. We discovered so many hidden gems we would have never found on our own.',
      },
      {
        id: 'R1002',
        guestName: 'Emily Chen',
        guestImage: 'https://source.unsplash.com/random/256x256/?woman-face',
        experienceTitle: 'Hidden Waterfall Hike',
        rating: 4,
        date: '2023-10-15',
        comment: 'Beautiful hike with stunning views! The waterfall was breathtaking. Only giving 4 stars because the trail was a bit more challenging than described, but overall a great experience.',
      },
      {
        id: 'R1003',
        guestName: 'James Wilson',
        guestImage: 'https://source.unsplash.com/random/256x256/?man-face',
        experienceTitle: 'Hidden Waterfall Hike',
        rating: 5,
        date: '2023-10-10',
        comment: 'One of the best hiking experiences I have had! Our guide was fantastic and knew all the best spots for photos. The waterfall was even more impressive in person than in the pictures.',
      },
    ],
    improvementSuggestions: [
      'Consider offering more time slots on weekends',
      'Add transportation options for guests without cars',
      'Include more details about physical requirements in descriptions',
      'Offer small group or private booking options',
      'Create seasonal variations of your most popular experiences',
    ],
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Calculate the maximum value for the chart
  const maxBookings = Math.max(...insightsData.popularDays.map(day => day.bookings));
  
  // Function to get the height percentage for the chart bars
  const getBarHeight = (bookings: number) => {
    return maxBookings > 0 ? (bookings / maxBookings) * 100 : 0;
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
                Insights & Analytics
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Understand your performance and optimize your experiences
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
              <button
                type="button"
                className="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <ArrowDownTrayIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                Export Data
              </button>
            </div>
          </div>

          {/* Time period selector */}
          <div className="mb-6">
            <select
              id="timeframe"
              name="timeframe"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 md:w-auto"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 3 months</option>
              <option value="year">Last 12 months</option>
              <option value="all">All time</option>
            </select>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">Total Views</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{insightsData.summary.totalViews.toLocaleString()}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CurrencyDollarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">Booking Rate</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{insightsData.summary.bookingRate}%</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <StarIconOutline className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">Average Rating</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{insightsData.summary.averageRating}/5</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">Repeat Guests</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{insightsData.summary.repeatGuests}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top performing experiences */}
          <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Top Performing Experiences</h3>
              <div className="mt-6 flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                  {insightsData.topExperiences.map((experience) => (
                    <li key={experience.id} className="py-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={experience.image}
                              alt={experience.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="truncate text-sm font-medium text-primary-600">{experience.title}</p>
                            <Link
                              href={`/host/experiences/edit/${experience.id}`}
                              className="ml-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              View Details
                            </Link>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500 sm:grid-cols-4">
                            <div>
                              <span className="font-medium text-gray-900">{experience.views}</span> views
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">{experience.bookings}</span> bookings
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">{experience.conversionRate}%</span> conversion
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">${experience.revenue}</span> revenue
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Charts section */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Popular days chart */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Popular Booking Days</h3>
                <p className="mt-1 text-sm text-gray-500">Distribution of bookings by day of the week</p>
                <div className="mt-6">
                  <div className="h-64">
                    <div className="flex h-full items-end">
                      {insightsData.popularDays.map((day) => (
                        <div key={day.day} className="relative mx-auto flex w-full max-w-[40px] flex-1 flex-col items-center">
                          <div
                            className="w-full rounded-t bg-primary-600"
                            style={{ height: `${getBarHeight(day.bookings)}%` }}
                          ></div>
                          <div className="mt-2 text-xs font-medium text-gray-500">{day.day.substring(0, 3)}</div>
                          <div className="absolute bottom-[calc(100%+8px)] text-xs font-semibold">
                            {day.bookings}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest demographics */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Guest Demographics</h3>
                <p className="mt-1 text-sm text-gray-500">Breakdown of your guest origin</p>
                <div className="mt-6">
                  <div className="space-y-4">
                    {insightsData.guestDemographics.map((item) => (
                      <div key={item.group}>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">{item.group}</div>
                          <div className="text-sm font-medium text-gray-900">{item.percentage}%</div>
                        </div>
                        <div className="mt-2 w-full rounded-full bg-gray-200">
                          <div
                            className="rounded-full bg-primary-600 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
                            style={{ width: `${item.percentage}%` }}
                          >
                            {item.percentage > 10 ? `${item.percentage}%` : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Age groups */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Age Distribution</h3>
                <p className="mt-1 text-sm text-gray-500">Breakdown of your guests by age group</p>
                <div className="mt-6">
                  <div className="space-y-4">
                    {insightsData.ageGroups.map((item) => (
                      <div key={item.group}>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">{item.group}</div>
                          <div className="text-sm font-medium text-gray-900">{item.percentage}%</div>
                        </div>
                        <div className="mt-2 w-full rounded-full bg-gray-200">
                          <div
                            className="rounded-full bg-primary-600 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
                            style={{ width: `${item.percentage}%` }}
                          >
                            {item.percentage > 10 ? `${item.percentage}%` : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking times */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Popular Booking Times</h3>
                <p className="mt-1 text-sm text-gray-500">When your guests prefer to book</p>
                <div className="mt-6">
                  <div className="space-y-4">
                    {insightsData.bookingTimes.map((item) => (
                      <div key={item.time}>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">{item.time}</div>
                          <div className="text-sm font-medium text-gray-900">{item.percentage}%</div>
                        </div>
                        <div className="mt-2 w-full rounded-full bg-gray-200">
                          <div
                            className="rounded-full bg-primary-600 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
                            style={{ width: `${item.percentage}%` }}
                          >
                            {item.percentage > 10 ? `${item.percentage}%` : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent reviews */}
          <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Reviews</h3>
              <div className="mt-6 flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                  {insightsData.reviews.map((review) => (
                    <li key={review.id} className="py-5">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={review.guestImage}
                              alt={review.guestName}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{review.guestName}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-gray-500">{review.experienceTitle}</p>
                          </div>
                          <div className="mt-1 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={`h-4 w-4 ${rating < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <p>{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <Link
                  href="#"
                  className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  View all reviews
                </Link>
              </div>
            </div>
          </div>

          {/* Improvement suggestions */}
          <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Suggestions for Improvement</h3>
              <p className="mt-1 text-sm text-gray-500">AI-powered recommendations based on your performance data</p>
              <div className="mt-6">
                <ul role="list" className="space-y-3">
                  {insightsData.improvementSuggestions.map((suggestion, index) => (
                    <li key={index} className="overflow-hidden rounded-md bg-white px-6 py-4 shadow ring-1 ring-gray-900/5">
                      <div className="flex items-center gap-x-4">
                        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-50 text-primary-600">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <div className="text-sm font-medium leading-6 text-gray-900">{suggestion}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
