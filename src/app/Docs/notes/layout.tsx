// "use client";

// import { useQuery } from "convex/react";
// import CreateNoteButton from "./create-note-button";
// import { api } from "@/convex/_generated/api";
// import Link from "next/link";
// import { ReactNode } from "react";
// import { cn } from "@/lib/utils";
// import { useParams } from "next/navigation";
// import { Id } from "@/convex/_generated/dataModel";
// import Image from "next/image";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useOrganization } from "@clerk/nextjs";

// export default function NotesLayout({ children }: { children: ReactNode }) {
//   const organization = useOrganization();
//   const notes = useQuery(api.notes.getNotes, {
//     // orgId: organization.organization?.id,
//   });
//   import { useParams } from "next/navigation";
//   import { Id } from "@/convex/_generated/dataModel";
  
//   const { noteId } = useParams<{ noteId: Id<"notes"> }>();

//   return (
//     <main className="w-full space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold">Notes</h1>
//         <CreateNoteButton />
//       </div>

//       {!notes && (
//         <div className="flex gap-12">
//           <div className="w-[200px] space-y-4">
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//           </div>

//           <div className="flex-1">
//             <Skeleton className="h-[400px] w-full" />
//           </div>
//         </div>
//       )}

//       {notes?.length === 0 && (
//         <div>
//           <div className="py-12 flex flex-col justify-center items-center gap-8">
//             <Image
//               src="/documents.svg"
//               width="200"
//               height="200"
//               alt="a picture of a girl holding documents"
//             />
//             <h2 className="text-2xl">You have no notes</h2>
//             <CreateNoteButton />
//           </div>
//         </div>
//       )}

//       {notes && notes.length > 0 && (
//         <div className="flex gap-12">
//           <ul className="space-y-2 w-[300px]">
//             {notes?.map((note) => (
//               <li
//                 key={note._id}
//                 className={cn(
//                   "text-base hover:text-cyan-300 dark:hover:text-cyan-100",
//                   {
//                     "text-cyan-300": note._id === noteId,
//                   }
//                 )}
//               >
//                 <Link href={`/dashboard/notes/${note._id}`}>
//                   {note.text.substring(0, 24) + "..."}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="w-full">{children}</div>
//         </div>
//       )}
//     </main>
//   );
// }



// // "use client";

// // import { ReactNode } from "react";
// // import { ClerkProvider, useOrganization } from "@clerk/nextjs";
// // import { ConvexProvider, ConvexReactClient } from "convex/react";
// // import { useQuery } from "convex/react";
// // import { api } from "@/convex/_generated/api";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { Skeleton } from "@/components/ui/skeleton";
// // import { cn } from "@/lib/utils";
// // import { useParams } from "next/navigation";
// // import { Id } from "@/convex/_generated/dataModel";
// // import { useRouter } from 'next/router';
// // import CreateNoteButton from "./create-note-button";

// // // Initialize the Convex client with your deployment URL
// // const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");

// // function NotesPage({ children }: { children: ReactNode }) {
// //   const { organization } = useOrganization();

// //   // If the organization is not loaded yet or orgId is undefined, return a loading state
// //   if (!organization || !organization.id) {
// //     return <div>Loading...</div>;
// //   }

// //   const notes = useQuery(api.notes.getNotes, {
// //     orgId: organization.id,
// //   });
// //   // const { noteId } = useParams<{ noteId: Id<"notes"> }>();

// // // Inside your component or function
// // const router = useRouter();
// // const noteId = router.query.noteId as string | undefined;
// //   return (
// //     <main className="w-full space-y-8">
// //       <div className="flex justify-between items-center">
// //         <h1 className="text-4xl font-bold">Notes</h1>
// //         <CreateNoteButton />
// //       </div>

// //       {!notes && (
// //         <div className="flex gap-12">
// //           <div className="w-[200px] space-y-4">
// //             <Skeleton className="h-[20px] w-full" />
// //             <Skeleton className="h-[20px] w-full" />
// //             <Skeleton className="h-[20px] w-full" />
// //             <Skeleton className="h-[20px] w-full" />
// //             <Skeleton className="h-[20px] w-full" />
// //             <Skeleton className="h-[20px] w-full" />
// //           </div>

// //           <div className="flex-1">
// //             <Skeleton className="h-[400px] w-full" />
// //           </div>
// //         </div>
// //       )}

