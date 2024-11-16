// import {
//   MutationCtx,
//   QueryCtx,
//   action,
//   internalAction,
//   internalMutation,
//   internalQuery,
//   mutation,
//   query,
// } from "./_generated/server";
// import { ConvexError, v } from "convex/values";
// import { internal } from "./_generated/api";
// import OpenAI from "openai";
// import { Id } from "./_generated/dataModel";
// import { embed } from "./notes";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });


// export async function hasAccessToDocument(
//   ctx: MutationCtx | QueryCtx,
//   documentId: Id<"documents">
// ) {
//   const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//   if (!userId) {
//     return null;
//   }

//   const document = await ctx.db.get(documentId);

//   if (!document) {
//     return null;
//   }

//   if (document.userId) {
//     const hasAccess = await hasAccess(ctx, document.userId);

//     if (!hasAccess) {
//       return null;
//     }
//   } else {
//     if (document.tokenIdentifier !== userId) {
//       return null;
//     }
//   }

//   return { document, userId };
// }

// export const hasAccessToDocumentQuery = internalQuery({
//   args: {
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     return await hasAccessToDocument(ctx, args.documentId);
//   },
// });

// export const generateUploadUrl = mutation(async (ctx) => {
//   return await ctx.storage.generateUploadUrl();
// });

// export const hasOrgAccess = async (
//   ctx: MutationCtx | QueryCtx,
//   orgId: string
// ) => {
//   const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//   if (!userId) {
//     return false;
//   }

//   const membership = await ctx.db
//     .query("memberships")
//     .withIndex("by_userId", (q) => q.eq("userId", userId))
//     .first();

//   return !!membership;
// };

// export const getDocuments = query({
//   args: {
//     // orgId: v.optional(v.string()),
//   },
//   async handler(ctx, args) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       return undefined;
//     }

//     // if (args.orgId) {
//     //   const isMember = await hasOrgAccess(ctx, args.orgId);
//     //   if (!isMember) {
//     //     return undefined;
//     //   }

//       return await ctx.db
//         .query("documents")
//         // .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
//         .collect();
//     // } else {
//       return await ctx.db
//         .query("documents")
//         .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
//         .collect();
//     // }
//   },
// });

// export const getDocument = query({
//   args: {
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const accessObj = await hasAccessToDocument(ctx, args.documentId);

//     if (!accessObj) {
//       return null;
//     }

//     return {
//       ...accessObj.document,
//       documentUrl: await ctx.storage.getUrl(accessObj.document.fileId),
//     };
//   },
// });

// export const createDocument = mutation({
//   args: {
//     title: v.string(),
//     fileId: v.id("_storage"),
//     // orgId: v.optional(v.string()),
//   },
//   async handler(ctx, args) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       throw new ConvexError("Not authenticated");
//     }

//     let documentId: Id<"documents">;

//     // if (args.orgId) {
//     //   const isMember = await hasOrgAccess(ctx, args.orgId);
//     //   if (!isMember) {
//     //     throw new ConvexError("You do not have access to this organization");
//     //   }

//       documentId = await ctx.db.insert("documents", {
//         title: args.title,
//         fileId: args.fileId,
//         description: "",
//         // orgId: args.orgId,
//       });
//     // } else {
//       documentId = await ctx.db.insert("documents", {
//         title: args.title,
//         tokenIdentifier: userId,
//         fileId: args.fileId,
//         description: "",
//       });
//     // }

//     await ctx.scheduler.runAfter(
//       0,
//       internal.documents.generateDocumentDescription,
//       {
//         fileId: args.fileId,
//         documentId,
//       }
//     );
//   },
// });

// export const generateDocumentDescription = internalAction({
//   args: {
//     fileId: v.id("_storage"),
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const file = await ctx.storage.get(args.fileId);

//     if (!file) {
//       throw new ConvexError("File not found");
//     }

//     const text = await file.text();

