import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/database'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const challengeId = id
    const userId = session.user?.id

    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 })
    }

    // Check if challenge exists and is active
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId }
    })
    
    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    if (challenge.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Challenge is not active' },
        { status: 400 }
      )
    }

    // Check if challenge has ended
    if (challenge.endDate && new Date() > challenge.endDate) {
      return NextResponse.json(
        { error: 'Challenge has ended' },
        { status: 400 }
      )
    }

    // Check if user is already participating
    const existingParticipation = await prisma.challengeUser.findFirst({
      where: {
        userId,
        challengeId
      }
    })

    if (existingParticipation) {
      return NextResponse.json(
        { error: 'Already participating in this challenge' },
        { status: 400 }
      )
    }

    // Create user challenge participation
    const userChallenge = await prisma.challengeUser.create({
      data: {
        userId,
        challengeId,
        status: 'IN_PROGRESS',
        progress: 0,
        pointsEarned: 0
      }
    })

    return NextResponse.json({
      message: 'Successfully joined challenge',
      userChallenge
    })
  } catch (error) {
    console.error('Error joining challenge:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const challengeId = id
    const userId = session.user?.id

    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 })
    }

    // Get user's participation in this challenge
    const userChallenge = await prisma.challengeUser.findFirst({
      where: {
        userId,
        challengeId
      },
      include: {
        challenge: true
      }
    })

    if (!userChallenge) {
      return NextResponse.json(
        { error: 'Not participating in this challenge' },
        { status: 404 }
      )
    }

    return NextResponse.json(userChallenge)
  } catch (error) {
    console.error('Error fetching challenge participation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}