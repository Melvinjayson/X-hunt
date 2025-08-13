import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/database'
import { z } from 'zod'
import Stripe from 'stripe'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Validation schema for creating payment intent
const createPaymentIntentSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('usd'),
  paymentMethodId: z.string().optional(),
})

// Validation schema for confirming payment
const confirmPaymentSchema = z.object({
  paymentIntentId: z.string().min(1, 'Payment Intent ID is required'),
  bookingId: z.string().min(1, 'Booking ID is required'),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('bookingId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: any = {
      booking: {
        userId: user.id,
      },
    }

    if (bookingId) {
      where.bookingId = bookingId
    }

    if (status) {
      where.status = status
    }

    const skip = (page - 1) * limit

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: {
          booking: {
            include: {
              experience: {
                select: {
                  title: true,
                  location: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.payment.count({ where }),
    ])

    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const { action } = body

    if (action === 'create-payment-intent') {
      // Validate request body
      const validationResult = createPaymentIntentSchema.safeParse(body)
      
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

      const { bookingId, amount, currency, paymentMethodId } = validationResult.data

      // Verify booking belongs to user
      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
          userId: user.id,
        },
        include: {
          experience: {
            include: {
              host: true,
            },
          },
        },
      })

      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found or unauthorized' },
          { status: 404 }
        )
      }

      // Check if payment already exists
      const existingPayment = await prisma.payment.findFirst({
        where: {
          bookingId,
          status: { in: ['PENDING', 'COMPLETED'] },
        },
      })

      if (existingPayment) {
        return NextResponse.json(
          { error: 'Payment already exists for this booking' },
          { status: 400 }
        )
      }

      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        payment_method: paymentMethodId,
        confirmation_method: 'manual',
        confirm: !!paymentMethodId,
        metadata: {
          bookingId,
          userId: user.id,
          experienceId: booking.experienceId,
        },
      })

      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          bookingId,
          amount,
          currency: currency.toUpperCase(),
          status: 'PENDING',
          stripePaymentId: paymentIntent.id,
          paymentMethod: paymentMethodId ? 'CREDIT_CARD' : 'BANK_TRANSFER',
        },
      })

      return NextResponse.json({
        payment,
        clientSecret: paymentIntent.client_secret,
        requiresAction: paymentIntent.status === 'requires_action',
      })
    }

    if (action === 'confirm-payment') {
      // Validate request body
      const validationResult = confirmPaymentSchema.safeParse(body)
      
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

      const { paymentIntentId, bookingId } = validationResult.data

      // Retrieve payment intent from Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

      // Update payment status based on Stripe status
      let paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' = 'PENDING'
      
      if (paymentIntent.status === 'succeeded') {
        paymentStatus = 'COMPLETED'
      } else if (paymentIntent.status === 'canceled') {
        paymentStatus = 'FAILED'
      }

      // Find payment by stripePaymentId first
      const existingPayment = await prisma.payment.findFirst({
        where: {
          stripePaymentId: paymentIntentId,
        },
      })

      if (!existingPayment) {
        return NextResponse.json(
          { error: 'Payment not found' },
          { status: 404 }
        )
      }

      // Update payment and booking status
      const [payment, booking] = await Promise.all([
        prisma.payment.update({
          where: {
            id: existingPayment.id,
          },
          data: {
            status: paymentStatus,
            processedAt: paymentStatus === 'COMPLETED' ? new Date() : null,
          },
        }),
        paymentStatus === 'COMPLETED' ? prisma.booking.update({
          where: { id: bookingId },
          data: { status: 'CONFIRMED' },
        }) : null,
      ])

      // If payment completed, create notification for host
      if (paymentStatus === 'COMPLETED' && booking) {
        const bookingWithDetails = await prisma.booking.findUnique({
          where: { id: bookingId },
          include: {
            experience: {
              include: {
                host: true,
              },
            },
            user: true,
          },
        })

        if (bookingWithDetails?.experience.host) {
          await prisma.notification.create({
            data: {
              userId: bookingWithDetails.experience.host.id,
              type: 'BOOKING_CONFIRMED',
              title: 'New Booking Confirmed',
              message: `${bookingWithDetails.user.name} has confirmed their booking for "${bookingWithDetails.experience.title}".`,
              data: {
                bookingId,
                experienceId: bookingWithDetails.experienceId,
              },
            },
          })
        }
      }

      return NextResponse.json({
        payment,
        status: paymentIntent.status,
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error processing payment:', error)
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    )
  }
}
