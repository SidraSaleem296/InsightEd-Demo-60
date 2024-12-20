// import { ConvexError, v } from "convex/values";
// import {
//   MutationCtx,
//   QueryCtx,
//   internalAction,
//   internalMutation,
//   mutation,
//   query,
// } from "./_generated/server";
// import OpenAI from "openai";
// import { internal } from "./_generated/api";
// import { hasOrgAccess } from "./documents";
// import { Doc, Id } from "./_generated/dataModel";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const getNote = query({
//   args: {
//     noteId: v.id("notes"),
//   },
//   async handler(ctx, args) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       return null;
//     }

//     const note = await ctx.db.get(args.noteId);

//     if (!note) {
//       return null;
//     }

//     if (note.orgId) {
//       const hasAccess = await hasOrgAccess(ctx, note.orgId);

//       if (!hasAccess) {
//         return null;
//       }
//     } else {
//       if (note.tokenIdentifier !== userId) {
//         return null;
//       }
//     }

//     return note;
//   },
// });

// export const getNotes = query({
//   args: {
//     orgId: v.optional(v.string()),
//   },
//   async handler(ctx, args) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       return null;
//     }

//     if (args.orgId) {
//       const hasAccess = await hasOrgAccess(ctx, args.orgId);

//       if (!hasAccess) {
//         return null;
//       }

//       const notes = await ctx.db
//         .query("notes")
//         .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
//         .collect();

//       return notes;
//     } else {
//       const notes = await ctx.db
//         .query("notes")
//         .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
//         .order("desc")
//         .collect();

//       return notes;
//     }
//   },
// });

// export async function embed(text: string) {
//   const embedding = await openai.embeddings.create({
//     model: "text-embedding-ada-002",
//     input: text,
//   });
//   return embedding.data[0].embedding;
// }

// export const setNoteEmbedding = internalMutation({
//   args: {
//     noteId: v.id("notes"),
//     embedding: v.array(v.number()),
//   },
//   async handler(ctx, args) {
//     await ctx.db.patch(args.noteId, {
//       embedding: args.embedding,
//     });
//   },
// });

// export const createNoteEmbedding = internalAction({
//   args: {
//     noteId: v.id("notes"),
//     text: v.string(),
//   },
//   async handler(ctx, args) {
//     const embedding = await embed(args.text);

//     await ctx.runMutation(internal.notes.setNoteEmbedding, {
//       noteId: args.noteId,
//       embedding,
//     });
//   },
// });

// export const createNote = mutation({
//   args: {
//     text: v.string(),
//     orgId: v.optional(v.string()),
//   },
//   async handler(ctx, args) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       throw new ConvexError("You must be logged in to create a note");
//     }

//     let noteId: Id<"notes">;

//     if (args.orgId) {
//       const hasAccess = await hasOrgAccess(ctx, args.orgId);

//       if (!hasAccess) {
//         throw new ConvexError(
//           "You do not have permission to create a note in this organization"
//         );
//       }

//       noteId = await ctx.db.insert("notes", {
//         text: args.text,
//         orgId: args.orgId,
//       });
//     } else {
//       noteId = await ctx.db.insert("notes", {
//         text: args.text,
//         tokenIdentifier: userId,
//       });
//     }

//     await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
//       noteId,
//       text: args.text,
//     });
//   },
// });

// export const deleteNote = mutation({
//   args: {
//     noteId: v.id("notes"),
//   },
//   async handler(ctx, args) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       throw new ConvexError("You must be logged in to create a note");
//     }

//     const note = await ctx.db.get(args.noteId);

//     if (!note) {
//       throw new ConvexError("Note not found");
//     }

//     await assertAccessToNote(ctx, note);

//     await ctx.db.delete(args.noteId);
//   },
// });

// async function assertAccessToNote(
//   ctx: QueryCtx | MutationCtx,
//   note: Doc<"notes">
// ) {
//   const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//   if (!userId) {
//     throw new ConvexError("You must be logged in to create a note");
//   }

//   if (note.orgId) {
//     const hasAccess = await hasOrgAccess(ctx, note.orgId);

//     if (!hasAccess) {
//       throw new ConvexError("You do not have permission to delete this note");
//     }
//   } else {
//     if (note.tokenIdentifier !== userId) {
//       throw new ConvexError("You do not have permission to delete this note");
//     }
//   }
// }



// import { ConvexError, v } from "convex/values";
// import {
//   MutationCtx,
//   QueryCtx,
//   internalAction,
//   internalMutation,
//   mutation,
//   query,
// } from "./_generated/server";
// import OpenAI from "openai";
// import { internal } from "./_generated/api";
// import { Doc, Id } from "./_generated/dataModel";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const getNote = query({
//   args: {
//     noteId: v.id("notes"),
//   },
//   async handler(ctx, args) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       return null;
//     }

