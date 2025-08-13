'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative bg-white">
      {/* Hero background image */}
      <div className="absolute inset-0 h-[70vh] overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative">
        <div className="container-custom pt-20 pb-32 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Discover Immersive</span>
              <span className="block text-primary-400">Real-World Challenges</span>
            </h1>
            <p className="mt-6 text-xl text-gray-100">
              Explore unique experiences, earn digital rewards, and unlock exclusive collectibles
            </p>

            {/* Search bar */}
            <div className="mt-10">
              <form onSubmit={handleSearch} className="mx-auto max-w-xl">
                <div className="flex rounded-full bg-white p-2 shadow-lg">
                  <input
                    type="text"
                    className="w-full rounded-full border-0 bg-transparent px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
                    placeholder="Search experiences, challenges, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center rounded-full bg-primary-500 px-6 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                href="/explore"
                className="rounded-md bg-primary-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Explore Experiences
              </Link>
              <Link
                href="/challenges"
                className="rounded-md bg-white px-6 py-3 text-base font-medium text-primary-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                View Challenges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
