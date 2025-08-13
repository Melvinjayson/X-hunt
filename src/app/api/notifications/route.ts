import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/database'
import { z } from 'zod'

// Validation schema for creating notifications
const createNotificationSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  type: z.enum([
    'BOOKING_CONFIRMED',
    'BOOKING_CANCELLED',
    'EXPERIENCE_REMINDER',
    'REVIEW_REQUEST',
    'CHALLENGE_COMPLETED',
    'REWARD_EARNED',
    'PAYMENT_RECEIVED',
    'MESSAGE',
    'SYSTEM'
  ]),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  data: z.record(z.any()).optional(),
})

// Validation schema for updating notification status
const updateNotificationSchema = z.object({
  read: z.boolean().optional(),
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
    const type = searchParams.get('type')
    const read = searchParams.get('read')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {
      userId: user.id,
    }

    if (type) {
      where.type = type
    }

    if (read !== null) {
      where.read = read === 'true'
    }

    const skip = (page - 1) * limit

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: {
          userId: user.id,
          read: false,
        },
      }),
    ])

    return NextResponse.json({
      notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      unreadCount,
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
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

    if (action === 'create') {
      // Only allow admins or system to create notifications for other users
      if (user.role !== 'ADMIN' && body.userId !== user.id) {
        return NextResponse.json(
          { error: 'Forbidden: Cannot create notifications for other users' },
          { status: 403 }
        )
      }

      // Validate request body
      const validationResult = createNotificationSchema.safeParse(body)
      
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

      // Verify target user exists
      const targetUser = await prisma.user.findUnique({
        where: { id: validatedData.userId },
      })

      if (!targetUser) {
        return NextResponse.json(
          { error: 'Target user not found' },
          { status: 404 }
        )
      }

      // Create notification
      const notification = await prisma.notification.create({
        data: {
          userId: validatedData.userId,
          type: validatedData.type,
          title: validatedData.title,
          message: validatedData.message,
          data: validatedData.data || {},
        },
      })

      return NextResponse.json(notification, { status: 201 })
    }

    if (action === 'mark-read') {
      const { notificationIds } = body

      if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
        return NextResponse.json(
          { error: 'Notification IDs are required' },
          { status: 400 }
        )
      }

      // Update notifications to read
      const updatedNotifications = await prisma.notification.updateMany({
        where: {
          id: { in: notificationIds },
          userId: user.id, // Ensure user can only update their own notifications
        },
        data: {
          read: true,
        },
      })

      return NextResponse.json({
        message: `${updatedNotifications.count} notifications marked as read`,
        count: updatedNotifications.count,
      })
    }

    if (action === 'mark-all-read') {
      // Mark all unread notifications as read
      const updatedNotifications = await prisma.notification.updateMany({
        where: {
          userId: user.id,
          read: false,
        },
        data: {
          read: true,
        },
      })

      return NextResponse.json({
        message: `${updatedNotifications.count} notifications marked as read`,
        count: updatedNotifications.count,
      })
    }

    if (action === 'archive') {
      const { notificationIds } = body

      if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
        return NextResponse.json(
          { error: 'Notification IDs are required' },
          { status: 400 }
        )
      }

      // Delete notifications (since archive field doesn't exist)
      const deletedNotifications = await prisma.notification.deleteMany({
        where: {
          id: { in: notificationIds },
          userId: user.id,
        },
      })

      return NextResponse.json({
        message: `${deletedNotifications.count} notifications deleted`,
        count: deletedNotifications.count,
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error processing notification:', error)
    return NextResponse.json(
      { error: 'Failed to process notification' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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
    const notificationId = searchParams.get('id')

    if (!notificationId) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // Validate request body
    const validationResult = updateNotificationSchema.safeParse(body)
    
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

    // Verify notification exists and belongs to user
    const existingNotification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: user.id,
      },
    })

    if (!existingNotification) {
      return NextResponse.json(
        { error: 'Notification not found or unauthorized' },
        { status: 404 }
      )
    }

    // Update notification
    const updateData: any = {}
    
    if (validatedData.read !== undefined) {
      updateData.read = validatedData.read
    }

    const notification = await prisma.notification.update({
      where: { id: notificationId },
      data: updateData,
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Error updating notification:', error)
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
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
    const notificationId = searchParams.get('id')

    if (!notificationId) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      )
    }

    // Verify notification exists and belongs to user
    const existingNotification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: user.id,
      },
    })

    if (!existingNotification) {
      return NextResponse.json(
        { error: 'Notification not found or unauthorized' },
        { status: 404 }
      )
    }

    // Delete notification
    await prisma.notification.delete({
      where: { id: notificationId },
    })

    return NextResponse.json({ message: 'Notification deleted successfully' })
  } catch (error) {
    console.error('Error deleting notification:', error)
    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    )
  }
}
