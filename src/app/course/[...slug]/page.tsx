// import CourseSideBar from "@/components/CourseSideBar";
// import MainVideoSummary from "@/components/MainVideoSummary";
// import QuizCards from "@/components/QuizCards";
// import { prisma } from "@/lib/db";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import React from "react";

// type Props = {
//   params: {
//     slug: string[];
//   };
// };

// const CoursePage = async ({ params: { slug } }: Props) => {
//   const [courseId, unitIndexParam, chapterIndexParam] = slug;
//   const course = await prisma.course.findUnique({
//     where: { id: courseId },
//     include: {
//       units: {
//         include: {
//           chapters: {
//             include: { questionsc: true },
//           },
//         },
//       },
//     },
//   });
//   if (!course) {
//     return redirect("/gallery");
//   }
//   let unitIndex = parseInt(unitIndexParam);
//   let chapterIndex = parseInt(chapterIndexParam);

//   const unit = course.units[unitIndex];
//   if (!unit) {
//     return redirect("/gallery");
//   }
//   const chapter = unit.chapters[chapterIndex];
//   if (!chapter) {
//     return redirect("/gallery");
//   }
//   const nextChapter = unit.chapters[chapterIndex + 1];
//   const prevChapter = unit.chapters[chapterIndex - 1];
//   return (
//     <div>
//       <CourseSideBar course={course} currentChapterId={chapter.id} />;
//       <div>
//         <div className="ml-[400px] px-8">
//           <div className="flex">
//             <MainVideoSummary
//               chapter={chapter}
//               chapterIndex={chapterIndex}
//               unit={unit}
//               unitIndex={unitIndex}
//             />
//             <QuizCards chapter={chapter} />
//           </div>

//           <div className="flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500" />
//           <div className="flex pb-8">
//             {prevChapter && (
//               <Link
//                 href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
//                 className="flex mt-4 mr-auto w-fit"
//               >
//                 <div className="flex items-center">
//                   <ChevronLeft className="w-6 h-6 mr-1" />
//                   <div className="flex flex-col items-start">
//                     <span className="text-sm text-secondary-foreground/60">
//                       Previous
//                     </span>
//                     <span className="text-xl font-bold">
//                       {prevChapter.name}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             )}

//             {nextChapter && (
//               <Link
//                 href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
//                 className="flex mt-4 ml-auto w-fit"
//               >
//                 <div className="flex items-center">
//                   <div className="flex flex-col items-start">
//                     <span className="text-sm text-secondary-foreground/60">
//                       Next
//                     </span>
//                     <span className="text-xl font-bold">
//                       {nextChapter.name}
//                     </span>
//                   </div>
//                   <ChevronRight className="w-6 h-6 ml-1" />
//                 </div>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursePage;

// import CourseSideBar from "@/components/CourseSideBar";
// import MainVideoSummary from "@/components/MainVideoSummary";
// import QuizCards from "@/components/QuizCards";
// import { prisma } from "@/lib/db";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import React from "react";

// type Props = {
//   params: {
//     slug: string[];
//   };
// };

// const CoursePage = async ({ params: { slug } }: Props) => {
//   const [courseId, unitIndexParam, chapterIndexParam] = slug;

//   // Fetch the course including units, chapters, and questionsC
//   const course = await prisma.course.findUnique({
//     where: { id: courseId },
//     include: {
//       units: {
//         include: {
//           chapters: {
//             include: { questionsC: true }, // Fetching the related questionsC field
//           },
//         },
//       },
//     },
//   });

//   if (!course) {
//     return redirect("/gallery");
//   }

//   let unitIndex = parseInt(unitIndexParam);
//   let chapterIndex = parseInt(chapterIndexParam);

//   const unit = course.units[unitIndex];
//   if (!unit) {
//     return redirect("/gallery");
//   }

//   const chapter = unit.chapters[chapterIndex];
//   if (!chapter) {
//     return redirect("/gallery");
//   }

//   const nextChapter = unit.chapters[chapterIndex + 1];
//   const prevChapter = unit.chapters[chapterIndex - 1];

//   return (
//     <div>
//       <div>
//       <CourseSideBar course={course} currentChapterId={chapter.id} />
//         <div className="ml-[500px] px-8">
//           <div className="flex">
//             <MainVideoSummary
//               chapter={chapter}
//               chapterIndex={chapterIndex}
//               unit={unit}
//               unitIndex={unitIndex}
//             />
//             <QuizCards chapter={chapter} /> {/* Pass the chapter directly */}
//           </div>

//           <div className="flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500" />
//           <div className="flex pb-8">
//             {prevChapter && (
//               <Link
//                 href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
//                 className="flex mt-4 mr-auto w-fit"
//               >
//                 <div className="flex items-center">
//                   <ChevronLeft className="w-6 h-6 mr-1" />
//                   <div className="flex flex-col items-start">
//                     <span className="text-sm text-secondary-foreground/60">
//                       Previous
//                     </span>
//                     <span className="text-xl font-bold">
//                       {prevChapter.name}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             )}

