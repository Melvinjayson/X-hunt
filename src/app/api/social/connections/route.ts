import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const followUserSchema = z.object({
  userId: z.string(),
});

// GET /api/social/connections - Get user's connections
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'following';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let connections;
    let totalCount;

    if (type === 'following') {
      connections = await prisma.userConnection.findMany({
        where: {
          followerId: user.id,
          status: 'FOLLOWING',
        },
        include: {
          following: {
            include: {
              socialProfile: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      totalCount = await prisma.userConnection.count({
        where: {
          followerId: user.id,
          status: 'FOLLOWING',
        },
      });
    } else if (type === 'followers') {
      connections = await prisma.userConnection.findMany({
        where: {
          followingId: user.id,
          status: 'FOLLOWING',
        },
        include: {
          follower: {
            include: {
              socialProfile: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      totalCount = await prisma.userConnection.count({
        where: {
          followingId: user.id,
          status: 'FOLLOWING',
        },
      });
    } else {
      return NextResponse.json({ error: 'Invalid connection type' }, { status: 400 });
    }

    const formattedConnections = connections.map((connection: any) => {
      const targetUser = type === 'following' ? connection.following : connection.follower;
      return {
        id: connection.id,
        user: {
          id: targetUser.id,
          name: targetUser.name,
          avatar: targetUser.avatar,
          socialProfile: targetUser.socialProfile,
        },
        createdAt: connection.createdAt,
      };
    });

    return NextResponse.json({
      connections: formattedConnections,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching connections:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/social/connections - Follow a user
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId } = followUserSchema.parse(body);

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (currentUser.id === userId) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    // Check if target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    // Check if already following
    const existingConnection = await prisma.userConnection.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: userId,
        },
      },
    });

    if (existingConnection) {
      if (existingConnection.status === 'FOLLOWING') {
        return NextResponse.json({ error: 'Already following this user' }, { status: 400 });
      }
      
      // Update existing connection status
      const updatedConnection = await prisma.userConnection.update({
        where: { id: existingConnection.id },
        data: { status: 'FOLLOWING' },
      });

      return NextResponse.json({ connection: updatedConnection });
    }

    // Create new connection
    const connection = await prisma.userConnection.create({
      data: {
        followerId: currentUser.id,
        followingId: userId,
        status: 'FOLLOWING',
      },
    });

    // Update social stats
    await prisma.socialProfile.updateMany({
      where: { userId: currentUser.id },
      data: {
        socialStats: {
          // This would need to be handled more carefully in a real app
          // For now, we'll let the frontend handle stats updates
        },
      },
    });

    return NextResponse.json({ connection }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    console.error('Error following user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/social/connections - Unfollow a user
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const connection = await prisma.userConnection.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: userId,
        },
      },
    });

    if (!connection) {
      return NextResponse.json({ error: 'Connection not found' }, { status: 404 });
    }

    await prisma.userConnection.delete({
      where: { id: connection.id },
    });

    return NextResponse.json({ message: 'Successfully unfollowed user' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
