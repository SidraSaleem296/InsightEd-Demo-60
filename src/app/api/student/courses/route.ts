import { NextResponse } from "next/server";
import { prisma } from "@/lib/db"; // Adjust the import path based on your project structure
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    // Get session details
    const session = await getServerSession(authOptions);

    console.log("Session user ID:", session?.user?.id);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const studentId = session.user.id;

    // Fetch current courses where the user is in the `currentStudents` field
    const currentCourses = await prisma.course.findMany({
      where: {
        currentStudents: {
          has: studentId, // Check if the student ID exists in the `currentStudents` array
        },
      },
      select: {
        id: true,
        name: true,
        units: {
          select: {
            id: true,
            students: true,
          },
        },
      },
    });

    console.log("Current Courses:", currentCourses);

    // Calculate progress for current courses
    const currentCourseProgress = currentCourses.map((course) => {
      const totalUnits = course.units.length;
      const completedUnits = course.units.filter((unit) =>
        unit.students.includes(studentId)
      ).length;

      return {
        id: course.id,
        name: course.name,
        progress: Math.round((completedUnits / totalUnits) * 100), // Calculate percentage
      };
    });

    // Fetch passed courses where the user is in the `passedStudents` field
    const passedCourses = await prisma.course.findMany({
      where: {
        passedStudents: {
          has: studentId, // Check if the student ID exists in the `passedStudents` array
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    console.log("Passed Courses:", passedCourses);

    // Return the response
    return NextResponse.json({
      currentCourses: currentCourseProgress,
      passedCourses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
