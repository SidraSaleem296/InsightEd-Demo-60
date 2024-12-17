import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const session = await getAuthSession();
    const loggedInUserId = session?.user?.id || ""; // Get the logged-in user's ID

    // Fetch posts for the specified user
    const posts = await prisma.post.findMany({
      where: { userId }, // Filter posts by user ID
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true, // Include the user's name
            username: true, // Include the user's username
            image: true, // Include the user's profile image
          },
        },
        comments: {
          select: { id: true }, // Adjust as per your `comments` model
        },
      },
    });

    // Format posts data
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      body: post.body,
      imageUrl: post.imageUrl,
      likes: post.likes.length, // Count of likes
      likedByUser: post.likes.includes(loggedInUserId), // Check if logged-in user liked the post
      comments: post.comments.length, // Total number of comments
      user: {
        id: post.user?.id,
        name: post.user?.name || "Unknown User",
        username: post.user?.username || "unknown",
        image: post.user?.image || "/default-avatar.png",
      },
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
