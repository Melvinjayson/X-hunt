import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '30d';
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    
    // Calculate date range
    let dateFilter: { gte?: Date; lte?: Date } = {};
    
    if (startDateParam && endDateParam) {
      dateFilter = {
        gte: new Date(startDateParam),
        lte: new Date(endDateParam)
      };
    } else {
      const now = new Date();
      let startDate = new Date();
      
      switch (timeRange) {
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(now.getDate() - 90);
          break;
        case '1y':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          startDate.setDate(now.getDate() - 30);
      }
      
      dateFilter = { gte: startDate };
    }

    // Get analytics data
    const [totalUsers, totalHosts, totalBookings, totalExperiences] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'HOST' } }),
      prisma.booking.count({ where: { createdAt: dateFilter } }),
      prisma.experience.count()
    ]);

    // Get revenue data
    const bookings = await prisma.booking.findMany({
      where: {
        createdAt: dateFilter,
        status: 'CONFIRMED'
      },
      select: {
        totalAmount: true,
        participants: true,
        experienceId: true
      }
    });

    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

    // Get user growth data (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newUsers = await prisma.user.count({
      where: {
        createdAt: { gte: thirtyDaysAgo }
      }
    });

    // Get top experiences
    const topExperiences = await prisma.experience.findMany({
      where: {
        bookings: {
          some: {
            createdAt: dateFilter
          }
        }
      },
      select: {
        id: true,
        title: true,
        totalBookings: true,
        rating: true
      },
      orderBy: {
        totalBookings: 'desc'
      },
      take: 5
    });

    // Mock data for features not yet implemented
    const mockTopOrganizations = [
      { id: '1', name: 'Adventure Corp', bookings: 45, revenue: 12500 },
      { id: '2', name: 'Culture Tours', bookings: 38, revenue: 9800 },
      { id: '3', name: 'Food Explorers', bookings: 32, revenue: 8600 }
    ];

    const mockConversionData = {
      viewToBooking: 12.5,
      signupToFirstBooking: 28.3,
      repeatBookingRate: 45.2
    };

    const mockGeographicData = [
      { country: 'United States', users: 1250, bookings: 890 },
      { country: 'Canada', users: 340, bookings: 245 },
      { country: 'United Kingdom', users: 280, bookings: 195 }
    ];

    const analytics = {
      overview: {
        totalUsers,
        totalHosts,
        totalBookings,
        totalExperiences,
        totalRevenue,
        averageBookingValue: bookings.length > 0 ? totalRevenue / bookings.length : 0,
        newUsers,
        userGrowthRate: 15.2 // Mock percentage
      },
      topExperiences,
      topOrganizations: mockTopOrganizations,
      conversionMetrics: mockConversionData,
      geographicData: mockGeographicData,
      revenueByMonth: [], // Mock data - would need time series implementation
      usersByMonth: [] // Mock data - would need time series implementation
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching admin analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
