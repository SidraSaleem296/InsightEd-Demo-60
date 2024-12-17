import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    // Fetch all users
    const users = await prisma.user.findMany({
      select: { id: true }, // Fetch only the IDs
    });

    // Create notifications for all users
    const notifications = users.map((user) => ({
      userId: user.id,
      type: "custom", // Specify notification type
      message,
    }));

    await prisma.notification.createMany({ data: notifications });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
