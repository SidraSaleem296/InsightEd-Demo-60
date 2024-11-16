// "use client";

// import { useEffect, useState } from "react";
// import { SearchForm } from "./search-form";
// import { api } from "@/convex/_generated/api";
// import Link from "next/link";
// import { FileIcon, NotebookPen } from "lucide-react";

// function SearchResult({
//   url,
//   score,
//   type,
//   text,
// }: {
//   type: string;
//   url: string;
//   score: number;
//   text: string;
// }) {
//   return (
//     <Link href={url}>
//       <li className="space-y-4 dark:hover:bg-slate-700 dark:bg-slate-800 bg-slate-200 hover:bg-slate-300 rounded p-4 whitespace-pre-line">
//         <div className="flex justify-between gap-2 text-xl items-center">
//           <div className="flex gap-2 items-center">
//             {type === "note" ? (
//               <NotebookPen className="w-5 h-5" />
//             ) : (
//               <FileIcon className="w-5 h-5" />
//             )}
//             {type === "note" ? "Note" : "Document"}
//           </div>
//           <div className="text-sm">Relevancy of {score.toFixed(2)}</div>
//         </div>
//         <div>{text.substring(0, 500) + "..."}</div>
//       </li>
//     </Link>
//   );
// }

// export default function SearchPage() {
//   const [results, setResults] =
//     useState<typeof api.search.searchAction._returnType>(null);

//   useEffect(() => {
//     const storedResults = localStorage.getItem("searchResults");
//     if (!storedResults) return;
//     setResults(JSON.parse(storedResults));
//   }, []);

//   return (
//     <main className="w-full space-y-8 pb-44">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold">Search</h1>
//       </div>

//       <SearchForm
//         setResults={(searchResults) => {
//           setResults(searchResults);
//           localStorage.setItem("searchResults", JSON.stringify(searchResults));
//         }}
//       />

//       <ul className="flex flex-col gap-4">
//         {results?.map((result) => {
//           if (result.type === "notes") {
//             return (
//               <SearchResult
//                 type="note"
//                 url={`/dashboard/notes/${result.record._id}`}
//                 score={result.score}
//                 text={result.record.text}
//               />
//             );
//           } else {
//             return (
//               <SearchResult
//                 type="document"
//                 url={`/dashboard/documents/${result.record._id}`}
//                 score={result.score}
//                 text={result.record.title + ": " + result.record.description}
//               />
//             );
//           }
//         })}
//       </ul>
//     </main>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { SearchForm } from "./search-form";
// import { api } from "@/convex/_generated/api";
// import Link from "next/link";
// // import { FileIcon, NotebookIcon } from "lucide-react";
// import { FileIcon, BookIcon } from "lucide-react";
// function SearchResult({
//   url,
//   score,
//   type,
//   text,
//   key,  // Key prop should be passed to the element that requires it
// }: {
//   type: string;
//   url: string;
//   score: number;
//   text: string;
//   key?: React.Key;  // Key prop is optional here
// }) {
//   return (
//     <Link href={url} key={key}> {/* Key prop is correctly used here */}
//       <li className="space-y-4 dark:hover:bg-slate-700 dark:bg-slate-800 bg-slate-200 hover:bg-slate-300 rounded p-4 whitespace-pre-line">
//         <div className="flex justify-between gap-2 text-xl items-center">
//           <div className="flex gap-2 items-center">
//             {type === "note" ? (
//               <BookIcon className="w-5 h-5" />
//             ) : (
//               <FileIcon className="w-5 h-5" />
//             )}
//             {type === "note" ? "Note" : "Document"}
//           </div>
//           <div className="text-sm">Relevancy of {score.toFixed(2)}</div>
//         </div>
//         <div>{text.substring(0, 500) + "..."}</div>
//       </li>
//     </Link>
//   );
// }

// export default function SearchPage() {
//   const [results, setResults] =
//     useState<typeof api.search.searchAction._returnType>(null);

//   useEffect(() => {
//     const storedResults = localStorage.getItem("searchResults");
//     if (!storedResults) return;
//     setResults(JSON.parse(storedResults));
//   }, []);

//   return (
//     <main className="w-full space-y-8 pb-44">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold">Search</h1>
//       </div>

//       <SearchForm
//         setResults={(searchResults) => {
//           setResults(searchResults);
//           localStorage.setItem("searchResults", JSON.stringify(searchResults));
//         }}
//       />

