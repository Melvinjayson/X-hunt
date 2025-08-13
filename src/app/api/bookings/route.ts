import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/database'
import { z } from 'zod'

// Validation schema for creating bookings
const createBookingSchema = z.object({
  experienceId: z.string().min(1, 'Experience ID is required'),
  date: z.string().transform((str) => new Date(str)),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  participants: z.number().positive('Participants must be positive'),
  specialRequests: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const where: any = {
      userId: user.id,
    }

    if (status) {
      where.status = status
    }

    const skip = (page - 1) * limit

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          experience: {
            select: {
              id: true,
              title: true,
              images: true,
              location: true,
              duration: true,
              host: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
          },
          payment: {
            select: {
              id: true,
              status: true,
              amount: true,
              currency: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ])

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
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
    const validatedData = createBookingSchema.parse(body)

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get experience details
    const experience = await prisma.experience.findUnique({
      where: { id: validatedData.experienceId },
      include: {
        host: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      )
    }

    if (experience.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Experience is not available for booking' },
        { status: 400 }
      )
    }

    // Check if user is trying to book their own experience
    if (experience.hostId === user.id) {
      return NextResponse.json(
        { error: 'You cannot book your own experience' },
        { status: 400 }
      )
    }

    // Calculate pricing
    const totalAmount = experience.price * validatedData.participants
    const platformFee = totalAmount * 0.1 // 10% platform fee
    const hostEarnings = totalAmount - platformFee

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        experienceId: validatedData.experienceId,
        userId: user.id,
        date: validatedData.date,
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
        participants: validatedData.participants,
        totalAmount,
        platformFee,
        hostEarnings,
        specialRequests: validatedData.specialRequests,
      },
      include: {
        experience: {
          select: {
            id: true,
            title: true,
            images: true,
            location: true,
            duration: true,
            host: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    })

    // Create notification for host
    await prisma.notification.create({
      data: {
        userId: experience.hostId,
        type: 'BOOKING_CONFIRMED',
        title: 'New Booking Received',
        message: `You have a new booking for ${experience.title} on ${validatedData.date.toDateString()}`,
        data: {
          bookingId: booking.id,
          experienceId: experience.id,
        },
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
