'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon,
  ArrowLongRightIcon,
  CalendarIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  TagIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Mock blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Hidden Gems in San Francisco',
    excerpt: 'Discover the secret spots that even locals don\'t know about in the City by the Bay.',
    coverImage: '/images/blog/sf-hidden-gems.jpg',
    category: 'Travel',
    author: {
      name: 'Emma Rodriguez',
      avatar: '/images/avatars/emma.jpg'
    },
    date: '2023-10-15',
    readTime: '8 min read',
    tags: ['San Francisco', 'Travel', 'Local Experiences'],
    commentCount: 24
  },
  {
    id: 2,
    title: 'How to Earn Maximum Rewards on Your Next Adventure',
    excerpt: 'Learn the strategies to maximize your reward points and level up faster on the XHunt platform.',
    coverImage: '/images/blog/rewards-strategy.jpg',
    category: 'Rewards',
    author: {
      name: 'Marcus Chen',
      avatar: '/images/avatars/marcus.jpg'
    },
    date: '2023-10-10',
    readTime: '6 min read',
    tags: ['Rewards', 'Strategy', 'Points'],
    commentCount: 18
  },
  {
    id: 3,
    title: 'From Tourist to Local: Immersive Cultural Experiences',
    excerpt: 'How immersive experiences can transform your understanding of a new culture.',
    coverImage: '/images/blog/cultural-immersion.jpg',
    category: 'Culture',
    author: {
      name: 'Priya Sharma',
      avatar: '/images/avatars/priya.jpg'
    },
    date: '2023-10-05',
    readTime: '10 min read',
    tags: ['Culture', 'Immersion', 'Travel'],
    commentCount: 32
  },
  {
    id: 4,
    title: 'The Rise of AI-Powered Experience Recommendations',
    excerpt: 'How artificial intelligence is revolutionizing the way we discover and book experiences.',
    coverImage: '/images/blog/ai-recommendations.jpg',
    category: 'Technology',
    author: {
      name: 'David Kim',
      avatar: '/images/avatars/david.jpg'
    },
    date: '2023-09-28',
    readTime: '7 min read',
    tags: ['AI', 'Technology', 'Recommendations'],
    commentCount: 15
  },
  {
    id: 5,
    title: 'Foodie Adventures: Culinary Experiences Worth Traveling For',
    excerpt: 'From street food tours to cooking classes, these are the food experiences that should be on every foodie\'s bucket list.',
    coverImage: '/images/blog/foodie-adventures.jpg',
    category: 'Food',
    author: {
      name: 'Sophia Martinez',
      avatar: '/images/avatars/sophia.jpg'
    },
    date: '2023-09-22',
    readTime: '9 min read',
    tags: ['Food', 'Culinary', 'Travel'],
    commentCount: 29
  },
  {
    id: 6,
    title: 'Hosting 101: How to Create Unforgettable Experiences',
    excerpt: 'Tips and tricks from top-rated hosts on creating experiences that guests will remember forever.',
    coverImage: '/images/blog/hosting-tips.jpg',
    category: 'Hosting',
    author: {
      name: 'James Wilson',
      avatar: '/images/avatars/james.jpg'
    },
    date: '2023-09-18',
    readTime: '11 min read',
    tags: ['Hosting', 'Tips', 'Experiences'],
    commentCount: 22
  },
];

// Mock featured post
const featuredPost = {
  id: 7,
  title: 'The Future of Experience Marketplaces: Web3, AI, and Beyond',
  excerpt: 'Exploring how emerging technologies are reshaping the way we discover, book, and share experiences around the world.',
  coverImage: '/images/blog/future-experiences.jpg',
  category: 'Technology',
  author: {
    name: 'Alex Johnson',
    avatar: '/images/avatars/alex.jpg'
  },
  date: '2023-10-20',
  readTime: '12 min read',
  tags: ['Web3', 'AI', 'Future', 'Technology'],
  commentCount: 45
};

// Mock categories
const categories = [
  { name: 'All', count: 42 },
  { name: 'Travel', count: 15 },
  { name: 'Food', count: 8 },
  { name: 'Culture', count: 7 },
  { name: 'Technology', count: 6 },
  { name: 'Rewards', count: 4 },
  { name: 'Hosting', count: 2 },
];

// Mock popular tags
const popularTags = [
  { name: 'Travel', count: 24 },
  { name: 'Food', count: 18 },
  { name: 'Technology', count: 15 },
  { name: 'Local', count: 12 },
  { name: 'Adventure', count: 10 },
  { name: 'Culture', count: 9 },
  { name: 'Tips', count: 8 },
  { name: 'Rewards', count: 7 },
  { name: 'Hosting', count: 6 },
  { name: 'AI', count: 5 },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-8 pb-16">
        {/* Featured Post */}
        <div className="relative overflow-hidden bg-gray-900 py-24 mb-12">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
            <Image 
              src={featuredPost.coverImage} 
              alt={featuredPost.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-0.5 text-sm font-medium text-primary-800 mb-4">
                {featuredPost.category}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                {featuredPost.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-center space-x-4 text-gray-300 mb-8">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-1" />
                  <span>{formatDate(featuredPost.date)}</span>
                </div>
                <div className="flex items-center">
                  <UserCircleIcon className="h-5 w-5 mr-1" />
                  <span>{featuredPost.author.name}</span>
                </div>
                <div className="flex items-center">
                  <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                  <span>{featuredPost.commentCount} comments</span>
                </div>
              </div>
              <Link 
                href={`/blog/${featuredPost.id}`}
                className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Read Article
                <ArrowLongRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main content */}
            <div className="lg:col-span-8">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Latest Articles
                </h2>
              </div>

              {/* Blog posts grid */}
              <div className="grid gap-8 sm:grid-cols-2">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                    <div className="flex-shrink-0 relative h-48">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="h-48 w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                            {post.category}
                          </span>
                          <span className="text-gray-500">{post.readTime}</span>
                        </div>
                        <Link href={`/blog/${post.id}`} className="mt-2 block">
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600">
                            {post.title}
                          </h3>
                          <p className="mt-3 text-base text-gray-500 line-clamp-3">
                            {post.excerpt}
                          </p>
                        </Link>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0 relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="rounded-full"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                          <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <nav className="mt-12 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                <div className="-mt-px flex w-0 flex-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                  >
                    <ArrowLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                    Previous
                  </button>
                </div>
                <div className="hidden md:-mt-px md:flex">
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${currentPage === page ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <div className="-mt-px flex w-0 flex-1 justify-end">
                  <button
                    onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                    disabled={currentPage === 3}
                    className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium ${currentPage === 3 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                  >
                    Next
                    <ArrowRightIcon className="ml-3 h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </nav>
            </div>

            {/* Sidebar */}
            <div className="mt-12 lg:col-span-4 lg:mt-0">
              {/* Search */}
              <div className="mb-8">
                <div className="rounded-md shadow-sm">
                  <div className="relative flex-grow focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      placeholder="Search articles"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${selectedCategory === category.name ? 'bg-primary-100 text-primary-800' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <span>{category.name}</span>
                      <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag.name}
                      onClick={() => setSearchQuery(tag.name)}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-gray-200"
                    >
                      <TagIcon className="-ml-0.5 mr-1.5 h-4 w-4 text-gray-400" />
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="rounded-lg bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Subscribe to our newsletter</h3>
                <p className="text-sm text-gray-500 mb-4">Get the latest articles, experiences, and exclusive offers delivered to your inbox.</p>
                <form className="mt-2">
                  <div className="mb-3">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      placeholder="Enter your email"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}