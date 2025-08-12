'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  SparklesIcon,
  UserGroupIcon,
  ClockIcon,
  HashtagIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EyeIcon,
  LightBulbIcon,
  ChartBarIcon,
  CalendarIcon,
  MapPinIcon,
  PhotoIcon,
  VideoCameraIcon,
  MegaphoneIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
  XMarkIcon,
  PlayIcon,
  DocumentTextIcon,
  CameraIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline';
// TrendingUpIcon doesn't exist, using ArrowTrendingUpIcon instead

interface AIRecommendation {
  id: string;
  type: 'friend' | 'group' | 'challenge' | 'experience' | 'content';
  title: string;
  description: string;
  imageUrl?: string;
  confidence: number; // 0-100
  reason: string;
  actionUrl?: string;
  metadata?: {
    mutualConnections?: number;
    popularity?: number;
    relevanceScore?: number;
    trendingScore?: number;
  };
}

interface EngagementInsight {
  id: string;
  type: 'posting_time' | 'content_type' | 'hashtags' | 'engagement_rate' | 'audience_growth';
  title: string;
  description: string;
  recommendation: string;
  impact: 'high' | 'medium' | 'low';
  data: {
    current?: number;
    suggested?: number;
    improvement?: number;
    timeframe?: string;
  };
  chartData?: {
    labels: string[];
    values: number[];
  };
}

