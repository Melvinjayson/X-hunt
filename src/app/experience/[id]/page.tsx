'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { StarIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
import { MapPinIcon, CalendarIcon, ClockIcon, UserGroupIcon, TagIcon } from '@heroicons/react/24/outline';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useExperience } from '@/hooks/useApi';

// Mock data for a single experience
interface DateOption {
  date: string;
  time: string;
  spotsLeft: number;
}

interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  content: string;
  authorImageSrc: string;
}

interface Host {
  name: string;
  bio: string;
  imageSrc: string;
  rating: number;
  reviewCount: number;
}

interface Reward {
  name: string;
  description: string;
  imageSrc: string;
}

interface Experience {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  location: string;
  meetingPoint: string;
  category: string;
  price: number;
  duration: string;
  groupSize: string;
  rating: number;
  reviewCount: number;
  imageSrc: string;
  galleryImages: string[];
  host: Host;
  included: string[];
  notIncluded: string[];
  requirements: string[];
  reward: Reward;
  reviews: Review[];
  availableDates: DateOption[];
}

const mockExperience: Experience = {
  id: 1,
  title: 'Urban Street Art Treasure Hunt',
  description: 'Discover hidden murals and street art while solving clues across the city. This interactive experience combines art appreciation with puzzle-solving as you navigate through neighborhoods rich with cultural expression. Perfect for art enthusiasts, urban explorers, and anyone looking to see the city from a new perspective.',
  longDescription: 'Join us for an unforgettable journey through the vibrant street art scene of San Francisco. This carefully curated experience will take you off the beaten path to discover hidden murals, graffiti masterpieces, and public installations that tell the story of the city\'s cultural evolution.\n\nGuided by our AI-powered app, you\'ll receive a series of clues and challenges that lead you from one artistic landmark to the next. Each discovery unlocks a piece of the story and brings you closer to completing your digital collection of street art NFTs.\n\nAlong the way, you\'ll learn about the artists, their techniques, and the social context behind their work. You\'ll also have opportunities to create your own digital art inspired by what you see, which can be minted as unique NFTs on our platform.\n\nThis experience is designed to be both educational and entertaining, suitable for art lovers of all levels of expertise. Whether you\'re a seasoned urban explorer or a curious newcomer to the street art scene, you\'ll find something to inspire and challenge you.',
  location: 'San Francisco, CA',
  meetingPoint: '24th & Mission BART Station, San Francisco, CA 94110',
  category: 'Art & Culture',
  price: 49,
  duration: '3 hours',
  groupSize: '2-8 people',
  rating: 4.8,
  reviewCount: 127,
  imageSrc: 'https://source.unsplash.com/random/800x600/?street-art',
  galleryImages: [
    'https://source.unsplash.com/random/800x600/?mural',
    'https://source.unsplash.com/random/800x600/?graffiti',
    'https://source.unsplash.com/random/800x600/?urban-art',
    'https://source.unsplash.com/random/800x600/?street-painting',
  ],
  host: {
    name: 'Alex Rivera',
    bio: 'Street artist and urban explorer with 10+ years of experience leading art tours',
    imageSrc: 'https://source.unsplash.com/random/400x400/?portrait-man',
    rating: 4.9,
    reviewCount: 312,
  },
  included: [
    'Guided street art tour with local expert',
    'Interactive digital treasure hunt app',
    'Street art NFT collection (digital)',
    'Refreshments at local café',
    'Digital photo album of your experience',
  ],
  notIncluded: [
    'Transportation to meeting point',
    'Meals',
    'Personal art supplies (if you wish to create)',
  ],
  requirements: [
    'Comfortable walking shoes',
    'Smartphone with camera',
    'Weather-appropriate clothing',
    'Sense of adventure',
  ],
  reward: {
    name: 'Street Art NFT Collection',
    description: 'Complete the experience to earn a unique collection of street art NFTs featuring the works you discovered',
    imageSrc: 'https://source.unsplash.com/random/400x400/?nft-art',
  },
  reviews: [
    {
      id: 1,
      author: 'Jamie Chen',
      date: 'July 2023',
      rating: 5,
      content: 'This was such a unique way to explore the city! We discovered amazing street art we would have never found on our own. The challenges were fun and the NFT reward is a cool keepsake.',
      authorImageSrc: 'https://source.unsplash.com/random/400x400/?portrait-woman-asian',
    },
    {
      id: 2,
      author: 'Marcus Johnson',
      date: 'June 2023',
      rating: 4,
      content: 'Alex was a knowledgeable guide and the app worked great. Some of the clues were a bit challenging, but that added to the fun. Would recommend for anyone interested in art and adventure.',
      authorImageSrc: 'https://source.unsplash.com/random/400x400/?portrait-man-black',
    },
    {
      id: 3,
      author: 'Sophia Rodriguez',
      date: 'May 2023',
      rating: 5,
      content: 'One of the best experiences I\'ve had in San Francisco! The combination of physical exploration and digital interaction was perfect. The NFT reward is now proudly displayed in my digital collection.',
      authorImageSrc: 'https://source.unsplash.com/random/400x400/?portrait-woman-latina',
    },
  ],
  availableDates: [
    { date: '2023-09-15', time: '10:00 AM', spotsLeft: 4 },
    { date: '2023-09-15', time: '2:00 PM', spotsLeft: 6 },
    { date: '2023-09-16', time: '10:00 AM', spotsLeft: 2 },
    { date: '2023-09-16', time: '2:00 PM', spotsLeft: 8 },
    { date: '2023-09-17', time: '10:00 AM', spotsLeft: 5 },
  ],
};

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function ExperiencePage() {
  const params = useParams();
  const experienceId = params.id as string;
  const { data: experience, loading, error } = useExperience(experienceId);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    if (experience?.imageSrc) {
      setMainImage(experience.imageSrc);
    }
  }, [experience]);

  const handleDateSelection = (date: string, time: string): void => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleImageClick = (imageSrc: string): void => {
    setMainImage(imageSrc);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading experience...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">Error loading experience: {error}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Experience not found</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Experience Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{experience.title}</h1>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    experience.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                    'h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-700">
              {experience.rating} ({experience.reviewCount} reviews)
            </p>
            <div className="mx-4 h-5 w-px bg-gray-300" />
            <div className="flex items-center text-sm text-gray-500">
              <MapPinIcon className="mr-1 h-5 w-5 flex-shrink-0 text-gray-400" />
              {experience.location}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={mainImage}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            {experience.galleryImages.slice(0, 4).map((image: string, index: number) => (
              <div
                key={index}
                className="relative h-40 cursor-pointer overflow-hidden rounded-lg"
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-opacity hover:opacity-90"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Experience Details */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left Column - Experience Info */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <div className="p-6">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">About this experience</h2>
                <div className="mb-6 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <ClockIcon className="mr-2 h-5 w-5 text-gray-400" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="mr-2 h-5 w-5 text-gray-400" />
                    <span>{experience.groupSize}</span>
                  </div>
                  <div className="flex items-center">
                    <TagIcon className="mr-2 h-5 w-5 text-gray-400" />
                    <span>{experience.category}</span>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="mb-4">{experience.description}</p>
                  {experience.longDescription.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="card mb-8">
              <div className="p-6">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Meeting point</h2>
                <div className="flex items-center text-sm">
                  <MapPinIcon className="mr-2 h-5 w-5 text-gray-400" />
                  <span>{experience.meetingPoint}</span>
                </div>
                <div className="mt-4 h-64 w-full overflow-hidden rounded-lg bg-gray-200">
                  {/* This would be a map component in a real application */}
                  <div className="flex h-full items-center justify-center">
                    <p className="text-gray-500">Map view would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-8">
              <div className="p-6">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">What's included</h2>
                <ul className="space-y-2">
                  {experience.included.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900">Not included</h3>
                <ul className="space-y-2">
                  {experience.notIncluded.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card mb-8">
              <div className="p-6">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">What you'll need</h2>
                <ul className="space-y-2">
                  {experience.requirements.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="mr-2 h-5 w-5 flex-shrink-0 text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card mb-8">
              <div className="p-6">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Your host</h2>
                <div className="flex items-start">
                  <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={experience.host.imageSrc}
                      alt={experience.host.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{experience.host.name}</h3>
                    <div className="mt-1 flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              experience.host.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                              'h-4 w-4 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm text-gray-500">
                        {experience.host.rating} ({experience.host.reviewCount} reviews)
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{experience.host.bio}</p>
                    <button className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-500">
                      Contact host
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-8">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            experience.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-2 text-sm font-medium text-gray-900">
                      {experience.rating} out of 5 ({experience.reviewCount} reviews)
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  {experience.reviews.map((review: any) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start">
                        <div className="mr-4 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={review.authorImageSrc}
                            alt={review.author}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{review.author}</h4>
                          <p className="text-xs text-gray-500">{review.date}</p>
                          <div className="mt-1 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                  'h-4 w-4 flex-shrink-0'
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-sm text-gray-600">{review.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    See all {experience.reviewCount} reviews
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking and Reward */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="card mb-6">
                <div className="p-6">
                  <h2 className="mb-4 text-xl font-bold text-gray-900">Book this experience</h2>
                  <p className="mb-4 text-2xl font-bold text-gray-900">${experience.price} <span className="text-sm font-normal text-gray-500">per person</span></p>

                  <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Select a date
                    </label>
                    <div className="mt-2 grid grid-cols-1 gap-3">
                      {experience.availableDates.map((dateOption: any, index: number) => (
                        <div
                          key={index}
                          className={classNames(
                            'flex cursor-pointer items-center justify-between rounded-lg border p-3',
                            selectedDate === dateOption.date && selectedTime === dateOption.time
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-300 hover:border-primary-300'
                          )}
                          onClick={() => handleDateSelection(dateOption.date, dateOption.time)}
                        >
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {new Date(dateOption.date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </p>
                              <p className="text-sm text-gray-500">{dateOption.time}</p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {dateOption.spotsLeft} spots left
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                      Number of guests
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      className="mt-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-md bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    disabled={!selectedDate}
                  >
                    Book now
                  </button>

                  <p className="mt-2 text-center text-xs text-gray-500">
                    You won't be charged yet
                  </p>
                </div>
              </div>

              <div className="card overflow-hidden">
                <div className="bg-primary-700 p-4 text-white">
                  <h3 className="text-lg font-semibold">Complete & Earn</h3>
                  <p className="text-sm text-primary-100">Exclusive digital reward</p>
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={experience.reward.imageSrc}
                        alt={experience.reward.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">{experience.reward.name}</h4>
                      <p className="text-sm text-gray-500">Digital Collectible</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{experience.reward.description}</p>
                  <div className="mt-4 rounded-md bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">
                      This NFT will be minted on Base44 and added to your digital collection upon completion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Experiences */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Similar experiences you might like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* This would be a component in a real application */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card group overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="h-full w-full animate-pulse bg-gray-200" />
                </div>
                <div className="p-4">
                  <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
