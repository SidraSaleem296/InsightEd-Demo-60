import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // Adjust the import path if necessary

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Fetch the user details
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' }, // Order posts by most recent
          include: { comments: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch followers
    const followers = await prisma.user.findMany({
      where: { followingIds: { has: id } },
      select: { id: true, name: true, username: true, image: true },
    });

    // Build the response
    const response = {
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      email: user.email,
      image: user.image,
      coverImage: user.coverImage,
      followerCount: followers.length,
      followers,
      posts: user.posts.map((post) => ({
        id: post.id,
        body: post.body,
        imageUrl: post.imageUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likeCount: post.likes.length,
        commentCount: post.comments.length,
      })),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
