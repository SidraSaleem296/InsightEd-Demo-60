import { prisma } from "@/lib/db";
import { endGameSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { gameId } = endGameSchema.parse(body);

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });
    if (!game) {
      return NextResponse.json(
        {
          message: "Game not found",
        },
        {
          status: 404,
        }
      );
    }
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        timeEnded: new Date(),
      },
    });
    return NextResponse.json({
      message: "Game ended",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}


// import { prisma } from "@/lib/db";
// import { endGameSchema } from "@/schemas/questions";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { gameId } = endGameSchema.parse(body);

//     const game = await prisma.game.findUnique({
//       where: {
//         id: gameId,
//       },
//     });

//     if (!game) {
//       return NextResponse.json(
//         {
//           message: "Game not found",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     await prisma.game.update({
//       where: {
//         id: gameId,
//       },
//       data: {
//         timeEnded: new Date(),
//       },
//     });

//     return NextResponse.json({
//       message: "Game ended",
//     });
//   } catch (error) {
//     console.error("Error ending game:", error);
//     return NextResponse.json(
//       {
//         message: "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }



// import { prisma } from "@/lib/db";
// import { endGameSchema } from "@/schemas/questions";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { gameId } = endGameSchema.parse(body);

//     console.log(`Ending game with ID: ${gameId}`);

//     const game = await prisma.game.findUnique({
//       where: {
//         id: gameId,
//       },
//     });
//     if (!game) {
//       return NextResponse.json(
//         {
//           message: "Game not found",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     const updatedGame = await prisma.game.update({
//       where: {
//         id: gameId,
//       },
//       data: {
//         timeEnded: new Date(),
//       },
//     });

//     console.log(`Game ended successfully: ${updatedGame}`);

//     return NextResponse.json({
//       message: "Game ended",
//       game: updatedGame,
//     });
//   } catch (error) {
//     console.error("Error ending game:", error);
//     return NextResponse.json(
//       {
//         message: "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }



// import { prisma } from "@/lib/db";
// import { endGameSchema } from "@/schemas/questions";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { gameId } = endGameSchema.parse(body);

//     console.log(`Attempting to end game with ID: ${gameId}`);

//     const game = await prisma.game.findUnique({
//       where: {
//         id: gameId,
//       },
//     });

//     if (!game) {
//       console.log(`Game with ID: ${gameId} not found.`);
//       return NextResponse.json(
//         {
//           message: "Game not found",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     const updatedGame = await prisma.game.update({
//       where: {
//         id: gameId,
//       },
//       data: {
//         timeEnded: new Date(),
//       },
//     });

//     console.log(`Game ended successfully: ${JSON.stringify(updatedGame)}`);

//     return NextResponse.json({
//       message: "Game ended",
//       game: updatedGame,
//     });
//   } catch (error) {
//     console.error("Error ending game:", error);
//     return NextResponse.json(
//       {
//         message: "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }




// import { prisma } from "@/lib/db";
// import { endGameSchema } from "@/schemas/questions";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { gameId } = endGameSchema.parse(body);

//     console.log(`Attempting to end game with ID: ${gameId}`);

//     const game = await prisma.game.findUnique({
//       where: {
//         id: gameId,
//       },
//     });

//     if (!game) {
//       console.log(`Game with ID: ${gameId} not found.`);
//       return NextResponse.json(
//         {
//           message: "Game not found",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     const updatedGame = await prisma.game.update({
//       where: {
//         id: gameId,
//       },
//       data: {
//         timeEnded: new Date(),
//       },
//     });

//     console.log(`Game ended successfully: ${JSON.stringify(updatedGame)}`);

//     return NextResponse.json({
//       message: "Game ended",
//       game: updatedGame,
//     });
//   } catch (error) {
//     console.error("Error ending game:", error);
//     return NextResponse.json(
//       {
//         message: "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }

