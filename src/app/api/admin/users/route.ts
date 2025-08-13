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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (role) {
      where.role = role;
    }
    
    if (status === 'verified') {
      where.verified = true;
    } else if (status === 'unverified') {
      where.verified = false;
    }

    // Get users with related data
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          verified: true,
          createdAt: true,
          updatedAt: true,
          hostProfile: {
            select: {
              verified: true,
              rating: true,
              totalReviews: true,
              totalEarnings: true
            }
          },
          _count: {
            select: {
              bookings: true,
              experiences: true,
              reviews: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.user.count({ where })
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userIds, action, value } = body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: 'User IDs are required' },
        { status: 400 }
      );
    }

    let updateData: any = {};

    switch (action) {
      case 'verify':
        updateData.verified = true;
        break;
      case 'unverify':
        updateData.verified = false;
        break;
      case 'changeRole':
        if (!value || !['USER', 'HOST', 'ADMIN'].includes(value)) {
          return NextResponse.json(
            { error: 'Invalid role value' },
            { status: 400 }
          );
        }
        updateData.role = value;
        break;
      case 'suspend':
        // For now, we'll use a custom field or handle this differently
        // This would typically involve a separate status field
        return NextResponse.json(
          { error: 'Suspend functionality not yet implemented' },
          { status: 501 }
        );
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    // Update users
    const result = await prisma.user.updateMany({
      where: {
        id: {
          in: userIds
        }
      },
      data: updateData
    });

    // TODO: Log admin action when AdminLog model is available
    console.log(`Admin ${session.user?.id} performed bulk_${action} on ${result.count} users`);

    return NextResponse.json({
      message: `Successfully updated ${result.count} users`,
      affectedCount: result.count
    });
  } catch (error) {
    console.error('Error updating users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
