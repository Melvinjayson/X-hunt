'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  EyeIcon,
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function HostExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for experiences
  const experiences = [
    {
      id: '1',
      title: 'Urban Street Art Tour',
      description: 'Explore the vibrant street art scene with a local artist as your guide.',
      location: 'Brooklyn, NY',
      price: 45,
      currency: 'USD',
      duration: '2 hours',
      category: 'Art & Culture',
      status: 'active',
      rating: 4.8,
      reviewCount: 24,
      bookings: 18,
      earnings: 810,
      image: 'https://source.unsplash.com/random/800x600/?street-art',
      lastUpdated: '2023-10-15',
    },
    {
      id: '2',
      title: 'Craft Cocktail Workshop',
      description: 'Learn to mix craft cocktails with a professional mixologist in a speakeasy setting.',
      location: 'Manhattan, NY',
      price: 65,
      currency: 'USD',
      duration: '1.5 hours',
      category: 'Food & Dining',
      status: 'pending',
      rating: 0,
      reviewCount: 0,
      bookings: 0,
      earnings: 0,
      image: 'https://source.unsplash.com/random/800x600/?cocktail',
      lastUpdated: '2023-10-20',
    },
    {
      id: '3',
      title: 'Hidden Waterfall Hike',
      description: 'Discover secret waterfalls on this guided hiking adventure through lush forests.',
      location: 'Catskills, NY',
      price: 55,
      currency: 'USD',
      duration: '4 hours',
      category: 'Outdoor Adventures',
      status: 'active',
      rating: 4.9,
      reviewCount: 37,
      bookings: 42,
      earnings: 2310,
      image: 'https://source.unsplash.com/random/800x600/?waterfall',
      lastUpdated: '2023-09-28',
    },
    {
      id: '4',
      title: 'Rooftop Yoga & Meditation',
      description: 'Start your day with a rejuvenating yoga and meditation session with skyline views.',
      location: 'Brooklyn, NY',
      price: 30,
      currency: 'USD',
      duration: '1 hour',
      category: 'Wellness & Spa',
      status: 'inactive',
      rating: 4.6,
      reviewCount: 12,
      bookings: 8,
      earnings: 240,
      image: 'https://source.unsplash.com/random/800x600/?yoga',
      lastUpdated: '2023-08-15',
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Experiences' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const filteredExperiences = experiences.filter(experience => {
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || experience.status === statusFilter;
    
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
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
                My Experiences
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your experiences, track performance, and create new offerings
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
              <Link
                href="/host/experiences/new"
                className="ml-3 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                Create Experience
              </Link>
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
                placeholder="Search experiences..."
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

          {/* Experiences list */}
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            {filteredExperiences.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-200">
                {filteredExperiences.map((experience) => (
                  <li key={experience.id}>
                    <div className="flex items-center p-4 sm:px-6">
                      <div className="flex min-w-0 flex-1 items-center">
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
                        <div className="min-w-0 flex-1 px-4">
                          <div>
                            <div className="flex items-center">
                              <p className="truncate text-sm font-medium text-primary-600">{experience.title}</p>
                              <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(experience.status)}`}>
                                {experience.status.charAt(0).toUpperCase() + experience.status.slice(1)}
                              </span>
                            </div>
                            <div className="mt-1 flex">
                              <p className="truncate text-sm text-gray-500">
                                <span className="font-medium text-gray-900">${experience.price}</span> · {experience.duration} · {experience.location}
                              </p>
                            </div>
                            <div className="mt-1 flex items-center">
                              {experience.status === 'active' && (
                                <>
                                  <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                      <StarIcon
                                        key={rating}
                                        className={`h-4 w-4 ${rating < Math.floor(experience.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        aria-hidden="true"
                                      />
                                    ))}
                                    <span className="ml-1 text-xs text-gray-500">{experience.rating} ({experience.reviewCount} reviews)</span>
                                  </div>
                                  <span className="mx-2 text-gray-300">·</span>
                                  <span className="text-xs text-gray-500">{experience.bookings} bookings</span>
                                  <span className="mx-2 text-gray-300">·</span>
                                  <span className="text-xs text-gray-500">${experience.earnings} earned</span>
                                </>
                              )}
                              {experience.status === 'pending' && (
                                <span className="text-xs text-gray-500">Awaiting approval</span>
                              )}
                              {experience.status === 'inactive' && (
                                <span className="text-xs text-gray-500">Not visible to users</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 space-x-2">
                        <Link
                          href={`/experience/${experience.id}`}
                          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <EyeIcon className="mr-1.5 h-4 w-4 text-gray-500" aria-hidden="true" />
                          View
                        </Link>
                        <Link
                          href={`/host/experiences/edit/${experience.id}`}
                          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <PencilSquareIcon className="mr-1.5 h-4 w-4 text-gray-500" aria-hidden="true" />
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <TrashIcon className="mr-1.5 h-4 w-4 text-gray-500" aria-hidden="true" />
                          Delete
                        </button>
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
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No experiences found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by creating a new experience.'}
                </p>
                <div className="mt-6">
                  <Link
                    href="/host/experiences/new"
                    className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Create Experience
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
