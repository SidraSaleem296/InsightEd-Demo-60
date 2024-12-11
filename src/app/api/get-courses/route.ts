// // src/app/api/get-courses/route.ts

// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';

// export async function GET() {
//   try {
//     const courses = await prisma.course.findMany();
//     return NextResponse.json(courses);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Fetch all courses and include units and chapters
    const courses = await prisma.course.findMany({
      include: {
        units: {
          include: {
            chapters: true, // Include chapters within units
          },
        },
      },
    });

    // Transform data to include only necessary fields
    const transformedCourses = courses.map(course => ({
      id: course.id,
      name: course.name,
      image: course.image,
      units: course.units.map(unit => ({
        id: unit.id,
        name: unit.name,
        chapters: unit.chapters.map(chapter => ({
          id: chapter.id,
          name: chapter.name,
        })),
      })),
    }));

    return NextResponse.json(transformedCourses);
  } catch (error) {
    console.error("Error in get-courses API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