//     const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
//       await openai.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content: `Here is a text file: ${text}`,
//           },
//           {
//             role: "user",
//             content: `please generate 1 sentence description for this document.`,
//           },
//         ],
//         model: "gpt-3.5-turbo",
//       });

//     const description =
//       chatCompletion.choices[0].message.content ??
//       "could not figure out the description for this document";

//     const embedding = await embed(description);

//     await ctx.runMutation(internal.documents.updateDocumentDescription, {
//       documentId: args.documentId,
//       description: description,
//       embedding,
//     });
//   },
// });

// export const updateDocumentDescription = internalMutation({
//   args: {
//     documentId: v.id("documents"),
//     description: v.string(),
//     embedding: v.array(v.float64()),
//   },
//   async handler(ctx, args) {
//     await ctx.db.patch(args.documentId, {
//       description: args.description,
//       embedding: args.embedding,
//     });
//   },
// });

// export const askQuestion = action({
//   args: {
//     question: v.string(),
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const accessObj = await ctx.runQuery(
//       internal.documents.hasAccessToDocumentQuery,
//       {
//         documentId: args.documentId,
//       }
//     );

//     if (!accessObj) {
//       throw new ConvexError("You do not have access to this document");
//     }

//     const file = await ctx.storage.get(accessObj.document.fileId);

//     if (!file) {
//       throw new ConvexError("File not found");
//     }

//     const text = await file.text();

//     const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
//       await openai.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content: `Here is a text file: ${text}`,
//           },
//           {
//             role: "user",
//             content: `please answer this question: ${args.question}`,
//           },
//         ],
//         model: "gpt-3.5-turbo",
//       });

//     await ctx.runMutation(internal.chats.createChatRecord, {
//       documentId: args.documentId,
//       text: args.question,
//       isHuman: true,
//       tokenIdentifier: accessObj.userId,
//     });

//     const response =
//       chatCompletion.choices[0].message.content ??
//       "could not generate a response";

//     await ctx.runMutation(internal.chats.createChatRecord, {
//       documentId: args.documentId,
//       text: response,
//       isHuman: false,
//       tokenIdentifier: accessObj.userId,
//     });

//     return response;
//   },
// });

// export const deleteDocument = mutation({
//   args: {
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const accessObj = await hasAccessToDocument(ctx, args.documentId);

//     if (!accessObj) {
//       throw new ConvexError("You do not have access to this document");
//     }

//     await ctx.storage.delete(accessObj.document.fileId);
//     await ctx.db.delete(args.documentId);
//   },
// })




// import {
//   MutationCtx,
//   QueryCtx,
//   action,
//   internalAction,
//   internalMutation,
//   internalQuery,
//   mutation,
//   query,
// } from "./_generated/server";
// import { ConvexError, v } from "convex/values";
// import { internal } from "./_generated/api";
// import OpenAI from "openai";
// import { Id } from "./_generated/dataModel";
// import { embed } from "./notes";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function hasAccessToDocument(
//   ctx: MutationCtx | QueryCtx,
//   documentId: Id<"documents">
// ) {
//   const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//   if (!userId) {
//     return null;
//   }

//   const document = await ctx.db.get(documentId);

//   if (!document) {
//     return null;
//   }

//   // Check if the document's tokenIdentifier matches the user's ID
//   if (document.tokenIdentifier && document.tokenIdentifier !== userId) {
//     return null;
//   }

//   return { document, userId };
// }

// export const hasAccessToDocumentQuery = internalQuery({
//   args: {
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     return await hasAccessToDocument(ctx, args.documentId);
//   },
// });

// export const generateUploadUrl = mutation(async (ctx) => {
//   return await ctx.storage.generateUploadUrl();
// });

// export const getDocuments = query({
//   async handler(ctx) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       return undefined;
//     }

//     return await ctx.db
//       .query("documents")
//       .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
//       .collect();
//   },
// });

// export const getDocument = query({
//   args: {
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const accessObj = await hasAccessToDocument(ctx, args.documentId);

//     if (!accessObj) {
//       return null;
//     }

//     return {
//       ...accessObj.document,
//       documentUrl: await ctx.storage.getUrl(accessObj.document.fileId),
//     };
//   },
// });

// export const createDocument = mutation({
//   args: {
//     title: v.string(),
//     fileId: v.id("_storage"),
//   },
//   async handler(ctx, args) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       throw new ConvexError("Not authenticated");
//     }

//     const documentId = await ctx.db.insert("documents", {
//       title: args.title,
//       tokenIdentifier: userId,
//       fileId: args.fileId,
//       description: "",
//     });

//     await ctx.scheduler.runAfter(
//       0,
//       internal.documents.generateDocumentDescription,
//       {
//         fileId: args.fileId,
//         documentId,
//       }
//     );
//   },
// });

// export const generateDocumentDescription = internalAction({
//   args: {
//     fileId: v.id("_storage"),
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const file = await ctx.storage.get(args.fileId);

//     if (!file) {
//       throw new ConvexError("File not found");
//     }

//     const text = await file.text();

//     const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
//       await openai.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content: `Here is a text file: ${text}`,
//           },
//           {
//             role: "user",
//             content: `please generate 1 sentence description for this document.`,
//           },
//         ],
//         model: "gpt-3.5-turbo",
//       });

//     const description =
//       chatCompletion.choices[0].message.content ??
//       "could not figure out the description for this document";

//     const embedding = await embed(description);

//     await ctx.runMutation(internal.documents.updateDocumentDescription, {
//       documentId: args.documentId,
//       description: description,
//       embedding,
//     });
//   },
// });

// export const updateDocumentDescription = internalMutation({
//   args: {
//     documentId: v.id("documents"),
//     description: v.string(),
//     embedding: v.array(v.float64()),
//   },
//   async handler(ctx, args) {
//     await ctx.db.patch(args.documentId, {
//       description: args.description,
//       embedding: args.embedding,
//     });
//   },
// });

// export const askQuestion = action({
//   args: {
//     question: v.string(),
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const accessObj = await ctx.runQuery(
//       internal.documents.hasAccessToDocumentQuery,
//       {
//         documentId: args.documentId,
//       }
//     );

//     if (!accessObj) {
//       throw new ConvexError("You do not have access to this document");
//     }

//     const file = await ctx.storage.get(accessObj.document.fileId);

//     if (!file) {
//       throw new ConvexError("File not found");
//     }

//     const text = await file.text();

//     const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
//       await openai.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content: `Here is a text file: ${text}`,
//           },
//           {
//             role: "user",
//             content: `please answer this question: ${args.question}`,
//           },
//         ],
//         model: "gpt-3.5-turbo",
//       });

//     await ctx.runMutation(internal.chats.createChatRecord, {
//       documentId: args.documentId,
//       text: args.question,
//       isHuman: true,
//       tokenIdentifier: accessObj.userId,
//     });

//     const response =
//       chatCompletion.choices[0].message.content ??
//       "could not generate a response";

//     await ctx.runMutation(internal.chats.createChatRecord, {
//       documentId: args.documentId,
//       text: response,
//       isHuman: false,
//       tokenIdentifier: accessObj.userId,
//     });

//     return response;
//   },
// });

// export const deleteDocument = mutation({
//   args: {
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const accessObj = await hasAccessToDocument(ctx, args.documentId);

//     if (!accessObj) {
//       throw new ConvexError("You do not have access to this document");
//     }

//     await ctx.storage.delete(accessObj.document.fileId);
//     await ctx.db.delete(args.documentId);
//   },
// });




// import {
//   MutationCtx,
//   QueryCtx,
//   action,
//   internalAction,
//   internalMutation,
//   internalQuery,
//   mutation,
//   query,
// } from "./_generated/server";
// import { ConvexError, v } from "convex/values";
// import { internal } from "./_generated/api";
// import OpenAI from "openai";
// import { Id } from "./_generated/dataModel";
// import { embed } from "./notes";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Helper function to check access to a document
// export async function hasAccessToDocument(
//   ctx: MutationCtx | QueryCtx,
//   documentId: Id<"documents">
// ) {
//   const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//   if (!userId) {
//     return null;
//   }

//   const document = await ctx.db.get(documentId);

//   if (!document) {
//     return null;
//   }

//   // Check if the document's tokenIdentifier matches the user's ID
//   if (document.tokenIdentifier && document.tokenIdentifier !== userId) {
//     return null;
//   }

//   return { document, userId };
// }

// export const hasAccessToDocumentQuery = internalQuery({
//   args: {
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     return await hasAccessToDocument(ctx, args.documentId);
//   },
// });

// // Mutation to generate upload URL
// export const generateUploadUrl = mutation(async (ctx) => {
//   try {
//     return await ctx.storage.generateUploadUrl();
//   } catch (error) {
//     console.error("Error generating upload URL:", error);
//     throw new ConvexError("Failed to generate upload URL.");
//   }
// });

// // Query to get documents for a user
// export const getDocuments = query({
//   async handler(ctx) {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       return undefined;
//     }

//     return await ctx.db
//       .query("documents")
//       .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
//       .collect();
//   },
// });

// // Query to get a specific document
// export const getDocument = query({
//   args: {
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const accessObj = await hasAccessToDocument(ctx, args.documentId);

//     if (!accessObj) {
//       return null;
//     }

//     return {
//       ...accessObj.document,
//       documentUrl: await ctx.storage.getUrl(accessObj.document.fileId),
//     };
//   },
// });

// // Mutation to create a document
// export const createDocument = mutation({
//   args: {
//     title: v.string(),
//     fileId: v.id("_storage"),
//   },
//   async handler(ctx, args) {
//     // Step 1: Log incoming arguments
//     console.log("Received arguments for createDocument:", args);

//     // Step 2: Check for authenticated user ID
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
//     if (!userId) {
//       console.error("Error: User not authenticated");
//       throw new ConvexError("User must be authenticated to create a document.");
//     }
//     console.log("Authenticated user ID:", userId);

//     // Step 3: Validate arguments
//     if (!args.title || !args.fileId) {
//       console.error("Error: Missing title or fileId arguments");
//       throw new ConvexError("Title and fileId are required to create a document.");
//     }
    
//     try {
//       // Step 4: Attempt to insert document into database
//       console.log("Inserting document into database with title:", args.title);
//       const documentId = await ctx.db.insert("documents", {
//         title: args.title,
//         tokenIdentifier: userId,
//         fileId: args.fileId,
//         description: "",
//       });
//       console.log("Document successfully inserted with ID:", documentId);

//       // Step 5: Schedule document description generation
//       console.log("Scheduling description generation for document ID:", documentId);
//       await ctx.scheduler.runAfter(
//         0,
//         internal.documents.generateDocumentDescription,
//         {
//           fileId: args.fileId,
//           documentId,
//         }
//       );
//       console.log("Description generation successfully scheduled for document ID:", documentId);

//     } catch (error) {
//       // Log detailed error message for diagnostics
//       console.error("Error in createDocument mutation. Arguments:", {
//         title: args.title,
//         fileId: args.fileId,
//       });
//       console.error("Detailed error:", error);
//       throw new ConvexError("Server error: failed to create document.");
//     }
//   },
// });



// // Action to generate a document description
// export const generateDocumentDescription = internalAction({
//   args: {
//     fileId: v.id("_storage"),
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     console.log("Starting document description generation for document ID:", args.documentId);

//     const file = await ctx.storage.get(args.fileId);
//     if (!file) {
//       console.error("File not found in storage for fileId:", args.fileId);
//       throw new ConvexError("File not found");
//     }

//     const text = await file.text();
//     console.log("Retrieved file text for description generation:", text);

//     try {
//       const chatCompletion = await openai.chat.completions.create({
//         messages: [
//           { role: "system", content: `Here is a text file: ${text}` },
//           { role: "user", content: `Please generate a 1-sentence description for this document.` },
//         ],
//         model: "gpt-3.5-turbo",
//       });

//       const description =
//         chatCompletion.choices[0].message.content ?? "Could not generate a description for this document";
//       console.log("Generated description:", description);

//       const embedding = await embed(description);

//       await ctx.runMutation(internal.documents.updateDocumentDescription, {
//         documentId: args.documentId,
//         description,
//         embedding,
//       });
//       console.log("Document description successfully updated for document ID:", args.documentId);

//     } catch (error) {
//       console.error("Error during description generation for document ID:", args.documentId);
//       console.error("Error details:", error);
//       throw new ConvexError("Failed to generate document description.");
//     }
//   },
// });


// // Internal mutation to update document description
// export const updateDocumentDescription = internalMutation({
//   args: {
//     documentId: v.id("documents"),
//     description: v.string(),
//     embedding: v.array(v.float64()),
//   },
//   async handler(ctx, args) {
//     await ctx.db.patch(args.documentId, {
//       description: args.description,
//       embedding: args.embedding,
//     });
//   },
// });

// // Action to ask a question based on the document content
// export const askQuestion = action({
//   args: {
//     question: v.string(),
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const accessObj = await ctx.runQuery(
//       internal.documents.hasAccessToDocumentQuery,
//       {
//         documentId: args.documentId,
//       }
//     );

//     if (!accessObj) {
//       throw new ConvexError("You do not have access to this document");
//     }

//     const file = await ctx.storage.get(accessObj.document.fileId);

//     if (!file) {
//       throw new ConvexError("File not found");
//     }

//     const text = await file.text();

//     const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
//       await openai.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content: `Here is a text file: ${text}`,
//           },
//           {
//             role: "user",
//             content: `Please answer this question: ${args.question}`,
//           },
//         ],
//         model: "gpt-3.5-turbo",
//       });

//     await ctx.runMutation(internal.chats.createChatRecord, {
//       documentId: args.documentId,
//       text: args.question,
//       isHuman: true,
//       tokenIdentifier: accessObj.userId,
//     });

//     const response =
//       chatCompletion.choices[0].message.content ??
//       "could not generate a response";

//     await ctx.runMutation(internal.chats.createChatRecord, {
//       documentId: args.documentId,
//       text: response,
//       isHuman: false,
//       tokenIdentifier: accessObj.userId,
//     });

//     return response;
//   },
// });

// // Mutation to delete a document
// export const deleteDocument = mutation({
//   args: {
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const accessObj = await hasAccessToDocument(ctx, args.documentId);

//     if (!accessObj) {
//       throw new ConvexError("You do not have access to this document");
//     }

//     try {
//       await ctx.storage.delete(accessObj.document.fileId);
//       await ctx.db.delete(args.documentId);
//       console.log("Document deleted successfully with ID:", args.documentId);
//     } catch (error) {
//       console.error("Error deleting document:", error);
//       throw new ConvexError("Failed to delete document.");
//     }
//   },
// });




// import { mutation, query, internalAction, internalMutation } from "./_generated/server";
// import { v, ConvexError } from "convex/values";
// import OpenAI from "openai";
// import { internal } from "./_generated/api";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Query to get all documents
// export const getDocuments = query({
//   args: {},
//   async handler(ctx) {
//     const documents = await ctx.db.query("documents").order("desc").collect();
//     return documents;
//   },
// });

// // Query to get a specific document by ID
// export const getDocument = query({
//   args: {
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const document = await ctx.db.get(args.documentId);
//     if (!document) throw new ConvexError("Document not found");

//     return {
//       ...document,
//       documentUrl: await ctx.storage.getUrl(document.fileId),
//     };
//   },
// });

// // Function to create an embedding for a given text using OpenAI API
// export async function embed(text : string) {
//   const embedding = await openai.embeddings.create({
//     model: "text-embedding-ada-002",
//     input: text,
//   });
//   return embedding.data[0].embedding;
// }

// // Mutation to create a new document
// // export const createDocument = mutation({
// //   args: {
// //     title: v.string(),
// //     fileId: v.id("_storage"),
// //   },
// //   async handler(ctx, args) {
// //     // Validate the input arguments
// //     if (!args.title || !args.fileId) {
// //       throw new ConvexError("Title and fileId are required to create a document.");
// //     }

// //     // Insert document into the database
// //     const documentId = await ctx.db.insert("documents", {
// //       title: args.title,
// //       tokenIdentifier: "anonymous", // Placeholder
// //       fileId: args.fileId,
// //       description: "", // Initial empty description
// //     });

// //     // Schedule description generation if the document is created successfully
// //     await ctx.scheduler.runAfter(0, internal.documents.createDocumentDescription, {
// //       documentId,
// //       fileId: args.fileId,
// //     });

// //     return documentId;
// //   },
// // });

// export const createDocument = mutation({
//   args: {
//     title: v.string(),
//     fileId: v.id("_storage"),
//   },
//   async handler(ctx, args) {
//     try {
//       // Validate the input arguments and set a default for tokenIdentifier if missing
//       if (!args.title || !args.fileId) {
//         throw new ConvexError("Title and fileId are required to create a document.");
//       }
      
//       const tokenIdentifier = "anonymous"; // Default tokenIdentifier for non-authenticated users

//       // Insert document into the database
//       const documentId = await ctx.db.insert("documents", {
//         title: args.title,
//         tokenIdentifier, // Ensure this field is always included
//         fileId: args.fileId,
//         description: "", // Initial empty description
//       });

//       // Schedule description generation if the document is created successfully
//       await ctx.scheduler.runAfter(0, internal.documents.createDocumentDescription, {
//         documentId,
//         fileId: args.fileId,
//       });

//       return documentId;

//     } catch (error) {
//       console.error("Error creating document:", error);
//       throw new ConvexError("Server error: failed to create document.");
//     }
//   },
// });


// // Internal action to generate a document description and set its embedding
// export const createDocumentDescription = internalAction({
//   args: {
//     documentId: v.id("documents"),
//     fileId: v.id("_storage"),
//   },
//   async handler(ctx, args) {
//     const file = await ctx.storage.get(args.fileId);
//     if (!file) throw new ConvexError("File not found");

//     const text = await file.text();
//     const chatCompletion = await openai.chat.completions.create({
//       messages: [
//         { role: "system", content: `Here is a text file: ${text}` },
//         { role: "user", content: `Please generate a 1-sentence description for this document.` },
//       ],
//       model: "gpt-3.5-turbo",
//     });

//     const description = chatCompletion.choices[0].message.content ?? "Could not generate a description.";
//     const embedding = await embed(description);

//     await ctx.runMutation(internal.documents.updateDocumentDescription, {
//       documentId: args.documentId,
//       description,
//       embedding,
//     });
//   },
// });

// // Internal mutation to update document description and embedding
// export const updateDocumentDescription = internalMutation({
//   args: {
//     documentId: v.id("documents"),
//     description: v.string(),
//     embedding: v.array(v.float64()),
//   },
//   async handler(ctx, args) {
//     await ctx.db.patch(args.documentId, {
//       description: args.description,
//       embedding: args.embedding,
//     });
//   },
// });

// // Mutation to delete a document by its ID
// export const deleteDocument = mutation({
//   args: {
//     documentId: v.id("documents"),
//   },
//   async handler(ctx, args) {
//     const document = await ctx.db.get(args.documentId);
//     if (!document) throw new ConvexError("Document not found");

//     await ctx.storage.delete(document.fileId);
//     await ctx.db.delete(args.documentId);
//   },
// });




import { mutation, query, internalAction, internalMutation } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import OpenAI from "openai";
import { internal } from "./_generated/api";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Query to get all documents
export const getDocuments = query({
  args: {},
  async handler(ctx) {
    const documents = await ctx.db.query("documents").order("desc").collect();
    return documents;
  },
});

// Query to get a specific document by ID
export const getDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const document = await ctx.db.get(args.documentId);
    if (!document) throw new ConvexError("Document not found");

    return {
      ...document,
      documentUrl: await ctx.storage.getUrl(document.fileId),
    };
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

// Mutation to create a new document
export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId: v.id("_storage"),
  },
  async handler(ctx, args) {
    try {
      // Log incoming arguments for debugging
      console.log("Attempting to create document with title:", args.title);
      console.log("File ID provided:", args.fileId);

      if (!args.title || !args.fileId) {
        throw new ConvexError("Title and fileId are required to create a document.");
      }

      const tokenIdentifier = "anonymous"; // Default tokenIdentifier for non-authenticated users

      // Insert document into the database
      const documentId = await ctx.db.insert("documents", {
        title: args.title,
        tokenIdentifier,
        fileId: args.fileId,
        description: "", // Initial empty description
      });

      console.log("Document successfully created with ID:", documentId);

      // Schedule description generation if the document is created successfully
      await ctx.scheduler.runAfter(0, internal.documents.createDocumentDescription, {
        documentId,
        fileId: args.fileId,
      });
      console.log("Description generation scheduled for document ID:", documentId);

      return documentId;

    } catch (error) {
      console.error("Error in createDocument:", error);
      console.error("Error stack trace:", error);
      throw new ConvexError("Server error: failed to create document.");
    }
  },
});

