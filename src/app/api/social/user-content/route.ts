import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/database';

// Helper function to parse JSON arrays from string
function parseJsonArray(jsonString: string | null): string[] {
  if (!jsonString) return [];
  try {
    return JSON.parse(jsonString);
  } catch {
    return [];
  }
}

// Helper function to stringify arrays for storage
function stringifyArray(array: string[]): string {
  return JSON.stringify(array);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const type = searchParams.get('type');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (type) {
      where.type = type;
    }

    const content = await prisma.userGeneratedContent.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            socialProfile: {
              select: {
                displayName: true,
                isVerified: true,
              }
            }
          }
        }
      }
    });

    // Parse JSON arrays for response
    const formattedContent = content.map((item: any) => ({
      ...item,
      mediaUrls: parseJsonArray(item.mediaUrls),
      tags: parseJsonArray(item.tags),
    }));

    return NextResponse.json({ content: formattedContent });
  } catch (error) {
    console.error('Error fetching user content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      type, 
      title, 
      description, 
      mediaUrls = [], 
      tags = [], 
      location,
      experienceId,
      challengeId 
    } = body;

    const content = await prisma.userGeneratedContent.create({
      data: {
        userId: session.user.id,
        type,
        title,
        description,
        mediaUrls: stringifyArray(mediaUrls),
        tags: stringifyArray(tags),
        location,
        experienceId: experienceId || null,
        challengeId: challengeId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            socialProfile: {
              select: {
                displayName: true,
                isVerified: true,
              }
            }
          }
        }
      }
    });

    // Parse JSON arrays for response
    const formattedContent = {
      ...content,
      mediaUrls: parseJsonArray(content.mediaUrls),
      tags: parseJsonArray(content.tags),
    };

    return NextResponse.json({ content: formattedContent });
  } catch (error) {
    console.error('Error creating user content:', error);
    return NextResponse.json(
      { error: 'Failed to create user content' },
      { status: 500 }
    );
  }
}