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
    const status = searchParams.get('status');
    const size = searchParams.get('size');
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { website: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (status) {
      where.status = status;
    }
    
    if (size) {
      where.size = size;
    }

    // Get organizations with member count
    const [organizations, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          logo: true,
          website: true,
          industry: true,
          size: true,
          plan: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          members: {
            select: {
              id: true,
              role: true,
              user: {
                select: {
                  name: true,
                  email: true
                }
              }
            }
          },
          bookings: {
            select: {
              id: true,
              booking: {
                select: {
                  totalAmount: true
                }
              }
            }
          },
          _count: {
            select: {
              members: true,
              bookings: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.organization.count({ where })
    ]);

    // Calculate total spending for each organization
    const organizationsWithStats = organizations.map(org => {
      const totalSpent = org.bookings.reduce((sum, orgBooking) => {
        return sum + (orgBooking.booking?.totalAmount || 0);
      }, 0);
      
      const adminUser = org.members.find(member => member.role === 'OWNER');
      
      return {
        id: org.id,
        name: org.name,
        slug: org.slug,
        description: org.description,
        logo: org.logo,
        website: org.website,
        industry: org.industry,
        size: org.size,
        plan: org.plan,
        status: org.status,
        memberCount: org._count.members,
        totalBookings: org._count.bookings,
        totalSpent,
        admin: adminUser?.user,
        createdAt: org.createdAt,
        updatedAt: org.updatedAt
      };
    });

    return NextResponse.json({
      organizations: organizationsWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, size, plan, adminEmail } = body;

    // Validate required fields
    if (!name || !slug || !adminEmail) {
      return NextResponse.json(
        { error: 'Name, slug, and admin email are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingOrg = await prisma.organization.findUnique({
      where: { slug }
    });

    if (existingOrg) {
      return NextResponse.json(
        { error: 'Organization with this slug already exists' },
        { status: 409 }
      );
    }

    // Find admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 404 }
      );
    }

    // Create organization
    const organization = await prisma.organization.create({
      data: {
        name,
        slug,
        size: size || 'SMALL',
        plan: plan || 'FREE',
        status: 'ACTIVE',
        members: {
          create: {
            userId: adminUser.id,
            role: 'OWNER'
          }
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(organization, { status: 201 });
  } catch (error) {
    console.error('Error creating organization:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
