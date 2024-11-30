// /api/user/[id]/following/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const following = await prisma.user.findMany({
      where: {
        id: {
          in: (await prisma.user.findUnique({ where: { id }, select: { followingIds: true } }))?.followingIds || [],
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
      },
    });

    return NextResponse.json(following, { status: 200 });
  } catch (error) {
    console.error("Error fetching following:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
