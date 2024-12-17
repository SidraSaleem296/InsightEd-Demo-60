import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Course name is required" }, { status: 400 });
  }

  try {
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.course.delete({
      where: {
        id,
      },
    });

    return new Response("Course and related data deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting course and related data:", error);
    return new Response("Failed to delete course and related data", { status: 500 });
  }
}