//       <ul className="flex flex-col gap-4">
//         {results?.map((result) => {
//           const key = result.record._id; // Use a unique identifier from the result
//           if (result.type === "notes") {
//             return (
//               <SearchResult
//                 key={key}  // Correctly placed key prop
//                 type="note"
//                 url={`/dashboard/notes/${result.record._id}`}
//                 score={result.score}
//                 text={result.record.text}
//               />
//             );
//           } else {
//             return (
//               <SearchResult
//                 key={key}  // Correctly placed key prop
//                 type="document"
//                 url={`/dashboard/documents/${result.record._id}`}
//                 score={result.score}
//                 text={result.record.title + ": " + result.record.description}
//               />
//             );
//           }
//         })}
//       </ul>
//     </main>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { SearchForm } from "./search-form";
// import { api } from "@/convex/_generated/api";
// import Link from "next/link";
// import { FileIcon, BookIcon } from "lucide-react";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ConvexProvider, ConvexReactClient } from "convex/react";

// // Initialize the Convex client with your deployment URL
// const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");
// function SearchResult({
//   url,
//   score,
//   type,
//   text,
// }: {
//   type: string;
//   url: string;
//   score: number;
//   text: string;
// }) {
//   return (
//     <Link href={url}>
//       <li className="space-y-4 dark:hover:bg-slate-700 dark:bg-slate-800 bg-slate-200 hover:bg-slate-300 rounded p-4 whitespace-pre-line">
//         <div className="flex justify-between gap-2 text-xl items-center">
//           <div className="flex gap-2 items-center">
//             {type === "note" ? (
//               <BookIcon className="w-5 h-5" />
//             ) : (
//               <FileIcon className="w-5 h-5" />
//             )}
//             {type === "note" ? "Note" : "Document"}
//           </div>
//           <div className="text-sm">Relevancy of {score.toFixed(2)}</div>
//         </div>
//         <div>{text.substring(0, 500) + "..."}</div>
//       </li>
//     </Link>
//   );
// }

// function SearchPageContent() {
//   const [results, setResults] =
//     useState<typeof api.search.searchAction._returnType>(null);

//   useEffect(() => {
//     const storedResults = localStorage.getItem("searchResults");
//     if (!storedResults) return;
//     setResults(JSON.parse(storedResults));
//   }, []);

//   return (
//     <main className="w-full space-y-8 pb-44">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold">Search</h1>
//       </div>

//       <SearchForm
//         setResults={(searchResults) => {
//           setResults(searchResults);
//           localStorage.setItem("searchResults", JSON.stringify(searchResults));
//         }}
//       />

//       <ul className="flex flex-col gap-4">
//         {results?.map((result) => {
//           const key = result.record._id; // Use a unique identifier from the result
//           if (result.type === "notes") {
//             return (
//               <SearchResult
//                 key={key} // Correctly placed key prop
//                 type="note"
//                 url={`/Docs/notes/${result.record._id}`}
//                 score={result.score}
//                 text={result.record.text}
//               />
//             );
//           } else {
//             return (
//               <SearchResult
//                 key={key} // Correctly placed key prop
//                 type="document"
//                 url={`/Docs/documents/${result.record._id}`}
//                 score={result.score}
//                 text={result.record.title + ": " + result.record.description}
//               />
//             );
//           }
//         })}
//       </ul>
//     </main>
//   );
// }

// export default function SearchPage() {
//   return (
//     <ClerkProvider>
//       <ConvexProvider client={convex}>
//         <SearchPageContent />
//       </ConvexProvider>
//     </ClerkProvider>
//   );
// }


//16th Nov 2024


// "use client";

// import { useEffect, useState } from "react";
// import { SearchForm } from "./search-form";
// import { api } from "@/convex/_generated/api";
// import Link from "next/link";
// import { FileIcon, BookIcon } from "lucide-react";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ConvexProvider, ConvexReactClient } from "convex/react";

// // Initialize the Convex client with your deployment URL
// const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");

