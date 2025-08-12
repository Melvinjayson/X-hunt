'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    interests: [] as string[],
    location: '',
    bio: '',
    profileImage: null as File | null,
    notificationPreferences: {
      email: true,
      push: true,
      sms: false,
    },
  });

  const interests = [
    { id: 'food', name: 'Food & Dining', icon: '🍽️' },
    { id: 'outdoor', name: 'Outdoor Adventures', icon: '🏞️' },
    { id: 'art', name: 'Art & Culture', icon: '🎨' },
    { id: 'music', name: 'Music & Concerts', icon: '🎵' },
    { id: 'sports', name: 'Sports & Fitness', icon: '🏃‍♂️' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'wellness', name: 'Wellness & Spa', icon: '💆‍♀️' },
    { id: 'nightlife', name: 'Nightlife', icon: '🌃' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'history', name: 'History & Heritage', icon: '🏛️' },
    { id: 'photography', name: 'Photography', icon: '📸' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
  ];

  const locations = [
    'New York, NY',
    'Los Angeles, CA',
    'San Francisco, CA',
    'Chicago, IL',
    'Miami, FL',
    'Austin, TX',
    'Seattle, WA',
    'Boston, MA',
    'Denver, CO',
    'Portland, OR',
  ];

  const toggleInterest = (interestId: string) => {
    setFormData((prev) => {
      const newInterests = prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId];
      return { ...prev, interests: newInterests };
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, location: e.target.value });
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, bio: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    }
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      notificationPreferences: {
        ...formData.notificationPreferences,
        [name]: checked,
      },
    });
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to your backend
    console.log('Submitting onboarding data:', formData);
    
    // Redirect to home page after successful onboarding
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to X-Hunt</h1>
            <p className="mt-2 text-lg text-gray-600">
              Let's set up your profile so we can personalize your experience
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-between">
                {[1, 2, 3].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= stepNumber ? 'bg-primary-600' : 'bg-gray-300'} text-white`}
                  >
                    {stepNumber}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 flex justify-between text-sm font-medium text-gray-500">
              <div className={step >= 1 ? 'text-primary-600' : ''}>Interests</div>
              <div className={step >= 2 ? 'text-primary-600' : ''}>Profile</div>
              <div className={step >= 3 ? 'text-primary-600' : ''}>Preferences</div>
            </div>
          </div>

          {/* Form */}
          <div className="mt-10 bg-white p-6 shadow-sm rounded-lg">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Interests */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">What are you interested in?</h2>
                  <p className="mt-1 text-sm text-gray-600">Select at least 3 interests to help us personalize your experience.</p>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {interests.map((interest) => (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => toggleInterest(interest.id)}
                        className={`flex flex-col items-center justify-center rounded-lg border p-4 ${formData.interests.includes(interest.id) ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        <span className="text-2xl">{interest.icon}</span>
                        <span className="mt-2 text-sm font-medium">{interest.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={formData.interests.length < 3}
                      className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Profile */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Complete your profile</h2>
                  <p className="mt-1 text-sm text-gray-600">Tell us a bit about yourself.</p>
                  
                  <div className="mt-6 space-y-6">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleLocationChange}
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                      >
                        <option value="">Select your location</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={formData.bio}
                          onChange={handleBioChange}
                          placeholder="Tell us about yourself..."
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your profile. URLs are hyperlinked.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Profile photo</label>
                      <div className="mt-2 flex items-center space-x-5">
                        <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                          {formData.profileImage ? (
                            <img
                              src={URL.createObjectURL(formData.profileImage)}
                              alt="Profile preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          )}
                        </div>
                        <label
                          htmlFor="profile-image"
                          className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <span>Change</span>
                          <input
                            id="profile-image"
                            name="profile-image"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.location}
                      className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Preferences */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Set your preferences</h2>
                  <p className="mt-1 text-sm text-gray-600">Choose how you want to receive notifications and updates.</p>
                  
                  <div className="mt-6 space-y-6">
                    <fieldset>
                      <legend className="text-base font-medium text-gray-900">Notifications</legend>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="email"
                              name="email"
                              type="checkbox"
                              checked={formData.notificationPreferences.email}
                              onChange={handleNotificationChange}
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="email" className="font-medium text-gray-700">
                              Email
                            </label>
                            <p className="text-gray-500">Get notified about new experiences and challenges via email.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="push"
                              name="push"
                              type="checkbox"
                              checked={formData.notificationPreferences.push}
                              onChange={handleNotificationChange}
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="push" className="font-medium text-gray-700">
                              Push Notifications
                            </label>
                            <p className="text-gray-500">Receive push notifications on your device.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="sms"
                              name="sms"
                              type="checkbox"
                              checked={formData.notificationPreferences.sms}
                              onChange={handleNotificationChange}
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="sms" className="font-medium text-gray-700">
                              SMS
                            </label>
                            <p className="text-gray-500">Get text messages for important updates and reminders.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>

                    <div className="rounded-md bg-blue-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                          <p className="text-sm text-blue-700">You can change these preferences at any time from your account settings.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      Complete Setup
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}