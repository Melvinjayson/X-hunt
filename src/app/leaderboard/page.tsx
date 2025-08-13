'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TrophyIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline';
import { TrophyIcon as TrophySolid } from '@heroicons/react/20/solid';

// Mock leaderboard data
const mockLeaderboard = [
  {
    id: 1,
    rank: 1,
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    totalXP: 15420,
    challengesCompleted: 28,
    experiencesBooked: 45,
    badgeCount: 12,
    location: 'San Francisco, CA'
  },
  {
    id: 2,
    rank: 2,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    totalXP: 14850,
    challengesCompleted: 26,
    experiencesBooked: 42,
    badgeCount: 11,
    location: 'New York, NY'
  },
  {
    id: 3,
    rank: 3,
    name: 'Mike Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    totalXP: 13920,
    challengesCompleted: 24,
    experiencesBooked: 38,
    badgeCount: 10,
    location: 'Los Angeles, CA'
  },
  // Add more mock users...
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 4,
    rank: i + 4,
    name: `User ${i + 4}`,
    avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400`,
    totalXP: 13000 - (i * 200),
    challengesCompleted: 20 - i,
    experiencesBooked: 35 - i,
    badgeCount: 8 - Math.floor(i / 3),
    location: ['Austin, TX', 'Seattle, WA', 'Chicago, IL', 'Miami, FL'][i % 4]
  }))
];

const timeFilters = [
  { value: 'all', label: 'All Time' },
  { value: 'month', label: 'This Month' },
  { value: 'week', label: 'This Week' },
];

const categoryFilters = [
  { value: 'overall', label: 'Overall' },
  { value: 'challenges', label: 'Challenges' },
  { value: 'experiences', label: 'Experiences' },
  { value: 'reviews', label: 'Reviews' },
];

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('overall');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <TrophySolid className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <TrophySolid className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <TrophySolid className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = {
        1: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        2: 'bg-gradient-to-r from-gray-300 to-gray-500',
        3: 'bg-gradient-to-r from-amber-400 to-amber-600'
      };
      return colors[rank as keyof typeof colors] || 'bg-gray-100';
    }
    return 'bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-12 text-center text-white sm:px-12">
          <TrophyIcon className="mx-auto h-16 w-16 mb-4" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            X-Hunt Leaderboard
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg">
            See how you rank against other adventurers and challenge seekers.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <label className="text-sm font-medium text-gray-700">Time Period:</label>
            {timeFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setTimeFilter(filter.value)}
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  timeFilter === filter.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            {categoryFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setCategoryFilter(filter.value)}
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  categoryFilter === filter.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {mockLeaderboard.slice(0, 3).map((user, index) => (
            <div
              key={user.id}
              className={`relative overflow-hidden rounded-xl p-6 text-center text-white ${
                getRankBadge(user.rank)
              } ${index === 0 ? 'md:order-2 transform md:scale-110' : index === 1 ? 'md:order-1' : 'md:order-3'}`}
            >
              <div className="absolute top-4 right-4">
                {getRankIcon(user.rank)}
              </div>
              
              <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-white">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <h3 className="text-lg font-bold">{user.name}</h3>
              <p className="text-sm opacity-90">{user.location}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center gap-1">
                  <FireIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.totalXP.toLocaleString()} XP</span>
                </div>
                <div className="text-xs opacity-75">
                  {user.challengesCompleted} challenges • {user.badgeCount} badges
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Full Rankings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total XP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Challenges
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Experiences
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Badges
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {mockLeaderboard.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        {getRankIcon(user.rank)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <FireIcon className="mr-1 h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-900">
                          {user.totalXP.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {user.challengesCompleted}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {user.experiencesBooked}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-900">{user.badgeCount}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrophyIcon className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Participants</dt>
                  <dd className="text-lg font-medium text-gray-900">{mockLeaderboard.length.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FireIcon className="h-8 w-8 text-orange-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total XP Earned</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {mockLeaderboard.reduce((sum, user) => sum + user.totalXP, 0).toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrophySolid className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Challenges Completed</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {mockLeaderboard.reduce((sum, user) => sum + user.challengesCompleted, 0).toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <StarIcon className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Badges Earned</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {mockLeaderboard.reduce((sum, user) => sum + user.badgeCount, 0).toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
