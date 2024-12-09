import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { targetUserId } = await request.json();

  if (!targetUserId) {
    return NextResponse.json({ error: "Target user ID is required" }, { status: 400 });
  }

  try {
    // Fetch the current user's followingIds and the target user's followerIds
    const [currentUser, targetUser] = await prisma.$transaction([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { followingIds: true, name: true },
      }),
      prisma.user.findUnique({
        where: { id: targetUserId },
        select: { followerIds: true },
      }),
    ]);

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: "One or both users not found" }, { status: 404 });
    }

    const isFollowing = currentUser.followingIds.includes(targetUserId);

    if (isFollowing) {
      // Unfollow logic: Remove targetUserId from followingIds and userId from followerIds
      await prisma.$transaction([
        prisma.user.update({
          where: { id: session.user.id },
          data: {
            followingIds: {
              set: currentUser.followingIds.filter((id) => id !== targetUserId),
            },
          },
        }),
        prisma.user.update({
          where: { id: targetUserId },
          data: {
            followerIds: {
              set: targetUser.followerIds.filter((id) => id !== session.user.id),
            },
          },
        }),
        prisma.notification.create({
          data: {
            userId: targetUserId, // The user being followed gets the notification
            type: "follow",
            message: `${currentUser.name || "Someone"} followed you.`,
            postId: session.user.id
          },
        }),
      ]);

      return NextResponse.json({ message: "Unfollowed successfully" });
    } else {
      // Follow logic: Add targetUserId to followingIds and userId to followerIds
      await prisma.$transaction([
        prisma.user.update({
          where: { id: session.user.id },
          data: {
            followingIds: {
              push: targetUserId,
            },
          },
        }),
        prisma.user.update({
          where: { id: targetUserId },
          data: {
            followerIds: {
              push: session.user.id,
            },
          },
        }),
      ]);

      return NextResponse.json({ message: "Followed successfully" });
    }
  } catch (error) {
    console.error("Error in follow/unfollow logic:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
