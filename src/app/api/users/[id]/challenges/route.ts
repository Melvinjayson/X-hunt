import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { getUserActiveChallenges, getUserCompletedChallenges } from '@/lib/challengeService'

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

    // Users can only see their own challenges
    if (session.user?.id !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'active'

    let challenges
    
    if (status === 'active' || status === 'in-progress') {
      challenges = await getUserActiveChallenges(id)
    } else if (status === 'completed') {
      challenges = await getUserCompletedChallenges(id)
    } else {
      // Get both active and completed
      const [active, completed] = await Promise.all([
        getUserActiveChallenges(id),
      getUserCompletedChallenges(id)
      ])
      challenges = { active, completed }
    }

    return NextResponse.json(challenges)
  } catch (error) {
    console.error('Error fetching user challenges:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
