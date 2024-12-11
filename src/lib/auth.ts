// import { prisma } from "./db";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
// // import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth/types";
// import { DefaultSession, NextAuthOptions } from "next-auth";
// import { getServerSession } from "next-auth/next";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       credits: number;
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     credits: number;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     jwt: async ({ token }) => {
//       const db_user = await prisma.user.findFirst({
//         where: {
//           email: token.email,
//         },
//       });
//       if (db_user) {
//         token.id = db_user.id;
//         token.credits = db_user.credits;
//       }
//       return token;
//     },
//     session: ({ session, token }) => {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.image = token.picture;
//         session.user.credits = token.credits;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET as string,
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
// };

// export const getAuthSession = () => {
//   return getServerSession(authOptions);
// };


import { prisma } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession, NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      credits: number;
      followingIds: string[]; // Add this line
      role: string; // Add this line
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    credits: number;
    followingIds: string[]; // Add this line
    role: string; // Add this line
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token }) => {
      if (!token.email) return token;
      const db_user = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (db_user) {
        token.id = db_user.id;
        token.credits = db_user.credits;
        token.followingIds = db_user.followingIds; // Add this line
        token.role = db_user.role; // Add this line to include the role
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.credits = token.credits;
        session.user.followingIds = token.followingIds; // Add this line
        session.user.role = token.role; // Add this line to include the role
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export const getAuthSession = () => {
  if (typeof window === 'undefined') {
    return getServerSession(authOptions);
  } else {
    // Handle client-side or throw an error if needed
    return null;
  }
};
