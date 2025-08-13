'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpenIcon,
  PlusIcon,
  PhotoIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  SparklesIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  TagIcon,
  GlobeAltIcon,
  LockClosedIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

interface StoryEntry {
  id: string;
  storyId: string;
  day: number;
  title: string;
  content: string;
  mediaUrls: string[];
  mediaTypes: ('photo' | 'video' | 'audio')[];
  location?: string;
  mood: 'excited' | 'challenging' | 'accomplished' | 'reflective' | 'adventurous' | 'peaceful';
  tags: string[];
  aiGeneratedCaption?: string;
  aiSuggestions: string[];
  createdAt: string;
  updatedAt: string;
}

interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  isVerified: boolean;
  title: string;
  description: string;
  coverImageUrl?: string;
  challengeId?: string;
  challengeName?: string;
  experienceId?: string;
  experienceName?: string;
  totalDays: number;
  currentDay: number;
  status: 'active' | 'completed' | 'paused';
  visibility: 'public' | 'friends' | 'private';
  entries: StoryEntry[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
  aiHighlightReel?: {
    id: string;
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
    generatedAt: string;
  };
}

interface StorytellingModeProps {
  userId: string;
  storyId?: string;
  mode?: 'view' | 'create' | 'edit';
  challengeId?: string;
  experienceId?: string;
}

