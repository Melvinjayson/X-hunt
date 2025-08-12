import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/database'
import { updateChallengeProgress } from '@/lib/challengeService'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
        break
      case 'payment_intent.canceled':
        await handlePaymentCanceled(event.data.object as Stripe.PaymentIntent)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const bookingId = paymentIntent.metadata.bookingId
    
    if (!bookingId) {
      console.error('No booking ID found in payment intent metadata')
      return
    }

    // Update booking status to confirmed
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CONFIRMED',
        paymentStatus: 'COMPLETED',
        updatedAt: new Date()
      },
      include: {
        experience: true,
        user: true
      }
    })

    if (!booking) {
      console.error('Booking not found:', bookingId)
      return
    }

    // Update challenge progress for the user
    try {
      await updateChallengeProgress(
        booking.userId,
        booking.experienceId,
        booking.experience.category
      )
    } catch (challengeError) {
      console.error('Error updating challenge progress:', challengeError)
      // Don't fail the webhook if challenge update fails
    }

    // Create notification for successful booking
    await prisma.notification.create({
      data: {
        userId: booking.userId,
        type: 'BOOKING_CONFIRMED',
        title: 'Booking Confirmed',
        message: `Your booking for "${booking.experience.title}" has been confirmed!`,
        data: {
          bookingId: booking.id,
          experienceId: booking.experienceId
        }
      }
    })

    console.log('Payment success handled for booking:', bookingId)
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    const bookingId = paymentIntent.metadata.bookingId
    
    if (!bookingId) {
      console.error('No booking ID found in payment intent metadata')
      return
    }

    // Update booking status to failed
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        paymentStatus: 'FAILED',
        updatedAt: new Date()
      },
      include: {
        experience: true
      }
    })

    if (!booking) {
      console.error('Booking not found:', bookingId)
      return
    }

    // Create notification for failed payment
     await prisma.notification.create({
       data: {
         userId: booking.userId,
         type: 'SYSTEM',
         title: 'Payment Failed',
         message: `Payment failed for your booking of "${booking.experience.title}". Please try again.`,
         data: {
           bookingId: booking.id,
           experienceId: booking.experienceId
         }
       }
     })

    console.log('Payment failure handled for booking:', bookingId)
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

async function handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent) {
  try {
    const bookingId = paymentIntent.metadata.bookingId
    
    if (!bookingId) {
      console.error('No booking ID found in payment intent metadata')
      return
    }

    // Update booking status to cancelled
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        paymentStatus: 'FAILED',
        updatedAt: new Date()
      },
      include: {
        experience: true
      }
    })

    if (!booking) {
      console.error('Booking not found:', bookingId)
      return
    }

    // Create notification for cancelled payment
    await prisma.notification.create({
      data: {
        userId: booking.userId,
        type: 'BOOKING_CANCELLED',
        title: 'Payment Cancelled',
        message: `Payment was cancelled for your booking of "${booking.experience.title}".`,
        data: {
          bookingId: booking.id,
          experienceId: booking.experienceId
        }
      }
    })

    console.log('Payment cancellation handled for booking:', bookingId)
  } catch (error) {
    console.error('Error handling payment cancellation:', error)
  }
}