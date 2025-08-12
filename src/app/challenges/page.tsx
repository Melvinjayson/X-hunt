'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FireIcon, TrophyIcon, ClockIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useChallenges } from '@/hooks/useApi';

// Mock data for challenges
const mockChallenges = [
  {
    id: 1,
    title: 'Urban Art Explorer',
    description: 'Complete 5 street art experiences in different neighborhoods',
    difficulty: 'Medium',
    participants: 342,
    timeLimit: '30 days',
    reward: {
      name: 'Urban Explorer Badge',
      xp: 500,
      imageSrc: 'https://source.unsplash.com/random/400x400/?badge',
    },
    progress: 2,
    total: 5,
    imageSrc: 'https://source.unsplash.com/random/800x600/?street-art',
    locations: ['San Francisco', 'New York', 'Los Angeles', 'Chicago', 'Miami'],
  },
  {
    id: 2,
    title: 'Foodie Passport',
    description: 'Try culinary experiences from 4 different countries',
    difficulty: 'Easy',
    participants: 567,
    timeLimit: '60 days',
    reward: {
      name: 'Global Gastronomy NFT',
      xp: 300,
      imageSrc: 'https://source.unsplash.com/random/400x400/?food',
    },
    progress: 1,
    total: 4,
    imageSrc: 'https://source.unsplash.com/random/800x600/?food',
    locations: ['Italian', 'Japanese', 'Mexican', 'Thai'],
  },
  {
    id: 3,
    title: 'Adventure Seeker',
    description: 'Complete 3 outdoor adventure experiences',
    difficulty: 'Hard',
    participants: 189,
    timeLimit: '90 days',
    reward: {
      name: 'Thrill Seeker Collection',
      xp: 750,
      imageSrc: 'https://source.unsplash.com/random/400x400/?adventure',
    },
    progress: 0,
    total: 3,
    imageSrc: 'https://source.unsplash.com/random/800x600/?kayaking',
    locations: ['Kayaking', 'Rock Climbing', 'Mountain Biking'],
  },
  {
    id: 4,
    title: 'Mindfulness Journey',
    description: 'Complete the full series of 4 wellness experiences',
    difficulty: 'Medium',
    participants: 231,
    timeLimit: '45 days',
    reward: {
      name: 'Inner Peace Collection',
      xp: 450,
      imageSrc: 'https://source.unsplash.com/random/400x400/?meditation',
    },
    progress: 3,
    total: 4,
    imageSrc: 'https://source.unsplash.com/random/800x600/?meditation',
    locations: ['Meditation', 'Yoga', 'Sound Bath', 'Forest Bathing'],
  },
  {
    id: 5,
    title: 'History Buff',
    description: 'Visit 6 historical landmarks and complete their challenges',
    difficulty: 'Hard',
    participants: 124,
    timeLimit: '120 days',
    reward: {
      name: 'Time Traveler NFT',
      xp: 800,
      imageSrc: 'https://source.unsplash.com/random/400x400/?landmark',
    },
    progress: 1,
    total: 6,
    imageSrc: 'https://source.unsplash.com/random/800x600/?landmark',
    locations: ['Boston', 'Philadelphia', 'Washington DC', 'Charleston', 'Savannah', 'New Orleans'],
  },
  {
    id: 6,
    title: 'Spiritual Pilgrim',
    description: 'Visit 3 sacred sites and participate in traditional ceremonies',
    difficulty: 'Medium',
    participants: 98,
    timeLimit: '180 days',
    reward: {
      name: 'Sacred Journey Collection',
      xp: 600,
      imageSrc: 'https://source.unsplash.com/random/400x400/?temple',
    },
    progress: 0,
    total: 3,
    imageSrc: 'https://source.unsplash.com/random/800x600/?temple',
    locations: ['Kyoto', 'Bali', 'Varanasi'],
  },
];

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800',
};

export default function ChallengesPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: challenges, loading, error } = useChallenges();

  const filteredChallenges = (challenges || []).filter((challenge) => {
    // Filter by difficulty
    if (filter !== 'all' && challenge.difficulty.toLowerCase() !== filter) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading challenges...</div>
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
            <div className="text-lg text-red-600">Error loading challenges: {error}</div>
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
        {/* Hero Section */}
        <div className="mb-12 rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-12 text-center text-white sm:px-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            X-Hunt Challenges
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg">
            Complete themed challenges, earn exclusive rewards, and climb the leaderboard.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-primary-600 shadow-sm hover:bg-gray-100">
              View Leaderboard
            </button>
            <button className="rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-400">
              My Challenges
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-full px-4 py-2 text-sm font-medium ${filter === 'all' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              All Challenges
            </button>
            <button
              onClick={() => setFilter('easy')}
              className={`rounded-full px-4 py-2 text-sm font-medium ${filter === 'easy' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Easy
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`rounded-full px-4 py-2 text-sm font-medium ${filter === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Medium
            </button>
            <button
              onClick={() => setFilter('hard')}
              className={`rounded-full px-4 py-2 text-sm font-medium ${filter === 'hard' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Hard
            </button>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              placeholder="Search challenges"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="card group overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={challenge.imageSrc}
                  alt={challenge.title}
                  width={500}
                  height={300}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
                <div
                  className={`absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-medium ${difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}`}
                >
                  {challenge.difficulty}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  <Link href={`/challenges/${challenge.id}`}>
                    <span className="absolute inset-0" />
                    {challenge.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{challenge.description}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {challenge.locations.map((location: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                    >
                      {location}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <UserGroupIcon className="mr-1 h-4 w-4 text-gray-400" />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="mr-1 h-4 w-4 text-gray-400" />
                    <span>{challenge.timeLimit}</span>
                  </div>
                </div>

                <div className="mt-4">
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

                <div className="mt-4 flex items-center rounded-md bg-primary-50 px-3 py-2">
                  <div className="mr-3 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={challenge.reward.imageSrc}
                      alt={challenge.reward.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary-800">Reward: {challenge.reward.name}</p>
                    <div className="flex items-center text-xs text-primary-600">
                      <FireIcon className="mr-1 h-3 w-3" />
                      <span>{challenge.reward.xp} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="mt-8 rounded-md bg-gray-50 py-12 text-center">
            <TrophyIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No challenges found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Leaderboard Preview */}
        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Top Challengers</h2>
            <Link
              href="/leaderboard"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              View full leaderboard
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Challenges Completed
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Total XP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[
                  {
                    rank: 1,
                    name: 'Alex Johnson',
                    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                    challenges: 24,
                    xp: 12450,
                  },
                  {
                    rank: 2,
                    name: 'Maria Garcia',
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
                    challenges: 22,
                    xp: 11200,
                  },
                  {
                    rank: 3,
                    name: 'David Kim',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
                    challenges: 19,
                    xp: 9850,
                  },
                  {
                    rank: 4,
                    name: 'Sarah Williams',
                    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                    challenges: 18,
                    xp: 9300,
                  },
                  {
                    rank: 5,
                    name: 'James Wilson',
                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
                    challenges: 16,
                    xp: 8750,
                  },
                ].map((user) => (
                  <tr key={user.rank}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        {user.rank === 1 ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-sm font-semibold text-yellow-800">
                            1
                          </span>
                        ) : user.rank === 2 ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-800">
                            2
                          </span>
                        ) : user.rank === 3 ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-50 text-sm font-semibold text-yellow-700">
                            3
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">{user.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={user.avatar}
                            alt=""
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{user.challenges}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <FireIcon className="mr-1 h-4 w-4 text-primary-500" />
                        {user.xp.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}