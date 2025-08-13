'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  TrophyIcon,
  UsersIcon,
  ClockIcon,
  MapPinIcon,
  EyeIcon,
  LockClosedIcon,
  PlusIcon,
  FireIcon,
  StarIcon,
  PlayIcon,
  ShareIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  PhotoIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'public' | 'private';
  status: 'upcoming' | 'active' | 'completed';
  hostId: string;
  hostName: string;
  hostAvatar?: string;
  isVerifiedHost: boolean;
  startDate: string;
  endDate: string;
  location?: string;
  isVirtual: boolean;
  maxParticipants?: number;
  currentParticipants: number;
  entryFee?: number;
  prizePool?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  coverImage?: string;
  isJoined: boolean;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  leaderboard: {
    rank: number;
    userId: string;
    userName: string;
    userAvatar?: string;
    score: number;
    progress: number;
    lastUpdate: string;
  }[];
  liveUpdates: {
    id: string;
    type: 'progress' | 'completion' | 'media' | 'announcement';
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    mediaUrl?: string;
    timestamp: string;
  }[];
  requirements: string[];
  rewards: {
    type: 'xp' | 'badge' | 'nft' | 'cash';
    value: string;
    description: string;
  }[];
}

interface GroupChallengesProps {
  userId: string;
  filter?: 'all' | 'joined' | 'hosting' | 'completed';
}

