import { NextResponse } from 'next/server';
import { strict_output_v3 } from '@/lib/gpt';
import { prisma } from '@/lib/db';

// export async function POST(req: Request) {
//   try {
//     // Parse the incoming JSON request body
//     const { courseId, userPrompt } = await req.json();

//     // Check if courseId and userPrompt are provided
//     if (!courseId || !userPrompt) {
//       console.log('Error: Missing courseId or userPrompt');
//       return NextResponse.json({ error: "Missing courseId or userPrompt" }, { status: 400 });
//     }

//     console.log("Course ID received:", courseId);
//     console.log("User Prompt received:", userPrompt);

//     // Fetch the course and associated data from the database
//     const course = await prisma.course.findUnique({
//       where: { id: courseId },
//       include: {
//         units: {
//           include: {
//             chapters: {
//               include: {
//                 questionsC: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     // If course is not found, return 404 error
//     if (!course) {
//       console.error(`Course with ID ${courseId} not found`);
//       return NextResponse.json({ error: "Course not found" }, { status: 404 });
//     }

//     // Log course data for debugging
//     console.log("Course found:", course);

//     // Extract keywords from the course data for chatbot response
//     const courseKeywords = course.units.flatMap(unit =>
//       unit.chapters.flatMap(chapter => chapter.questionsC.map(q => q.question))
//     );

//     console.log("Extracted keywords:", courseKeywords);

//     // Call the chatbot function (adjust for your actual chatbot logic)
//     const response = await strict_output_v3(
//       "You are a strict chatbot that can only answer questions related to the course content.",
//       userPrompt,
//       { response: "text" },
//       courseKeywords,
//       "",
//       false,
//       "gpt-3.5-turbo",
//       1,
//       3,
//       true
//     );

//     return NextResponse.json(response);
//   } catch (error) {
//     console.error("Error in API:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }


export async function POST(req: Request) {
  try {
    // Parse the incoming JSON request body
    const { courseId, userPrompt } = await req.json();

    // Check if courseId and userPrompt are provided
    if (!courseId || !userPrompt) {
      return NextResponse.json({ error: "Missing courseId or userPrompt" }, { status: 400 });
    }

    // Fetch the course from the database
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });

    // If course is not found, return a 404 error
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Call strict_output_v3 for the chatbot's response, passing the course name directly
    const response = await strict_output_v3(
      "You are a strict chatbot that can only answer questions related to the course content.",
      userPrompt,
      { response: "text" }, // Define output format
      course.name,  // Pass the course name directly
      "",
      false, // Do not output values only
      "gpt-3.5-turbo",
      1,
      3,
      true // Verbose logging
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in chatbot API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
