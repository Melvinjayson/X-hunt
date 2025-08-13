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
    const skip = (page - 1) * limit;

    const communities = await prisma.community.findMany({
      skip,
      take: limit,
      orderBy: { memberCount: 'desc' },
      include: {
        _count: {
          select: {
            posts: true,
          }
        }
      }
    });

    // Parse JSON arrays for response
    const formattedCommunities = communities.map((community: any) => ({
      ...community,
      rules: parseJsonArray(community.rules),
    }));

    return NextResponse.json({ communities: formattedCommunities });
  } catch (error) {
    console.error('Error fetching communities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch communities' },
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
    const { name, description, category, isPrivate = false, rules = [] } = body;

    // Generate slug from name
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const community = await prisma.community.create({
      data: {
        name,
        slug,
        description,
        category,
        isPrivate,
        rules: stringifyArray(rules),
        // Note: createdById field doesn't exist in schema, removing for now
      },
      include: {
        _count: {
          select: {
            posts: true,
          }
        }
      }
    });

    // Parse JSON arrays for response
    const formattedCommunity = {
      ...community,
      rules: parseJsonArray(community.rules),
    };

    return NextResponse.json({ community: formattedCommunity });
  } catch (error) {
    console.error('Error creating community:', error);
    return NextResponse.json(
      { error: 'Failed to create community' },
      { status: 500 }
    );
  }
}