interface SentimentAnalysis {
  id: string;
  period: string;
  overallSentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number; // -100 to 100
  topics: {
    name: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    mentions: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  insights: string[];
  recommendations: string[];
}

interface StoryComposer {
  id: string;
  experienceId?: string;
  challengeId?: string;
  title: string;
  generatedContent: {
    caption: string;
    hashtags: string[];
    suggestedMedia: {
      type: 'photo' | 'video' | 'audio';
      description: string;
      prompt: string;
    }[];
    tone: 'inspiring' | 'informative' | 'casual' | 'professional' | 'humorous';
    targetAudience: string;
  };
  userInputs: {
    mood: string;
    highlights: string[];
    challenges: string[];
    learnings: string[];
    location?: string;
  };
  status: 'draft' | 'generated' | 'published';
  createdAt: string;
}

interface AISocialEnhancementsProps {
  userId: string;
  activeTab?: 'recommendations' | 'engagement' | 'sentiment' | 'composer';
}

export function AISocialEnhancements({ 
  userId, 
  activeTab = 'recommendations' 
}: AISocialEnhancementsProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [engagementInsights, setEngagementInsights] = useState<EngagementInsight[]>([]);
  const [sentimentData, setSentimentData] = useState<SentimentAnalysis | null>(null);
  const [storyComposers, setStoryComposers] = useState<StoryComposer[]>([]);
  const [showComposerModal, setShowComposerModal] = useState(false);
  const [newComposer, setNewComposer] = useState<Partial<StoryComposer>>({});
  const [generatingStory, setGeneratingStory] = useState(false);

  // Mock data for development
  const mockRecommendations: AIRecommendation[] = [
    {
      id: '1',
      type: 'friend',
      title: 'Sarah Chen',
      description: 'Photography enthusiast with similar interests',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      confidence: 92,
      reason: 'Shares 3 mutual connections and similar photography interests',
      actionUrl: '/profile/sarah-chen',
      metadata: {
        mutualConnections: 3,
        relevanceScore: 92
      }
    },
    {
      id: '2',
      type: 'group',
      title: 'SF Photography Meetup',
      description: 'Weekly photography walks and workshops',
      imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100',
      confidence: 88,
      reason: 'Based on your recent photography challenge participation',
      actionUrl: '/groups/sf-photography',
      metadata: {
        popularity: 156,
        relevanceScore: 88
      }
    },
    {
      id: '3',
      type: 'challenge',
      title: '30-Day Mindfulness Challenge',
      description: 'Daily meditation and mindfulness practices',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100',
      confidence: 85,
      reason: 'Trending among your network and matches your wellness interests',
      actionUrl: '/challenges/mindfulness-30',
      metadata: {
        trendingScore: 95,
        popularity: 234
      }
    },
    {
      id: '4',
      type: 'experience',
      title: 'Urban Sketching Workshop',
      description: 'Learn to capture city life through art',
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100',
      confidence: 82,
      reason: 'Combines your art and photography interests',
      actionUrl: '/experiences/urban-sketching',
      metadata: {
        relevanceScore: 82,
        popularity: 89
      }
    },
  ];

  const mockEngagementInsights: EngagementInsight[] = [
    {
      id: '1',
      type: 'posting_time',
      title: 'Optimal Posting Times',
      description: 'Your audience is most active during specific hours',
      recommendation: 'Post between 7-9 AM and 6-8 PM for 40% higher engagement',
      impact: 'high',
      data: {
        current: 15,
        suggested: 21,
        improvement: 40,
        timeframe: 'average engagement rate (%)'
      },
      chartData: {
        labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
        values: [12, 25, 18, 15, 28, 20]
      }
    },
    {
      id: '2',
      type: 'content_type',
      title: 'Content Performance',
      description: 'Video content performs 3x better than photos',
      recommendation: 'Increase video content to 40% of your posts',
      impact: 'high',
      data: {
        current: 15,
        suggested: 40,
        improvement: 180,
        timeframe: 'video content percentage'
      }
    },
    {
      id: '3',
      type: 'hashtags',
      title: 'Hashtag Strategy',
      description: 'Optimal hashtag count and trending tags',
      recommendation: 'Use 5-7 hashtags with mix of popular and niche tags',
      impact: 'medium',
      data: {
        current: 3,
        suggested: 6,
        improvement: 25,
        timeframe: 'average hashtags per post'
      }
    },
    {
      id: '4',
      type: 'audience_growth',
      title: 'Follower Growth',
      description: 'Your growth rate has increased 15% this month',
      recommendation: 'Maintain consistent posting schedule to sustain growth',
      impact: 'medium',
      data: {
        current: 15,
        improvement: 15,
        timeframe: 'monthly growth rate (%)'
      }
    },
  ];

  const mockSentimentData: SentimentAnalysis = {
    id: '1',
    period: 'Last 30 days',
    overallSentiment: 'positive',
    sentimentScore: 72,
    topics: [
      {
        name: 'Photography',
        sentiment: 'positive',
        mentions: 45,
        trend: 'up'
      },
      {
        name: 'Challenges',
        sentiment: 'positive',
        mentions: 32,
        trend: 'stable'
      },
      {
        name: 'Community',
        sentiment: 'positive',
        mentions: 28,
        trend: 'up'
      },
      {
        name: 'Learning',
        sentiment: 'neutral',
        mentions: 19,
        trend: 'down'
      },
    ],
    insights: [
      'Photography content generates the most positive engagement',
      'Community interactions show strong positive sentiment',
      'Challenge-related posts have consistent positive feedback',
      'Educational content could benefit from more engaging presentation'
    ],
    recommendations: [
      'Continue focusing on photography content',
      'Increase community engagement initiatives',
      'Create more interactive challenge content',
      'Add storytelling elements to educational posts'
    ]
  };

  const mockStoryComposers: StoryComposer[] = [
    {
      id: '1',
      experienceId: 'exp1',
      title: 'Photography Workshop Recap',
      generatedContent: {
        caption: 'Just wrapped up an incredible photography workshop! 📸 The golden hour techniques we learned completely transformed how I see light and composition. Grateful for the amazing community of fellow photographers who shared their insights and creativity. Can\'t wait to apply these new skills on my next adventure! ✨',
        hashtags: ['#photography', '#workshop', '#goldenhour', '#learning', '#community', '#creativity', '#grateful'],
        suggestedMedia: [
          {
            type: 'photo',
            description: 'Before/after comparison of your photos',
            prompt: 'Show your progress from the beginning to end of the workshop'
          },
          {
            type: 'video',
            description: 'Behind-the-scenes workshop moments',
            prompt: 'Capture candid moments of learning and interaction'
          }
        ],
        tone: 'inspiring',
        targetAudience: 'Photography enthusiasts and learners'
      },
      userInputs: {
        mood: 'accomplished',
        highlights: ['Golden hour techniques', 'Community connections', 'New perspectives'],
        challenges: ['Technical complexity', 'Weather conditions'],
        learnings: ['Light composition', 'Camera settings', 'Storytelling through images'],
        location: 'Golden Gate Park'
      },
      status: 'generated',
      createdAt: '2024-01-15T18:30:00Z'
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setEngagementInsights(mockEngagementInsights);
      setSentimentData(mockSentimentData);
      setStoryComposers(mockStoryComposers);
      setLoading(false);
    }, 1000);
  }, []);

  const generateStoryComposer = async () => {
    setGeneratingStory(true);
    
    // Simulate AI story generation
    setTimeout(() => {
      const newStory: StoryComposer = {
        id: Date.now().toString(),
        title: newComposer.title || 'New Experience Story',
        generatedContent: {
          caption: 'What an amazing experience! The journey was filled with unexpected discoveries and meaningful connections. Every moment taught me something new about myself and the world around me. Grateful for this opportunity to grow and explore! 🌟',
          hashtags: ['#experience', '#growth', '#discovery', '#grateful', '#journey', '#learning'],
          suggestedMedia: [
            {
              type: 'photo',
              description: 'Key moments from your experience',
              prompt: 'Capture the highlights and memorable scenes'
            },
            {
              type: 'video',
              description: 'Personal reflection video',
              prompt: 'Share your thoughts and feelings about the experience'
            }
          ],
          tone: 'inspiring',
          targetAudience: 'Experience seekers and personal growth enthusiasts'
        },
        userInputs: newComposer.userInputs || {
          mood: 'accomplished',
          highlights: [],
          challenges: [],
          learnings: []
        },
        status: 'generated',
        createdAt: new Date().toISOString()
      };
      
      setStoryComposers(prev => [newStory, ...prev]);
      setNewComposer({});
      setShowComposerModal(false);
      setGeneratingStory(false);
    }, 3000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <FaceSmileIcon className="h-4 w-4" />;
      case 'negative': return <FaceFrownIcon className="h-4 w-4" />;
      case 'neutral': return <ExclamationTriangleIcon className="h-4 w-4" />;
      default: return <ExclamationTriangleIcon className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />;
      case 'down': return <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" />;
      case 'stable': return <span className="h-4 w-4 text-gray-600">—</span>;
      default: return <span className="h-4 w-4 text-gray-600">—</span>;
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

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mb-2" />
          <div className="h-4 bg-gray-300 rounded w-96" />
        </div>
        
        {/* Tabs Skeleton */}
        <div className="flex space-x-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-300 rounded w-32 animate-pulse" />
          ))}
        </div>
        
        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-300 rounded w-full mb-2" />
              <div className="h-4 bg-gray-300 rounded w-2/3" />
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
            <SparklesIcon className="h-8 w-8 text-purple-600" />
            <span>AI Social Intelligence</span>
          </h1>
          <p className="text-gray-600">
            Leverage AI to enhance your social presence and discover meaningful connections.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'recommendations', label: 'Smart Recommendations', icon: UserGroupIcon },
            { id: 'engagement', label: 'Engagement Coach', icon: ArrowTrendingUpIcon },
            { id: 'sentiment', label: 'Sentiment Analysis', icon: ChartBarIcon },
            { id: 'composer', label: 'Story Composer', icon: DocumentTextIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  currentTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {currentTab === 'recommendations' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Smart Recommendations</h2>
            <span className="text-sm text-gray-600">Based on your social graph and activity</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3 mb-4">
                  {rec.imageUrl && (
                    <Image
                      src={rec.imageUrl}
                      alt={rec.title}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(rec.confidence)}`}>
                        {rec.confidence}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <p className="text-xs text-gray-500">{rec.reason}</p>
                  </div>
                </div>
                
                {rec.metadata && (
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                    {rec.metadata.mutualConnections && (
                      <span>{rec.metadata.mutualConnections} mutual connections</span>
                    )}
                    {rec.metadata.popularity && (
                      <span>{rec.metadata.popularity} members</span>
                    )}
                    {rec.metadata.trendingScore && (
                      <span className="flex items-center space-x-1">
                        <ArrowTrendingUpIcon className="h-3 w-3" />
                        <span>Trending</span>
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <button className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                    {rec.type === 'friend' ? 'Connect' : 
                     rec.type === 'group' ? 'Join' : 
                     rec.type === 'challenge' ? 'Join Challenge' : 
                     'Book Experience'}
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'engagement' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Engagement Coach</h2>
            <span className="text-sm text-gray-600">AI-powered insights to boost your reach</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {engagementInsights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                    {insight.impact} impact
                  </span>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <LightBulbIcon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Recommendation</span>
                  </div>
                  <p className="text-sm text-blue-700">{insight.recommendation}</p>
                </div>
                
                {insight.data && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium">{insight.data.current}%</span>
                    </div>
                    {insight.data.suggested && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Suggested:</span>
                        <span className="font-medium text-green-600">{insight.data.suggested}%</span>
                      </div>
                    )}
                    {insight.data.improvement && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Potential improvement:</span>
                        <span className="font-medium text-green-600">+{insight.data.improvement}%</span>
                      </div>
                    )}
                  </div>
                )}
                
                {insight.chartData && (
                  <div className="mt-4">
                    <div className="text-xs text-gray-500 mb-2">Engagement by time of day</div>
                    <div className="flex items-end space-x-1 h-20">
                      {insight.chartData.values.map((value, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="bg-primary-600 rounded-t w-full"
                            style={{ height: `${(value / Math.max(...(insight.chartData?.values || []))) * 100}%` }}
                          />
                          <span className="text-xs text-gray-500 mt-1">
                            {insight.chartData?.labels[index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'sentiment' && sentimentData && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Sentiment Analysis</h2>
            <span className="text-sm text-gray-600">{sentimentData.period}</span>
          </div>
          
          {/* Overall Sentiment */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Overall Community Sentiment</h3>
              <div className={`flex items-center space-x-2 ${getSentimentColor(sentimentData.overallSentiment)}`}>
                {getSentimentIcon(sentimentData.overallSentiment)}
                <span className="font-medium capitalize">{sentimentData.overallSentiment}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Sentiment Score</span>
                  <span className="text-sm font-medium">{sentimentData.sentimentScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      sentimentData.sentimentScore >= 60 ? 'bg-green-500' :
                      sentimentData.sentimentScore >= 30 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.abs(sentimentData.sentimentScore)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Topic Analysis */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Sentiment Breakdown</h3>
            <div className="space-y-4">
              {sentimentData.topics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{topic.name}</span>
                    <div className={`flex items-center space-x-1 ${getSentimentColor(topic.sentiment)}`}>
                      {getSentimentIcon(topic.sentiment)}
                      <span className="text-sm capitalize">{topic.sentiment}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{topic.mentions} mentions</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(topic.trend)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Insights & Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
              <ul className="space-y-2">
                {sentimentData.insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <ul className="space-y-2">
                {sentimentData.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <LightBulbIcon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {currentTab === 'composer' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">AI Story Composer</h2>
            <button 
              onClick={() => setShowComposerModal(true)}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Create Story</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {storyComposers.map((composer) => (
              <div key={composer.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{composer.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      composer.status === 'published' ? 'bg-green-100 text-green-800' :
                      composer.status === 'generated' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {composer.status}
                    </span>
                  </div>
                  
                  {/* Generated Caption */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <SparklesIcon className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">AI-Generated Caption</span>
                    </div>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                      {composer.generatedContent.caption}
                    </p>
                  </div>
                  
                  {/* Hashtags */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <HashtagIcon className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Suggested Hashtags</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {composer.generatedContent.hashtags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Media Suggestions */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CameraIcon className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Media Suggestions</span>
                    </div>
                    <div className="space-y-2">
                      {composer.generatedContent.suggestedMedia.map((media, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            {media.type === 'photo' ? <PhotoIcon className="h-4 w-4" /> :
                             media.type === 'video' ? <VideoCameraIcon className="h-4 w-4" /> :
                             <MicrophoneIcon className="h-4 w-4" />}
                            <span className="text-sm font-medium capitalize">{media.type}</span>
                          </div>
                          <p className="text-xs text-gray-600">{media.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* User Inputs */}
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">Based on your inputs:</span>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Mood: <span className="font-medium">{composer.userInputs.mood}</span></div>
                      <div>Highlights: <span className="font-medium">{composer.userInputs.highlights.join(', ')}</span></div>
                      {composer.userInputs.location && (
                        <div>Location: <span className="font-medium">{composer.userInputs.location}</span></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                      Use This Story
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Edit
                    </button>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    Generated {formatTimeAgo(composer.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Story Composer Modal */}
      {showComposerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create AI Story</h2>
                <button 
                  onClick={() => setShowComposerModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Story Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Story Title</label>
                <input
                  type="text"
                  value={newComposer.title || ''}
                  onChange={(e) => setNewComposer(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a title for your story..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              {/* User Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mood</label>
                  <select
                    value={newComposer.userInputs?.mood || ''}
                    onChange={(e) => setNewComposer(prev => ({
                      ...prev,
                      userInputs: { 
                        mood: e.target.value,
                        highlights: prev.userInputs?.highlights || [],
                        challenges: prev.userInputs?.challenges || [],
                        learnings: prev.userInputs?.learnings || [],
                        location: prev.userInputs?.location
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select mood...</option>
                    <option value="excited">Excited</option>
                    <option value="accomplished">Accomplished</option>
                    <option value="reflective">Reflective</option>
                    <option value="grateful">Grateful</option>
                    <option value="inspired">Inspired</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newComposer.userInputs?.location || ''}
                    onChange={(e) => setNewComposer(prev => ({
                      ...prev,
                      userInputs: { 
                        mood: prev.userInputs?.mood || '',
                        highlights: prev.userInputs?.highlights || [],
                        challenges: prev.userInputs?.challenges || [],
                        learnings: prev.userInputs?.learnings || [],
                        location: e.target.value
                      }
                    }))}
                    placeholder="Where did this happen?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Highlights</label>
                <textarea
                  value={newComposer.userInputs?.highlights?.join(', ') || ''}
                  onChange={(e) => setNewComposer(prev => ({
                    ...prev,
                    userInputs: { 
                      mood: prev.userInputs?.mood || '',
                      highlights: e.target.value.split(',').map(h => h.trim()).filter(h => h),
                      challenges: prev.userInputs?.challenges || [],
                      learnings: prev.userInputs?.learnings || [],
                      location: prev.userInputs?.location
                    }
                  }))}
                  placeholder="What were the best moments? (separate with commas)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Learnings</label>
                <textarea
                  value={newComposer.userInputs?.learnings?.join(', ') || ''}
                  onChange={(e) => setNewComposer(prev => ({
                    ...prev,
                    userInputs: { 
                      mood: prev.userInputs?.mood || '',
                      highlights: prev.userInputs?.highlights || [],
                      challenges: prev.userInputs?.challenges || [],
                      learnings: e.target.value.split(',').map(l => l.trim()).filter(l => l),
                      location: prev.userInputs?.location
                    }
                   }))}
                    placeholder="What did you learn or discover? (separate with commas)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              {/* Generate Button */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={generateStoryComposer}
                  disabled={generatingStory || !newComposer.title}
                  className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {generatingStory ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span>Generating Story...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-5 w-5" />
                      <span>Generate AI Story</span>
                    </>
                  )}
                </button>
                <button 
                  onClick={() => setShowComposerModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}