'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  PhotoIcon,
  VideoCameraIcon,
  PlusIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  FlagIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  TagIcon,
  MapPinIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

interface UserContent {
  id: string;
  type: 'photo' | 'video' | 'story';
  userId: string;
  userName: string;
  userAvatar?: string;
  isVerified: boolean;
  title?: string;
  description: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  duration?: number; // for videos in seconds
  location?: string;
  tags: string[];
  experienceId?: string;
  experienceName?: string;
  challengeId?: string;
  challengeName?: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  bookmarksCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  moderationStatus: 'pending' | 'approved' | 'rejected' | 'flagged';
  aiModerationScore: number; // 0-100
  aiTags: string[];
  visibility: 'public' | 'friends' | 'private';
  comments: {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    createdAt: string;
    likesCount: number;
    isLiked: boolean;
  }[];
}

interface UserGeneratedContentProps {
  userId: string;
  filter?: 'all' | 'photos' | 'videos' | 'stories' | 'my_content';
  experienceId?: string;
  challengeId?: string;
}

export function UserGeneratedContent({ 
  userId, 
  filter = 'all', 
  experienceId, 
  challengeId 
}: UserGeneratedContentProps) {
  const [content, setContent] = useState<UserContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<UserContent | null>(null);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  // Mock data for development
  const mockContent: UserContent[] = [
    {
      id: '1',
      type: 'photo',
      userId: 'user1',
      userName: 'Alex Chen',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      isVerified: true,
      title: 'Amazing Sunset at Golden Gate',
      description: 'Just completed the photography workshop and captured this incredible sunset! The techniques I learned really made a difference. #photography #goldengatebridge #sunset',
      mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      location: 'Golden Gate Bridge, San Francisco',
      tags: ['photography', 'sunset', 'goldengatebridge', 'workshop'],
      experienceId: 'exp1',
      experienceName: 'Photography Workshop',
      createdAt: '2024-01-15T18:30:00Z',
      likesCount: 127,
      commentsCount: 23,
      sharesCount: 8,
      bookmarksCount: 45,
      isLiked: true,
      isBookmarked: false,
      moderationStatus: 'approved',
      aiModerationScore: 95,
      aiTags: ['landscape', 'bridge', 'sunset', 'architecture'],
      visibility: 'public',
      comments: [
        {
          id: 'c1',
          userId: 'user2',
          userName: 'Sarah Kim',
          userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
          content: 'Absolutely stunning! The colors are incredible.',
          createdAt: '2024-01-15T19:00:00Z',
          likesCount: 12,
          isLiked: false,
        },
        {
          id: 'c2',
          userId: 'user3',
          userName: 'Mike Rodriguez',
          content: 'Great composition! What camera settings did you use?',
          createdAt: '2024-01-15T19:15:00Z',
          likesCount: 8,
          isLiked: true,
        },
      ],
    },
    {
      id: '2',
      type: 'video',
      userId: 'user2',
      userName: 'Sarah Kim',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      isVerified: false,
      title: 'Cooking Class Highlights',
      description: 'Had such an amazing time at the Italian cooking class! Here are some highlights from making fresh pasta. Can\'t wait to try these recipes at home! 🍝',
      mediaUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      duration: 45,
      location: 'Little Italy Cooking School',
      tags: ['cooking', 'italian', 'pasta', 'class'],
      experienceId: 'exp2',
      experienceName: 'Italian Cooking Class',
      createdAt: '2024-01-14T16:45:00Z',
      likesCount: 89,
      commentsCount: 15,
      sharesCount: 12,
      bookmarksCount: 28,
      isLiked: false,
      isBookmarked: true,
      moderationStatus: 'approved',
      aiModerationScore: 92,
      aiTags: ['cooking', 'food', 'kitchen', 'pasta'],
      visibility: 'public',
      comments: [],
    },
    {
      id: '3',
      type: 'photo',
      userId: userId,
      userName: 'You',
      isVerified: false,
      title: 'Mountain Hiking Achievement',
      description: 'Finally reached the summit! This hiking challenge pushed me to my limits but the view was absolutely worth it. Feeling accomplished! 🏔️',
      mediaUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      location: 'Mount Tamalpais, CA',
      tags: ['hiking', 'mountain', 'challenge', 'achievement'],
      challengeId: 'challenge1',
      challengeName: 'Mountain Hiking Challenge',
      createdAt: '2024-01-13T14:20:00Z',
      likesCount: 156,
      commentsCount: 31,
      sharesCount: 19,
      bookmarksCount: 67,
      isLiked: false,
      isBookmarked: false,
      moderationStatus: 'approved',
      aiModerationScore: 98,
      aiTags: ['mountain', 'hiking', 'nature', 'landscape'],
      visibility: 'public',
      comments: [],
    },
    {
      id: '4',
      type: 'story',
      userId: 'user4',
      userName: 'Emma Wilson',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      isVerified: true,
      title: 'Art Gallery Journey',
      description: 'Spent the day exploring different art galleries as part of the virtual art challenge. Each piece told a unique story and inspired me in different ways.',
      mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
      location: 'Various Art Galleries',
      tags: ['art', 'gallery', 'culture', 'inspiration'],
      challengeId: 'challenge2',
      challengeName: 'Virtual Art Gallery Tour',
      createdAt: '2024-01-12T11:30:00Z',
      likesCount: 73,
      commentsCount: 18,
      sharesCount: 6,
      bookmarksCount: 34,
      isLiked: true,
      isBookmarked: true,
      moderationStatus: 'approved',
      aiModerationScore: 94,
      aiTags: ['art', 'gallery', 'culture', 'museum'],
      visibility: 'public',
      comments: [],
    },
    {
      id: '5',
      type: 'photo',
      userId: 'user5',
      userName: 'David Park',
      isVerified: false,
      description: 'Testing AI moderation - this content is pending review.',
      mediaUrl: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800',
      tags: ['test', 'pending'],
      createdAt: '2024-01-15T20:00:00Z',
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      bookmarksCount: 0,
      isLiked: false,
      isBookmarked: false,
      moderationStatus: 'pending',
      aiModerationScore: 75,
      aiTags: ['food', 'restaurant'],
      visibility: 'public',
      comments: [],
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filteredContent = mockContent;
      
      // Filter by type
      if (filter !== 'all') {
        if (filter === 'my_content') {
          filteredContent = filteredContent.filter(c => c.userId === userId);
        } else {
          filteredContent = filteredContent.filter(c => c.type === filter.slice(0, -1)); // Remove 's' from 'photos', 'videos'
        }
      }
      
      // Filter by experience or challenge
      if (experienceId) {
        filteredContent = filteredContent.filter(c => c.experienceId === experienceId);
      }
      if (challengeId) {
        filteredContent = filteredContent.filter(c => c.challengeId === challengeId);
      }
      
      // Sort by creation date (newest first)
      filteredContent.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setContent(filteredContent);
      setLoading(false);
    }, 800);
  }, [filter, userId, experienceId, challengeId]);

  const handleLike = async (contentId: string) => {
    setContent(prev => prev.map(item => 
      item.id === contentId 
        ? { 
            ...item, 
            isLiked: !item.isLiked,
            likesCount: item.isLiked ? item.likesCount - 1 : item.likesCount + 1
          }
        : item
    ));
  };

  const handleBookmark = async (contentId: string) => {
    setContent(prev => prev.map(item => 
      item.id === contentId 
        ? { 
            ...item, 
            isBookmarked: !item.isBookmarked,
            bookmarksCount: item.isBookmarked ? item.bookmarksCount - 1 : item.bookmarksCount + 1
          }
        : item
    ));
  };

  const toggleVideoPlay = (contentId: string) => {
    const video = videoRefs.current[contentId];
    if (!video) return;

    if (playingVideos.has(contentId)) {
      video.pause();
      setPlayingVideos(prev => {
        const newSet = new Set(prev);
        newSet.delete(contentId);
        return newSet;
      });
    } else {
      video.play();
      setPlayingVideos(prev => new Set(prev).add(contentId));
    }
  };

  const toggleVideoMute = (contentId: string) => {
    const video = videoRefs.current[contentId];
    if (!video) return;

    video.muted = !video.muted;
    if (video.muted) {
      setMutedVideos(prev => new Set(prev).add(contentId));
    } else {
      setMutedVideos(prev => {
        const newSet = new Set(prev);
        newSet.delete(contentId);
        return newSet;
      });
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getModerationStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'rejected': return 'text-red-600';
      case 'flagged': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getModerationIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon className="h-4 w-4" />;
      case 'pending': return <ClockIcon className="h-4 w-4" />;
      case 'rejected': return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'flagged': return <FlagIcon className="h-4 w-4" />;
      default: return null;
    }
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
        
        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border overflow-hidden animate-pulse">
              <div className="h-64 bg-gray-300" />
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  <div className="h-4 bg-gray-300 rounded w-24" />
                </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Content</h1>
          <p className="text-gray-600">
            Share your experiences and discover amazing content from the community.
          </p>
        </div>
        
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Upload Content</span>
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            {/* Media */}
            <div className="relative aspect-square">
              {item.type === 'photo' || item.type === 'story' ? (
                <Image
                  src={item.mediaUrl}
                  alt={item.title || item.description}
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => setSelectedContent(item)}
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[item.id] = el;
                    }}
                    src={item.mediaUrl}
                    poster={item.thumbnailUrl}
                    className="w-full h-full object-cover"
                    muted={mutedVideos.has(item.id)}
                    loop
                    playsInline
                  />
                  
                  {/* Video Controls */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => toggleVideoPlay(item.id)}
                      className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-opacity"
                    >
                      {playingVideos.has(item.id) ? (
                        <PauseIcon className="h-6 w-6" />
                      ) : (
                        <PlayIcon className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                  
                  {/* Duration */}
                  {item.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      {formatDuration(item.duration)}
                    </div>
                  )}
                  
                  {/* Mute Button */}
                  <button
                    onClick={() => toggleVideoMute(item.id)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                  >
                    {mutedVideos.has(item.id) ? (
                      <SpeakerXMarkIcon className="h-4 w-4" />
                    ) : (
                      <SpeakerWaveIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}
              
              {/* Content Type Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.type === 'photo' ? 'bg-blue-100 text-blue-800' :
                  item.type === 'video' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.type === 'photo' ? 'Photo' : item.type === 'video' ? 'Video' : 'Story'}
                </span>
              </div>
              
              {/* Moderation Status */}
              {item.moderationStatus !== 'approved' && (
                <div className="absolute top-2 right-2">
                  <div className={`flex items-center space-x-1 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium ${
                    getModerationStatusColor(item.moderationStatus)
                  }`}>
                    {getModerationIcon(item.moderationStatus)}
                    <span className="capitalize">{item.moderationStatus}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Content Info */}
            <div className="p-4">
              {/* User Info */}
              <div className="flex items-center space-x-2 mb-3">
                {item.userAvatar ? (
                  <Image
                    src={item.userAvatar}
                    alt={item.userName}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <span className="font-medium text-gray-900">{item.userName}</span>
                    {item.isVerified && (
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{formatTimeAgo(item.createdAt)}</span>
                </div>
                
                <button className="text-gray-400 hover:text-gray-600">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
              </div>
              
              {/* Title */}
              {item.title && (
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              )}
              
              {/* Description */}
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">{item.description}</p>
              
              {/* Experience/Challenge Link */}
              {(item.experienceName || item.challengeName) && (
                <div className="mb-3">
                  <Link 
                    href={item.experienceId ? `/experiences/${item.experienceId}` : `/challenges/${item.challengeId}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    {item.experienceName || item.challengeName}
                  </Link>
                </div>
              )}
              
              {/* Location */}
              {item.location && (
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-3">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{item.location}</span>
                </div>
              )}
              
              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs flex items-center space-x-1"
                    >
                      <TagIcon className="h-3 w-3" />
                      <span>#{tag}</span>
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-gray-500 text-xs">+{item.tags.length - 3} more</span>
                  )}
                </div>
              )}
              
              {/* AI Moderation Info (for content owners) */}
              {item.userId === userId && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">AI Analysis</span>
                    <span className={`text-sm font-medium ${
                      item.aiModerationScore >= 90 ? 'text-green-600' :
                      item.aiModerationScore >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {item.aiModerationScore}% Safe
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.aiTags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleLike(item.id)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    {item.isLiked ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                    <span className="text-sm">{item.likesCount}</span>
                  </button>
                  
                  <button 
                    onClick={() => setSelectedContent(item)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                    <span className="text-sm">{item.commentsCount}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
                    <ShareIcon className="h-5 w-5" />
                    <span className="text-sm">{item.sharesCount}</span>
                  </button>
                </div>
                
                <button 
                  onClick={() => handleBookmark(item.id)}
                  className="text-gray-600 hover:text-yellow-500 transition-colors"
                >
                  {item.isBookmarked ? (
                    <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <BookmarkIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Detail Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedContent.title || 'Content Details'}
                </h2>
                <button 
                  onClick={() => setSelectedContent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {/* Media */}
              <div className="mb-6">
                {selectedContent.type === 'video' ? (
                  <video
                    src={selectedContent.mediaUrl}
                    controls
                    className="w-full max-h-96 object-contain rounded-lg"
                  />
                ) : (
                  <Image
                    src={selectedContent.mediaUrl}
                    alt={selectedContent.title || selectedContent.description}
                    width={800}
                    height={600}
                    className="w-full max-h-96 object-contain rounded-lg"
                  />
                )}
              </div>
              
              {/* Content Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  {selectedContent.userAvatar && (
                    <Image
                      src={selectedContent.userAvatar}
                      alt={selectedContent.userName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedContent.userName}</h3>
                    <p className="text-sm text-gray-600">{formatTimeAgo(selectedContent.createdAt)}</p>
                  </div>
                </div>
                
                <p className="text-gray-700">{selectedContent.description}</p>
                
                {/* Comments */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Comments ({selectedContent.commentsCount})</h4>
                  <div className="space-y-4">
                    {selectedContent.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-3">
                        {comment.userAvatar && (
                          <Image
                            src={comment.userAvatar}
                            alt={comment.userName}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">{comment.userName}</span>
                            <span className="text-xs text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Comment */}
                  <div className="mt-4 flex space-x-3">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {content.length === 0 && !loading && (
        <div className="text-center py-12">
          <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'my_content' 
              ? 'Start sharing your experiences by uploading your first photo or video!' 
              : 'Be the first to share amazing content with the community!'
            }
          </p>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Upload Content
          </button>
        </div>
      )}
    </div>
  );
}