//             {nextChapter && (
//               <Link
//                 href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
//                 className="flex mt-4 ml-auto w-fit"
//               >
//                 <div className="flex items-center">
//                   <div className="flex flex-col items-start">
//                     <span className="text-sm text-secondary-foreground/60">
//                       Next
//                     </span>
//                     <span className="text-xl font-bold">
//                       {nextChapter.name}
//                     </span>
//                   </div>
//                   <ChevronRight className="w-6 h-6 ml-1" />
//                 </div>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursePage;

import CourseSideBar from "@/components/CourseSideBar";
import MainVideoSummary from "@/components/MainVideoSummary";
import QuizCards from "@/components/QuizCards";
import { prisma } from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import axios from "axios";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

type Props = {
  params: {
    slug: string[];
  };
};

const CoursePage = async ({ params: { slug } }: Props) => {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;
  const session = await getServerSession(authOptions);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Use NEXT_PUBLIC_BASE_URL or fallback to localhost
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Fetch the course including units, chapters, and questionsC
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: {
          chapters: {
            include: { questionsC: true }, // Fetching the related questionsC field
          },
        },
      },
    },
  });

  if (!course) {
    return redirect("/gallery");
  }

  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/gallery");
  }

  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect("/gallery");
  }

  // console.log("Chapter data:", chapter); // Log chapter data to check if it's populated correctly

  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];

  const isLastChapterInUnit = chapterIndex === unit.chapters.length - 1;
  const isLastUnit = unitIndex === course.units.length - 1;
  const isLastChapterInCourse =
    isLastChapterInUnit && isLastUnit && nextChapter === undefined;

  // Function to check and add a student to currentStudents if not already present
  const addStudentToCourse = async (studentId: string) => {
    // Check if the student is already in `currentStudents` or `passedStudents`
    const isStudentInCourse =
      course.currentStudents.includes(studentId) ||
      course.passedStudents.includes(studentId);

    if (!isStudentInCourse) {
      // Add the studentId to currentStudents
      await prisma.course.update({
        where: { id: courseId },
        data: {
          currentStudents: {
            push: studentId,
          },
        },
      });
      console.log(`Student ${studentId} added to currentStudents of course.`);
    } else {
      console.log(`Student ${studentId} is already part of the course.`);
    }
  };

  try {
    // Add the student to the course if not already present
    await addStudentToCourse(userId);
  } catch (error) {
    console.error("Error adding user to course list", error);
  }

  const updateProgress = async () => {
    try {
      if (isLastChapterInUnit) {
        // Add user to the current unit's `students` field
        await prisma.unit.update({
          where: { id: unit.id },
          data: {
            students: {
              push: userId,
            },
          },
        });

        // Send unit completion notification
        await axios.post(`${baseUrl}/api/notifications/create`, {
          userId,
          type: "unit-completion",
          message: `You have completed "${unit.name}". Well done!`,
        });
      }

      if (isLastChapterInCourse) {
        // Remove user from all unit's `students` fields in the course
        for (const courseUnit of course.units) {
          await prisma.unit.update({
            where: { id: courseUnit.id },
            data: {
              students: {
                set: courseUnit.students.filter((studentId) => studentId !== userId),
              },
            },
          });
        }

        // Remove user from course's `currentStudents` field
        await prisma.course.update({
          where: { id: courseId },
          data: {
            currentStudents: {
              set: course.currentStudents.filter((studentId) => studentId !== userId),
            },
          },
        });

        // Add user to course's `passedStudents` field
        await prisma.course.update({
          where: { id: courseId },
          data: {
            passedStudents: {
              push: userId,
            },
          },
        });

        // Send course completion notification
        await axios.post(`${baseUrl}/api/notifications/create`, {
          userId,
          type: "course-completion",
          message: `Congratulations! You have completed the course "${course.name}". 🎉`,
        });
      }
    } catch (error) {
      console.error("Error updating progress or sending notifications:", error);
    }
  };

  // Trigger update progress and notifications when applicable
  await updateProgress();

  return (
    <div>
      <div>
        <CourseSideBar course={course} currentChapterId={chapter.id} />
        <div className="ml-[430px] px-8">
          <div className="flex">
            <MainVideoSummary
              chapter={chapter}
              chapterIndex={chapterIndex}
              unit={unit}
              unitIndex={unitIndex}
            />
            <QuizCards chapter={chapter} /> {/* Pass the chapter directly */}
          </div>

          <div className="flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500" />
          <div className="flex pb-8">
            {prevChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
                className="flex mt-4 mr-auto w-fit"
              >
                <div className="flex items-center">
                  <ChevronLeft className="w-6 h-6 mr-1" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">
                      Previous
                    </span>
                    <span className="text-xl font-bold">
                      {prevChapter.name}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {nextChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
                className="flex mt-4 ml-auto w-fit"
              >
                <div className="flex items-center">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">
                      Next
                    </span>
                    <span className="text-xl font-bold">
                      {nextChapter.name}
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 ml-1" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
