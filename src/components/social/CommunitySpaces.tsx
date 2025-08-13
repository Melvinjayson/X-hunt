'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPinIcon,
  UserGroupIcon,
  ChatBubbleLeftEllipsisIcon,
  FireIcon,
  ClockIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';

interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'themed' | 'geo-local';
  location?: string;
  memberCount: number;
  postCount: number;
  isPrivate: boolean;
  coverImage?: string;
  icon?: string;
  tags: string[];
  moderators: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  recentActivity: {
    type: 'post' | 'member_joined' | 'event';
    user: {
      name: string;
      avatar?: string;
    };
    content: string;
    timestamp: string;
  }[];
  isJoined?: boolean;
  trending?: boolean;
}

interface CommunitySpacesProps {
  selectedCategory?: string;
  userLocation?: string;
}

export function CommunitySpaces({ selectedCategory, userLocation }: CommunitySpacesProps) {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'themed' | 'geo-local'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'trending'>('popular');

  // Mock data for development
  const mockCommunities: Community[] = [
    {
      id: '1',
      name: 'Foodies United',
      description: 'Discover amazing culinary experiences and share your food adventures with fellow food lovers.',
      category: 'Food & Dining',
      type: 'themed',
      memberCount: 12847,
      postCount: 3421,
      isPrivate: false,
      coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      icon: '🍽️',
      tags: ['food', 'restaurants', 'cooking', 'reviews'],
      moderators: [
        { id: '1', name: 'Chef Maria', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100' },
        { id: '2', name: 'Food Critic John', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      ],
      recentActivity: [
        {
          type: 'post',
          user: { name: 'Sarah K.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
          content: 'Just tried the new sushi place downtown - absolutely incredible!',
          timestamp: '2 hours ago',
        },
        {
          type: 'member_joined',
          user: { name: 'Mike R.' },
          content: 'joined the community',
          timestamp: '4 hours ago',
        },
      ],
      isJoined: true,
      trending: true,
    },
    {
      id: '2',
      name: 'San Francisco Adventures',
      description: 'Connect with locals and discover hidden gems in the Bay Area.',
      category: 'Local Community',
      type: 'geo-local',
      location: 'San Francisco, CA',
      memberCount: 8934,
      postCount: 2156,
      isPrivate: false,
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      icon: '🌉',
      tags: ['sf', 'local', 'events', 'meetups'],
      moderators: [
        { id: '3', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
      ],
      recentActivity: [
        {
          type: 'event',
          user: { name: 'Event Bot' },
          content: 'Weekend hiking meetup at Golden Gate Park',
          timestamp: '1 hour ago',
        },
      ],
      isJoined: false,
      trending: false,
    },
    {
      id: '3',
      name: 'Outdoor Enthusiasts',
      description: 'For those who love hiking, camping, and outdoor adventures.',
      category: 'Outdoor & Adventure',
      type: 'themed',
      memberCount: 15623,
      postCount: 4789,
      isPrivate: false,
      coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      icon: '🏔️',
      tags: ['hiking', 'camping', 'nature', 'adventure'],
      moderators: [
        { id: '4', name: 'Trail Guide Tom', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
      ],
      recentActivity: [
        {
          type: 'post',
          user: { name: 'Adventure Anna', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
          content: 'Epic sunrise from Mount Tamalpais this morning!',
          timestamp: '3 hours ago',
        },
      ],
      isJoined: true,
      trending: true,
    },
    {
      id: '4',
      name: 'Art & Culture NYC',
      description: 'Explore galleries, museums, and cultural events in New York City.',
      category: 'Arts & Culture',
      type: 'geo-local',
      location: 'New York, NY',
      memberCount: 6721,
      postCount: 1834,
      isPrivate: false,
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
      icon: '🎨',
      tags: ['art', 'museums', 'culture', 'nyc'],
      moderators: [
        { id: '5', name: 'Gallery Curator Lisa', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100' },
      ],
      recentActivity: [
        {
          type: 'post',
          user: { name: 'Art Lover Ben' },
          content: 'New exhibition at MoMA is absolutely stunning!',
          timestamp: '5 hours ago',
        },
      ],
      isJoined: false,
      trending: false,
    },
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filteredCommunities = mockCommunities;
      
      // Filter by type
      if (filterType !== 'all') {
        filteredCommunities = filteredCommunities.filter(c => c.type === filterType);
      }
      
      // Filter by search query
      if (searchQuery) {
        filteredCommunities = filteredCommunities.filter(c => 
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      // Sort communities
      filteredCommunities.sort((a, b) => {
        switch (sortBy) {
          case 'popular':
            return b.memberCount - a.memberCount;
          case 'recent':
            return b.postCount - a.postCount;
          case 'trending':
            return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
          default:
            return 0;
        }
      });
      
      setCommunities(filteredCommunities);
      setLoading(false);
    }, 800);
  }, [searchQuery, filterType, sortBy]);

  const handleJoinCommunity = async (communityId: string) => {
    setCommunities(prev => prev.map(community => 
      community.id === communityId 
        ? { 
            ...community, 
            isJoined: !community.isJoined,
            memberCount: community.isJoined ? community.memberCount - 1 : community.memberCount + 1
          }
        : community
    ));
  };

  const formatTimeAgo = (timestamp: string) => {
    // Simple time ago formatting
    return timestamp;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mb-4" />
          <div className="h-4 bg-gray-300 rounded w-96" />
        </div>
        
        {/* Filters Skeleton */}
        <div className="flex space-x-4 animate-pulse">
          <div className="h-10 bg-gray-300 rounded w-64" />
          <div className="h-10 bg-gray-300 rounded w-32" />
          <div className="h-10 bg-gray-300 rounded w-32" />
        </div>
        
        {/* Communities Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border overflow-hidden animate-pulse">
              <div className="h-32 bg-gray-300" />
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Spaces</h1>
        <p className="text-gray-600">
          Join themed communities and local groups to connect with like-minded adventurers.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="themed">Themed</option>
            <option value="geo-local">Local</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="popular">Most Popular</option>
            <option value="recent">Most Active</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      {/* Create Community Button */}
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          <span>Create Community</span>
        </button>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <div key={community.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            {/* Cover Image */}
            <div className="relative h-32">
              {community.coverImage ? (
                <Image
                  src={community.coverImage}
                  alt={community.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary-500 to-primary-600" />
              )}
              
              {/* Community Icon */}
              <div className="absolute top-3 left-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
                  {community.icon}
                </div>
              </div>
              
              {/* Trending Badge */}
              {community.trending && (
                <div className="absolute top-3 right-3">
                  <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <FireIcon className="h-3 w-3" />
                    <span>Trending</span>
                  </div>
                </div>
              )}
              
              {/* Type Badge */}
              <div className="absolute bottom-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  community.type === 'geo-local'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {community.type === 'geo-local' ? 'Local' : 'Themed'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Header */}
              <div className="mb-3">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                    {community.name}
                  </h3>
                  {community.isPrivate && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Private
                    </span>
                  )}
                </div>
                
                {community.location && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{community.location}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {community.description}
              </p>

              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <UserGroupIcon className="h-4 w-4" />
                  <span>{community.memberCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
                  <span>{community.postCount.toLocaleString()}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {community.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {community.tags.length > 3 && (
                  <span className="text-gray-500 text-xs">+{community.tags.length - 3} more</span>
                )}
              </div>

              {/* Recent Activity */}
              {community.recentActivity.length > 0 && (
                <div className="border-t pt-3 mb-4">
                  <div className="text-xs text-gray-500 mb-2">Recent Activity</div>
                  <div className="space-y-2">
                    {community.recentActivity.slice(0, 2).map((activity, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        {activity.user.avatar ? (
                          <Image
                            src={activity.user.avatar}
                            alt={activity.user.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-5 h-5 bg-gray-300 rounded-full" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 truncate">
                            <span className="font-medium">{activity.user.name}</span>
                            {' '}{activity.content}
                          </p>
                          <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => handleJoinCommunity(community.id)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  community.isJoined
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {community.isJoined ? 'Joined' : 'Join Community'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {communities.length === 0 && !loading && (
        <div className="text-center py-12">
          <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No communities found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery ? 'Try adjusting your search terms.' : 'Be the first to create a community!'}
          </p>
          <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            Create Community
          </button>
        </div>
      )}
    </div>
  );
}
