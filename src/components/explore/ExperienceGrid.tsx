'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';
import { MapPinIcon, TagIcon } from '@heroicons/react/24/outline';
import { useExperiences } from '@/hooks/useApi';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ExperienceGridProps {
  searchQuery?: string;
  categoryFilter?: string;
  locationFilter?: string;
  priceRange?: [number, number];
}

export function ExperienceGrid({
  searchQuery = '',
  categoryFilter = '',
  locationFilter = '',
  priceRange,
}: ExperienceGridProps) {
  const [sortBy, setSortBy] = useState('popular');

  // Build API filters
  const filters: any = {};
  if (categoryFilter) filters.category = categoryFilter;
  if (locationFilter) filters.location = locationFilter;
  if (priceRange) {
    filters.minPrice = priceRange[0];
    filters.maxPrice = priceRange[1];
  }

  const { data: experiences, loading, error } = useExperiences(filters);

  // Filter experiences based on search query (client-side)
  const filteredExperiences = experiences?.filter((experience) => {
    if (!searchQuery) return true;
    return experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           experience.description.toLowerCase().includes(searchQuery.toLowerCase());
  }) || [];

  // Sort experiences
  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'popular':
      default:
        return (b.reviewCount || 0) - (a.reviewCount || 0);
    }
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-white shadow-md animate-pulse">
              <div className="h-48 w-full bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto h-12 w-12 text-red-400">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading experiences</h3>
        <p className="mt-1 text-sm text-gray-500">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {sortedExperiences.length} experiences
        </p>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Experience Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedExperiences.map((experience) => (
          <div key={experience.id} className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src={experience.imageSrc}
                alt={experience.title}
                width={400}
                height={300}
                className="h-48 w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                  <TagIcon className="mr-1 h-3 w-3" />
                  {experience.category}
                </span>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">{experience.rating?.toFixed(1) || '0.0'}</span>
                </div>
              </div>
              
              <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
                {experience.title}
              </h3>
              
              <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                {experience.description}
              </p>
              
              <div className="mb-3 flex items-center text-sm text-gray-500">
                <MapPinIcon className="mr-1 h-4 w-4" />
                {experience.location}
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">${experience.price}</span>
                  <span className="ml-1 text-sm text-gray-500">per person</span>
                </div>
                <span className="text-xs text-gray-500">{experience.reviewCount || 0} reviews</span>
              </div>
              
              <div className="mt-4 rounded-lg bg-gradient-to-r from-primary-50 to-accent-50 p-3">
                <div className="flex items-center">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-accent-500">
                    <span className="text-xs font-bold text-white">🏆</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">Reward: {experience.reward?.name || 'Digital Badge'}</span>
                </div>
              </div>
              
              <Link
                href={`/experience/${experience.id}`}
                className="mt-4 block w-full rounded-lg bg-primary-600 py-2 px-4 text-center text-white transition-colors duration-200 hover:bg-primary-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedExperiences.length === 0 && (
        <div className="py-12 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No experiences found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}