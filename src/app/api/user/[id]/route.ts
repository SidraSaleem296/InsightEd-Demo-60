import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Fetch the user details
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        bio: true,
        image: true,
        coverImage: true,
        followerIds: true,
        followingIds: true,
        posts: {
          orderBy: { createdAt: "desc" },
          include: { comments: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch followers
    const followers = await prisma.user.findMany({
      where: { followingIds: { has: id } },
      select: { id: true, name: true, username: true, image: true },
    });

    const isFollowing = session
      ? user.followerIds.includes(session.user.id)
      : false;

    // Build the response
    const response = {
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      email: user.email,
      image: user.image,
      coverImage: user.coverImage,
      followerCount: user.followerIds.length,
      followingCount: user.followingIds.length,
      followers,
      isFollowing,
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
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const updates = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updates,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}