//     const note = await ctx.db.get(args.noteId);

//     if (!note || note.tokenIdentifier !== userId) {
//       return null;
//     }

//     return note;
//   },
// });

// export const getNotes = query({
//   async handler(ctx) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       return null;
//     }

//     const notes = await ctx.db
//       .query("notes")
//       .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
//       .order("desc")
//       .collect();

//     return notes;
//   },
// });

// export async function embed(text: string) {
//   const embedding = await openai.embeddings.create({
//     model: "text-embedding-ada-002",
//     input: text,
//   });
//   return embedding.data[0].embedding;
// }

// export const setNoteEmbedding = internalMutation({
//   args: {
//     noteId: v.id("notes"),
//     embedding: v.array(v.number()),
//   },
//   async handler(ctx, args) {
//     await ctx.db.patch(args.noteId, {
//       embedding: args.embedding,
//     });
//   },
// });

// export const createNoteEmbedding = internalAction({
//   args: {
//     noteId: v.id("notes"),
//     text: v.string(),
//   },
//   async handler(ctx, args) {
//     const embedding = await embed(args.text);

//     await ctx.runMutation(internal.notes.setNoteEmbedding, {
//       noteId: args.noteId,
//       embedding,
//     });
//   },
// });

// export const createNote = mutation({
//   args: {
//     text: v.string(),
//   },
//   async handler(ctx, args) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       throw new ConvexError("You must be logged in to create a note");
//     }

//     const noteId = await ctx.db.insert("notes", {
//       text: args.text,
//       tokenIdentifier: userId,
//     });

//     await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
//       noteId,
//       text: args.text,
//     });
//   },
// });

// export const deleteNote = mutation({
//   args: {
//     noteId: v.id("notes"),
//   },
//   async handler(ctx, args) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       throw new ConvexError("You must be logged in to delete a note");
//     }

//     const note = await ctx.db.get(args.noteId);

//     if (!note) {
//       throw new ConvexError("Note not found");
//     }

//     await assertAccessToNote(ctx, note);

//     await ctx.db.delete(args.noteId);
//   },
// });

// async function assertAccessToNote(
//   ctx: QueryCtx | MutationCtx,
//   note: Doc<"notes">
// ) {
//   const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//   if (!userId || note.tokenIdentifier !== userId) {
//     throw new ConvexError("You do not have permission to access this note");
//   }
// }



// import { ConvexError, v } from "convex/values";
// import {
//   MutationCtx,
//   QueryCtx,
//   internalAction,
//   internalMutation,
//   mutation,
//   query,
// } from "./_generated/server";
// import OpenAI from "openai";
// import { internal } from "./_generated/api";
// import { Doc, Id } from "./_generated/dataModel";



import { v } from "convex/values";
import { mutation, query, internalAction, internalMutation } from "./_generated/server";
import OpenAI from "openai";
import { internal } from "./_generated/api";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Query to get a specific note by its ID
export const getNote = query({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const note = await ctx.db.get(args.noteId);
    return note || null;
  },
});

// Query to get all notes
export const getNotes = query({
  args: {},
  async handler(ctx) {
    const notes = await ctx.db.query("notes").order("desc").collect();
    return notes;
  },
});

// Function to create an embedding for a given text using OpenAI API
export async function embed(text: string) {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return embedding.data[0].embedding;
}

// Internal mutation to set the embedding of a note
export const setNoteEmbedding = internalMutation({
  args: {
    noteId: v.id("notes"),
    embedding: v.array(v.float64()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.noteId, {
      embedding: args.embedding,
    });
  },
});

// Internal action to create and set an embedding for a note
export const createNoteEmbedding = internalAction({
  args: {
    noteId: v.id("notes"),
    text: v.string(),
  },
  async handler(ctx, args) {
    const embedding = await embed(args.text);
    await ctx.runMutation(internal.notes.setNoteEmbedding, {
      noteId: args.noteId,
      embedding,
    });
  },
});

// Mutation to create a new note
export const createNote = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args) {
    // Use a placeholder for tokenIdentifier since we're skipping user authentication
    const noteId = await ctx.db.insert("notes", {
      text: args.text,
      tokenIdentifier: "anonymous", // Placeholder value for tokenIdentifier
    });

    // Schedule the creation of the embedding asynchronously
    await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
      noteId,
      text: args.text,
    });
  },
});

// Mutation to delete a note by its ID
export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const note = await ctx.db.get(args.noteId);

    if (!note) {
      throw new Error("Note not found");
    }

    // Remove the note from the database
    await ctx.db.delete(args.noteId);
  },
});
