// /api/chapter/getInto

import { prisma } from "@/lib/db";
import { strict_output_v2 } from "@/lib/gpt";
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYoutube,
} from "@/lib/youtube";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodyParser = z.object({
  chapterId: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { chapterId } = bodyParser.parse(body);
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });
    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "Chapter not found",
        },
        { status: 404 }
      );
    }
    const videoId = await searchYoutube(chapter.youtubeSearchQuery);
    let transcript = await getTranscript(videoId);
    let maxLength = 500;
    transcript = transcript.split(" ").slice(0, maxLength).join(" ");

    const { summary }: { summary: string } = await strict_output_v2(
      "You are an AI capable of summarising a youtube transcript",
      "summarise in 250 words or less and do not talk of the sponsors or anything unrelated to the main topic, also do not introduce what the summary is about.\n" +
        transcript,
      { summary: "summary of the transcript" }
    );

    const questions = await getQuestionsFromTranscript(
      transcript,
      chapter.name
    );

    await prisma.questionC.createMany({
      data: questions.map((question) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          chapterId: chapterId,
        };
      }),
    });

    await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        videoId: videoId,
        summary: summary,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid body",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "unknown",
        },
        { status: 500 }
      );
    }
  }
}



// import { prisma } from "@/lib/db";
// import { strict_output } from "@/lib/gpt";
// import {
//   getQuestionsFromTranscript,
//   getTranscript,
//   searchYoutube,
// } from "@/lib/youtube";
// import { NextResponse } from "next/server";
// import { z } from "zod";

// const bodyParser = z.object({
//   chapterId: z.string(),
// });

// export async function POST(req: Request, res: Response) {
//   try {
//     const body = await req.json();
//     const { chapterId } = bodyParser.parse(body);
//     const chapter = await prisma.chapter.findUnique({
//       where: {
//         id: chapterId,
//       },
//     });
//     if (!chapter) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Chapter not found",
//         },
//         { status: 404 }
//       );
//     }
//     const videoId = await searchYoutube(chapter.youtubeSearchQuery);
//     let transcript = await getTranscript(videoId);
//     let maxLength = 500;
//     transcript = transcript.split(" ").slice(0, maxLength).join(" ");

//     // Generate questions from the transcript
//     const questions = await getQuestionsFromTranscript(transcript, chapter.name);

//     // Generate a summary from the questions
//     // This is a simple example; you might want to implement more sophisticated logic
//     const summary = questions.map(question => question.answer).join(" ");

//     // Update the chapter with the generated summary
//     await prisma.chapter.update({
//       where: { id: chapterId },
//       data: {
//         videoId: videoId,
//         summary: summary,
//       },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Invalid body",
//         },
//         { status: 400 }
//       );
//     } else {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "unknown",
//         },
//         { status: 500 }
//       );
//     }
//   }
// }