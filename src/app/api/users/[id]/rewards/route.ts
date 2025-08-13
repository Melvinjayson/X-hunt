import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/database'

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

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const rarity = searchParams.get('rarity')
    const limit = searchParams.get('limit')

    // Users can only see their own rewards
    if (session.user?.id !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const where: any = {
      userId: id
    }

    if (type) {
      where.type = type
    }

    const rewards = await prisma.reward.findMany({
       where,
       orderBy: {
         earnedAt: 'desc'
       },
       take: limit ? parseInt(limit) : undefined
     })

    return NextResponse.json(rewards)
  } catch (error) {
    console.error('Error fetching user rewards:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
