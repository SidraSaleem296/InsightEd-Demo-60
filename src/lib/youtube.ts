// import axios from "axios";
// import { YoutubeTranscript } from "youtube-transcript";
// import { strict_output_v2 } from "./gpt";

// export async function searchYoutube(searchQuery: string) {
//   // hello world => hello+world
//   searchQuery = encodeURIComponent(searchQuery);
//   const { data } = await axios.get(
//     `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`
//   );
//   if (!data) {
//     console.log("youtube fail");
//     return null;
//   }
//   if (data.items[0] == undefined) {
//     console.log("youtube fail");
//     return null;
//   }
//   return data.items[0].id.videoId;
// }
// export async function getTranscript(videoId: string) {
//   try {
//     let transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
//       lang: "en",
//       // Removed the unsupported 'country' property
//     });
//     let transcript = "";
//     for (let t of transcript_arr) {
//       transcript += t.text + " ";
//     }
//     return transcript.replaceAll("\n", "");
//   } catch (error) {
//     return "";
//   }
// }

// export async function getQuestionsFromTranscript(
//   transcript: string,
//   course_title: string
// ) {
//   type Question = {
//     question: string;
//     answer: string;
//     option1: string;
//     option2: string;
//     option3: string;
//   };
//   const questions: Question[] = await strict_output_v2(
//     "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words",
//     new Array(5).fill(
//       `You are to generate a random hard mcq question about ${course_title} with context of the following transcript: ${transcript}`
//     ),
//     {
//       question: "question",
//       answer: "answer with max length of 15 words",
//       option1: "option1 with max length of 15 words",
//       option2: "option2 with max length of 15 words",
//       option3: "option3 with max length of 15 words",
//     }
//   );
//   return questions;
// }

//20 oct works fine 
// import axios from "axios";
// import { YoutubeTranscript } from "youtube-transcript";
// import { PrismaClient } from "@prisma/client"; // Import Prisma client

// const prisma = new PrismaClient(); // Initialize Prisma client

// export async function searchYoutube(searchQuery: string) {
//   searchQuery = encodeURIComponent(searchQuery);
//   const { data } = await axios.get(
//     `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`
//   );
//   if (!data || !data.items || !data.items.length) {
//     console.log("YouTube search failed");
//     return null;
//   }
//   return data.items[0].id.videoId;
// }

// export async function getTranscript(videoId: string) {
//   try {
//     const transcriptArr = await YoutubeTranscript.fetchTranscript(videoId, {
//       lang: "en",
//     });
//     const transcript = transcriptArr.map(t => t.text).join(" ");
//     return transcript.replaceAll("\n", "");
//   } catch (error) {
//     console.log("Transcript fetching failed", error);
//     return "";
//   }
// }

// export async function getQuestionsFromTranscript(
//   transcript: string,
//   courseTitle: string
// ) {
//   // Dummy function to generate questions from transcript
//   // You may replace this with your AI or rule-based generator
//   const questions = [
//     {
//       question: `What is the main topic discussed in the transcript related to ${courseTitle}?`,
//       answer: "Main topic is ...",
//       options: ["Main topic is ...", "Another option", "Third option"],
//     },
//     {
//       question: `What are the key points of ${courseTitle} in the video?`,
//       answer: "Key points are ...",
//       options: ["Key points are ...", "Another option", "Third option"],
//     },
//     // Add more questions as needed
//   ];

//   return questions.map((q) => ({
//     question: q.question,
//     answer: q.answer,
//     options: JSON.stringify(q.options),
//   }));
// }

// export async function saveQuestionsToDatabase(
//   chapterId: string,
//   questions: {
//     question: string;
//     answer: string;
//     options: string;
//   }[]
// ) {
//   try {
//     const createdQuestions = await prisma.questionC.createMany({
//       data: questions.map((q) => ({
//         chapterId,
//         question: q.question,
//         answer: q.answer,
//         options: q.options,
//       })),
//     });
//     console.log(`${createdQuestions.count} questions created successfully.`);
//   } catch (error) {
//     console.log("Error saving questions to database", error);
//   }
// }

// // Main function to search, fetch transcript, generate questions, and save them
// export async function generateAndSaveQuestions(
//   searchQuery: string,
//   courseTitle: string,
//   chapterId: string
// ) {
//   try {
//     const videoId = await searchYoutube(searchQuery);
//     if (!videoId) return;

//     const transcript = await getTranscript(videoId);
//     if (!transcript) return;

//     const questions = await getQuestionsFromTranscript(transcript, courseTitle);
//     await saveQuestionsToDatabase(chapterId, questions);
//   } catch (error) {
//     console.log("Error in generating and saving questions", error);
//   }
// }


import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output_v2 } from "./gpt";

export async function searchYoutube(searchQuery: string) {
  // hello world => hello+world
  searchQuery = encodeURIComponent(searchQuery);
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`
  );
  if (!data) {
    console.log("youtube fail");
    return null;
  }
  if (data.items[0] == undefined) {
    console.log("youtube fail");
    return null;
  }
  return data.items[0].id.videoId;
}
export async function getTranscript(videoId: string) {
  try {
    let transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      // Removed the unsupported 'country' property
    });
    let transcript = "";
    for (let t of transcript_arr) {
      transcript += t.text + " ";
    }
    return transcript.replaceAll("\n", "");
  } catch (error) {
    return "";
  }
}

export async function getQuestionsFromTranscript(
  transcript: string,
  course_title: string
) {
  type Question = {
    question: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
  };
  const questions: Question[] = await strict_output_v2(
    "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words",
    new Array(5).fill(
      `You are to generate a random hard mcq question about ${course_title} with context of the following transcript: ${transcript}`
    ),
    {
      question: "question",
      answer: "answer with max length of 15 words",
      option1: "option1 with max length of 15 words",
      option2: "option2 with max length of 15 words",
      option3: "option3 with max length of 15 words",
    }
  );
  return questions;
}


