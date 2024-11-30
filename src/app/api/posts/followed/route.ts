import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user.followingIds || session.user.followingIds.length === 0) {
      return NextResponse.json([]); // Return an empty array if no following
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: { in: session.user.followingIds },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        comments: true, // Include comments for each post
      },
      orderBy: { createdAt: "desc" }, // Order by most recent
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
