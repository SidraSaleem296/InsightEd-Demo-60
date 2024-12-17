import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, type, message, postId } = await request.json();

  try {
    await prisma.notification.create({
      data: {
        userId,
        type,
        message,
        postId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json({ success: false, error: "Unknown error occurred" }, { status: 500 });
  }
}
