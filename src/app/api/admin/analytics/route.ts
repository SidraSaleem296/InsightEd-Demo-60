import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch total counts
    const totalUsers = await prisma.user.count();
    const subscribedUsers = await prisma.userSubscription.count();
    const totalCourses = await prisma.course.count();
    const totalActivities = await prisma.activity.count();
    const totalFeedbackSubmitted = await prisma.feedback.count();
    const feedbackUsers = await prisma.feedback.count({
      where: {
        isAnonymous: false,
      },
    });

    const totalDocumentsUploaded = await prisma.activityLog.aggregate({
      _sum: {
        count: true,
      },
    });

    // Fetch account creation data and group by day
    const accountsByDateRaw = await prisma.user.groupBy({
      by: ["createdAt"],
      _count: {
        createdAt: true,
      },
    });

     // Define the type for the accumulator
     type GroupedData = Record<string, number>;

    // Process data: strip the time from createdAt and group by date
    const groupedAccountsByDate = accountsByDateRaw.reduce<GroupedData>(
      (acc, { createdAt, _count }) => {
        const date = createdAt.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
        acc[date] = (acc[date] || 0) + _count.createdAt; // Aggregate counts for the same date
        return acc;
      },
      {}
    );

    // Convert the grouped object into a sorted array
    const accountsByDate = Object.entries(groupedAccountsByDate)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date ascending

    // Calculate the number of quizzes attempted (from topic_count model)
    const totalQuizzes = await prisma.topic_count.aggregate({
      _sum: {
        count: true,
      },
    });

    // Calculate total posts
    const totalPosts = await prisma.post.count();

    // Fetch post data
    const postsRaw = await prisma.post.findMany({
      select: {
        createdAt: true,
      },
    });

    // Step 1: Group posts by date
    const groupedPostsByDate = postsRaw.reduce<GroupedData>(
      (acc, { createdAt }) => {
        const date = createdAt.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
        acc[date] = (acc[date] || 0) + 1; // Increment the count for the date
        return acc;
      },
      {}
    );

    // Step 2: Convert grouped object into an array
    const postsByDate = Object.entries(groupedPostsByDate)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date ascending

    // Fetch feedback data
    const feedbackRaw = await prisma.feedback.findMany({
      select: {
        createdAt: true,
      },
    });

    // Fetch activity data
    const activitiesRaw = await prisma.activity.findMany({
      select: {
        createdAt: true,
      },
    });

    // Step 1: Group feedback by date
    const groupedFeedbackByDate = feedbackRaw.reduce<GroupedData>(
      (acc, { createdAt }) => {
        const date = createdAt.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
        acc[date] = (acc[date] || 0) + 1; // Increment the count for the date
        return acc;
      },
      {}
    );

    // Step 1: Group activities by date
    const groupedActivitiesByDate = activitiesRaw.reduce<GroupedData>(
      (acc, { createdAt }) => {
        const date = createdAt.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
        acc[date] = (acc[date] || 0) + 1; // Increment the count for the date
        return acc;
      },
      {}
    );

    // Step 2: Convert grouped objects into arrays
    const feedbacksByDate = Object.entries(groupedFeedbackByDate)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date ascending

    const activitiesByDate = Object.entries(groupedActivitiesByDate)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date ascending

      // Fetch course data for enrollment and completion
    const courses = await prisma.course.findMany({
      select: {
        name: true,
        currentStudents: true, // Fetch enrolled students
        passedStudents: true, // Fetch completed students
      },
    });
      
      const coursesData = courses.map((course) => ({
        name: course.name,
        enrolled: course.currentStudents.length, // Number of enrolled students
        completed: course.passedStudents.length, // Number of completed students
      }));

    return NextResponse.json({
      totalUsers,
      subscribedUsers,
      totalCourses,
      totalActivities,
      feedbackUsers: feedbackUsers,
      feedbackUsersRatio: `${feedbackUsers}/${totalUsers}`,
      totalFeedbackSubmitted,
      totalQuizzes: totalQuizzes._sum.count || 0,
      totalPosts,
      totalDocuments: totalDocumentsUploaded._sum.count || 0,
      accountsByDate,
      postsByDate,
      feedbacksByDate,
      activitiesByDate,
      coursesData, 
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