// Internal action to generate a document description and set its embedding
export const createDocumentDescription = internalAction({
  args: {
    documentId: v.id("documents"),
    fileId: v.id("_storage"),
  },
  async handler(ctx, args) {
    try {
      console.log("Fetching file from storage with fileId:", args.fileId);
      const file = await ctx.storage.get(args.fileId);
      if (!file) {
        console.error("File not found in storage.");
        throw new ConvexError("File not found");
      }

      const text = await file.text();
      if (!text) {
        console.error("File text could not be retrieved.");
        throw new ConvexError("Failed to read file text.");
      }
      console.log("Retrieved file text:", text);

      // Generate a description using OpenAI
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: `Here is a text file: ${text}` },
          { role: "user", content: "Please generate a 1-sentence description for this document." },
        ],
        model: "gpt-3.5-turbo",
      });

      const description = chatCompletion.choices[0].message.content ?? "Could not generate a description.";
      console.log("Generated description:", description);

      // Generate embedding for the description
      const embedding = await embed(description);
      console.log("Generated embedding:", embedding);

      // Update the document with the description and embedding
      await ctx.runMutation(internal.documents.updateDocumentDescription, {
        documentId: args.documentId,
        description,
        embedding,
      });
      console.log("Description and embedding successfully updated for document ID:", args.documentId);

    } catch (error) {
      console.error("Error in createDocumentDescription:", error);
      throw new ConvexError("Failed to generate document description.");
    }
  },
});

// Internal mutation to update document description and embedding
export const updateDocumentDescription = internalMutation({
  args: {
    documentId: v.id("documents"),
    description: v.string(),
    embedding: v.array(v.float64()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.documentId, {
      description: args.description,
      embedding: args.embedding,
    });
  },
});

// Mutation to delete a document by its ID
export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const document = await ctx.db.get(args.documentId);
    if (!document) throw new ConvexError("Document not found");

    await ctx.storage.delete(document.fileId);
    await ctx.db.delete(args.documentId);
  },
});
