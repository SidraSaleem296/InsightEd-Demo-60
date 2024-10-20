// import { strict_output } from "@/lib/gpt";
// import { getAuthSession } from "@/lib/nextauth";
// import { getQuestionsSchema } from "@/schemas/questions";
// import { NextResponse } from "next/server";
// import { ZodError } from "zod";

// export const runtime = "nodejs";
// export const maxDuration = 500;

// export async function POST(req: Request, res: Response) {
//   try {
//     const session = await getAuthSession();
//     // if (!session?.user) {
//     //   return NextResponse.json(
//     //     { error: "You must be logged in to create a game." },
//     //     {
//     //       status: 401,
//     //     }
//     //   );
//     // }
//     const body = await req.json();
//     const { amount, topic, type } = getQuestionsSchema.parse(body);
//     let questions: any;
//     if (type === "open_ended") {
//       questions = await strict_output(
//         "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
//         new Array(amount).fill(
//           `You are to generate a random hard open-ended questions about ${topic}`
//         ),
//         {
//           question: "question",
//           answer: "answer with max length of 15 words",
//         }
//       );
//     } else if (type === "mcq") {
//       questions = await strict_output(
//         "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
//         new Array(amount).fill(
//           `You are to generate a random hard mcq question about ${topic}`
//         ),
//         {
//           question: "question",
//           answer: "answer with max length of 15 words",
//           option1: "option1 with max length of 15 words",
//           option2: "option2 with max length of 15 words",
//           option3: "option3 with max length of 15 words",
//         }
//       );
//     }
//     return NextResponse.json(
//       {
//         questions: questions,
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     if (error instanceof ZodError) {
//       return NextResponse.json(
//         { error: error.issues },
//         {
//           status: 400,
//         }
//       );
//     } else {
//       console.error("elle gpt error", error);
//       return NextResponse.json(
//         { error: "An unexpected error occurred." },
//         {
//           status: 500,
//         }
//       );
//     }
//   }
// }




// import { strict_output_v2 } from "@/lib/gpt";
// import { getAuthSession } from "@/lib/auth";
// import { getQuestionsSchema } from "@/schemas/questions";
// import { NextResponse } from "next/server";
// import { ZodError } from "zod";

// export const runtime = "nodejs";
// export const maxDuration = 500;

// export async function POST(req: Request, res: Response) {
//   try {
//     const session = await getAuthSession();
//     // if (!session?.user) {
//     //   return NextResponse.json(
//     //     { error: "You must be logged in to create a game." },
//     //     { status: 401 }
//     //   );
//     // }

//     const body = await req.json();
//     const { amount, topic, type } = getQuestionsSchema.parse(body);
//     let questions: any;

//     if (type === "open_ended") {
//       questions = await strict_output_v2(
//         "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
//         new Array(amount).fill(`You are to generate a random hard open-ended questions about ${topic}`),
//         { question: "question", answer: "answer with max length of 15 words" }
//       );
//     } else if (type === "mcq") {
//       questions = await strict_output_v2(
//         "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
//         new Array(amount).fill(`You are to generate a random hard mcq question about ${topic}`),
//         {
//           question: "question",
//           answer: "answer with max length of 15 words",
//           option1: "option1 with max length of 15 words",
//           option2: "option2 with max length of 15 words",
//           option3: "option3 with max length of 15 words",
//         }
//       );
//     }

//     return NextResponse.json({ questions }, { status: 200 });
//   } catch (error: unknown) {
//     if (error instanceof ZodError) {
//       return NextResponse.json({ error: error.issues }, { status: 400 });
//     } else {
//       // Use a type guard to check if 'error' has a 'message' property
//       if (error instanceof Error) {
//         console.error("Error in /api/questions:", error.message);
//       } else {
//         console.error("Error in /api/questions:", JSON.stringify(error));
//       }
//       return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
//     }
//   }
  
// }



import { strict_output_v2 } from "@/lib/gpt";
import { getAuthSession } from "@/lib/auth";
import { getQuestionsSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    // Uncomment if authentication is required
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "You must be logged in to create a game." },
    //     {
    //       status: 401,
    //     }
    //   );
    // }
    const body = await req.json();
    const { amount, topic, type } = getQuestionsSchema.parse(body);

    let questions: any;
    if (type === "open_ended") {
      questions = await strict_output_v2(
        "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard open-ended questions about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
        }
      );
    } else if (type === "mcq") {
      questions = await strict_output_v2(
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard mcq question about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
          option1: "option1 with max length of 15 words",
          option2: "option2 with max length of 15 words",
          option3: "option3 with max length of 15 words",
        }
      );
    }

    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else if (error instanceof Error) {
      // Log more details about the error
      console.error("Error during API request:", error.message);
      if ((error as any).response) {
        console.error("API Response:", (error as any).response.data);
      }
      return NextResponse.json(
        { error: error.message || "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}
