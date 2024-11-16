// import { v } from "convex/values";
// import { internalMutation, internalQuery } from "./_generated/server";
// import { hasOrgAccess } from "./documents";

// export const addUserIdToOrg = internalMutation({
//   args: {
//     // orgId: v.string(),
//     userId: v.string(),
//   },
//   async handler(ctx, args) {
//     await ctx.db.insert("memberships", {
//       // orgId: args.orgId,
//       userId: args.userId,
//     });
//   },
// });

// export const removeUserIdFromOrg = internalMutation({
//   args: {
//     // orgId: v.string(),
//     userId: v.string(),
//   },
//   async handler(ctx, args) {
//     const membership = await ctx.db
//       .query("memberships")
//       .withIndex("by_userId", (q) =>
//         q.eq("userId", args.userId)
//       )
//       .first();

//     if (membership) {
//       await ctx.db.delete(membership._id);
//     }
//   },
// });

// export const hasOrgAccessQuery = internalQuery({
//   args: {
//     // orgId: v.string(),
//   },
//   async handler(ctx, args) {
//     return await hasOrgAccess(ctx, args.userId);
//   },
// });


// import { v } from "convex/values";
// import { internalMutation, internalQuery } from "./_generated/server";

// // Adds a user to the "memberships" collection
// export const addUser = internalMutation({
//   args: {
//     userId: v.string(),
//   },
//   async handler(ctx, args) {
//     await ctx.db.insert("memberships", {
//       userId: args.userId,
//     });
//   },
// });

// // Removes a user from the "memberships" collection
// export const removeUser = internalMutation({
//   args: {
//     userId: v.string(),
//   },
//   async handler(ctx, args) {
//     const membership = await ctx.db
//       .query("memberships")
//       .withIndex("by_userId", (q) =>
//         q.eq("userId", args.userId)
//       )
//       .first();

//     if (membership) {
//       await ctx.db.delete(membership._id);
//     }
//   },
// });

// // Query to check if a user has access (if required for other logic)
// export const hasUserAccessQuery = internalQuery({
//   args: {
//     userId: v.string(),
//   },
//   async handler(ctx, args) {
//     const membership = await ctx.db
//       .query("memberships")
//       .withIndex("by_userId", (q) =>
//         q.eq("userId", args.userId)
//       )
//       .first();

//     return !!membership;
//   },
// });


import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

// Adds a document to the "documents" collection
export const addDocument = internalMutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    tokenIdentifier: v.optional(v.string()),
    embedding: v.optional(v.array(v.float64())),
    fileId: v.id("_storage"),
  },
  async handler(ctx, args) {
    await ctx.db.insert("documents", {
      title: args.title,
      description: args.description,
      tokenIdentifier: args.tokenIdentifier,
      embedding: args.embedding,
      fileId: args.fileId,
    });
  },
});

// Removes a document from the "documents" collection based on the token identifier
export const removeDocument = internalMutation({
  args: {
    tokenIdentifier: v.string(),
  },
  async handler(ctx, args) {
    const document = await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .first();

    if (document) {
      await ctx.db.delete(document._id);
    }
  },
});

// Query to check if a document with a given token identifier exists
export const hasDocumentQuery = internalQuery({
  args: {
    tokenIdentifier: v.string(),
  },
  async handler(ctx, args) {
    const document = await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .first();

    return !!document;
  },
});
