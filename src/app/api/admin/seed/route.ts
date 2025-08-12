import { NextRequest, NextResponse } from 'next/server'
import { seedDatabase } from '@/scripts/seedData'

export async function POST(request: NextRequest) {
  try {
    // Only allow seeding in development environment
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Seeding is only allowed in development environment' },
        { status: 403 }
      )
    }

    // Optional: Add authentication check here for admin users
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.ADMIN_SEED_TOKEN
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('Starting database seeding via API...')
    const result = await seedDatabase()
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 })
    } else {
      return NextResponse.json(result, { status: 500 })
    }
  } catch (error) {
    console.error('Error in seed API:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to seed database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Database seeding endpoint',
      usage: 'POST to this endpoint to seed the database with sample data',
      note: 'Only available in development environment'
    },
    { status: 200 }
  )
}