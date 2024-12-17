import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"; // Ensure Prisma is configured correctly

export async function POST(req: Request) {
  try {
    const { feedback, userId, isAnonymous } = await req.json();

    if (!feedback) {
      return NextResponse.json({ error: "Feedback content is required." }, { status: 400 });
    }

    await prisma.feedback.create({
      data: {
        content: feedback,
        userId: isAnonymous ? null : userId, // Handle anonymous feedback
        isAnonymous,
      },
    });

    if (userId && !isAnonymous) {
      await prisma.user.update({
        where: { id: userId },
        data: { feedbackSubmitted: true },
      });
    }

    return NextResponse.json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json({ error: "An error occurred while submitting feedback." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      include: {
        user: true, // Include user details if available
      },
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback." },
      { status: 500 }
    );
  }
}