// //       {notes?.length === 0 && (
// //         <div>
// //           <div className="py-12 flex flex-col justify-center items-center gap-8">
// //             <Image
// //               src="/documents.svg"
// //               width="200"
// //               height="200"
// //               alt="a picture of a girl holding documents"
// //             />
// //             <h2 className="text-2xl">You have no notes</h2>
// //             <CreateNoteButton />
// //           </div>
// //         </div>
// //       )}

// //       {notes && notes.length > 0 && (
// //         <div className="flex gap-12">
// //           <ul className="space-y-2 w-[300px]">
// //             {notes?.map((note) => (
// //               <li
// //                 key={note._id}
// //                 className={cn(
// //                   "text-base hover:text-cyan-300 dark:hover:text-cyan-100",
// //                   {
// //                     "text-cyan-300": note._id === noteId,
// //                   }
// //                 )}
// //               >
// //                 <Link href={`/Docs/notes/${note._id}`}>
// //                   {note.text.substring(0, 24) + "..."}
// //                 </Link>
// //               </li>
// //             ))}
// //           </ul>

// //           <div className="w-full">{children}</div>
// //         </div>
// //       )}
// //     </main>
// //   );
// // }

// // export default function NotesLayout({ children }: { children: ReactNode }) {
// //   return (
// //     <ClerkProvider>
// //       <ConvexProvider client={convex}>
// //         <NotesPage>{children}</NotesPage>
// //       </ConvexProvider>
// //     </ClerkProvider>
// //   );
// // }


// "use client";

// import { ReactNode } from "react";
// import { ClerkProvider, useOrganization } from "@clerk/nextjs";
// import { ConvexProvider, ConvexReactClient } from "convex/react";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import Link from "next/link";
// import Image from "next/image";
// import { Skeleton } from "@/components/ui/skeleton";
// import { cn } from "@/lib/utils";
// import { useRouter } from 'next/router';
// import CreateNoteButton from "./create-note-button";

// // Initialize the Convex client with your deployment URL
// const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");

// function NotesPage({ children }: { children: ReactNode }) {
//   const { organization } = useOrganization();

//   // If the organization is not loaded yet or orgId is undefined, return a loading state
//   // if (!organization || !organization.id) {
//   //   return <div>Loading...</div>;
//   // }

//   const notes = useQuery(api.notes.getNotes, {
//     // orgId: organization.id,
//   });

//   const router = useRouter();
//   const noteId = router.query.noteId as string | undefined;

//   return (
//     <main className="w-full space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold">Notes</h1>
//         <CreateNoteButton />
//       </div>

//       {!notes && (
//         <div className="flex gap-12">
//           <div className="w-[200px] space-y-4">
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//           </div>

//           <div className="flex-1">
//             <Skeleton className="h-[400px] w-full" />
//           </div>
//         </div>
//       )}

//       {notes?.length === 0 && (
//         <div>
//           <div className="py-12 flex flex-col justify-center items-center gap-8">
//             <Image
//               src="/documents.svg"
//               width="200"
//               height="200"
//               alt="a picture of a girl holding documents"
//             />
//             <h2 className="text-2xl">You have no notes</h2>
//             <CreateNoteButton />
//           </div>
//         </div>
//       )}

//       {notes && notes.length > 0 && (
//         <div className="flex gap-12">
//           <ul className="space-y-2 w-[300px]">
//             {notes?.map((note) => (
//               <li
//                 key={note._id}
//                 className={cn(
//                   "text-base hover:text-cyan-300 dark:hover:text-cyan-100",
//                   {
//                     "text-cyan-300": note._id === noteId,
//                   }
//                 )}
//               >
//                 <Link href={`/Docs/notes/${note._id}`}>
//                   {note.text ? note.text.substring(0, 24) + "..." : "Untitled Note"}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="w-full">{children}</div>
//         </div>
//       )}
//     </main>
//   );
// }

// export default function NotesLayout({ children }: { children: ReactNode }) {
//   return (
//     <ClerkProvider>
//       <ConvexProvider client={convex}>
//         <NotesPage>{children}</NotesPage>
//       </ConvexProvider>
//     </ClerkProvider>
//   );
// }

//16th nov 
// "use client";

