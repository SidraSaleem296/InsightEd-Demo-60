import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params; // Post ID from the route parameter

  if (!id) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    // Fetch the post
    const post = await prisma.post.findUnique({
      where: { id },
      select: { likes: true }, // Fetch only likes
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const userId = session.user.id; // Current user's ID
    const isLiked = post.likes.includes(userId);

    // Update the likes array
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        likes: {
          set: isLiked
            ? post.likes.filter((likeId) => likeId !== userId) // Remove user ID if already liked
            : [...post.likes, userId], // Add user ID if not already liked
        },
      },
      select: { likes: true }, // Return updated likes array
    });

    // Respond with the updated like count and liked status
    return NextResponse.json({
      likeCount: updatedPost.likes.length,
      liked: !isLiked, // The new liked status
    });
  } catch (error) {
    console.error("Error liking/disliking post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
