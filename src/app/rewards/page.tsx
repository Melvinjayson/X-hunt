'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { Tab } from '@headlessui/react'; // Temporarily disabled due to compatibility issues
import { 
  GiftIcon, 
  TicketIcon, 
  CurrencyDollarIcon,
  ArrowPathIcon,
  ChevronRightIcon,
  StarIcon,
  TrophyIcon,
  QrCodeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function RewardsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  // Mock data for rewards
  const rewardsData = {
    userStats: {
      totalPoints: 1250,
      availablePoints: 850,
      redeemedPoints: 400,
      level: 'Gold',
      nextLevelPoints: 1500
    },
    activeRewards: [
      {
        id: 'r1',
        title: '20% Off Next Experience',
        image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        type: 'discount',
        value: '20%',
        expiryDate: '2023-12-31',
        status: 'active',
        code: 'XHUNT20',
        description: 'Get 20% off your next experience booking. Valid for any experience on the platform.',
      },
      {
        id: 'r2',
        title: 'Free Urban Photography Workshop',
        image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        type: 'experience',
        value: 'Free',
        expiryDate: '2023-11-30',
        status: 'active',
        code: 'PHOTOWORK',
        description: 'Enjoy a free 2-hour urban photography workshop with professional photographer Alex Chen.',
      },
      {
        id: 'r3',
        title: '$15 Credit',
        image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        type: 'credit',
        value: '$15',
        expiryDate: '2023-10-15',
        status: 'expired',
        code: 'CREDIT15',
        description: 'Get $15 credit to use towards any experience booking on the platform.',
      },
    ],
    availableRewards: [
      {
        id: 'ar1',
        title: 'VIP Access to Secret Beach Party',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        type: 'exclusive',
        pointsCost: 200,
        description: 'Get VIP access to our exclusive beach party event with live music, food, and drinks included.',
        availability: 'Limited (10 remaining)',
        validUntil: '2023-12-31',
      },
      {
        id: 'ar2',
        title: '50% Off Adventure Experiences',
        image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        type: 'discount',
        pointsCost: 100,
        description: 'Get 50% off any adventure category experience. Perfect for thrill-seekers!',
        availability: 'Unlimited',
        validUntil: '2023-11-30',
      },
      {
        id: 'ar3',
        title: '$25 Experience Credit',
        image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        type: 'credit',
        pointsCost: 125,
        description: 'Get $25 credit to use towards any experience booking on the platform.',
        availability: 'Unlimited',
        validUntil: '2023-12-15',
      },
      {
        id: 'ar4',
        title: 'Early Access to New Experiences',
        image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        type: 'exclusive',
        pointsCost: 150,
        description: 'Get 1-week early access to all new experiences before they are available to the general public.',
        availability: 'Unlimited',
        validUntil: '2023-12-31',
      },
      {
        id: 'ar5',
        title: 'Limited Edition X-Hunt Merchandise',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        type: 'merchandise',
        pointsCost: 300,
        description: 'Exclusive X-Hunt branded t-shirt, water bottle, and tote bag. Show off your X-Hunt pride!',
        availability: 'Limited (25 remaining)',
        validUntil: '2023-12-31',
      },
      {
        id: 'ar6',
        title: 'Free Companion Ticket',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        type: 'ticket',
        pointsCost: 175,
        description: 'Bring a friend for free on your next experience booking. Valid for experiences up to $50 value.',
        availability: 'Limited (15 remaining)',
        validUntil: '2023-11-15',
      },
    ],
    recentActivity: [
      {
        id: 'act1',
        type: 'earned',
        points: 50,
        description: 'Completed Urban Street Art Tour',
        date: '2023-10-18',
      },
      {
        id: 'act2',
        type: 'redeemed',
        points: 100,
        description: 'Redeemed 50% Off Adventure Experiences',
        date: '2023-10-15',
      },
      {
        id: 'act3',
        type: 'earned',
        points: 25,
        description: 'Shared experience on social media',
        date: '2023-10-12',
      },
      {
        id: 'act4',
        type: 'earned',
        points: 75,
        description: 'Completed Street Food Challenge',
        date: '2023-10-10',
      },
      {
        id: 'act5',
        type: 'earned',
        points: 30,
        description: 'Left a review for Hidden Waterfall Hike',
        date: '2023-10-05',
      },
    ]
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Active
        </span>
      );
    } else if (status === 'expired') {
      return (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
          Expired
        </span>
      );
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return <CurrencyDollarIcon className="h-5 w-5" />;
      case 'credit':
        return <GiftIcon className="h-5 w-5" />;
      case 'experience':
        return <TicketIcon className="h-5 w-5" />;
      case 'exclusive':
        return <StarIcon className="h-5 w-5" />;
      case 'merchandise':
        return <TrophyIcon className="h-5 w-5" />;
      case 'ticket':
        return <UserGroupIcon className="h-5 w-5" />;
      default:
        return <GiftIcon className="h-5 w-5" />;
    }
  };

  const handleRedeemReward = (rewardId: string) => {
    console.log('Redeeming reward:', rewardId);
    // Handle reward redemption logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Rewards</h1>
              <p className="mt-2 text-sm text-gray-600">
                Earn points by completing experiences and redeem them for exclusive rewards
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50"
            >
              <ArrowPathIcon className={`-ml-0.5 mr-1.5 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrophyIcon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-gray-900">{rewardsData.userStats.totalPoints}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GiftIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Points</p>
                <p className="text-2xl font-bold text-gray-900">{rewardsData.userStats.availablePoints}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Redeemed Points</p>
                <p className="text-2xl font-bold text-gray-900">{rewardsData.userStats.redeemedPoints}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <StarIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Level</p>
                <p className="text-2xl font-bold text-gray-900">{rewardsData.userStats.level}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900">Progress to Next Level</h3>
            <span className="text-sm text-gray-600">
              {rewardsData.userStats.totalPoints} / {rewardsData.userStats.nextLevelPoints} points
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: '65%' }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {rewardsData.userStats.nextLevelPoints - rewardsData.userStats.totalPoints} points until Platinum level
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div>
            <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              <button
                onClick={() => setSelectedTab(0)}
                className={classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
                  selectedTab === 0
                    ? 'bg-primary-600 text-white shadow'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                My Rewards
              </button>
              <button
                onClick={() => setSelectedTab(1)}
                className={classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
                  selectedTab === 1
                    ? 'bg-primary-600 text-white shadow'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                Available Rewards
              </button>
              <button
                onClick={() => setSelectedTab(2)}
                className={classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
                  selectedTab === 2
                    ? 'bg-primary-600 text-white shadow'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                Activity
              </button>
            </div>
            
            <div className="mt-6">
              {/* My Rewards Panel */}
              {selectedTab === 0 && (
                <div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rewardsData.activeRewards.map((reward) => (
                    <div key={reward.id} className="card overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={reward.image}
                          alt={reward.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          {getStatusBadge(reward.status)}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-2">
                          <div className="flex-shrink-0 mr-2 text-primary-600">
                            {getRewardIcon(reward.type)}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{reward.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary-600">{reward.value}</span>
                          {reward.status === 'active' ? (
                            <button className="btn-primary text-sm">
                              Use Reward
                            </button>
                          ) : null}
                        </div>
                        {reward.status === 'active' && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">Code:</span>
                              <span className="text-sm font-mono text-gray-900">{reward.code}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-sm font-medium text-gray-700">Expires:</span>
                              <span className="text-sm text-gray-900">{reward.expiryDate}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                 </div>
               )}
 
               {/* Available Rewards Panel */}
              {selectedTab === 1 && (
                <div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rewardsData.availableRewards.map((reward) => (
                    <div key={reward.id} className="card overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={reward.image}
                          alt={reward.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-600/20">
                            {reward.pointsCost} points
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-2">
                          <div className="flex-shrink-0 mr-2 text-primary-600">
                            {getRewardIcon(reward.type)}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{reward.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Availability:</span>
                            <span className="text-gray-900">{reward.availability}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Valid Until:</span>
                            <span className="text-gray-900">{reward.validUntil}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRedeemReward(reward.id)}
                          disabled={rewardsData.userStats.availablePoints < reward.pointsCost}
                          className={`w-full rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm ${rewardsData.userStats.availablePoints >= reward.pointsCost ? 'bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                          {rewardsData.userStats.availablePoints >= reward.pointsCost ? 'Redeem Reward' : 'Not Enough Points'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                 </div>
               )}
 
               {/* Activity Panel */}
              {selectedTab === 2 && (
                <div>
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {rewardsData.recentActivity.map((activity, activityIdx) => (
                        <li key={activity.id}>
                          <div className="relative pb-8">
                            {activityIdx !== rewardsData.recentActivity.length - 1 ? (
                              <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div className={`flex h-6 w-6 flex-none items-center justify-center rounded-full ${activity.type === 'earned' ? 'bg-green-100' : 'bg-red-100'}`}>
                                {activity.type === 'earned' ? (
                                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                                ) : (
                                  <ExclamationCircleIcon className="h-4 w-4 text-red-600" />
                                )}
                              </div>
                              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                <div>
                                  <p className="text-sm text-gray-900">{activity.description}</p>
                                </div>
                                <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                  <div className="flex items-center space-x-2">
                                    <div className={`flex items-center rounded-md px-2 py-1 text-xs font-medium ${activity.type === 'earned' ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'}`}>
                                      {activity.type === 'earned' ? '+' : '-'}{activity.points} points
                                    </div>
                                    <time dateTime={activity.date}>{activity.date}</time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Custom icon components for missing icons
function UserGroupIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function ShareIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  );
}

function CalendarIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
    </svg>
  );
}