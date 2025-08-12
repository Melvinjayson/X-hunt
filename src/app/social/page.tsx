'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  PhotoIcon,
  BookOpenIcon,
  SparklesIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { SocialFeed } from '@/components/social/SocialFeed';
// import SocialProfile from '@/components/social/SocialProfile';
import { CommunitySpaces } from '@/components/social/CommunitySpaces';
import { Messaging } from '@/components/social/Messaging';
import { GroupChallenges } from '@/components/social/GroupChallenges';
import { UserGeneratedContent } from '@/components/social/UserGeneratedContent';
import { StorytellingMode } from '@/components/social/StorytellingMode';
import { AISocialEnhancements } from '@/components/social/AISocialEnhancements';

type SocialTab = 'feed' | 'profile' | 'communities' | 'messages' | 'challenges' | 'content' | 'stories' | 'ai';

export default function SocialPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<SocialTab>('feed');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const navigationItems = [
    {
      id: 'feed' as SocialTab,
      name: 'Social Feed',
      icon: HomeIcon,
      description: 'Activity stream and updates'
    },
    {
      id: 'profile' as SocialTab,
      name: 'My Profile',
      icon: UserGroupIcon,
      description: 'Your social profile and connections'
    },
    {
      id: 'communities' as SocialTab,
      name: 'Communities',
      icon: UserGroupIcon,
      description: 'Join themed discussion boards'
    },
    {
      id: 'messages' as SocialTab,
      name: 'Messages',
      icon: ChatBubbleLeftRightIcon,
      description: 'Direct messages and group chats'
    },
    {
      id: 'challenges' as SocialTab,
      name: 'Group Challenges',
      icon: TrophyIcon,
      description: 'Public and private challenges'
    },
    {
      id: 'content' as SocialTab,
      name: 'User Content',
      icon: PhotoIcon,
      description: 'Photos and videos from experiences'
    },
    {
      id: 'stories' as SocialTab,
      name: 'Stories',
      icon: BookOpenIcon,
      description: 'Multi-day challenge journals'
    },
    {
      id: 'ai' as SocialTab,
      name: 'AI Assistant',
      icon: SparklesIcon,
      description: 'AI-powered social enhancements'
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return <SocialFeed userId={session?.user?.id || ''} />;
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile</h2>
            <p className="text-gray-600">Profile feature coming soon...</p>
          </div>
        );
      case 'communities':
        return <CommunitySpaces />;
      case 'messages':
        return <Messaging userId={session?.user?.id || ''} />;
      case 'challenges':
          return <GroupChallenges userId={session?.user?.id || ''} />;
        case 'content':
          return <UserGeneratedContent userId={session?.user?.id || ''} />;
      case 'stories':
        return <StorytellingMode userId={session?.user?.id || ''} />;
      case 'ai':
        return <AISocialEnhancements userId={session?.user?.id || ''} />;
      default:
        return <SocialFeed userId={session?.user?.id || ''} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">X-Hunt Social</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-600 hover:text-gray-900">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-gray-900 relative">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-danger-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:shadow-none border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none`}>
          {/* Sidebar header */}
          <div className="hidden lg:block px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="h-5 w-5 text-white" />
            </div>
              <h1 className="text-xl font-bold text-gray-900">X-Hunt Social</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-700 hover:bg-secondary-50'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* User info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {session?.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {session?.user?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {session?.user?.email}
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Cog6ToothIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          {/* Desktop header */}
          <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {navigationItems.find(item => item.id === activeTab)?.name}
                </h2>
                <p className="text-gray-600">
                  {navigationItems.find(item => item.id === activeTab)?.description}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-900">
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
                <button className="text-gray-600 hover:text-gray-900 relative">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-danger-500 rounded-full" />
                </button>
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab content */}
          <div className="p-4 lg:p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}