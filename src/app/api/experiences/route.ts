import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/database'
import { z } from 'zod'



// Validation schema for creating experiences
const createExperienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  duration: z.number().positive('Duration must be positive'),
  maxParticipants: z.number().positive('Max participants must be positive'),
  category: z.enum([
    'ADVENTURE', 'CULTURE', 'FOOD', 'NATURE', 'SPORTS',
    'ARTS', 'TECHNOLOGY', 'WELLNESS', 'EDUCATION', 'ENTERTAINMENT'
  ]),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  location: z.string().min(1, 'Location is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  images: z.array(z.string()).default([]),
  included: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  cancellationPolicy: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const location = searchParams.get('location')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const featured = searchParams.get('featured')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search')

    const where: any = {
      status: 'ACTIVE',
    }

    if (category) {
      where.category = category
    }

    if (difficulty) {
      where.difficulty = difficulty
    }

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive',
      }
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ]
    }

    const skip = (page - 1) * limit

    const [experiences, total] = await Promise.all([
      prisma.experience.findMany({
        where,
        include: {
          host: {
            select: {
              id: true,
              name: true,
              avatar: true,
              hostProfile: {
                select: {
                  verified: true,
                  rating: true,
                  totalReviews: true,
                },
              },
            },
          },
          _count: {
            select: {
              bookings: true,
              reviews: true,
            },
          },
        },
        orderBy: [
          { featured: 'desc' },
          { rating: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.experience.count({ where }),
    ])

    return NextResponse.json({
      experiences,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createExperienceSchema.parse(body)

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { hostProfile: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create host profile if it doesn't exist
    if (!user.hostProfile) {
      await prisma.hostProfile.create({
        data: {
          userId: user.id,
        },
      })
    }

    // Update user role to HOST if not already
    if (user.role === 'USER') {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'HOST' },
      })
    }

    const experience = await prisma.experience.create({
      data: {
        ...validatedData,
        hostId: user.id,
        images: validatedData.images.length > 0 ? JSON.stringify(validatedData.images) : null,
        included: validatedData.included.length > 0 ? JSON.stringify(validatedData.included) : null,
        requirements: validatedData.requirements.length > 0 ? JSON.stringify(validatedData.requirements) : null,
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            avatar: true,
            hostProfile: {
              select: {
                verified: true,
                rating: true,
                totalReviews: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating experience:', error)
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    )
  }
}