// "use client";

// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { cn } from "@/lib/utils";
// import { useQuery } from "convex/react";
// import { QuestionForm } from "./question-form";

// export default function ChatPanel({
//   documentId,
// }: {
//   documentId: Id<"documents">;
// }) {
//   const chats = useQuery(api.chats.getChatsForDocument, { documentId });

//   return (
//     <div className="dark:bg-gray-900 bg-slate-100 flex flex-col gap-2 p-6 rounded-xl">
//       <div className="h-[350px] overflow-y-auto space-y-3">
//         <div className="dark:bg-slate-950 rounded p-3">
//           AI: Ask any question using AI about this document below:
//         </div>
//         {chats?.map((chat) => (
//           <div
//             className={cn(
//               {
//                 "dark:bg-slate-800 bg-slate-200": chat.isHuman,
//                 "dark:bg-slate-950 bg-slate-300": !chat.isHuman,
//                 "text-right": chat.isHuman,
//               },
//               "rounded p-4 whitespace-pre-line"
//             )}
//           >
//             {chat.isHuman ? "YOU" : "AI"}: {chat.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-1">
//         <QuestionForm documentId={documentId} />
//       </div>
//     </div>
//   );
// }



// "use client";

// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { cn } from "@/lib/utils";
// import { useQuery } from "convex/react";
// import { QuestionForm } from "./question-form";

// export default function ChatPanel({
//   documentId,
// }: {
//   documentId: Id<"documents">;
// }) {
//   const chats = useQuery(api.chats.getChatsForDocument, { documentId });

//   return (
//     <div className="dark:bg-gray-900 bg-slate-100 flex flex-col gap-2 p-6 rounded-xl">
//       <div className="h-[350px] overflow-y-auto space-y-3">
//         <div className="dark:bg-slate-950 rounded p-3">
//           AI: Ask any question using AI about this document below:
//         </div>
//         {chats?.map((chat) => (
//           <div
//             key={chat._id} // Add a key prop here, assuming `chat.id` is unique
//             className={cn(
//               {
//                 "dark:bg-slate-800 bg-slate-200": chat.isHuman,
//                 "dark:bg-slate-950 bg-slate-300": !chat.isHuman,
//                 "text-right": chat.isHuman,
//               },
//               "rounded p-4 whitespace-pre-line"
//             )}
//           >
//             {chat.isHuman ? "YOU" : "AI"}: {chat.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-1">
//         <QuestionForm documentId={documentId} />
//       </div>
//     </div>
//   );
// }



// "use client";

// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { cn } from "@/lib/utils";
// import { useQuery } from "convex/react";
// import { QuestionForm } from "./question-form";

// export default function ChatPanel({
//   documentId,
// }: {
//   documentId: Id<"documents">;
// }) {
//   const chats = useQuery(api.chats.getChatsForDocument, { documentId });

//   return (
//     <div className="dark:bg-gray-900 bg-slate-100 flex flex-col gap-2 p-6 rounded-xl">
//       <div className="h-[350px] overflow-y-auto space-y-3">
//         <div className="dark:bg-slate-950 rounded p-3">
//           AI: Ask any question using AI about this document below:
//         </div>
//         {chats?.map((chat) => (
//           <div
//             key={chat._id}
//             className={cn(
//               {
//                 "dark:bg-slate-800 bg-slate-200": chat.isHuman,
//                 "dark:bg-slate-950 bg-slate-300": !chat.isHuman,
//                 "text-right": chat.isHuman,
//               },
//               "rounded p-4 whitespace-pre-line"
//             )}
//           >
//             {chat.isHuman ? "YOU" : "AI"}: {chat.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-1">
//         <QuestionForm documentId={documentId} />
//       </div>
//     </div>
//   );
// }


// "use client";

// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { cn } from "@/lib/utils";
// import { useQuery } from "convex/react";
// import { useEffect, useState } from "react";
// import { QuestionForm } from "./question-form";

// export default function ChatPanel({
//   documentId,
// }: {
//   documentId: Id<"documents">;
// }) {
//   const document = useQuery(api.documents.getDocument, { documentId });
//   const chats = useQuery(api.chats.getChatsForDocument, { documentId });

