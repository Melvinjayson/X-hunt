'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { 
  UserCircleIcon,
  KeyIcon,
  CreditCardIcon,
  BellIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Mock user data
  const [userData, setUserData] = useState({
    profile: {
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@example.com',
      phone: '+1 (555) 123-4567',
      bio: 'Adventure enthusiast and foodie. Always looking for new experiences!',
      location: 'San Francisco, CA',
      website: 'https://alexjohnson.com',
      profileVisibility: 'public',
    },
    preferences: {
      language: 'english',
      currency: 'usd',
      distanceUnit: 'miles',
      theme: 'light',
      emailDigest: 'weekly',
    },
    privacy: {
      showProfileToPublic: true,
      showActivityFeed: true,
      allowFriendRequests: true,
      showCompletedExperiences: true,
      showRewards: true,
      allowLocationTracking: false,
      allowDataCollection: true,
    },
    payment: {
      defaultPaymentMethod: 'visa',
      savedCards: [
        {
          id: 'card1',
          type: 'visa',
          last4: '4242',
          expiry: '04/25',
          isDefault: true,
        },
        {
          id: 'card2',
          type: 'mastercard',
          last4: '5678',
          expiry: '08/24',
          isDefault: false,
        },
      ],
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: '2023-08-15',
      loginNotifications: true,
      recentLogins: [
        {
          device: 'iPhone 13',
          location: 'San Francisco, CA',
          ip: '192.168.1.1',
          time: '2023-10-18T14:32:00',
        },
        {
          device: 'MacBook Pro',
          location: 'San Francisco, CA',
          ip: '192.168.1.2',
          time: '2023-10-17T09:15:00',
        },
        {
          device: 'Chrome on Windows',
          location: 'Los Angeles, CA',
          ip: '192.168.2.1',
          time: '2023-10-15T16:45:00',
        },
      ],
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Settings updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  // Toggle privacy setting
  const togglePrivacySetting = (setting: string) => {
    setUserData({
      ...userData,
      privacy: {
        ...userData.privacy,
        [setting]: !userData.privacy[setting as keyof typeof userData.privacy],
      },
    });
  };

  // Toggle two-factor authentication
  const toggleTwoFactor = () => {
    setUserData({
      ...userData,
      security: {
        ...userData.security,
        twoFactorEnabled: !userData.security.twoFactorEnabled,
      },
    });
  };

  // Format date to relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Set default payment method
  const setDefaultPaymentMethod = (cardId: string) => {
    setUserData({
      ...userData,
      payment: {
        ...userData.payment,
        savedCards: userData.payment.savedCards.map(card => ({
          ...card,
          isDefault: card.id === cardId,
        })),
      },
    });
  };

  // Delete payment method
  const deletePaymentMethod = (cardId: string) => {
    setUserData({
      ...userData,
      payment: {
        ...userData.payment,
        savedCards: userData.payment.savedCards.filter(card => card.id !== cardId),
      },
    });
  };

  // Handle input change for profile
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      profile: {
        ...userData.profile,
        [name]: value,
      },
    });
  };

  // Handle input change for preferences
  const handlePreferencesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      preferences: {
        ...userData.preferences,
        [name]: value,
      },
    });
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'preferences', name: 'Preferences', icon: GlobeAltIcon },
    { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon },
    { id: 'payment', name: 'Payment Methods', icon: CreditCardIcon },
    { id: 'security', name: 'Security', icon: KeyIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Account Settings
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Success and error messages */}
          {successMessage && (
            <div className="mb-4 rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{successMessage}</p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                      onClick={() => setSuccessMessage('')}
                    >
                      <span className="sr-only">Dismiss</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                      onClick={() => setErrorMessage('')}
                    >
                      <span className="sr-only">Dismiss</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={classNames(
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                      'group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                  >
                    <tab.icon
                      className={classNames(
                        activeTab === tab.id ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleSubmit}>
                    <div className="p-6">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Profile Information</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-500">Update your personal information and how others see you on the platform.</p>

                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              value={userData.profile.firstName}
                              onChange={handleProfileChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                            Last name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              value={userData.profile.lastName}
                              onChange={handleProfileChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={userData.profile.email}
                              onChange={handleProfileChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone number
                          </label>
                          <div className="mt-2">
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              value={userData.profile.phone}
                              onChange={handleProfileChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                            Location
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="location"
                              id="location"
                              value={userData.profile.location}
                              onChange={handleProfileChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                            Website
                          </label>
                          <div className="mt-2">
                            <input
                              type="url"
                              name="website"
                              id="website"
                              value={userData.profile.website}
                              onChange={handleProfileChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                            Bio
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="bio"
                              name="bio"
                              rows={3}
                              value={userData.profile.bio}
                              onChange={handleProfileChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="profileVisibility" className="block text-sm font-medium leading-6 text-gray-900">
                            Profile Visibility
                          </label>
                          <div className="mt-2">
                            <select
                              id="profileVisibility"
                              name="profileVisibility"
                              value={userData.profile.profileVisibility}
                              onChange={handleProfileChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            >
                              <option value="public">Public - Anyone can view your profile</option>
                              <option value="friends">Friends Only - Only friends can view your profile</option>
                              <option value="private">Private - Only you can view your profile</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end gap-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <ArrowPathIcon className="-ml-0.5 mr-1.5 h-5 w-5 animate-spin" aria-hidden="true" />
                              Saving...
                            </>
                          ) : (
                            'Save'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Preferences Settings */}
                {activeTab === 'preferences' && (
                  <form onSubmit={handleSubmit}>
                    <div className="p-6">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Preferences</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-500">Customize your experience on the platform.</p>

                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">
                            Language
                          </label>
                          <div className="mt-2">
                            <select
                              id="language"
                              name="language"
                              value={userData.preferences.language}
                              onChange={handlePreferencesChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            >
                              <option value="english">English</option>
                              <option value="spanish">Spanish</option>
                              <option value="french">French</option>
                              <option value="german">German</option>
                              <option value="japanese">Japanese</option>
                              <option value="chinese">Chinese</option>
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="currency" className="block text-sm font-medium leading-6 text-gray-900">
                            Currency
                          </label>
                          <div className="mt-2">
                            <select
                              id="currency"
                              name="currency"
                              value={userData.preferences.currency}
                              onChange={handlePreferencesChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            >
                              <option value="usd">USD ($)</option>
                              <option value="eur">EUR (€)</option>
                              <option value="gbp">GBP (£)</option>
                              <option value="jpy">JPY (¥)</option>
                              <option value="cad">CAD ($)</option>
                              <option value="aud">AUD ($)</option>
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="distanceUnit" className="block text-sm font-medium leading-6 text-gray-900">
                            Distance Unit
                          </label>
                          <div className="mt-2">
                            <select
                              id="distanceUnit"
                              name="distanceUnit"
                              value={userData.preferences.distanceUnit}
                              onChange={handlePreferencesChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            >
                              <option value="miles">Miles</option>
                              <option value="kilometers">Kilometers</option>
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="theme" className="block text-sm font-medium leading-6 text-gray-900">
                            Theme
                          </label>
                          <div className="mt-2">
                            <select
                              id="theme"
                              name="theme"
                              value={userData.preferences.theme}
                              onChange={handlePreferencesChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            >
                              <option value="light">Light</option>
                              <option value="dark">Dark</option>
                              <option value="system">System Default</option>
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="emailDigest" className="block text-sm font-medium leading-6 text-gray-900">
                            Email Digest Frequency
                          </label>
                          <div className="mt-2">
                            <select
                              id="emailDigest"
                              name="emailDigest"
                              value={userData.preferences.emailDigest}
                              onChange={handlePreferencesChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            >
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                              <option value="never">Never</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end gap-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <ArrowPathIcon className="-ml-0.5 mr-1.5 h-5 w-5 animate-spin" aria-hidden="true" />
                              Saving...
                            </>
                          ) : (
                            'Save'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <form onSubmit={handleSubmit}>
                    <div className="p-6">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Privacy Settings</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-500">Control your privacy and data sharing preferences.</p>

                      <div className="mt-6 space-y-6">
                        <Switch.Group as="div" className="flex items-center justify-between">
                          <Switch.Label as="span" className="flex flex-grow flex-col" passive>
                            <span className="text-sm font-medium leading-6 text-gray-900">Show profile to public</span>
                            <span className="text-sm text-gray-500">Allow others to view your profile information</span>
                          </Switch.Label>
                          <Switch
                            checked={userData.privacy.showProfileToPublic}
                            onChange={() => togglePrivacySetting('showProfileToPublic')}
                            className={classNames(
                              userData.privacy.showProfileToPublic ? 'bg-primary-600' : 'bg-gray-200',
                              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                userData.privacy.showProfileToPublic ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>

                        <Switch.Group as="div" className="flex items-center justify-between">
                          <Switch.Label as="span" className="flex flex-grow flex-col" passive>
                            <span className="text-sm font-medium leading-6 text-gray-900">Show activity feed</span>
                            <span className="text-sm text-gray-500">Allow others to see your recent activities</span>
                          </Switch.Label>
                          <Switch
                            checked={userData.privacy.showActivityFeed}
                            onChange={() => togglePrivacySetting('showActivityFeed')}
                            className={classNames(
                              userData.privacy.showActivityFeed ? 'bg-primary-600' : 'bg-gray-200',
                              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                userData.privacy.showActivityFeed ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>

                        <Switch.Group as="div" className="flex items-center justify-between">
                          <Switch.Label as="span" className="flex flex-grow flex-col" passive>
                            <span className="text-sm font-medium leading-6 text-gray-900">Allow friend requests</span>
                            <span className="text-sm text-gray-500">Allow other users to send you friend requests</span>
                          </Switch.Label>
                          <Switch
                            checked={userData.privacy.allowFriendRequests}
                            onChange={() => togglePrivacySetting('allowFriendRequests')}
                            className={classNames(
                              userData.privacy.allowFriendRequests ? 'bg-primary-600' : 'bg-gray-200',
                              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                userData.privacy.allowFriendRequests ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>

                        <Switch.Group as="div" className="flex items-center justify-between">
                          <Switch.Label as="span" className="flex flex-grow flex-col" passive>
                            <span className="text-sm font-medium leading-6 text-gray-900">Show completed experiences</span>
                            <span className="text-sm text-gray-500">Allow others to see experiences you've completed</span>
                          </Switch.Label>
                          <Switch
                            checked={userData.privacy.showCompletedExperiences}
                            onChange={() => togglePrivacySetting('showCompletedExperiences')}
                            className={classNames(
                              userData.privacy.showCompletedExperiences ? 'bg-primary-600' : 'bg-gray-200',
                              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                userData.privacy.showCompletedExperiences ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>

                        <Switch.Group as="div" className="flex items-center justify-between">
                          <Switch.Label as="span" className="flex flex-grow flex-col" passive>
                            <span className="text-sm font-medium leading-6 text-gray-900">Show rewards</span>
                            <span className="text-sm text-gray-500">Allow others to see rewards you've earned</span>
                          </Switch.Label>
                          <Switch
                            checked={userData.privacy.showRewards}
                            onChange={() => togglePrivacySetting('showRewards')}
                            className={classNames(
                              userData.privacy.showRewards ? 'bg-primary-600' : 'bg-gray-200',
                              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                userData.privacy.showRewards ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>

                        <Switch.Group as="div" className="flex items-center justify-between">
                          <Switch.Label as="span" className="flex flex-grow flex-col" passive>
                            <span className="text-sm font-medium leading-6 text-gray-900">Allow location tracking</span>
                            <span className="text-sm text-gray-500">Allow the app to track your location for better experience recommendations</span>
                          </Switch.Label>
                          <Switch
                            checked={userData.privacy.allowLocationTracking}
                            onChange={() => togglePrivacySetting('allowLocationTracking')}
                            className={classNames(
                              userData.privacy.allowLocationTracking ? 'bg-primary-600' : 'bg-gray-200',
                              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                userData.privacy.allowLocationTracking ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>

                        <Switch.Group as="div" className="flex items-center justify-between">
                          <Switch.Label as="span" className="flex flex-grow flex-col" passive>
                            <span className="text-sm font-medium leading-6 text-gray-900">Allow data collection</span>
                            <span className="text-sm text-gray-500">Allow us to collect usage data to improve your experience</span>
                          </Switch.Label>
                          <Switch
                            checked={userData.privacy.allowDataCollection}
                            onChange={() => togglePrivacySetting('allowDataCollection')}
                            className={classNames(
                              userData.privacy.allowDataCollection ? 'bg-primary-600' : 'bg-gray-200',
                              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                userData.privacy.allowDataCollection ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end gap-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <ArrowPathIcon className="-ml-0.5 mr-1.5 h-5 w-5 animate-spin" aria-hidden="true" />
                              Saving...
                            </>
                          ) : (
                            'Save'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Payment Methods */}
                {activeTab === 'payment' && (
                  <div className="p-6">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Payment Methods</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">Manage your payment methods and billing information.</p>

                    <div className="mt-6">
                      <div className="overflow-hidden rounded-md border border-gray-200">
                        <ul role="list" className="divide-y divide-gray-200">
                          {userData.payment.savedCards.map((card) => (
                            <li key={card.id} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                              <div className="flex w-0 flex-1 items-center">
                                {card.type === 'visa' ? (
                                  <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="4" fill="#2566AF" />
                                    <path d="M15.4 22.4H12.6L14.4 13.6H17.2L15.4 22.4Z" fill="white" />
                                    <path d="M24.4 13.8C23.8 13.6 22.8 13.4 21.6 13.4C19 13.4 17.2 14.6 17.2 16.4C17.2 17.8 18.6 18.4 19.6 18.8C20.6 19.2 21 19.4 21 19.8C21 20.4 20.2 20.6 19.4 20.6C18.4 20.6 17.8 20.4 16.8 20L16.4 19.8L16 22C16.6 22.2 17.8 22.4 19 22.4C21.8 22.4 23.6 21.2 23.6 19.2C23.6 18 22.8 17.2 21.2 16.6C20.2 16.2 19.6 16 19.6 15.6C19.6 15.2 20 14.8 21 14.8C21.8 14.8 22.4 15 22.8 15.2L23.2 15.4L23.6 13.2L24.4 13.8Z" fill="white" />
                                    <path d="M27.8 13.6H25.8C25.2 13.6 24.8 13.8 24.6 14.4L21.4 22.4H24.2C24.2 22.4 24.6 21.2 24.6 21C24.8 21 27 21 27.2 21C27.2 21.2 27.6 22.4 27.6 22.4H30L27.8 13.6ZM25.4 18.8C25.6 18.2 26.4 16.2 26.4 16.2C26.4 16.2 26.6 15.8 26.8 15.4L27 16.2C27 16.2 27.4 18.2 27.6 18.8H25.4Z" fill="white" />
                                    <path d="M11.4 13.6L8.8 19.4L8.6 18.6C8 17 6.6 15.2 5 14.2L7.4 22.4H10.2L14.6 13.6H11.4Z" fill="white" />
                                    <path d="M7 14C6.8 13.6 6.4 13.4 5.8 13.4H2L2 13.6C5 14.4 7 16.6 8 19L7 14Z" fill="#EFC75E" />
                                  </svg>
                                ) : (
                                  <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="4" fill="#3F3F3F" />
                                    <path d="M14.5 23.5C18.6421 23.5 22 20.1421 22 16C22 11.8579 18.6421 8.5 14.5 8.5C10.3579 8.5 7 11.8579 7 16C7 20.1421 10.3579 23.5 14.5 23.5Z" fill="#EB001B" />
                                    <path d="M21.5 23.5C25.6421 23.5 29 20.1421 29 16C29 11.8579 25.6421 8.5 21.5 8.5C17.3579 8.5 14 11.8579 14 16C14 20.1421 17.3579 23.5 21.5 23.5Z" fill="#F79E1B" />
                                    <path d="M18 8.5H18.5V23.5H18V8.5Z" fill="#FF5F00" />
                                  </svg>
                                )}
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">
                                    {card.type.charAt(0).toUpperCase() + card.type.slice(1)} ending in {card.last4}
                                    {card.isDefault && (
                                      <span className="ml-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-gray-500">Expires {card.expiry}</div>
                                </div>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                {!card.isDefault && (
                                  <button
                                    type="button"
                                    onClick={() => setDefaultPaymentMethod(card.id)}
                                    className="font-medium text-primary-600 hover:text-primary-500"
                                  >
                                    Set as default
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => deletePaymentMethod(card.id)}
                                  className="ml-4 font-medium text-red-600 hover:text-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                          Add Payment Method
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="p-6">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Security Settings</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">Manage your account security and login information.</p>

                    <div className="mt-6 space-y-6">
                      <div>
                        <h3 className="text-sm font-medium leading-6 text-gray-900">Password</h3>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            Last changed: {new Date(userData.security.lastPasswordChange).toLocaleDateString()}
                          </p>
                          <button
                            type="button"
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            Change Password
                          </button>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200">
                        <Switch.Group as="div" className="flex items-center justify-between">
                          <Switch.Label as="span" className="flex flex-grow flex-col" passive>
                            <span className="text-sm font-medium leading-6 text-gray-900">Two-factor authentication</span>
                            <span className="text-sm text-gray-500">Add an extra layer of security to your account</span>
                          </Switch.Label>
                          <Switch
                            checked={userData.security.twoFactorEnabled}
                            onChange={toggleTwoFactor}
                            className={classNames(
                              userData.security.twoFactorEnabled ? 'bg-primary-600' : 'bg-gray-200',
                              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                userData.security.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                      </div>

                      <div className="pt-6 border-t border-gray-200">
                        <Switch.Group as="div" className="flex items-center justify-between">
                          <Switch.Label as="span" className="flex flex-grow flex-col" passive>
                            <span className="text-sm font-medium leading-6 text-gray-900">Login notifications</span>
                            <span className="text-sm text-gray-500">Receive notifications when someone logs into your account</span>
                          </Switch.Label>
                          <Switch
                            checked={userData.security.loginNotifications}
                            onChange={() => {
                              setUserData({
                                ...userData,
                                security: {
                                  ...userData.security,
                                  loginNotifications: !userData.security.loginNotifications,
                                },
                              });
                            }}
                            className={classNames(
                              userData.security.loginNotifications ? 'bg-primary-600' : 'bg-gray-200',
                              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                userData.security.loginNotifications ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                      </div>

                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-sm font-medium leading-6 text-gray-900">Recent Login Activity</h3>
                        <div className="mt-2 overflow-hidden rounded-md border border-gray-200">
                          <ul role="list" className="divide-y divide-gray-200">
                            {userData.security.recentLogins.map((login, index) => (
                              <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                <div className="flex w-0 flex-1 items-center">
                                  <div className="ml-4">
                                    <div className="font-medium text-gray-900">{login.device}</div>
                                    <div className="text-gray-500">{login.location} • {login.ip}</div>
                                  </div>
                                </div>
                                <div className="ml-4 flex-shrink-0 text-gray-400">
                                  {formatRelativeTime(login.time)}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200">
                        <button
                          type="button"
                          className="text-sm font-medium text-red-600 hover:text-red-500"
                        >
                          Sign out of all devices
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <div className="p-6">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Notification Settings</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">Manage how you receive notifications.</p>

                    <div className="mt-6">
                      <p className="text-sm font-medium text-gray-900">For detailed notification settings, please visit the Notifications page.</p>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => window.location.href = '/notifications'}
                          className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                          <BellIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                          Go to Notifications
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
