import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createProfileSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  displayName: z.string().min(1).max(50).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  website: z.string().url().optional(),
  interests: z.array(z.string()).max(10).optional(),
  isCreator: z.boolean().optional(),
});

const updateProfileSchema = z.object({
  displayName: z.string().min(1).max(50).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  website: z.string().url().optional(),
  interests: z.array(z.string()).max(10).optional(),
  coverPhoto: z.string().url().optional(),
  privacySettings: z.object({
    profileVisibility: z.enum(['PUBLIC', 'FRIENDS', 'PRIVATE']).optional(),
    showEmail: z.boolean().optional(),
    showLocation: z.boolean().optional(),
    allowMessages: z.boolean().optional(),
  }).optional(),
});

// GET /api/social/profile - Get current user's social profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        socialProfile: true,
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
      },
      socialProfile: user.socialProfile,
      stats: {
        followers: user._count.followers,
        following: user._count.following,
        posts: user._count.posts,
      },
    });
  } catch (error) {
    console.error('Error fetching social profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/social/profile - Create social profile
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createProfileSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { socialProfile: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.socialProfile) {
      return NextResponse.json({ error: 'Social profile already exists' }, { status: 400 });
    }

    // Check if username is already taken
    const existingProfile = await prisma.socialProfile.findUnique({
      where: { username: validatedData.username },
    });

    if (existingProfile) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
    }

    const socialProfile = await prisma.socialProfile.create({
      data: {
        userId: user.id,
        username: validatedData.username,
        displayName: validatedData.displayName,
        location: validatedData.location,
        website: validatedData.website,
        interests: JSON.stringify(validatedData.interests || []),
        isCreator: validatedData.isCreator || false,
        privacySettings: {
          profileVisibility: 'PUBLIC',
          showEmail: false,
          showLocation: true,
          allowMessages: true,
        },
      },
    });

    // Update user bio if provided
    if (body.bio) {
      await prisma.user.update({
        where: { id: user.id },
        data: { bio: body.bio },
      });
    }

    return NextResponse.json({ socialProfile }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    console.error('Error creating social profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/social/profile - Update social profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { socialProfile: true },
    });

    if (!user || !user.socialProfile) {
      return NextResponse.json({ error: 'Social profile not found' }, { status: 404 });
    }

    const updatedProfile = await prisma.socialProfile.update({
      where: { userId: user.id },
      data: {
        displayName: validatedData.displayName,
        location: validatedData.location,
        website: validatedData.website,
        interests: validatedData.interests ? JSON.stringify(validatedData.interests) : undefined,
        coverPhoto: validatedData.coverPhoto,
        privacySettings: validatedData.privacySettings
          ? { ...user.socialProfile.privacySettings as any, ...validatedData.privacySettings }
          : user.socialProfile.privacySettings,
      },
    });

    // Update user bio if provided
    if (validatedData.bio !== undefined) {
      await prisma.user.update({
        where: { id: user.id },
        data: { bio: validatedData.bio },
      });
    }

    return NextResponse.json({ socialProfile: updatedProfile });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    console.error('Error updating social profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}