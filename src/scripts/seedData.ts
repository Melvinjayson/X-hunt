import { db, collections } from '../lib/firebase.js'

// Sample categories
const categories = [
  'Adventure',
  'Culture',
  'Food & Drink',
  'Nature',
  'Art & Creativity',
  'Sports & Fitness',
  'Technology',
  'History',
  'Music',
  'Photography'
]

// Sample experiences
const sampleExperiences = [
  {
    title: 'Urban Photography Hunt',
    description: 'Capture the hidden gems of the city through your lens',
    longDescription: 'Join us for an exciting urban photography adventure where you\'ll discover hidden architectural gems, street art, and unique perspectives of the city. Perfect for beginners and experienced photographers alike.',
    location: 'Downtown San Francisco',
    meetingPoint: 'Union Square, near the Apple Store',
    category: 'Photography',
    price: 75,
    duration: '3 hours',
    groupSize: '4-8 people',
    imageSrc: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    galleryImages: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
      'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0'
    ],
    included: ['Professional photography guide', 'Camera equipment (if needed)', 'Photo editing tips'],
    notIncluded: ['Transportation', 'Food and drinks', 'Personal camera equipment'],
    requirements: ['Basic photography knowledge helpful but not required', 'Comfortable walking shoes'],
    reward: {
      name: 'Street Photographer Badge',
      description: 'Awarded for completing the urban photography challenge',
      imageSrc: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      type: 'badge',
      value: 150
    },
    availableDates: [
      { date: '2024-02-15', time: '10:00 AM', spotsLeft: 6 },
      { date: '2024-02-16', time: '2:00 PM', spotsLeft: 4 },
      { date: '2024-02-20', time: '10:00 AM', spotsLeft: 8 }
    ],
    status: 'active',
    tags: ['photography', 'urban', 'walking', 'creative'],
    difficulty: 'medium'
  },
  {
    title: 'Culinary Adventure in Chinatown',
    description: 'Taste authentic flavors and learn cooking secrets',
    longDescription: 'Embark on a delicious journey through Chinatown\'s best-kept culinary secrets. You\'ll visit family-owned restaurants, learn traditional cooking techniques, and taste dishes you won\'t find in guidebooks.',
    location: 'Chinatown, San Francisco',
    meetingPoint: 'Dragon Gate at Grant Avenue',
    category: 'Food & Drink',
    price: 95,
    duration: '4 hours',
    groupSize: '6-10 people',
    imageSrc: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      'https://images.unsplash.com/photo-1563379091339-03246963d96c',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2'
    ],
    included: ['Food tastings at 5 locations', 'Cooking demonstration', 'Recipe cards', 'Local guide'],
    notIncluded: ['Additional food purchases', 'Alcoholic beverages', 'Transportation'],
    requirements: ['Come hungry!', 'Inform us of any dietary restrictions'],
    reward: {
      name: 'Culinary Explorer NFT',
      description: 'Exclusive NFT for food adventure completion',
      imageSrc: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      type: 'nft',
      value: 200
    },
    availableDates: [
      { date: '2024-02-17', time: '11:00 AM', spotsLeft: 8 },
      { date: '2024-02-18', time: '11:00 AM', spotsLeft: 5 },
      { date: '2024-02-24', time: '11:00 AM', spotsLeft: 10 }
    ],
    status: 'active',
    tags: ['food', 'culture', 'walking', 'authentic'],
    difficulty: 'easy'
  },
  {
    title: 'Golden Gate Bridge Sunrise Hike',
    description: 'Watch the sunrise over the iconic Golden Gate Bridge',
    longDescription: 'Start your day with an unforgettable sunrise hike to the best viewpoints of the Golden Gate Bridge. We\'ll explore hidden trails and capture the perfect sunrise moment while learning about the bridge\'s history.',
    location: 'Marin Headlands',
    meetingPoint: 'Battery Spencer Parking Area',
    category: 'Nature',
    price: 65,
    duration: '3.5 hours',
    groupSize: '8-12 people',
    imageSrc: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
    galleryImages: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b'
    ],
    included: ['Professional hiking guide', 'Hot coffee and pastries', 'Photography tips'],
    notIncluded: ['Transportation to meeting point', 'Hiking gear', 'Lunch'],
    requirements: ['Moderate fitness level', 'Hiking boots or sturdy shoes', 'Warm layers'],
    reward: {
      name: 'Early Bird Explorer',
      description: 'Badge for completing a sunrise adventure',
      imageSrc: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
      type: 'badge',
      value: 175
    },
    availableDates: [
      { date: '2024-02-19', time: '5:30 AM', spotsLeft: 10 },
      { date: '2024-02-21', time: '5:30 AM', spotsLeft: 7 },
      { date: '2024-02-26', time: '5:30 AM', spotsLeft: 12 }
    ],
    status: 'active',
    tags: ['hiking', 'nature', 'sunrise', 'photography'],
    difficulty: 'medium'
  }
]

