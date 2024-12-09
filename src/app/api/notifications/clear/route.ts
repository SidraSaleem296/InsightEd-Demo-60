import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE() {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.notification.deleteMany({ where: { userId: session.user.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing notifications:", error);
    return NextResponse.json({ success: false, error: "Unknown error occurred" }, { status: 500 });
  }
}
