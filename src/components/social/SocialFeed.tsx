'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
  CalendarIcon,
  TrophyIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface SocialPost {
  id: string;
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'EXPERIENCE_SHARE' | 'CHALLENGE_UPDATE' | 'ACHIEVEMENT' | 'STORY';
  content?: string;
  images: string[];
  videos: string[];
  likeCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    socialProfile?: {
      username: string;
      isVerified: boolean;
      isCreator: boolean;
    };
  };
  metadata?: {
    experience?: {
      id: string;
      title: string;
      location: string;
      rating: number;
    };
    challenge?: {
      id: string;
      title: string;
      progress: number;
    };
    achievement?: {
      title: string;
      badge: string;
      points: number;
    };
  };
  isLiked?: boolean;
}

interface SocialFeedProps {
  feedType?: 'home' | 'following' | 'community';
  communityId?: string;
  userId?: string;
}

export function SocialFeed({ feedType = 'home', communityId, userId }: SocialFeedProps) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock data for development
  const mockPosts: SocialPost[] = [
    {
      id: '1',
      type: 'EXPERIENCE_SHARE',
      content: 'Just completed the most amazing urban art treasure hunt! The street art scene in SF is incredible 🎨',
      images: [
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      ],
      videos: [],
      likeCount: 24,
      commentCount: 8,
      shareCount: 3,
      createdAt: '2024-01-15T10:30:00Z',
      user: {
        id: 'user1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        socialProfile: {
          username: 'alexj_explorer',
          isVerified: true,
          isCreator: false,
        },
      },
      metadata: {
        experience: {
          id: 'exp1',
          title: 'Urban Street Art Treasure Hunt',
          location: 'San Francisco, CA',
          rating: 5,
        },
      },
      isLiked: false,
    },
    {
      id: '2',
      type: 'CHALLENGE_UPDATE',
      content: 'Day 5 of the Foodie Explorer Challenge! Today I discovered this hidden gem serving authentic ramen 🍜',
      images: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800'],
      videos: [],
      likeCount: 18,
      commentCount: 5,
      shareCount: 2,
      createdAt: '2024-01-15T08:15:00Z',
      user: {
        id: 'user2',
        name: 'Maria Santos',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        socialProfile: {
          username: 'maria_foodie',
          isVerified: false,
          isCreator: true,
        },
      },
      metadata: {
        challenge: {
          id: 'challenge1',
          title: 'Foodie Explorer Challenge',
          progress: 50,
        },
      },
      isLiked: true,
    },
    {
      id: '3',
      type: 'ACHIEVEMENT',
      content: 'Unlocked the "Adventure Seeker" badge! 🏆 10 outdoor experiences completed this month!',
      images: [],
      videos: [],
      likeCount: 42,
      commentCount: 12,
      shareCount: 8,
      createdAt: '2024-01-14T16:45:00Z',
      user: {
        id: 'user3',
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        socialProfile: {
          username: 'david_adventures',
          isVerified: false,
          isCreator: false,
        },
      },
      metadata: {
        achievement: {
          title: 'Adventure Seeker',
          badge: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100',
          points: 500,
        },
      },
      isLiked: false,
    },
  ];

  useEffect(() => {
    // In a real app, this would fetch from the API
    setLoading(true);
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, [feedType, communityId, userId]);

  const handleLike = async (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
        };
      }
      return post;
    }));
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const renderPostContent = (post: SocialPost) => {
    switch (post.type) {
      case 'EXPERIENCE_SHARE':
        return (
          <div className="space-y-3">
            {post.content && <p className="text-gray-900">{post.content}</p>}
            {post.metadata?.experience && (
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{post.metadata.experience.title}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {post.metadata.experience.location}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{post.metadata.experience.rating}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'CHALLENGE_UPDATE':
        return (
          <div className="space-y-3">
            {post.content && <p className="text-gray-900">{post.content}</p>}
            {post.metadata?.challenge && (
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-primary-900">{post.metadata.challenge.title}</h4>
                    <div className="flex items-center mt-2">
                      <div className="flex-1 bg-primary-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${post.metadata.challenge.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-primary-700">
                        {post.metadata.challenge.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'ACHIEVEMENT':
        return (
          <div className="space-y-3">
            {post.content && <p className="text-gray-900">{post.content}</p>}
            {post.metadata?.achievement && (
              <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <TrophyIcon className="h-8 w-8 text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent-900">{post.metadata.achievement.title}</h4>
                    <p className="text-sm text-accent-700">+{post.metadata.achievement.points} XP</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return post.content && <p className="text-gray-900">{post.content}</p>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-24" />
                <div className="h-3 bg-gray-300 rounded w-16" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
            </div>
            <div className="h-48 bg-gray-300 rounded-lg mt-4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          {/* Post Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link href={`/profile/${post.user.socialProfile?.username || post.user.id}`}>
                  <div className="relative">
                    <Image
                      src={post.user.avatar || '/images/default-avatar.png'}
                      alt={post.user.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    {post.user.socialProfile?.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>
                <div>
                  <div className="flex items-center space-x-2">
                    <Link 
                      href={`/profile/${post.user.socialProfile?.username || post.user.id}`}
                      className="font-semibold text-gray-900 hover:text-primary-600"
                    >
                      {post.user.name}
                    </Link>
                    {post.user.socialProfile?.isCreator && (
                      <span className="bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded-full">
                        Creator
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>@{post.user.socialProfile?.username || 'user'}</span>
                    <span className="mx-1">·</span>
                    <span>{formatTimeAgo(post.createdAt)}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <EllipsisHorizontalIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-6 pb-4">
            {renderPostContent(post)}
          </div>

          {/* Post Images */}
          {post.images.length > 0 && (
            <div className="px-6 pb-4">
              <div className={`grid gap-2 rounded-lg overflow-hidden ${
                post.images.length === 1 ? 'grid-cols-1' :
                post.images.length === 2 ? 'grid-cols-2' :
                'grid-cols-2'
              }`}>
                {post.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={image}
                      alt={`Post image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {post.images.length > 4 && index === 3 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          +{post.images.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Post Actions */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-danger-500 transition-colors"
                >
                  {post.isLiked ? (
                    <HeartSolidIcon className="h-5 w-5 text-danger-600" />
                  ) : (
                    <HeartIcon className="h-5 w-5" />
                  )}
                  <span className="text-sm font-medium">{post.likeCount}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">{post.commentCount}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <ShareIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">{post.shareCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Load More */}
      {hasMore && (
        <div className="text-center py-6">
          <button
            onClick={() => setPage(page + 1)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Load More Posts
          </button>
        </div>
      )}
    </div>
  );
}
