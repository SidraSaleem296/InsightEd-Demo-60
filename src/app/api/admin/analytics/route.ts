import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch analytics data
    const totalUsers = await prisma.user.count();
    const subscribedUsers = await prisma.userSubscription.count();
    const totalCourses = await prisma.course.count();
    const totalActivities = await prisma.activity.count();
    const feedbackUsers = await prisma.activityLog.count();

    // Aggregate account creation by date
    const accountsByDate = await prisma.user.groupBy({
      by: ["createdAt"],
      _count: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      totalUsers,
      subscribedUsers,
      totalCourses,
      totalActivities,
      feedbackUsers,
      accountsByDate: accountsByDate.map(({ createdAt, _count }) => ({
        date: createdAt.toISOString().split("T")[0],
        count: _count.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