export function StorytellingMode({ 
  userId, 
  storyId, 
  mode = 'view', 
  challengeId, 
  experienceId 
}: StorytellingModeProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentEntry, setCurrentEntry] = useState<StoryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<StoryEntry>>({});
  const [aiSuggesting, setAiSuggesting] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  // Mock data for development
  const mockStories: Story[] = [
    {
      id: '1',
      userId: userId,
      userName: 'You',
      isVerified: false,
      title: '30-Day Photography Challenge',
      description: 'Documenting my journey to improve photography skills through daily practice and exploration.',
      coverImageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
      challengeId: 'challenge1',
      challengeName: 'Photography Mastery Challenge',
      totalDays: 30,
      currentDay: 7,
      status: 'active',
      visibility: 'public',
      likesCount: 89,
      commentsCount: 23,
      sharesCount: 12,
      viewsCount: 456,
      isLiked: false,
      isBookmarked: true,
      createdAt: '2024-01-08T10:00:00Z',
      updatedAt: '2024-01-15T18:30:00Z',
      entries: [
        {
          id: 'entry1',
          storyId: '1',
          day: 1,
          title: 'The Beginning',
          content: 'Started my photography challenge today! Excited to see how much I can improve over the next 30 days. Today I focused on basic composition rules.',
          mediaUrls: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'],
          mediaTypes: ['photo'],
          location: 'Golden Gate Park, SF',
          mood: 'excited',
          tags: ['photography', 'challenge', 'day1', 'composition'],
          aiGeneratedCaption: 'Embarking on a creative journey with fresh eyes and endless possibilities.',
          aiSuggestions: [
            'Try experimenting with different angles tomorrow',
            'Consider the rule of thirds in your next shot',
            'Look for interesting lighting conditions'
          ],
          createdAt: '2024-01-08T10:00:00Z',
          updatedAt: '2024-01-08T10:00:00Z',
        },
        {
          id: 'entry2',
          storyId: '1',
          day: 3,
          title: 'Finding My Style',
          content: 'Day 3 and I\'m starting to notice patterns in what I\'m drawn to photograph. Street photography seems to be calling to me.',
          mediaUrls: [
            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
            'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=800'
          ],
          mediaTypes: ['photo', 'photo'],
          location: 'Downtown San Francisco',
          mood: 'reflective',
          tags: ['street-photography', 'style', 'discovery'],
          aiGeneratedCaption: 'Every street tells a story, every corner holds a moment waiting to be captured.',
          aiSuggestions: [
            'Try black and white photography for street scenes',
            'Focus on capturing candid moments',
            'Experiment with different focal lengths'
          ],
          createdAt: '2024-01-10T15:30:00Z',
          updatedAt: '2024-01-10T15:30:00Z',
        },
        {
          id: 'entry3',
          storyId: '1',
          day: 7,
          title: 'Week One Complete!',
          content: 'Can\'t believe it\'s been a week already! Looking back at my first photos vs today\'s shots, I can already see improvement. The key has been consistent practice.',
          mediaUrls: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
          ],
          mediaTypes: ['photo', 'video'],
          location: 'Various locations',
          mood: 'accomplished',
          tags: ['milestone', 'progress', 'week1', 'improvement'],
          aiGeneratedCaption: 'Progress isn\'t always visible day by day, but week by week, the growth becomes undeniable.',
          aiSuggestions: [
            'Create a before/after comparison',
            'Document your technical learnings',
            'Set goals for week two'
          ],
          createdAt: '2024-01-15T18:30:00Z',
          updatedAt: '2024-01-15T18:30:00Z',
        },
      ],
      aiHighlightReel: {
        id: 'highlight1',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
        duration: 45,
        generatedAt: '2024-01-15T20:00:00Z',
      },
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Sarah Kim',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      isVerified: true,
      title: 'Mindful Meditation Journey',
      description: 'Exploring different meditation practices and documenting the impact on my daily life.',
      coverImageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      experienceId: 'exp1',
      experienceName: 'Mindfulness Workshop Series',
      totalDays: 21,
      currentDay: 21,
      status: 'completed',
      visibility: 'public',
      likesCount: 156,
      commentsCount: 45,
      sharesCount: 28,
      viewsCount: 892,
      isLiked: true,
      isBookmarked: false,
      createdAt: '2023-12-01T09:00:00Z',
      updatedAt: '2023-12-21T19:00:00Z',
      entries: [
        {
          id: 'entry4',
          storyId: '2',
          day: 1,
          title: 'First Steps into Stillness',
          content: 'Today I began my meditation journey. 5 minutes felt like an eternity, but I can sense this is exactly what I need.',
          mediaUrls: ['https://sample-audio.com/meditation.mp3'],
          mediaTypes: ['audio'],
          mood: 'peaceful',
          tags: ['meditation', 'mindfulness', 'beginning'],
          aiGeneratedCaption: 'In stillness, we find the space between thoughts where peace resides.',
          aiSuggestions: [
            'Try guided meditations for beginners',
            'Set a consistent time each day',
            'Start with shorter sessions'
          ],
          createdAt: '2023-12-01T09:00:00Z',
          updatedAt: '2023-12-01T09:00:00Z',
        },
      ],
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filteredStories = mockStories;
      
      if (storyId) {
        const story = filteredStories.find(s => s.id === storyId);
        if (story) {
          setSelectedStory(story);
          setCurrentEntry(story.entries[story.entries.length - 1] || null);
        }
      } else {
        // Filter by challenge or experience
        if (challengeId) {
          filteredStories = filteredStories.filter(s => s.challengeId === challengeId);
        }
        if (experienceId) {
          filteredStories = filteredStories.filter(s => s.experienceId === experienceId);
        }
      }
      
      setStories(filteredStories);
      setLoading(false);
    }, 800);
  }, [storyId, challengeId, experienceId]);

  const handleLike = async (storyId: string) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { 
            ...story, 
            isLiked: !story.isLiked,
            likesCount: story.isLiked ? story.likesCount - 1 : story.likesCount + 1
          }
        : story
    ));
    
    if (selectedStory?.id === storyId) {
      setSelectedStory(prev => prev ? {
        ...prev,
        isLiked: !prev.isLiked,
        likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1
      } : null);
    }
  };

  const handleBookmark = async (storyId: string) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { 
            ...story, 
            isBookmarked: !story.isBookmarked
          }
        : story
    ));
    
    if (selectedStory?.id === storyId) {
      setSelectedStory(prev => prev ? {
        ...prev,
        isBookmarked: !prev.isBookmarked
      } : null);
    }
  };

  const generateAISuggestions = async () => {
    setAiSuggesting(true);
    // Simulate AI processing
    setTimeout(() => {
      const suggestions = [
        'Consider adding more emotional depth to your reflection',
        'Try capturing the environment around you',
        'Document any challenges you faced today',
        'Include what you learned or discovered',
        'Add details about your mood and feelings'
      ];
      setNewEntry(prev => ({ ...prev, aiSuggestions: suggestions }));
      setAiSuggesting(false);
    }, 2000);
  };

  const generateAICaption = async (content: string) => {
    // Simulate AI caption generation
    const captions = [
      'Every journey begins with a single step, and today marks the beginning of transformation.',
      'In the quiet moments of reflection, we discover our true potential.',
      'Progress is not always visible, but persistence makes it inevitable.',
      'Each day brings new opportunities to grow and learn.',
      'The path to mastery is paved with consistent daily practice.'
    ];
    return captions[Math.floor(Math.random() * captions.length)];
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excited': return 'bg-yellow-100 text-yellow-800';
      case 'challenging': return 'bg-red-100 text-red-800';
      case 'accomplished': return 'bg-green-100 text-green-800';
      case 'reflective': return 'bg-blue-100 text-blue-800';
      case 'adventurous': return 'bg-purple-100 text-purple-800';
      case 'peaceful': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return <GlobeAltIcon className="h-4 w-4" />;
      case 'friends': return <UserGroupIcon className="h-4 w-4" />;
      case 'private': return <LockClosedIcon className="h-4 w-4" />;
      default: return <GlobeAltIcon className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mb-2" />
          <div className="h-4 bg-gray-300 rounded w-96" />
        </div>
        
        {/* Stories Grid Skeleton */}
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

  // Story Detail View
  if (selectedStory) {
    return (
      <div className="space-y-6">
        {/* Story Header */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {selectedStory.coverImageUrl && (
            <div className="relative h-64">
              <Image
                src={selectedStory.coverImageUrl}
                alt={selectedStory.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute bottom-4 left-4 text-white">
                <h1 className="text-3xl font-bold mb-2">{selectedStory.title}</h1>
                <p className="text-lg opacity-90">{selectedStory.description}</p>
              </div>
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {selectedStory.userAvatar && (
                  <Image
                    src={selectedStory.userAvatar}
                    alt={selectedStory.userName}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{selectedStory.userName}</span>
                    {selectedStory.isVerified && (
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{formatTimeAgo(selectedStory.updatedAt)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedStory.status)}`}>
                  {selectedStory.status.charAt(0).toUpperCase() + selectedStory.status.slice(1)}
                </span>
                <div className="flex items-center space-x-1 text-gray-600">
                  {getVisibilityIcon(selectedStory.visibility)}
                  <span className="text-sm capitalize">{selectedStory.visibility}</span>
                </div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">
                  Day {selectedStory.currentDay} of {selectedStory.totalDays}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(selectedStory.currentDay / selectedStory.totalDays) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Challenge/Experience Link */}
            {(selectedStory.challengeName || selectedStory.experienceName) && (
              <div className="mb-4">
                <Link 
                  href={selectedStory.challengeId ? `/challenges/${selectedStory.challengeId}` : `/experiences/${selectedStory.experienceId}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {selectedStory.challengeName || selectedStory.experienceName}
                </Link>
              </div>
            )}
            
            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1 text-gray-600">
                  <EyeIcon className="h-4 w-4" />
                  <span className="text-sm">{selectedStory.viewsCount}</span>
                </div>
                <button 
                  onClick={() => handleLike(selectedStory.id)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                >
                  {selectedStory.isLiked ? (
                    <HeartSolidIcon className="h-4 w-4 text-red-500" />
                  ) : (
                    <HeartIcon className="h-4 w-4" />
                  )}
                  <span className="text-sm">{selectedStory.likesCount}</span>
                </button>
                <div className="flex items-center space-x-1 text-gray-600">
                  <ChatBubbleLeftIcon className="h-4 w-4" />
                  <span className="text-sm">{selectedStory.commentsCount}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <ShareIcon className="h-4 w-4" />
                  <span className="text-sm">{selectedStory.sharesCount}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleBookmark(selectedStory.id)}
                  className="text-gray-600 hover:text-yellow-500 transition-colors"
                >
                  {selectedStory.isBookmarked ? (
                    <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <BookmarkIcon className="h-5 w-5" />
                  )}
                </button>
                
                {selectedStory.userId === userId && (
                  <button 
                    onClick={() => setShowEntryModal(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Add Entry</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Highlight Reel */}
        {selectedStory.aiHighlightReel && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-4">
              <SparklesIcon className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">AI-Generated Highlight Reel</h2>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <video
                src={selectedStory.aiHighlightReel.videoUrl}
                poster={selectedStory.aiHighlightReel.thumbnailUrl}
                controls
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Auto-generated from your story entries • {selectedStory.aiHighlightReel.duration}s
            </p>
          </div>
        )}
        
        {/* Story Entries */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Story Entries</h2>
          
          {selectedStory.entries.map((entry, index) => (
            <div key={entry.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6">
                {/* Entry Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                      Day {entry.day}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{entry.title}</h3>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </span>
                    {selectedStory.userId === userId && (
                      <div className="flex items-center space-x-1">
                        <button className="text-gray-400 hover:text-gray-600">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Entry Content */}
                <p className="text-gray-700 mb-4">{entry.content}</p>
                
                {/* AI Generated Caption */}
                {entry.aiGeneratedCaption && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <SparklesIcon className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">AI-Generated Caption</span>
                    </div>
                    <p className="text-purple-700 italic">"{entry.aiGeneratedCaption}"</p>
                  </div>
                )}
                
                {/* Media */}
                {entry.mediaUrls.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {entry.mediaUrls.map((url, mediaIndex) => (
                      <div key={mediaIndex} className="relative">
                        {entry.mediaTypes[mediaIndex] === 'photo' ? (
                          <Image
                            src={url}
                            alt={`${entry.title} - Media ${mediaIndex + 1}`}
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        ) : entry.mediaTypes[mediaIndex] === 'video' ? (
                          <video
                            src={url}
                            controls
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-center justify-center">
                            <div className="text-center">
                              <MicrophoneIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Audio Recording</p>
                              <button 
                                onClick={() => setPlayingAudio(playingAudio === url ? null : url)}
                                className="mt-2 bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors"
                              >
                                {playingAudio === url ? 'Pause' : 'Play'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Location */}
                {entry.location && (
                  <div className="flex items-center space-x-1 text-gray-600 mb-3">
                    <MapPinIcon className="h-4 w-4" />
                    <span className="text-sm">{entry.location}</span>
                  </div>
                )}
                
                {/* Tags */}
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {entry.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm flex items-center space-x-1"
                      >
                        <TagIcon className="h-3 w-3" />
                        <span>#{tag}</span>
                      </span>
                    ))}
                  </div>
                )}
                
                {/* AI Suggestions */}
                {entry.aiSuggestions.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <SparklesIcon className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">AI Suggestions for Next Entry</span>
                    </div>
                    <ul className="space-y-1">
                      {entry.aiSuggestions.map((suggestion, suggestionIndex) => (
                        <li key={suggestionIndex} className="text-sm text-blue-700 flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Entry Timestamp */}
                <div className="flex items-center space-x-1 text-gray-500 text-sm mt-4">
                  <ClockIcon className="h-4 w-4" />
                  <span>{formatTimeAgo(entry.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Stories List View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Story Mode</h1>
          <p className="text-gray-600">
            Document your journey with multi-day challenge journals and AI-assisted storytelling.
          </p>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <BookOpenIcon className="h-5 w-5" />
          <span>Start New Story</span>
        </button>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedStory(story)}
          >
            {/* Cover Image */}
            {story.coverImageUrl && (
              <div className="relative h-48">
                <Image
                  src={story.coverImageUrl}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(story.status)}`}>
                    {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="flex items-center space-x-1 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                    {getVisibilityIcon(story.visibility)}
                    <span className="capitalize">{story.visibility}</span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  Day {story.currentDay}/{story.totalDays}
                </div>
              </div>
            )}
            
            {/* Story Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{story.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{story.description}</p>
              
              {/* Progress Bar */}
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(story.currentDay / story.totalDays) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* Challenge/Experience */}
              {(story.challengeName || story.experienceName) && (
                <p className="text-primary-600 text-sm font-medium mb-3">
                  {story.challengeName || story.experienceName}
                </p>
              )}
              
              {/* User Info */}
              <div className="flex items-center space-x-2 mb-3">
                {story.userAvatar && (
                  <Image
                    src={story.userAvatar}
                    alt={story.userName}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm text-gray-600">{story.userName}</span>
                {story.isVerified && (
                  <StarIcon className="h-3 w-3 text-yellow-500" />
                )}
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">{formatTimeAgo(story.updatedAt)}</span>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <EyeIcon className="h-4 w-4" />
                    <span className="text-sm">{story.viewsCount}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <HeartIcon className="h-4 w-4" />
                    <span className="text-sm">{story.likesCount}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <ChatBubbleLeftIcon className="h-4 w-4" />
                    <span className="text-sm">{story.commentsCount}</span>
                  </div>
                </div>
                
                <span className="text-xs text-gray-500">
                  {story.entries.length} entries
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {stories.length === 0 && !loading && (
        <div className="text-center py-12">
          <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No stories found</h3>
          <p className="text-gray-600 mb-4">
            Start documenting your journey by creating your first story!
          </p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Create Your First Story
          </button>
        </div>
      )}
    </div>
  );
}
