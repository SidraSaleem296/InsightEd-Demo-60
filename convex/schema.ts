// // import { defineSchema, defineTable } from "convex/server";
// // import { v } from "convex/values";

// // export default defineSchema({
// //   memberships: defineTable({
// //     orgId: v.string(),
// //     userId: v.string(),
// //   }).index("by_orgId_userId", ["orgId", "userId"]),
// //   documents: defineTable({
// //     title: v.string(),
// //     description: v.optional(v.string()),
// //     tokenIdentifier: v.optional(v.string()),
// //     orgId: v.optional(v.string()),
// //     embedding: v.optional(v.array(v.float64())),
// //     fileId: v.id("_storage"),
// //   })
// //     .index("by_tokenIdentifier", ["tokenIdentifier"])
// //     .index("by_orgId", ["orgId"])
// //     .vectorIndex("by_embedding", {
// //       vectorField: "embedding",
// //       dimensions: 1536,
// //       filterFields: ["tokenIdentifier", "orgId"],
// //     }),
// //   notes: defineTable({
// //     text: v.string(),
// //     orgId: v.optional(v.string()),
// //     embedding: v.optional(v.array(v.float64())),
// //     tokenIdentifier: v.optional(v.string()),
// //   })
// //     .index("by_tokenIdentifier", ["tokenIdentifier"])
// //     .index("by_orgId", ["orgId"])
// //     .vectorIndex("by_embedding", {
// //       vectorField: "embedding",
// //       dimensions: 1536,
// //       filterFields: ["tokenIdentifier", "orgId"],
// //     }),
// //   chats: defineTable({
// //     documentId: v.id("documents"),
// //     tokenIdentifier: v.string(),
// //     isHuman: v.boolean(),
// //     text: v.string(),
// //   }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),
// // });

// import { defineSchema, defineTable } from "convex/server";
// import { v } from "convex/values";

// export default defineSchema({
//   memberships: defineTable({
//     userId: v.string(),+
//   }).index("by_userId", ["userId"]),
  
//   documents: defineTable({
//     title: v.string(),
//     description: v.optional(v.string()),
//     tokenIdentifier: v.optional(v.string()),
//     embedding: v.optional(v.array(v.float64())),
//     fileId: v.id("_storage"),
//   })
//     .index("by_tokenIdentifier", ["tokenIdentifier"])
//     .vectorIndex("by_embedding", {
//       vectorField: "embedding",
//       dimensions: 1536,
//       filterFields: ["tokenIdentifier"],
//     }),
  
//   notes: defineTable({
//     text: v.string(),
//     embedding: v.optional(v.array(v.float64())),
//     tokenIdentifier: v.optional(v.string()),
//   })
//     .index("by_tokenIdentifier", ["tokenIdentifier"])
//     .vectorIndex("by_embedding", {
//       vectorField: "embedding",
//       dimensions: 1536,
//       filterFields: ["tokenIdentifier"],
//     }),
  
//   chats: defineTable({
//     documentId: v.id("documents"),
//     tokenIdentifier: v.string(),
//     isHuman: v.boolean(),
//     text: v.string(),
//   }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),
// });


// // import { defineSchema, defineTable } from "convex/server";
// // import { v } from "convex/values";

// // export default defineSchema({
// //   memberships: defineTable({
// //     userId: v.string(),
// //   }).index("by_userId", ["userId"]),
  
// //   documents: defineTable({
// //     title: v.string(),
// //     description: v.optional(v.string()),
// //     tokenIdentifier: v.string(), // Made required for consistent testing
// //     embedding: v.optional(v.array(v.float64())),
// //     fileId: v.id("_storage"),
// //   }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  
// //   notes: defineTable({
// //     text: v.string(),
// //     embedding: v.optional(v.array(v.float64())),
// //     tokenIdentifier: v.string(), // Made required for consistent testing
// //   }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  
// //   chats: defineTable({
// //     documentId: v.id("documents"),
// //     tokenIdentifier: v.string(),
// //     isHuman: v.boolean(),
// //     text: v.string(),
// //   }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),
// // });
// import { defineSchema, defineTable } from "convex/server";
// import { v } from "convex/values";

// export default defineSchema({
//   memberships: defineTable({
//     userId: v.string(),
//   }).index("by_userId", ["userId"]),
  
//   documents: defineTable({
//     title: v.string(),
//     description: v.optional(v.string()),
//     tokenIdentifier: v.string(), // Made required for consistent testing
//     embedding: v.optional(v.array(v.float64())),
//     fileId: v.id("_storage"),
//   })
//     .index("by_tokenIdentifier", ["tokenIdentifier"])
//     .vectorIndex("by_embedding", {
//       vectorField: "embedding",
//       dimensions: 1536,
//       filterFields: ["tokenIdentifier"],
//     }),
  
//   notes: defineTable({
//     text: v.string(),
//     embedding: v.optional(v.array(v.float64())),
//     tokenIdentifier: v.string(), // Made required for consistent testing
//   })
//     .index("by_tokenIdentifier", ["tokenIdentifier"])
//     .vectorIndex("by_embedding", {
//       vectorField: "embedding",
//       dimensions: 1536,
//       filterFields: ["tokenIdentifier"],
//     }),
  
//   chats: defineTable({
//     documentId: v.id("documents"),
//     tokenIdentifier: v.string(),
//     isHuman: v.boolean(),
//     text: v.string(),
//   }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),
// });


// import { defineSchema, defineTable } from "convex/server";
// import { v } from "convex/values";

// export default defineSchema({
//   memberships: defineTable({
//     userId: v.string(),
//   }).index("by_userId", ["userId"]),

//   documents: defineTable({
//     title: v.string(),
//     description: v.optional(v.string()),
//     tokenIdentifier: v.optional(v.string()), // Made optional to avoid schema validation issues
//     embedding: v.optional(v.array(v.float64())),
//     fileId: v.id("_storage"),
//   })
//     .index("by_tokenIdentifier", ["tokenIdentifier"])
//     .vectorIndex("by_embedding", {
//       vectorField: "embedding",
//       dimensions: 1536,
//       filterFields: ["tokenIdentifier"],
//     }),

//   notes: defineTable({
//     text: v.string(),
//     embedding: v.optional(v.array(v.float64())),
//     tokenIdentifier: v.string(), // Kept required for consistent testing
//   })
//     .index("by_tokenIdentifier", ["tokenIdentifier"])
//     .vectorIndex("by_embedding", {
//       vectorField: "embedding",
//       dimensions: 1536,
//       filterFields: ["tokenIdentifier"],
//     }),

//   chats: defineTable({
//     documentId: v.id("documents"),
//     tokenIdentifier: v.string(),
//     isHuman: v.boolean(),
//     text: v.string(),
//   }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),
// });


import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  memberships: defineTable({
    userId: v.string(),
  }).index("by_userId", ["userId"]),

  documents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    tokenIdentifier: v.optional(v.string()), // Optional to avoid schema validation issues
    embedding: v.optional(v.array(v.float64())),
    fileId: v.id("_storage"),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier"],
    }),

  notes: defineTable({
    text: v.string(),
    embedding: v.optional(v.array(v.float64())),
    tokenIdentifier: v.optional(v.string()), // Made optional to avoid schema validation issues
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier"],
    }),

  chats: defineTable({
    documentId: v.id("documents"),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
    text: v.string(),
  }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),
});