// import { ReactNode } from "react";
// import { ClerkProvider, useOrganization } from "@clerk/nextjs";
// import { ConvexProvider, ConvexReactClient } from "convex/react";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import Link from "next/link";
// import Image from "next/image";
// import { Skeleton } from "@/components/ui/skeleton";
// import { cn } from "@/lib/utils";
// import { usePathname, useSearchParams } from 'next/navigation';
// import CreateNoteButton from "./create-note-button";

// // Initialize the Convex client with your deployment URL
// const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");

// function NotesPage({ children }: { children: ReactNode }) {
//   // const { organization } = useOrganization();

//   // If the organization is not loaded yet or orgId is undefined, return a loading state
//   // if (!organization || !organization.id) {
//   //   return <div>Loading...</div>;
//   // }

//   const notes = useQuery(api.notes.getNotes, {
//     // orgId: organization.id,
//   });

//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const noteId = searchParams.get("noteId");

//   return (
//     <main className="w-full space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold">Notes</h1>
//         <CreateNoteButton />
//       </div>

//       {!notes && (
//         <div className="flex gap-12">
//           <div className="w-[200px] space-y-4">
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//             <Skeleton className="h-[20px] w-full" />
//           </div>

//           <div className="flex-1">
//             <Skeleton className="h-[400px] w-full" />
//           </div>
//         </div>
//       )}

//       {notes?.length === 0 && (
//         <div>
//           <div className="py-12 flex flex-col justify-center items-center gap-8">
//             <Image
//               src="/documents.svg"
//               width="200"
//               height="200"
//               alt="a picture of a girl holding documents"
//             />
//             <h2 className="text-2xl">You have no notes</h2>
//             <CreateNoteButton />
//           </div>
//         </div>
//       )}

//       {notes && notes.length > 0 && (
//         <div className="flex gap-12">
//           <ul className="space-y-2 w-[300px]">
//             {notes?.map((note) => (
//               <li
//                 key={note._id}
//                 className={cn(
//                   "text-base hover:text-cyan-300 dark:hover:text-cyan-100",
//                   {
//                     "text-cyan-300": note._id === noteId,
//                   }
//                 )}
//               >
//                 <Link href={`/Docs/notes/${note._id}`}>
//                   {note.text ? note.text.substring(0, 24) + "..." : "Untitled Note"}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="w-full">{children}</div>
//         </div>
//       )}
//     </main>
//   );
// }

// export default function NotesLayout({ children }: { children: ReactNode }) {
//   return (
//     <ClerkProvider>
//       <ConvexProvider client={convex}>
//         <NotesPage>{children}</NotesPage>
//       </ConvexProvider>
//     </ClerkProvider>
//   );
// }



"use client";

import { ReactNode, Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSearchParams } from 'next/navigation';
import CreateNoteButton from "./create-note-button";

// Initialize the Convex client with your deployment URL
const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");

function NotesPage({ children }: { children: ReactNode }) {
  const notes = useQuery(api.notes.getNotes, {});
  const searchParams = useSearchParams();
  const noteId = searchParams.get("noteId");

  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Notes</h1>
        <CreateNoteButton />
      </div>

      {!notes && (
        <div className="flex gap-12">
          <div className="w-[200px] space-y-4">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
          </div>

          <div className="flex-1">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      )}

      {notes?.length === 0 && (
        <div>
          <div className="py-12 flex flex-col justify-center items-center gap-8">
            <Image
              src="/documents.svg"
              width="200"
              height="200"
              alt="a picture of a girl holding documents"
            />
            <h2 className="text-2xl">You have no notes</h2>
            <CreateNoteButton />
          </div>
        </div>
      )}

      {notes && notes.length > 0 && (
        <div className="flex gap-12">
          <ul className="space-y-2 w-[300px]">
            {notes.map((note) => (
              <li
                key={note._id}
                className={cn(
                  "text-base hover:text-cyan-300 dark:hover:text-cyan-100",
                  {
                    "text-cyan-300": note._id === noteId,
                  }
                )}
              >
                <Link href={`/Docs/notes/${note._id}`}>
                  {note.text ? note.text.substring(0, 24) + "..." : "Untitled Note"}
                </Link>
              </li>
            ))}
          </ul>

          <div className="w-full">{children}</div>
        </div>
      )}
    </main>
  );
}

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        <Suspense fallback={<div>Loading...</div>}>
          <NotesPage>{children}</NotesPage>
        </Suspense>
      </ConvexProvider>
    </ClerkProvider>
  );
}
