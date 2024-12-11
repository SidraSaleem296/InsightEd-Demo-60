import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: id },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const { comment } = await request.json();

  if (!id || !comment) {
    return NextResponse.json(
      { error: "Post ID and comment content are required" },
      { status: 400 }
    );
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        body: comment,
        postId: id,
        userId: session.user.id,
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
      },
    });

    // Fetch the post to identify its owner
    const post = await prisma.post.findUnique({
      where: { id: id },
      select: { userId: true },
    });

    // Create a notification for the post owner
    if (post?.userId) {
      await prisma.notification.create({
        data: {
          userId: post.userId, // Post owner's ID
          type: "comment", // Notification type
          message: `${session.user.name || "Someone"} commented on your post.`, // Notification message
          postId: session.user.id
        },
      });
    }

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