// Sample challenges
const sampleChallenges = [
  {
    title: 'Explorer Initiate',
    description: 'Complete your first 3 experiences to become an official X-hunt Explorer',
    difficulty: 'easy',
    timeLimit: 30, // 30 days
    requirements: {
      count: 3
    },
    reward: {
      name: 'Explorer Badge',
      xp: 500,
      imageSrc: '/images/badges/explorer.svg',
      type: 'badge'
    },
    participants: 0,
    status: 'active',
    startDate: new Date(),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
  },
  {
    title: 'Culture Connoisseur',
    description: 'Experience 5 different cultural activities to earn this prestigious badge',
    difficulty: 'medium',
    timeLimit: 60, // 60 days
    requirements: {
      categories: ['Culture', 'Food & Drink', 'Art & Creativity', 'History', 'Music'],
      count: 5
    },
    reward: {
      name: 'Culture Master NFT',
      xp: 1000,
      imageSrc: '/images/nfts/culture-master.svg',
      type: 'nft'
    },
    participants: 0,
    status: 'active',
    startDate: new Date(),
    endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000) // 120 days from now
  },
  {
    title: 'Adventure Seeker',
    description: 'Complete 10 adventure experiences to prove your adventurous spirit',
    difficulty: 'hard',
    timeLimit: 90, // 90 days
    requirements: {
      categories: ['Adventure', 'Nature', 'Sports & Fitness'],
      count: 10
    },
    reward: {
      name: 'Adventure Master',
      xp: 2000,
      imageSrc: '/images/nfts/adventure-master.svg',
      type: 'nft'
    },
    participants: 0,
    status: 'active',
    startDate: new Date(),
    endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 180 days from now
  }
]

// Sample host data
const sampleHost = {
  businessName: 'SF Adventure Co.',
  description: 'We specialize in unique urban adventures and cultural experiences in San Francisco.',
  specialties: ['Photography', 'Food Tours', 'Nature Hikes', 'Cultural Experiences'],
  verified: true,
  rating: 4.8,
  reviewCount: 127,
  totalEarnings: 15420,
  experienceCount: 3,
  responseTime: 2, // 2 hours
  languages: ['English', 'Spanish', 'Mandarin'],
  certifications: ['Certified Tour Guide', 'First Aid Certified'],
  socialLinks: {
    website: 'https://sfadventureco.com',
    instagram: '@sfadventureco',
    facebook: 'SF Adventure Co'
  },
  status: 'approved'
}

export async function seedDatabase() {
  try {
    console.log('Starting database seeding...')

    // Create a sample user (host)
    const hostUserRef = db.collection(collections.users.name).doc()
    const hostUser = {
      id: hostUserRef.id,
      email: 'host@sfadventure.com',
      name: 'Alex Chen',
      username: 'alexchen_sf',
      bio: 'Passionate about showing people the hidden gems of San Francisco',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      memberSince: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
      stats: {
        experiencesCompleted: 0,
        challengesCompleted: 0,
        rewardsEarned: 0,
        totalXp: 0,
        level: 1,
        followers: 89,
        following: 23
      },
      preferences: {
        categories: ['Photography', 'Food & Drink', 'Nature'],
        notifications: true,
        privacy: 'public'
      },
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    }
    await hostUserRef.set(hostUser)
    console.log('Created host user:', hostUser.id)

    // Create host profile
    const hostRef = db.collection(collections.hosts.name).doc()
    const host = {
      id: hostRef.id,
      userId: hostUser.id,
      ...sampleHost,
      createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000), // 300 days ago
      updatedAt: new Date()
    }
    await hostRef.set(host)
    console.log('Created host profile:', host.id)

    // Create experiences
    for (const experienceData of sampleExperiences) {
      const experienceRef = db.collection(collections.experiences.name).doc()
      const experience = {
        id: experienceRef.id,
        hostId: hostUser.id,
        ...experienceData,
        rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
        reviewCount: Math.floor(Math.random() * 50) + 10, // Random review count 10-60
        currency: 'USD',
        createdAt: new Date(Date.now() - Math.random() * 100 * 24 * 60 * 60 * 1000), // Random date within last 100 days
        updatedAt: new Date()
      }
      await experienceRef.set(experience)
      console.log('Created experience:', experience.title)
    }

    // Create challenges
    for (const challengeData of sampleChallenges) {
      const challengeRef = db.collection(collections.challenges.name).doc()
      const challenge = {
        id: challengeRef.id,
        ...challengeData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      await challengeRef.set(challenge)
      console.log('Created challenge:', challenge.title)
    }

    // Create sample categories
    for (const category of categories) {
      const categoryRef = db.collection(collections.categories.name).doc()
      const categoryDoc = {
        id: categoryRef.id,
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and'),
        description: `Discover amazing ${category.toLowerCase()} experiences`,
        imageSrc: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}`,
        experienceCount: Math.floor(Math.random() * 20) + 5,
        featured: Math.random() > 0.7,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      await categoryRef.set(categoryDoc)
      console.log('Created category:', category)
    }

    console.log('Database seeding completed successfully!')
    return {
      success: true,
      message: 'Database seeded with sample data',
      data: {
        hostUserId: hostUser.id,
        hostId: host.id,
        experiencesCreated: sampleExperiences.length,
        challengesCreated: sampleChallenges.length,
        categoriesCreated: categories.length
      }
    }
  } catch (error) {
    console.error('Error seeding database:', error)
    return {
      success: false,
      message: 'Failed to seed database',
      error: error
    }
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase().then(result => {
    console.log('Seeding result:', result)
    process.exit(result.success ? 0 : 1)
  })
}