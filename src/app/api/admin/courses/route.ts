import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await prisma.course.findMany();
    console.log("Fetched Courses:", courses); // Debug log
    return new NextResponse(JSON.stringify(courses), {
      headers: {
        "Cache-Control": "no-store, max-age=0", // Prevent caching
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
