import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { body, imageUrl } = await request.json();

  if (!body) {
    return NextResponse.json({ error: "Post body is required" }, { status: 400 });
  }

  try {
    const post = await prisma.post.create({
      data: {
        body,
        imageUrl,
        userId: session.user.id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
