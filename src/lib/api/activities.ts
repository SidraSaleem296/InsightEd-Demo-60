// import { Activity, User } from "@prisma/client"
// import { getServerSession } from "next-auth"

// import { authOptions } from "@/lib/auth"
// import { prisma } from "@/lib/db"

// type UserActivities = Activity & {
//   total_count: number
// }

// // Fetch user's activity
// export async function getUserActivity(
//   activityId: Activity["id"],
//   userId: User["id"]
// ) {
//   return await prisma.activity.findFirst({
//     where: {
//       id: activityId,
//       userId: userId,
//     },
//   })
// }

// // Fetch all of the activities for the selected user
// export async function getUserActivities(
//   userId: string
// ): Promise<UserActivities[]> {
//   const results: UserActivities[] = await prisma.$queryRaw`
//     SELECT
//       A.id,
//       A.name,
//       A.description,
//       A.color_code AS "colorCode",
//       A.created_at AS "createdAt",
//       SUM(AL.count) AS total_count
//     FROM
//       activities A
//     LEFT JOIN
//       activity_log AL ON A.id = AL.activity_id
//     WHERE
//       A.user_id = ${userId}
//     GROUP BY
//       A.id, A.name, A.description, A.color_code
//     ORDER BY
//       total_count DESC;`

//   return results.map((result) => ({
//     ...result,
//     total_count: Number(result.total_count),
//   }))
// }

// // Verify if the user has access to the activity
// export async function verifyActivity(activityId: string) {
//   const session = await getServerSession(authOptions)
//   const count = await prisma.activity.count({
//     where: {
//       id: activityId,
//       userId: session?.user.id,
//     },
//   })

//   return count > 0
// }

// }
// import { prisma } from "@/lib/db";
// import { authOptions } from "../auth";
// import { getServerSession } from "next-auth";

// type UserActivities = {
//   id: string;
//   userId: string; // Added userId
//   name: string;
//   description: string | null;
//   colorCode: string;
//   createdAt: Date;
//   updatedAt: Date; // Added updatedAt
//   total_count: number;
// };

// // Fetch all of the activities for the selected user
// export async function getUserActivities(
// userId: string, id: string): Promise<UserActivities[]> {
//   const activities = await prisma.activity.findMany({
//     where: {
//       userId: userId,
//     },
//     select: {
//       id: true,
//       userId: true, // Add this
//       name: true,
//       description: true,
//       colorCode: true,
//       createdAt: true,
//       updatedAt: true, // Add this
//     },
//   });

//   const userActivities = await Promise.all(
//     activities.map(async (activity) => {
//       const totalLogCount = await prisma.activityLog.aggregate({
//         _sum: {
//           count: true,
//         },
//         where: {
//           activityId: activity.id,
//         },
//       });

//       return {
//         id: activity.id,
//         userId: activity.userId, // Include userId
//         name: activity.name,
//         description: activity.description ?? "",
//         colorCode: activity.colorCode,
//         createdAt: activity.createdAt,
//         updatedAt: activity.updatedAt, // Include updatedAt
//         total_count: totalLogCount._sum.count || 0,
//       };
//     })
//   );

//   userActivities.sort((a, b) => b.total_count - a.total_count);

//   return userActivities;
// }
// export async function verifyActivity(activityId: string) {
//   const session = await getServerSession(authOptions)
//   const count = await prisma.activity.count({
//     where: {
//       id: activityId,
//       userId: session?.user.id,
//     },
//   })

//   return count > 0
// }


// import { prisma } from "@/lib/db";

// type UserActivity = {
//   id: string;
//   userId: string;
//   name: string;
//   description: string | null;
//   colorCode: string;
//   createdAt: Date;
//   updatedAt: Date;
//   total_count: number;
// };

// // Fetch a specific activity for the selected user
// export async function getUserActivity(activityId: string, userId: string): Promise<UserActivity | null> {
//   const activity = await prisma.activity.findFirst({
//     where: {
//       id: activityId,
//       userId: userId,
//     },
//     select: {
//       id: true,
//       userId: true,
//       name: true,
//       description: true,
//       colorCode: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });

//   if (!activity) {
//     return null;
//   }

//   const totalLogCount = await prisma.activityLog.aggregate({
//     _sum: {
//       count: true,
//     },
//     where: {
//       activityId: activity.id,
//     },
//   });

//   return {
//     ...activity,
//     total_count: totalLogCount._sum.count || 0,
//   };
// }

// import { prisma } from "@/lib/db";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";

// type UserActivity = {
//   id: string;
//   userId: string;
//   name: string;
//   description: string | null;
//   colorCode: string;
//   createdAt: Date;
//   updatedAt: Date;
//   total_count: number;
// };

// // Fetch all of the activities for the selected user
// export async function getUserActivities(userId: string): Promise<UserActivity[]> {
//   const activities = await prisma.activity.findMany({
//     where: {
//       userId: userId,
//     },
//     select: {
//       id: true,
//       userId: true,
//       name: true,
//       description: true,
//       colorCode: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });

//   const userActivities = await Promise.all(
//     activities.map(async (activity) => {
//       const totalLogCount = await prisma.activityLog.aggregate({
//         _sum: {
//           count: true,
//         },
//         where: {
//           activityId: activity.id,
//         },
//       });

//       return {
//         id: activity.id,
//         userId: activity.userId,
//         name: activity.name,
//         description: activity.description ?? "",
//         colorCode: activity.colorCode,
//         createdAt: activity.createdAt,
//         updatedAt: activity.updatedAt,
//         total_count: totalLogCount._sum.count || 0,
//       };
//     })
//   );

//   userActivities.sort((a, b) => b.total_count - a.total_count);

//   return userActivities;
// }

// // Verify if the user has access to the activity
// export async function verifyActivity(activityId: string): Promise<boolean> {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user) {
//     throw new Error("User not authenticated");
//   }

//   const count = await prisma.activity.count({
//     where: {
//       id: activityId,
//       userId: session.user.id,
//     },
//   });

//   return count > 0;
// }





import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session"; // Assuming this helper fetches the current user's ID

type UserActivity = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  colorCode: string;
  createdAt: Date;
  updatedAt: Date;
  total_count: number;
};

// Fetch all of the activities for the selected user
export async function getUserActivities(userId: string): Promise<UserActivity[]> {
  const activities = await prisma.activity.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      description: true,
      colorCode: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const userActivities = await Promise.all(
    activities.map(async (activity) => {
      const totalLogCount = await prisma.activityLog.aggregate({
        _sum: {
          count: true,
        },
        where: {
          activityId: activity.id,
        },
      });

      return {
        id: activity.id,
        userId: activity.userId,
        name: activity.name,
        description: activity.description ?? "",
        colorCode: activity.colorCode ?? "#FFFFFF", // Default color if null
        createdAt: activity.createdAt,
        updatedAt: activity.updatedAt,
        total_count: totalLogCount._sum.count || 0,
      };
    })
  );

  userActivities.sort((a, b) => b.total_count - a.total_count);

  return userActivities;
}

// Verify if the user has access to the activity
export async function verifyActivity(activityId: string): Promise<boolean> {
  const user = await getCurrentUser(); // Ensure this helper function retrieves the user information
  if (!user) {
    throw new Error("User not authenticated");
  }

  const count = await prisma.activity.count({
    where: {
      id: activityId,
      userId: user.id, // Use the user ID obtained from the session or request
    },
  });

  return count > 0;
}
