'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  FireIcon, 
  TrophyIcon, 
  ClockIcon, 
  UserGroupIcon, 
  MapPinIcon,
  CheckCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

// Mock challenge data
const mockChallenge = {
  id: 1,
  title: 'Urban Art Explorer',
  description: 'Complete 5 street art experiences in different neighborhoods to earn the Urban Explorer Badge and unlock exclusive street art tours.',
  longDescription: 'Dive deep into the vibrant world of street art across the city. This challenge will take you through 5 different neighborhoods, each with its own unique artistic style and cultural significance. You\'ll discover hidden murals, learn about local artists, and understand the stories behind the art.',
  difficulty: 'Medium',
  participants: 342,
  timeLimit: '30 days',
  reward: {
    name: 'Urban Explorer Badge',
    xp: 500,
    imageSrc: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    description: 'Exclusive NFT badge showcasing your street art expertise'
  },
  progress: 2,
  total: 5,
  imageSrc: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
  locations: ['Mission District', 'Castro', 'Haight-Ashbury', 'SOMA', 'Chinatown'],
  requirements: [
    'Complete at least 5 street art experiences',
    'Visit 3 different neighborhoods',
    'Leave a review for each experience',
    'Share photos on social media with #XHuntArt'
  ],
  experiences: [
    {
      id: 1,
      title: 'Mission Murals Walking Tour',
      location: 'Mission District',
      duration: '2 hours',
      price: 25,
      rating: 4.8,
      completed: true,
      imageSrc: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400'
    },
    {
      id: 2,
      title: 'Castro Street Art & History',
      location: 'Castro',
      duration: '1.5 hours',
      price: 20,
      rating: 4.7,
      completed: true,
      imageSrc: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    },
    {
      id: 3,
      title: 'Haight Hippie Art Trail',
      location: 'Haight-Ashbury',
      duration: '2.5 hours',
      price: 30,
      rating: 4.9,
      completed: false,
      imageSrc: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400'
    },
    {
      id: 4,
      title: 'SOMA Contemporary Walls',
      location: 'SOMA',
      duration: '2 hours',
      price: 28,
      rating: 4.6,
      completed: false,
      imageSrc: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    },
    {
      id: 5,
      title: 'Chinatown Cultural Murals',
      location: 'Chinatown',
      duration: '1.5 hours',
      price: 22,
      rating: 4.8,
      completed: false,
      imageSrc: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400'
    }
  ],
  tips: [
    'Bring comfortable walking shoes',
    'Download the X-Hunt app for AR features',
    'Best lighting for photos is during golden hour',
    'Respect the art and local communities'
  ]
};

export default function ChallengeDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  const completedExperiences = mockChallenge.experiences.filter(exp => exp.completed).length;
  const progressPercentage = (completedExperiences / mockChallenge.total) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="relative h-64 sm:h-80">
            <Image
              src={mockChallenge.imageSrc}
              alt={mockChallenge.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  mockChallenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  mockChallenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {mockChallenge.difficulty}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white">
                  <ClockIcon className="mr-1 h-3 w-3" />
                  {mockChallenge.timeLimit}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {mockChallenge.title}
              </h1>
              <p className="mt-2 text-sm text-gray-200">
                {mockChallenge.description}
              </p>
            </div>
          </div>
        </div>

        {/* Progress and Stats */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Progress Card */}
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
                <span className="text-sm font-medium text-primary-600">
                  {completedExperiences}/{mockChallenge.total} completed
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <UserGroupIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{mockChallenge.participants} participants</span>
                </div>
                <div className="flex items-center">
                  <TrophyIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{mockChallenge.reward.xp} XP reward</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'overview', name: 'Overview' },
                    { id: 'experiences', name: 'Experiences' },
                    { id: 'requirements', name: 'Requirements' },
                    { id: 'tips', name: 'Tips' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-6">
                {activeTab === 'overview' && (
                  <div className="bg-white rounded-lg p-6 shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Challenge</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {mockChallenge.longDescription}
                    </p>
                    
                    <div className="mt-6">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Locations</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockChallenge.locations.map((location, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                          >
                            <MapPinIcon className="mr-1 h-3 w-3" />
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'experiences' && (
                  <div className="space-y-4">
                    {mockChallenge.experiences.map((experience) => (
                      <div key={experience.id} className="bg-white rounded-lg p-6 shadow">
                        <div className="flex items-start gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={experience.imageSrc}
                              alt={experience.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-lg font-medium text-gray-900">
                                  {experience.title}
                                </h4>
                                <p className="text-sm text-gray-600">{experience.location}</p>
                                <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                                  <span>{experience.duration}</span>
                                  <span>${experience.price}</span>
                                  <span>★ {experience.rating}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {experience.completed ? (
                                  <div className="flex items-center text-green-600">
                                    <CheckCircleIcon className="h-5 w-5 mr-1" />
                                    <span className="text-sm font-medium">Completed</span>
                                  </div>
                                ) : (
                                  <Link
                                    href={`/experience/${experience.id}`}
                                    className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                                  >
                                    <PlayIcon className="h-4 w-4 mr-1" />
                                    Start
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div className="bg-white rounded-lg p-6 shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                    <ul className="space-y-3">
                      {mockChallenge.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'tips' && (
                  <div className="bg-white rounded-lg p-6 shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pro Tips</h3>
                    <ul className="space-y-3">
                      {mockChallenge.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-2 w-2 bg-primary-600 rounded-full mr-3 mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reward Card */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reward</h3>
              <div className="text-center">
                <div className="relative mx-auto h-24 w-24 mb-4">
                  <Image
                    src={mockChallenge.reward.imageSrc}
                    alt={mockChallenge.reward.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h4 className="font-medium text-gray-900">{mockChallenge.reward.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{mockChallenge.reward.description}</p>
                <div className="mt-3 flex items-center justify-center">
                  <FireIcon className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm font-medium text-gray-900">{mockChallenge.reward.xp} XP</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="bg-white rounded-lg p-6 shadow">
              {progressPercentage === 100 ? (
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700">
                  Claim Reward
                </button>
              ) : (
                <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700">
                  Continue Challenge
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}