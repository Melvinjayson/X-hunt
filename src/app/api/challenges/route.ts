import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/database'
import { z } from 'zod'

// Validation schema for creating challenges
const createChallengeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Invalid image URL').optional(),
  type: z.enum([
    'EXPERIENCE_COUNT',
    'CATEGORY_EXPLORATION',
    'POINTS_ACCUMULATION',
    'STREAK',
    'SOCIAL',
    'SEASONAL'
  ]),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  points: z.number().positive('Points must be positive'),
  badge: z.string().optional(),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  requirements: z.record(z.any()),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const difficulty = searchParams.get('difficulty')
    const status = searchParams.get('status') || 'ACTIVE'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const where: any = {
      status,
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    }

    if (type) {
      where.type = type
    }

    if (difficulty) {
      where.difficulty = difficulty
    }

    const skip = (page - 1) * limit

    let challengesQuery = prisma.challenge.findMany({
      where,
      orderBy: [
        { startDate: 'desc' },
        { points: 'desc' },
      ],
      skip,
      take: limit,
    })

    // If user is authenticated, include their progress
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      })

      if (user) {
        challengesQuery = prisma.challenge.findMany({
          where,
          include: {
            challengeUsers: {
              where: {
                userId: user.id,
              },
              select: {
                status: true,
                progress: true,
                pointsEarned: true,
                completedAt: true,
              },
            },
          },
          orderBy: [
            { startDate: 'desc' },
            { points: 'desc' },
          ],
          skip,
          take: limit,
        })
      }
    }

    const [challenges, total] = await Promise.all([
      challengesQuery,
      prisma.challenge.count({ where }),
    ])

    return NextResponse.json({
      challenges,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching challenges:', error)
    return NextResponse.json(
      { error: 'Failed to fetch challenges' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user exists and has admin role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    // Validate request body using Zod
    const validationResult = createChallengeSchema.safeParse(body)
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }))
      
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data

    // Create the challenge
    const challenge = await prisma.challenge.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        image: validatedData.image,
        type: validatedData.type,
        difficulty: validatedData.difficulty,
        points: validatedData.points,
        badge: validatedData.badge,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        requirements: validatedData.requirements,
        status: 'ACTIVE',
      },
    })

    return NextResponse.json(challenge, { status: 201 })
  } catch (error) {
    console.error('Error creating challenge:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
