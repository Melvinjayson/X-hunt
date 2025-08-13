import { NextRequest, NextResponse } from 'next/server'
import { checkDatabaseHealth } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now()
    
    // Check database connectivity
    const dbHealth = await checkDatabaseHealth()
    
    // Check environment variables
    const requiredEnvVars = [
      'DATABASE_URL',
      'NEXTAUTH_SECRET',
      'NEXTAUTH_URL',
    ]
    
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar])
    
    // Calculate response time
    const responseTime = Date.now() - startTime
    
    // Determine overall health status
    const isHealthy = dbHealth.status === 'healthy' && missingEnvVars.length === 0
    
    const healthData = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: `${responseTime}ms`,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: {
          status: dbHealth.status,
          error: dbHealth.status === 'unhealthy' ? (dbHealth as any).error : undefined,
          timestamp: dbHealth.timestamp,
        },
        environment: {
          status: missingEnvVars.length === 0 ? 'healthy' : 'unhealthy',
          missingVariables: missingEnvVars,
        },
        memory: {
          status: 'healthy',
          usage: process.memoryUsage(),
        },
      },
    }
    
    // Return appropriate status code
    const statusCode = isHealthy ? 200 : 503
    
    return NextResponse.json(healthData, { status: statusCode })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    )
  }
}

// Support HEAD requests for simple health checks
export async function HEAD(request: NextRequest) {
  try {
    const dbHealth = await checkDatabaseHealth()
    const isHealthy = dbHealth.status === 'healthy'
    
    return new NextResponse(null, {
      status: isHealthy ? 200 : 503,
      headers: {
        'X-Health-Status': isHealthy ? 'healthy' : 'unhealthy',
        'X-Health-Timestamp': new Date().toISOString(),
      },
    })
  } catch (error) {
    return new NextResponse(null, {
      status: 503,
      headers: {
        'X-Health-Status': 'unhealthy',
        'X-Health-Timestamp': new Date().toISOString(),
      },
    })
  }
}
