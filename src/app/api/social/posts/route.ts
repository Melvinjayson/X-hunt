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

    const posts = await prisma.socialPost.findMany({
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
        },
        community: {
          select: {
            id: true,
            name: true,
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            shares: true,
          }
        }
      }
    });

    // Parse JSON arrays for response
    const formattedPosts = posts.map((post: any) => ({
      ...post,
      images: parseJsonArray(post.images),
      videos: parseJsonArray(post.videos),
    }));

    return NextResponse.json({ posts: formattedPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
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
    const { content, images = [], videos = [], communityId, type = 'TEXT' } = body;

    const newPost = await prisma.socialPost.create({
      data: {
        content,
        images: stringifyArray(images),
        videos: stringifyArray(videos),
        type,
        userId: session.user.id,
        communityId: communityId || null,
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
        },
        community: {
          select: {
            id: true,
            name: true,
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            shares: true,
          }
        }
      }
    });

    // Parse JSON arrays for response
    const formattedPost = {
      ...newPost,
      images: parseJsonArray(newPost.images),
      videos: parseJsonArray(newPost.videos),
    };

    return NextResponse.json({ post: formattedPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