// function SearchResult({
//   url,
//   score,
//   type,
//   text,
// }: {
//   type: string;
//   url: string;
//   score: number;
//   text: string | null | undefined; // Updated to allow null or undefined
// }) {
//   return (
//     <Link href={url}>
//       <li className="space-y-4 dark:hover:bg-slate-700 dark:bg-slate-800 bg-slate-200 hover:bg-slate-300 rounded p-4 whitespace-pre-line">
//         <div className="flex justify-between gap-2 text-xl items-center">
//           <div className="flex gap-2 items-center">
//             {type === "note" ? (
//               <BookIcon className="w-5 h-5" />
//             ) : (
//               <FileIcon className="w-5 h-5" />
//             )}
//             {type === "note" ? "Note" : "Document"}
//           </div>
//           <div className="text-sm">Relevancy of {score.toFixed(2)}</div>
//         </div>
//         <div>{text ? text.substring(0, 500) + "..." : "No content available"}</div>
//       </li>
//     </Link>
//   );
// }

// function SearchPageContent() {
//   const [results, setResults] =
//     useState<typeof api.search.searchAction._returnType>(null);

//   useEffect(() => {
//     const storedResults = localStorage.getItem("searchResults");
//     if (!storedResults) return;
//     setResults(JSON.parse(storedResults));
//   }, []);

//   return (
//     <main className="w-full space-y-8 pb-44">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold">Search</h1>
//       </div>

//       <SearchForm
//         setResults={(searchResults) => {
//           setResults(searchResults);
//           localStorage.setItem("searchResults", JSON.stringify(searchResults));
//         }}
//       />

//       <ul className="flex flex-col gap-4">
//         {results?.map((result) => {
//           const key = result.record._id; // Use a unique identifier from the result
//           if (result.type === "notes") {
//             return (
//               <SearchResult
//                 key={key} // Correctly placed key prop
//                 type="note"
//                 url={`/Docs/notes/${result.record._id}`}
//                 score={result.score}
//                 text={result.record.text}
//               />
//             );
//           } else {
//             return (
//               <SearchResult
//                 key={key} // Correctly placed key prop
//                 type="document"
//                 url={`/Docs/documents/${result.record._id}`}
//                 score={result.score}
//                 text={
//                   result.record.title && result.record.description
//                     ? result.record.title + ": " + result.record.description
//                     : "No content available"
//                 }
//               />
//             );
//           }
//         })}
//       </ul>
//     </main>
//   );
// }

// export default function SearchPage() {
//   return (
//     // <ClerkProvider>
//       <ConvexProvider client={convex}>
//         <SearchPageContent />
//       </ConvexProvider>
//     // {/* </ClerkProvider> */}
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { SearchForm } from "./search-form";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { FileIcon, BookIcon } from "lucide-react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");

function SearchResult({
  url,
  score,
  type,
  text,
}: {
  type: string;
  url: string;
  score: number;
  text: string | null | undefined;
}) {
  return (
    <Link href={url}>
      <li className="space-y-4 dark:hover:bg-slate-700 dark:bg-slate-800 bg-slate-200 hover:bg-slate-300 rounded p-4 whitespace-pre-line">
        <div className="flex justify-between gap-2 text-xl items-center">
          <div className="flex gap-2 items-center">
            {type === "note" ? (
              <BookIcon className="w-5 h-5" />
            ) : (
              <FileIcon className="w-5 h-5" />
            )}
            {type === "note" ? "Note" : "Document"}
          </div>
          <div className="text-sm">Relevancy of {score.toFixed(2)}</div>
        </div>
        <div>{text ? text.substring(0, 500) + "..." : "No content available"}</div>
      </li>
    </Link>
  );
}

function SearchPageContent() {
  const [results, setResults] =
    useState<typeof api.search.searchAction._returnType>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  return (
    <main className="w-full space-y-8 pb-44">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Search</h1>
      </div>

      <SearchForm
        setResults={(searchResults) => {
          console.log("Setting results in state and localStorage:", searchResults); // Debug log
          setResults(searchResults);
          localStorage.setItem("searchResults", JSON.stringify(searchResults));
        }}
      />

      <ul className="flex flex-col gap-4">
        {results && results.length > 0 ? (
          results.map((result) => {
            const key = result.record._id;
            return (
              <SearchResult
                key={key}
                type={result.type === "notes" ? "note" : "document"}
                url={`/Docs/${result.type === "notes" ? "notes" : "documents"}/${result.record._id}`}
                score={result.score}
                text={
                  result.type === "notes"
                    ? result.record.text
                    : `${result.record.title}: ${result.record.description ?? "No content available"}`
                }
              />
            );
          })
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </main>
  );
}

export default function SearchPage() {
  return (
    <ConvexProvider client={convex}>
      <SearchPageContent />
    </ConvexProvider>
  );
}
