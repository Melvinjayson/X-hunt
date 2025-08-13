'use client';

import { useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';

const categories = [
  { value: 'foodies', label: 'Foodies' },
  { value: 'outdoorsy', label: 'Outdoorsy' },
  { value: 'art-culture', label: 'Art & Culture' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'edutainment', label: 'Edutainment' },
  { value: 'spiritual', label: 'Spiritual' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'urban-exploration', label: 'Urban Exploration' },
];

const priceRanges = [
  { value: 'under-50', label: 'Under $50' },
  { value: '50-100', label: '$50 to $100' },
  { value: '100-200', label: '$100 to $200' },
  { value: 'over-200', label: 'Over $200' },
];

const durations = [
  { value: 'under-1-hour', label: 'Under 1 hour' },
  { value: '1-3-hours', label: '1-3 hours' },
  { value: 'half-day', label: 'Half day' },
  { value: 'full-day', label: 'Full day' },
  { value: 'multi-day', label: 'Multi-day' },
];

const rewardTypes = [
  { value: 'nft', label: 'NFT Collectibles' },
  { value: 'badge', label: 'Digital Badges' },
  { value: 'points', label: 'Loyalty Points' },
  { value: 'token', label: 'Tokens' },
  { value: 'physical', label: 'Physical Rewards' },
];

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: categories,
  },
  {
    id: 'price',
    name: 'Price Range',
    options: priceRanges,
  },
  {
    id: 'duration',
    name: 'Duration',
    options: durations,
  },
  {
    id: 'reward',
    name: 'Reward Type',
    options: rewardTypes,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function ExploreFilters() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    category: [],
    price: [],
    duration: [],
    reward: [],
  });

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = [...(prev[filterId] || [])];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [filterId]: current,
      };
    });
  };

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Transition show={mobileFiltersOpen} as="div" className="relative z-40 lg:hidden">
        <div className="fixed inset-0 z-40 flex">
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <div className="mt-4 border-t border-gray-200">
              {filters.map((section) => (
                <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <ChevronDownIcon
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                value={option.value}
                                type="checkbox"
                                checked={selectedFilters[section.id]?.includes(option.value)}
                                onChange={() => handleFilterChange(section.id, option.value)}
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </Transition>

      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
          <div className="px-4 py-5">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          </div>
          {filters.map((section) => (
            <div key={section.id} className="px-4 py-5">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                <div className="space-y-3 pt-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        value={option.value}
                        type="checkbox"
                        checked={selectedFilters[section.id]?.includes(option.value)}
                        onChange={() => handleFilterChange(section.id, option.value)}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          ))}
          <div className="px-4 py-5">
            <button
              type="button"
              className="w-full rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Mobile filter button */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-2 lg:hidden">
        <h1 className="text-xl font-semibold text-gray-900">Filters</h1>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <FunnelIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          Filters
        </button>
      </div>
    </div>
  );
}
