// import { prisma } from "@/lib/db";
// import { getAuthSession } from "@/lib/auth";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const session = await getAuthSession();

//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     if (!session.user.followingIds || session.user.followingIds.length === 0) {
//       return NextResponse.json([]); // Return an empty array if no following
//     }

//     const posts = await prisma.post.findMany({
//       where: {
//         userId: { in: session.user.followingIds },
//       },
//       include: {
//         user: {
//           select: {
//             id: true,
//             name: true,
//             username: true,
//             image: true,
//           },
//         },
//         comments: {
//           select: { id: true }, // Include only the IDs for comments
//         },
//       },
//       orderBy: { createdAt: "desc" }, // Order by most recent
//     });

//     // Format the response to include like count and likedByUser
//     const formattedPosts = posts.map((post) => ({
//       id: post.id,
//       body: post.body,
//       imageUrl: post.imageUrl,
//       likes: post.likes.length, // Return the like count
//       likedByUser: post.likes.includes(session.user.id), // Check if the current user has liked the post
//       comments: post.comments.length, // Return the count of comments
//       user: post.user, // Include the post owner's details
//     }));

//     return NextResponse.json(formattedPosts, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }


// pages/api/posts/followed.js
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';  // Or your own session logic
import prisma from '@/lib/prismadb';

export async function GET(req) {
  try {
    const session = await getSession({ req }); // Get the session
    if (!session?.user?.followingIds || session.user.followingIds.length === 0) {
      return NextResponse.json([]); // Return an empty array if no following
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: { in: session.user.followingIds },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        comments: {
          select: { id: true }, // Include only the IDs for comments
        },
      },
      orderBy: { createdAt: 'desc' }, // Order by most recent
    });

    // Format the response to include like count and likedByUser
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      body: post.body,
      imageUrl: post.imageUrl,
      likes: post.likes.length, // Return the like count
      likedByUser: post.likes.includes(session.user.id), // Check if the current user has liked the post
      comments: post.comments.length, // Return the count of comments
      user: post.user, // Include the post owner's details
    }));

    return NextResponse.json(formattedPosts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