//   // State to hold the document content
//   const [documentContent, setDocumentContent] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch the document content if documentUrl is available
//     if (document?.documentUrl) {
//       const fetchDocumentContent = async () => {
//         try {
//           const response = await fetch(document.documentUrl);
//           const text = await response.text();
//           setDocumentContent(text);
//         } catch (error) {
//           console.error("Failed to fetch document content:", error);
//           setDocumentContent("Failed to load document content.");
//         }
//       };

//       fetchDocumentContent();
//     }
//   }, [document?.documentUrl]);

//   return (
//     <div className="dark:bg-gray-900 bg-slate-100 flex flex-col gap-2 p-6 rounded-xl">
//       {/* Document Content Display */}
//       {document ? (
//         <div className="mb-4 p-4 rounded-lg dark:bg-slate-950 bg-slate-200">
//           <h2 className="text-lg font-semibold mb-2">{document.title}</h2>
//           <p className="mb-4">{document.description}</p>
//           <div className="overflow-y-auto max-h-[200px] p-2 bg-gray-100 dark:bg-gray-800 rounded">
//             {documentContent ? (
//               <pre className="whitespace-pre-wrap text-sm">{documentContent}</pre>
//             ) : (
//               <p>Loading document content...</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div>Loading document details...</div>
//       )}

//       {/* Chat Interface */}
//       <div className="h-[350px] overflow-y-auto space-y-3">
//         <div className="dark:bg-slate-950 rounded p-3">
//           AI: Ask any question using AI about this document above:
//         </div>
//         {chats?.map((chat) => (
//           <div
//             key={chat._id}
//             className={cn(
//               {
//                 "dark:bg-slate-800 bg-slate-200": chat.isHuman,
//                 "dark:bg-slate-950 bg-slate-300": !chat.isHuman,
//                 "text-right": chat.isHuman,
//               },
//               "rounded p-4 whitespace-pre-line"
//             )}
//           >
//             {chat.isHuman ? "YOU" : "AI"}: {chat.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-1">
//         <QuestionForm documentId={documentId} />
//       </div>
//     </div>
//   );
// }

"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { QuestionForm } from "./question-form";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const document = useQuery(api.documents.getDocument, { documentId });
  const chats = useQuery(api.chats.getChatsForDocument, { documentId });

  // State to hold the document content
  const [documentContent, setDocumentContent] = useState<string | null>(null);

  useEffect(() => {
    // Check if documentUrl exists before calling fetch
    if (document?.documentUrl) {
      const fetchDocumentContent = async () => {
        try {
          // Use non-null assertion (!) here
          const response = await fetch(document.documentUrl!);
          const text = await response.text();
          setDocumentContent(text);
        } catch (error) {
          console.error("Failed to fetch document content:", error);
          setDocumentContent("Failed to load document content.");
        }
      };

      fetchDocumentContent();
    }
  }, [document?.documentUrl]);

  return (
    <div className="dark:bg-gray-900 bg-slate-100 flex flex-col gap-2 p-6 rounded-xl">
      {/* Document Content Display */}
      {document ? (
        <div className="mb-4 p-4 rounded-lg dark:bg-slate-950 bg-slate-200">
          <h2 className="text-lg font-semibold mb-2">{document.title}</h2>
          <p className="mb-4">{document.description}</p>
          <div className="overflow-y-auto max-h-[200px] p-2 bg-gray-100 dark:bg-gray-800 rounded">
            {documentContent ? (
              <pre className="whitespace-pre-wrap text-sm">{documentContent}</pre>
            ) : (
              <p>Loading document content...</p>
            )}
          </div>
        </div>
      ) : (
        <div>Loading document details...</div>
      )}

      {/* Chat Interface */}
      <div className="h-[350px] overflow-y-auto space-y-3">
        <div className="dark:bg-slate-950 rounded p-3">
          AI: Ask any question using AI about this document above:
        </div>
        {chats?.map((chat) => (
          <div
            key={chat._id}
            className={cn(
              {
                "dark:bg-slate-800 bg-slate-200": chat.isHuman,
                "dark:bg-slate-950 bg-slate-300": !chat.isHuman,
                "text-right": chat.isHuman,
              },
              "rounded p-4 whitespace-pre-line"
            )}
          >
            {chat.isHuman ? "YOU" : "AI"}: {chat.text}
          </div>
        ))}
      </div>

      <div className="flex gap-1">
        <QuestionForm documentId={documentId} />
      </div>
    </div>
  );
}
