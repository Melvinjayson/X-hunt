'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  TagIcon,
  ShareIcon,
  BookmarkIcon,
  HeartIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Mock blog post data
const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Hidden Gems in San Francisco',
    content: `
      <p>San Francisco is known for its iconic landmarks like the Golden Gate Bridge and Alcatraz, but beyond these tourist hotspots lies a treasure trove of hidden gems waiting to be discovered. In this article, we'll take you on a journey through the lesser-known attractions that even many locals haven't explored.</p>
      
      <h2>1. The Wave Organ</h2>
      <p>Tucked away at the end of a jetty in the Marina District, the Wave Organ is an acoustic sculpture that amplifies the sounds of the bay's waves. Created by artists Peter Richards and George Gonzalez in 1986, this hidden gem offers not only unique sounds but also spectacular views of the Golden Gate Bridge and Alcatraz.</p>
      
      <h2>2. The Seward Street Slides</h2>
      <p>Hidden in the Castro neighborhood, these concrete slides were designed by a 14-year-old resident during a community planning project in the 1970s. Bring a piece of cardboard (there are usually some left at the site) and enjoy this exhilarating ride that's perfect for both kids and the young at heart.</p>
      
      <h2>3. The Andy Goldsworthy Wood Line</h2>
      <p>Located in the Presidio, this serpentine sculpture made of eucalyptus trunks winds its way through a grove of cypress trees. It's one of four Goldsworthy installations in the Presidio and offers a peaceful retreat from the city's hustle and bustle.</p>
      
      <h2>4. Cayuga Park</h2>
      <p>This small park in the Outer Mission district features over 100 wooden sculptures created by Demetrio Braceros, a former gardener who transformed the once-neglected space into an artistic haven during his 28-year tenure.</p>
      
      <h2>5. The Filbert Steps</h2>
      <p>While Telegraph Hill and Coit Tower are well-known, the wooden Filbert Steps that climb the eastern slope are often overlooked. These steps take you through beautiful gardens and past charming cottages, offering glimpses into a quieter side of San Francisco.</p>
      
      <h2>6. The Camera Obscura</h2>
      <p>Behind the Cliff House restaurant sits a large camera-shaped building housing a camera obscura, a device that projects a 360-degree live image of the surrounding area onto a viewing table. This fascinating optical device dates back to Leonardo da Vinci's time and offers a unique perspective of Ocean Beach.</p>
      
      <h2>7. The Sutro Baths Ruins</h2>
      <p>Once the world's largest indoor swimming establishment, the Sutro Baths now exist as haunting ruins at Land's End. Explore the concrete remnants and caves while enjoying breathtaking views of the Pacific Ocean.</p>
      
      <h2>8. The Ingleside Terraces Sundial</h2>
      <p>In the Ingleside Terraces neighborhood stands one of the world's largest sundials, measuring 28 feet in diameter. Built in 1913, this massive timepiece sits in the middle of a charming circular street.</p>
      
      <h2>9. The Columbarium</h2>
      <p>This neoclassical building in the Richmond District houses the remains of over 8,000 San Franciscans, including some notable figures. Its stunning stained glass dome and ornate architecture make it a hidden architectural gem worth visiting.</p>
      
      <h2>10. The Balmy Alley Murals</h2>
      <p>While the Mission District's murals are becoming more well-known, Balmy Alley offers one of the highest concentrations of murals in the city. These vibrant artworks, dating back to the 1980s, reflect the neighborhood's cultural heritage and social justice themes.</p>
      
      <p>Next time you're in San Francisco, venture beyond the typical tourist attractions and discover these hidden gems. They offer authentic experiences that connect you with the city's diverse culture, history, and natural beauty in ways that the more famous landmarks cannot.</p>
    `,
    excerpt: 'Discover the secret spots that even locals don\'t know about in the City by the Bay.',
    coverImage: '/images/blog/sf-hidden-gems.jpg',
    category: 'Travel',
    author: {
      name: 'Emma Rodriguez',
      avatar: '/images/avatars/emma.jpg',
      bio: 'Travel writer and San Francisco native with a passion for uncovering hidden gems in cities around the world.'
    },
    date: '2023-10-15',
    readTime: '8 min read',
    tags: ['San Francisco', 'Travel', 'Local Experiences'],
    commentCount: 24,
    comments: [
      {
        id: 'c1',
        author: {
          name: 'Michael Chen',
          avatar: '/images/avatars/michael.jpg'
        },
        date: '2023-10-16',
        content: 'I have lived in SF for 5 years and did not know about half of these places! The Wave Organ sounds particularly interesting. Thanks for sharing!',
        likes: 12
      },
      {
        id: 'c2',
        author: {
          name: 'Sarah Johnson',
          avatar: '/images/avatars/sarah.jpg'
        },
        date: '2023-10-16',
        content: 'The Seward Street Slides are so much fun! I took my kids there last weekend and they loved it. Definitely bring your own cardboard though.',
        likes: 8
      },
      {
        id: 'c3',
        author: {
          name: 'David Park',
          avatar: '/images/avatars/david.jpg'
        },
        date: '2023-10-17',
        content: 'Great list! I would also add the 16th Avenue Tiled Steps to this list. They are becoming more popular but still relatively unknown to tourists.',
        likes: 15
      }
    ],
    relatedPosts: [2, 3, 5]
  },
  {
    id: '2',
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
    commentCount: 18,
    relatedPosts: [1, 4, 6]
  },
  {
    id: '3',
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
    commentCount: 32,
    relatedPosts: [1, 5, 7]
  },
  {
    id: '4',
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
    commentCount: 15,
    relatedPosts: [2, 6, 7]
  },
  {
    id: '5',
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
    commentCount: 29,
    relatedPosts: [1, 3, 6]
  },
  {
    id: '6',
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
    commentCount: 22,
    relatedPosts: [2, 4, 5]
  },
  {
    id: '7',
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
    commentCount: 45,
    relatedPosts: [3, 4, 6]
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  // Find the current post
  const post = blogPosts.find(post => post.id === postId);
  
  // State for comment form
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // If post not found, show error or redirect
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
        <button
          onClick={() => router.push('/blog')}
          className="mt-4 inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Back to Blog
        </button>
      </div>
    );
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get related posts
  const relatedPosts = post.relatedPosts?.map(id => 
    blogPosts.find(post => post.id === id.toString())
  ).filter(Boolean) || [];
  
  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // In a real app, this would send the comment to an API
      alert('Comment submitted: ' + commentText);
      setCommentText('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-8 pb-16">
        {/* Hero section */}
        <div className="relative overflow-hidden bg-gray-900 py-32 mb-12">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-0.5 text-sm font-medium text-primary-800 mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-4 text-gray-300 mb-8">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-1" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center">
                  <UserCircleIcon className="h-5 w-5 mr-1" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center">
                  <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                  <span>{post.commentCount} comments</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main content */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg prose-primary mx-auto">
                {/* Back to blog link */}
                <div className="mb-8">
                  <Link 
                    href="/blog"
                    className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    <ArrowLeftIcon className="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
                    Back to Blog
                  </Link>
                </div>
                
                {/* Article content */}
                <div dangerouslySetInnerHTML={{ __html: post.content || '<p>Content not available</p>' }} />
                
                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-gray-200"
                    >
                      <TagIcon className="-ml-0.5 mr-1.5 h-4 w-4 text-gray-400" />
                      {tag}
                    </Link>
                  ))}
                </div>
                
                {/* Author bio */}
                <div className="mt-8 rounded-lg bg-gray-50 p-6 border border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{post.author.name}</h3>
                      <p className="text-sm text-gray-500">{post.author.bio}</p>
                    </div>
                  </div>
                </div>
                
                {/* Social sharing */}
                <div className="mt-8 flex items-center justify-between border-t border-b border-gray-200 py-4">
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center text-sm font-medium ${isLiked ? 'text-red-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      {isLiked ? (
                        <HeartIconSolid className="mr-1.5 h-5 w-5 text-red-600" />
                      ) : (
                        <HeartIcon className="mr-1.5 h-5 w-5" />
                      )}
                      Like
                    </button>
                    <button 
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`flex items-center text-sm font-medium ${isBookmarked ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      <BookmarkIcon className="mr-1.5 h-5 w-5" />
                      Save
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                    <button className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="rounded-full bg-blue-400 p-2 text-white hover:bg-blue-500">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </button>
                    <button className="rounded-full bg-green-500 p-2 text-white hover:bg-green-600">
                      <ShareIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Comments section */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments ({post.comments?.length || 0})</h2>
                  
                  {/* Comment form */}
                  <form onSubmit={handleCommentSubmit} className="mb-8">
                    <div className="mt-1">
                      <textarea
                        rows={3}
                        name="comment"
                        id="comment"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        placeholder="Leave a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        <PaperAirplaneIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Post Comment
                      </button>
                    </div>
                  </form>
                  
                  {/* Comments list */}
                  <div className="space-y-6">
                    {post.comments?.map((comment) => (
                      <div key={comment.id} className="flex space-x-4">
                        <div className="flex-shrink-0 relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            fill
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{comment.author.name}</h3>
                            <p className="text-sm text-gray-500">{formatDate(comment.date)}</p>
                          </div>
                          <div className="mt-1 text-sm text-gray-700">
                            <p>{comment.content}</p>
                          </div>
                          <div className="mt-2 flex items-center space-x-4 text-sm">
                            <button className="text-gray-500 hover:text-gray-900">
                              <HeartIcon className="mr-1 inline-block h-4 w-4" />
                              {comment.likes}
                            </button>
                            <button className="text-gray-500 hover:text-gray-900">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="mt-12 lg:col-span-4 lg:mt-0">
              {/* Related posts */}
              <div className="sticky top-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    relatedPost && (
                      <div key={relatedPost.id} className="flex space-x-4">
                        <div className="flex-shrink-0 relative h-16 w-16 rounded-md overflow-hidden">
                          <Image
                            src={relatedPost.coverImage}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <Link 
                            href={`/blog/${relatedPost.id}`}
                            className="text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-2"
                          >
                            {relatedPost.title}
                          </Link>
                          <p className="mt-1 text-xs text-gray-500">{formatDate(relatedPost.date)}</p>
                        </div>
                      </div>
                    )
                  ))}
                </div>
                
                {/* Newsletter Signup */}
                <div className="mt-8 rounded-lg bg-gray-50 p-6 border border-gray-200">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
