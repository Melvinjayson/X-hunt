'use client'
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';
import { MapPinIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import { useExperiences } from '@/hooks/useApi';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function FeaturedExperiences() {
  const { data: experiences, loading, error } = useExperiences({ limit: 4 });

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Experiences</h2>
            <p className="mt-4 text-lg text-gray-500">
              Discover our most popular challenges and earn exclusive rewards
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card overflow-hidden animate-pulse">
                <div className="h-48 w-full bg-gray-200"></div>
                <div className="p-4">
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Experiences</h2>
            <p className="mt-4 text-lg text-red-600">
              Unable to load experiences. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Experiences</h2>
          <p className="mt-4 text-lg text-gray-500">
            Discover our most popular challenges and earn exclusive rewards
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {experiences?.map((experience) => (
            <div key={experience.id} className="card group overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={experience.imageSrc}
                  alt={experience.title}
                  width={500}
                  height={300}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  {experience.category}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            experience.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                            'h-4 w-4 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-1 text-xs text-gray-500">{experience.reviewCount || 0} reviews</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${experience.price}</p>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  <Link href={`/experience/${experience.id}`}>
                    <span className="absolute inset-0" />
                    {experience.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{experience.description}</p>
                <div className="mt-3 flex items-center text-xs text-gray-500">
                  <MapPinIcon className="mr-1 h-4 w-4 text-gray-400" />
                  <span>{experience.location}</span>
                </div>
                <div className="mt-4 flex items-center rounded-md bg-primary-50 px-2 py-1">
                  <TagIcon className="mr-1 h-4 w-4 text-primary-500" />
                  <span className="text-xs font-medium text-primary-700">Reward: {experience.reward?.name || 'Digital Badge'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center rounded-md border border-transparent bg-primary-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            View All Experiences
          </Link>
        </div>
      </div>
    </div>
  );
}