export function GroupChallenges({ userId, filter = 'all' }: GroupChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'leaderboard' | 'updates'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for development
  const mockChallenges: Challenge[] = [
    {
      id: '1',
      title: 'SF Food Crawl Challenge',
      description: 'Explore 10 different cuisines across San Francisco in one weekend. Share photos and reviews of each experience!',
      category: 'Food & Dining',
      type: 'public',
      status: 'active',
      hostId: 'host1',
      hostName: 'Chef Maria Rodriguez',
      hostAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      isVerifiedHost: true,
      startDate: '2024-01-15T00:00:00Z',
      endDate: '2024-01-21T23:59:59Z',
      location: 'San Francisco, CA',
      isVirtual: false,
      maxParticipants: 50,
      currentParticipants: 32,
      entryFee: 25,
      prizePool: 500,
      difficulty: 'intermediate',
      tags: ['food', 'exploration', 'photography', 'social'],
      coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      isJoined: true,
      isLiked: true,
      likesCount: 127,
      commentsCount: 43,
      sharesCount: 18,
      leaderboard: [
        {
          rank: 1,
          userId: 'user1',
          userName: 'Alex Chen',
          userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          score: 850,
          progress: 80,
          lastUpdate: '2 hours ago',
        },
        {
          rank: 2,
          userId: 'user2',
          userName: 'Sarah Kim',
          userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
          score: 720,
          progress: 70,
          lastUpdate: '4 hours ago',
        },
        {
          rank: 3,
          userId: userId,
          userName: 'You',
          score: 680,
          progress: 60,
          lastUpdate: '1 hour ago',
        },
      ],
      liveUpdates: [
        {
          id: 'update1',
          type: 'media',
          userId: 'user1',
          userName: 'Alex Chen',
          userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          content: 'Just tried the most amazing ramen at Ippudo!',
          mediaUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
          timestamp: '2 hours ago',
        },
        {
          id: 'update2',
          type: 'progress',
          userId: 'user2',
          userName: 'Sarah Kim',
          content: 'Completed 7/10 cuisines! Mexican food at La Taqueria was incredible.',
          timestamp: '4 hours ago',
        },
        {
          id: 'update3',
          type: 'announcement',
          userId: 'host1',
          userName: 'Chef Maria Rodriguez',
          content: 'Bonus points for trying the secret menu items! 🌟',
          timestamp: '6 hours ago',
        },
      ],
      requirements: [
        'Visit 10 different cuisine types',
        'Take a photo at each location',
        'Write a brief review (min 50 words)',
        'Share on social media with #SFFoodCrawl',
      ],
      rewards: [
        { type: 'xp', value: '500', description: 'Experience Points' },
        { type: 'badge', value: 'Food Explorer', description: 'Special achievement badge' },
        { type: 'cash', value: '$100', description: 'Winner prize' },
      ],
    },
    {
      id: '2',
      title: 'Virtual Art Gallery Tour',
      description: 'Explore world-famous art galleries from home and create your own digital art collection.',
      category: 'Arts & Culture',
      type: 'public',
      status: 'upcoming',
      hostId: 'host2',
      hostName: 'Gallery Curator Lisa',
      hostAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
      isVerifiedHost: true,
      startDate: '2024-01-22T10:00:00Z',
      endDate: '2024-01-29T18:00:00Z',
      isVirtual: true,
      maxParticipants: 100,
      currentParticipants: 67,
      difficulty: 'beginner',
      tags: ['art', 'virtual', 'culture', 'education'],
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
      isJoined: false,
      isLiked: false,
      likesCount: 89,
      commentsCount: 23,
      sharesCount: 12,
      leaderboard: [],
      liveUpdates: [],
      requirements: [
        'Visit 5 virtual gallery tours',
        'Create a digital mood board',
        'Write art analysis (min 100 words per piece)',
        'Participate in live discussion sessions',
      ],
      rewards: [
        { type: 'xp', value: '300', description: 'Experience Points' },
        { type: 'badge', value: 'Art Connoisseur', description: 'Cultural achievement badge' },
        { type: 'nft', value: 'Digital Art Collection', description: 'Exclusive NFT artwork' },
      ],
    },
    {
      id: '3',
      title: 'Mountain Hiking Expedition',
      description: 'Private group challenge for experienced hikers. Conquer 3 peaks in the Bay Area.',
      category: 'Outdoor & Adventure',
      type: 'private',
      status: 'active',
      hostId: 'host3',
      hostName: 'Trail Guide Tom',
      hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      isVerifiedHost: true,
      startDate: '2024-01-10T06:00:00Z',
      endDate: '2024-01-31T18:00:00Z',
      location: 'Bay Area, CA',
      isVirtual: false,
      maxParticipants: 15,
      currentParticipants: 12,
      entryFee: 75,
      difficulty: 'advanced',
      tags: ['hiking', 'adventure', 'fitness', 'nature'],
      coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      isJoined: true,
      isLiked: true,
      likesCount: 45,
      commentsCount: 28,
      sharesCount: 8,
      leaderboard: [
        {
          rank: 1,
          userId: userId,
          userName: 'You',
          score: 2100,
          progress: 67,
          lastUpdate: '1 day ago',
        },
        {
          rank: 2,
          userId: 'user3',
          userName: 'Mountain Mike',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          score: 1950,
          progress: 67,
          lastUpdate: '2 days ago',
        },
      ],
      liveUpdates: [
        {
          id: 'update4',
          type: 'completion',
          userId: userId,
          userName: 'You',
          content: 'Successfully completed Mount Tamalpais! What a view! 🏔️',
          mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          timestamp: '1 day ago',
        },
      ],
      requirements: [
        'Complete 3 designated hiking trails',
        'Document summit photos with GPS coordinates',
        'Track elevation gain and distance',
        'Share safety tips and trail conditions',
      ],
      rewards: [
        { type: 'xp', value: '1000', description: 'Experience Points' },
        { type: 'badge', value: 'Peak Conqueror', description: 'Elite hiking achievement' },
        { type: 'cash', value: '$200', description: 'Winner prize' },
      ],
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filteredChallenges = mockChallenges;
      
      switch (filter) {
        case 'joined':
          filteredChallenges = filteredChallenges.filter(c => c.isJoined);
          break;
        case 'hosting':
          filteredChallenges = filteredChallenges.filter(c => c.hostId === userId);
          break;
        case 'completed':
          filteredChallenges = filteredChallenges.filter(c => c.status === 'completed');
          break;
      }
      
      setChallenges(filteredChallenges);
      setLoading(false);
    }, 800);
  }, [filter, userId]);

  const handleJoinChallenge = async (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { 
            ...challenge, 
            isJoined: !challenge.isJoined,
            currentParticipants: challenge.isJoined 
              ? challenge.currentParticipants - 1 
              : challenge.currentParticipants + 1
          }
        : challenge
    ));
  };

  const handleLikeChallenge = async (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { 
            ...challenge, 
            isLiked: !challenge.isLiked,
            likesCount: challenge.isLiked 
              ? challenge.likesCount - 1 
              : challenge.likesCount + 1
          }
        : challenge
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-96" />
          </div>
          <div className="h-10 bg-gray-300 rounded w-32 animate-pulse" />
        </div>
        
        {/* Challenges Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-300" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="h-4 bg-gray-300 rounded w-2/3" />
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-300 rounded w-20" />
                  <div className="h-8 bg-gray-300 rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Group Challenges</h1>
          <p className="text-gray-600">
            Join exciting challenges, compete with others, and earn amazing rewards.
          </p>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create Challenge</span>
        </button>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            {/* Cover Image */}
            <div className="relative h-48">
              {challenge.coverImage ? (
                <Image
                  src={challenge.coverImage}
                  alt={challenge.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary-500 to-primary-600" />
              )}
              
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                  {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                </span>
              </div>
              
              {/* Privacy Badge */}
              <div className="absolute top-3 right-3">
                {challenge.type === 'private' ? (
                  <div className="bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <LockClosedIcon className="h-3 w-3" />
                    <span>Private</span>
                  </div>
                ) : (
                  <div className="bg-green-500 bg-opacity-75 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <EyeIcon className="h-3 w-3" />
                    <span>Public</span>
                  </div>
                )}
              </div>
              
              {/* Time Remaining */}
              {challenge.status === 'active' && (
                <div className="absolute bottom-3 left-3">
                  <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <ClockIcon className="h-3 w-3" />
                    <span>{formatTimeRemaining(challenge.endDate)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Header */}
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">
                  {challenge.title}
                </h3>
                
                {/* Host Info */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  {challenge.hostAvatar && (
                    <Image
                      src={challenge.hostAvatar}
                      alt={challenge.hostName}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  )}
                  <span>by {challenge.hostName}</span>
                  {challenge.isVerifiedHost && (
                    <StarSolidIcon className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {challenge.description}
              </p>

              {/* Challenge Details */}
              <div className="space-y-2 mb-4">
                {/* Difficulty & Category */}
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">{challenge.category}</span>
                </div>
                
                {/* Location */}
                {challenge.location && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{challenge.location}</span>
                  </div>
                )}
                
                {challenge.isVirtual && (
                  <div className="flex items-center space-x-1 text-sm text-blue-600">
                    <VideoCameraIcon className="h-4 w-4" />
                    <span>Virtual Event</span>
                  </div>
                )}
                
                {/* Participants */}
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <UsersIcon className="h-4 w-4" />
                  <span>
                    {challenge.currentParticipants}
                    {challenge.maxParticipants && `/${challenge.maxParticipants}`} participants
                  </span>
                </div>
                
                {/* Prize Pool */}
                {challenge.prizePool && (
                  <div className="flex items-center space-x-1 text-sm text-green-600">
                    <TrophyIcon className="h-4 w-4" />
                    <span>${challenge.prizePool} prize pool</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {challenge.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {challenge.tags.length > 3 && (
                  <span className="text-gray-500 text-xs">+{challenge.tags.length - 3} more</span>
                )}
              </div>

              {/* Social Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleLikeChallenge(challenge.id)}
                    className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                  >
                    {challenge.isLiked ? (
                      <HeartSolidIcon className="h-4 w-4 text-red-500" />
                    ) : (
                      <HeartIcon className="h-4 w-4" />
                    )}
                    <span>{challenge.likesCount}</span>
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    <ChatBubbleLeftIcon className="h-4 w-4" />
                    <span>{challenge.commentsCount}</span>
                  </div>
                  
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                    <ShareIcon className="h-4 w-4" />
                    <span>{challenge.sharesCount}</span>
                  </button>
                </div>
                
                <button 
                  onClick={() => setSelectedChallenge(challenge)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Details
                </button>
              </div>

              {/* Action Button */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleJoinChallenge(challenge.id)}
                  disabled={challenge.maxParticipants ? challenge.currentParticipants >= challenge.maxParticipants : false}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    challenge.isJoined
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : challenge.maxParticipants && challenge.currentParticipants >= challenge.maxParticipants
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {challenge.isJoined 
                    ? 'Joined' 
                    : challenge.maxParticipants && challenge.currentParticipants >= challenge.maxParticipants
                    ? 'Full'
                    : challenge.entryFee 
                    ? `Join ($${challenge.entryFee})`
                    : 'Join Free'
                  }
                </button>
                
                {challenge.status === 'active' && challenge.isJoined && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <PlayIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Challenge Detail Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{selectedChallenge.title}</h2>
                <button 
                  onClick={() => setSelectedChallenge(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex space-x-6 mt-4">
                {['overview', 'leaderboard', 'updates'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-2 border-b-2 font-medium capitalize ${
                      activeTab === tab
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Cover Image */}
                  {selectedChallenge.coverImage && (
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <Image
                        src={selectedChallenge.coverImage}
                        alt={selectedChallenge.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{selectedChallenge.description}</p>
                  </div>
                  
                  {/* Requirements */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedChallenge.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Rewards */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Rewards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedChallenge.rewards.map((reward, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrophyIcon className="h-5 w-5 text-yellow-500" />
                            <span className="font-medium">{reward.value}</span>
                          </div>
                          <p className="text-sm text-gray-600">{reward.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'leaderboard' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Leaderboard</h3>
                  {selectedChallenge.leaderboard.length > 0 ? (
                    <div className="space-y-3">
                      {selectedChallenge.leaderboard.map((entry) => (
                        <div key={entry.userId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              entry.rank === 1 ? 'bg-yellow-500 text-white' :
                              entry.rank === 2 ? 'bg-gray-400 text-white' :
                              entry.rank === 3 ? 'bg-orange-500 text-white' :
                              'bg-gray-200 text-gray-700'
                            }`}>
                              {entry.rank}
                            </div>
                            
                            {entry.userAvatar && (
                              <Image
                                src={entry.userAvatar}
                                alt={entry.userName}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            )}
                            
                            <div>
                              <p className="font-medium">{entry.userName}</p>
                              <p className="text-sm text-gray-600">Updated {entry.lastUpdate}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-lg">{entry.score} pts</p>
                            <p className="text-sm text-gray-600">{entry.progress}% complete</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No participants yet. Be the first to join!</p>
                  )}
                </div>
              )}
              
              {activeTab === 'updates' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Live Updates</h3>
                  {selectedChallenge.liveUpdates.length > 0 ? (
                    <div className="space-y-4">
                      {selectedChallenge.liveUpdates.map((update) => (
                        <div key={update.id} className="border-l-4 border-primary-500 pl-4">
                          <div className="flex items-start space-x-3">
                            {update.userAvatar && (
                              <Image
                                src={update.userAvatar}
                                alt={update.userName}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                            )}
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium">{update.userName}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  update.type === 'completion' ? 'bg-green-100 text-green-800' :
                                  update.type === 'progress' ? 'bg-blue-100 text-blue-800' :
                                  update.type === 'media' ? 'bg-purple-100 text-purple-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {update.type}
                                </span>
                                <span className="text-sm text-gray-500">{update.timestamp}</span>
                              </div>
                              
                              <p className="text-gray-700 mb-2">{update.content}</p>
                              
                              {update.mediaUrl && (
                                <div className="rounded-lg overflow-hidden max-w-md">
                                  <Image
                                    src={update.mediaUrl}
                                    alt="Update media"
                                    width={400}
                                    height={200}
                                    className="object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No updates yet. Join the challenge to see live updates!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {challenges.length === 0 && !loading && (
        <div className="text-center py-12">
          <TrophyIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No challenges found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' 
              ? 'Be the first to create an exciting challenge!' 
              : `No ${filter} challenges found.`
            }
          </p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Create Challenge
          </button>
        </div>
      )}
    </div>
  );
}
