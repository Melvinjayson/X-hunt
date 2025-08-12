'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { Tab } from '@headlessui/react'; // Temporarily disabled due to compatibility issues
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useUserBookings, useUserRewards, useUserChallenges } from '@/hooks/useApi';
import { useSession } from 'next-auth/react';
import {
  FireIcon,
  TrophyIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  CameraIcon,
  PencilIcon,
  ArrowPathIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

// Mock user data
const mockUser = {
  id: 1,
  name: 'Alex Johnson',
  username: '@alexj',
  bio: 'Adventure seeker and food enthusiast. Always looking for the next exciting experience!',
  location: 'San Francisco, CA',
  memberSince: 'January 2023',
  avatar: 'https://source.unsplash.com/random/400x400/?man-face',
  coverPhoto: 'https://source.unsplash.com/random/1200x400/?landscape',
  stats: {
    experiencesCompleted: 18,
    challengesCompleted: 7,
    rewardsEarned: 23,
    totalXp: 8750,
    level: 12,
    followers: 156,
    following: 89,
  },
  wallet: {
    address: '0x1a2...3b4c',
    balance: 250,
  },
};

// Mock completed experiences
const mockCompletedExperiences = [
  {
    id: 1,
    title: 'Urban Street Art Treasure Hunt',
    date: 'July 15, 2023',
    location: 'San Francisco, CA',
    rating: 5,
    review: 'Amazing experience! Found so many hidden gems I never knew existed in my own city.',
    imageSrc: 'https://source.unsplash.com/random/800x600/?street-art',
  },
  {
    id: 2,
    title: 'Culinary Secrets Food Tour',
    date: 'June 22, 2023',
    location: 'New York, NY',
    rating: 4,
    review: 'Great food and interesting challenges. Would recommend to any foodie!',
    imageSrc: 'https://source.unsplash.com/random/800x600/?food',
  },
  {
    id: 3,
    title: 'Sunset Kayak Adventure',
    date: 'May 30, 2023',
    location: 'Seattle, WA',
    rating: 5,
    review: 'Breathtaking views and a great workout. The photo challenges made it even more fun!',
    imageSrc: 'https://source.unsplash.com/random/800x600/?kayaking',
  },
];

// Mock rewards
const mockRewards = [
  {
    id: 1,
    name: 'Street Art NFT Collection',
    type: 'NFT Collection',
    dateEarned: 'July 15, 2023',
    rarity: 'Rare',
    imageSrc: 'https://source.unsplash.com/random/400x400/?badge',
    experience: 'Urban Street Art Treasure Hunt',
  },
  {
    id: 2,
    name: "Chef's Special Recipe NFT",
    type: 'Digital Collectible',
    dateEarned: 'June 22, 2023',
    rarity: 'Uncommon',
    imageSrc: 'https://source.unsplash.com/random/400x400/?food',
    experience: 'Culinary Secrets Food Tour',
  },
  {
    id: 3,
    name: 'Coastal Explorer Badge',
    type: 'Achievement Badge',
    dateEarned: 'May 30, 2023',
    rarity: 'Common',
    imageSrc: 'https://source.unsplash.com/random/400x400/?adventure',
    experience: 'Sunset Kayak Adventure',
  },
  {
    id: 4,
    name: 'Urban Explorer',
    type: 'Challenge Completion',
    dateEarned: 'August 5, 2023',
    rarity: 'Epic',
    imageSrc: 'https://source.unsplash.com/random/400x400/?badge',
    experience: 'Urban Art Explorer Challenge',
  },
];

// Mock challenges
const mockChallenges = [
  {
    id: 1,
    title: 'Urban Art Explorer',
    status: 'completed',
    completedDate: 'August 5, 2023',
    progress: 5,
    total: 5,
    xpEarned: 500,
    imageSrc: 'https://source.unsplash.com/random/800x600/?street-art',
  },
  {
    id: 2,
    title: 'Foodie Passport',
    status: 'in-progress',
    progress: 2,
    total: 4,
    xpEarned: 150,
    imageSrc: 'https://source.unsplash.com/random/800x600/?food',
  },
  {
    id: 3,
    title: 'Adventure Seeker',
    status: 'in-progress',
    progress: 1,
    total: 3,
    xpEarned: 250,
    imageSrc: 'https://source.unsplash.com/random/800x600/?kayaking',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const userId = session?.user?.id || '1'; // Fallback for demo
  const [selectedTab, setSelectedTab] = useState(0);
  
  const { data: bookings, loading: bookingsLoading, error: bookingsError } = useUserBookings(userId);
  const { data: rewards, loading: rewardsLoading, error: rewardsError } = useUserRewards(userId);
  const { data: challenges, loading: challengesLoading, error: challengesError } = useUserChallenges(userId);
  
  // Mock user data for now - in a real app this would come from the session or user API
  const [user] = useState(mockUser);
  
  // Use mock data as fallbacks when API data is not available
  const experiences = bookings || mockCompletedExperiences;
  const userRewards = rewards || mockRewards;
  const userChallenges = challenges || mockChallenges;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Cover Photo and Profile Info */}
        <div className="relative h-64 w-full sm:h-80 lg:h-96">
          <Image
            src={user.coverPhoto}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <button className="absolute bottom-4 right-4 rounded-full bg-white/80 p-2 text-gray-700 backdrop-blur-sm hover:bg-white">
            <CameraIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-20 lg:-mt-24">
            <div className="flex flex-col items-center sm:flex-row sm:items-end sm:space-x-5">
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white sm:h-32 sm:w-32">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
                <button className="absolute bottom-0 right-0 rounded-full bg-primary-600 p-1 text-white hover:bg-primary-700">
                  <CameraIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:text-left">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{user.name}</h1>
                  <span className="ml-2 text-sm text-gray-500">{user.username}</span>
                  <button className="ml-4 rounded-full bg-white p-1 text-gray-400 shadow-sm hover:text-gray-500">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <MapPinIcon className="mr-1 h-4 w-4" />
                  {user.location}
                  <span className="mx-2">•</span>
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  Member since {user.memberSince}
                </div>
                <p className="mt-2 max-w-lg text-sm text-gray-500">{user.bio}</p>
              </div>
              <div className="mt-4 flex flex-1 justify-center sm:mt-0 sm:justify-end">
                <div className="flex space-x-2">
                  <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
                    Edit Profile
                  </button>
                  <button className="flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <WalletIcon className="mr-2 h-4 w-4" />
                    {user.wallet.address}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            <div className="card flex flex-col items-center p-4">
              <div className="text-2xl font-bold text-gray-900">{user.stats.experiencesCompleted}</div>
              <div className="text-xs text-gray-500">Experiences</div>
            </div>
            <div className="card flex flex-col items-center p-4">
              <div className="text-2xl font-bold text-gray-900">{user.stats.challengesCompleted}</div>
              <div className="text-xs text-gray-500">Challenges</div>
            </div>
            <div className="card flex flex-col items-center p-4">
              <div className="text-2xl font-bold text-gray-900">{user.stats.rewardsEarned}</div>
              <div className="text-xs text-gray-500">Rewards</div>
            </div>
            <div className="card flex flex-col items-center p-4">
              <div className="flex items-center text-2xl font-bold text-gray-900">
                <FireIcon className="mr-1 h-5 w-5 text-primary-500" />
                {user.stats.totalXp.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Total XP</div>
            </div>
            <div className="card flex flex-col items-center p-4">
              <div className="flex items-center text-2xl font-bold text-gray-900">
                <TrophyIcon className="mr-1 h-5 w-5 text-yellow-500" />
                {user.stats.level}
              </div>
              <div className="text-xs text-gray-500">Level</div>
            </div>
            <div className="card flex flex-col items-center p-4">
              <div className="text-2xl font-bold text-gray-900">{user.stats.followers}</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div className="card flex flex-col items-center p-4">
              <div className="text-2xl font-bold text-gray-900">{user.stats.following}</div>
              <div className="text-xs text-gray-500">Following</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div>
              <div className="flex space-x-1 rounded-xl bg-white p-1 shadow">
                <button
                  onClick={() => setSelectedTab(0)}
                  className={classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                    selectedTab === 0
                      ? 'bg-primary-100 text-primary-700 shadow'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  )}
                >
                  Experiences
                </button>
                <button
                  onClick={() => setSelectedTab(1)}
                  className={classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                    selectedTab === 1
                      ? 'bg-primary-100 text-primary-700 shadow'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  )}
                >
                  Rewards
                </button>
                <button
                  onClick={() => setSelectedTab(2)}
                  className={classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                    selectedTab === 2
                      ? 'bg-primary-100 text-primary-700 shadow'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  )}
                >
                  Challenges
                </button>
              </div>
              <div className="mt-4">
                {/* Experiences Panel */}
                {selectedTab === 0 && (
                  <div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {experiences.map((experience: any) => (
                      <div key={experience.id} className="card overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={experience.imageSrc}
                            alt={experience.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            <Link href={`/experience/${experience.id}`}>{experience.title}</Link>
                          </h3>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <CalendarIcon className="mr-1 h-4 w-4 text-gray-400" />
                            {experience.date}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <MapPinIcon className="mr-1 h-4 w-4 text-gray-400" />
                            {experience.location}
                          </div>
                          <div className="mt-2 flex items-center">
                            <div className="flex">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    experience.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                    'h-4 w-4 flex-shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">"{experience.review}"</p>
                          <div className="mt-4 flex justify-between">
                            <button className="text-sm font-medium text-primary-600 hover:text-primary-500">
                              View Details
                            </button>
                            <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      View All Experiences
                    </button>
                  </div>
                  </div>
                )}

                {/* Rewards Panel */}
                {selectedTab === 1 && (
                  <div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {userRewards.map((reward: any) => (
                      <div key={reward.id} className="card overflow-hidden">
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={reward.imageSrc}
                            alt={reward.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 rounded-full bg-white px-2 py-1 text-xs font-medium shadow-sm">
                            {reward.rarity}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-base font-semibold text-gray-900">{reward.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">{reward.type}</p>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <CalendarIcon className="mr-1 h-3 w-3 text-gray-400" />
                            Earned on {reward.dateEarned}
                          </div>
                          <p className="mt-1 text-xs text-gray-500">From: {reward.experience}</p>
                          <div className="mt-4 flex justify-between">
                            <button className="text-xs font-medium text-primary-600 hover:text-primary-500">
                              View NFT
                            </button>
                            <button className="text-xs font-medium text-gray-500 hover:text-gray-700">
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      View All Rewards
                    </button>
                  </div>
                  </div>
                )}

                {/* Challenges Panel */}
                {selectedTab === 2 && (
                  <div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {userChallenges.map((challenge: any) => (
                      <div key={challenge.id} className="card overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={challenge.imageSrc}
                            alt={challenge.title}
                            fill
                            className="object-cover"
                          />
                          <div
                            className={`absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-medium ${challenge.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                          >
                            {challenge.status === 'completed' ? 'Completed' : 'In Progress'}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            <Link href={`/challenges/${challenge.id}`}>{challenge.title}</Link>
                          </h3>
                          {challenge.status === 'completed' ? (
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <CalendarIcon className="mr-1 h-4 w-4 text-gray-400" />
                              Completed on {challenge.completedDate}
                            </div>
                          ) : null}
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">
                                Progress: {challenge.progress}/{challenge.total}
                              </span>
                              <span className="font-medium text-primary-600">
                                {Math.round((challenge.progress / challenge.total) * 100)}%
                              </span>
                            </div>
                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                              <div
                                className="h-2 rounded-full bg-primary-600"
                                style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center text-sm">
                            <FireIcon className="mr-1 h-4 w-4 text-primary-500" />
                            <span className="font-medium text-primary-600">{challenge.xpEarned} XP earned</span>
                          </div>
                          <div className="mt-4 flex justify-between">
                            <button className="text-sm font-medium text-primary-600 hover:text-primary-500">
                              View Details
                            </button>
                            {challenge.status === 'in-progress' ? (
                              <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                                <ArrowPathIcon className="mr-1 h-4 w-4" />
                                Continue
                              </button>
                            ) : (
                              <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
                                Share
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      View All Challenges
                    </button>
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