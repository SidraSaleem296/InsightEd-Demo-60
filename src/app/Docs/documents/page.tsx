// "use client";
// import { api } from "@/convex/_generated/api";
// import { useQuery } from "convex/react";
// import { DocumentCard } from "./document-card";
// import CreateDocumentButton from "./upload-document-button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";
// import { ClerkProvider, useOrganization } from "@clerk/nextjs";

// export default function Home() {
//   const organization = useOrganization();

//   const documents = useQuery(api.documents.getDocuments, {
//     orgId: organization.organization?.id,
//   });

//   return (
//     <main className="w-full space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold">My Documents</h1>
//         <CreateDocumentButton />
//       </div>

//       {!documents && (
//         <div className="grid grid-cols-3 gap-8">
//           {new Array(8).fill("").map((_, i) => (
//             <Card className="h-[200px] p-6 flex flex-col justify-between">
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="w-[80px] h-[40px] rounded" />
//             </Card>
//           ))}
//         </div>
//       )}

//       {documents && documents.length === 0 && (
//         <div className="py-12 flex flex-col justify-center items-center gap-8">
//           <Image
//             src="/documents.svg"
//             width="200"
//             height="200"
//             alt="a picture of a girl holding documents"
//           />
//           <h2 className="text-2xl">You have no documents</h2>
//           <CreateDocumentButton />
//         </div>
//       )}

//       {documents && documents.length > 0 && (
//         <div className="grid grid-cols-3 gap-8">
//           {documents?.map((doc) => <DocumentCard document={doc} />)}
//         </div>
//       )}
//     </main>
//   );
// }

// "use client";
// import { api } from "@/convex/_generated/api";
// import { useQuery } from "convex/react";
// import { DocumentCard } from "./document-card";
// import CreateDocumentButton from "./upload-document-button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";

// export default function Home() {
//   // Fetch documents
//   const documents = useQuery(api.documents.getDocuments);

//   return (
//     <main className="w-full space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold">My Documents</h1>
//         <CreateDocumentButton />
//       </div>

//       {!documents ? (
//         <div className="grid grid-cols-3 gap-8">
//           {new Array(8).fill("").map((_, i) => (
//             <Card key={i} className="h-[200px] p-6 flex flex-col justify-between">
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="w-[80px] h-[40px] rounded" />
//             </Card>
//           ))}
//         </div>
//       ) : documents.length === 0 ? (
//         <div className="py-12 flex flex-col justify-center items-center gap-8">
//           <Image
//             src="/documents.svg"
//             width="200"
//             height="200"
//             alt="Illustration of a person holding documents"
//           />
//           <h2 className="text-2xl">You have no documents</h2>
//           <CreateDocumentButton />
//         </div>
//       ) : (
//         <div className="grid grid-cols-3 gap-8">
//           {documents.map((doc) => (
//             <DocumentCard key={doc._id} document={doc} />
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }



// "use client";
// import { api } from "@/convex/_generated/api";
// import { useQuery } from "convex/react";
// import { DocumentCard } from "./document-card";
// import CreateDocumentButton from "./upload-document-button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";
// import { ClerkProvider, useOrganization } from "@clerk/nextjs";
// import { ConvexProvider, ConvexReactClient } from "convex/react";

// // Initialize the Convex client with your deployment URL
// const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");

// function DocumentPage() {
//   const { organization } = useOrganization();

//   // if (!organization) {
//   //   return <div>No Organization</div>;
//   // }

//   const documents = useQuery(api.documents.getDocuments, {
//     // orgId: organization.id,
//   });
  

//   return (
//     <main className="w-full space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold">My Documents</h1>
//         <CreateDocumentButton />
//       </div>

//       {!documents && (
//         <div className="grid grid-cols-3 gap-8">
//           {new Array(8).fill("").map((_, i) => (
//             <Card className="h-[200px] p-6 flex flex-col justify-between" key={i}>
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="w-[80px] h-[40px] rounded" />
//             </Card>
//           ))}
//         </div>
//       )}

//       {documents && documents.length === 0 && (
//         <div className="py-12 flex flex-col justify-center items-center gap-8">
//           <Image
//             src="/documents.svg"
//             width="200"
//             height="200"
//             alt="a picture of a girl holding documents"
//           />
//           <h2 className="text-2xl">You have no documents</h2>
//           <CreateDocumentButton />
//         </div>
//       )}

//       {documents && documents.length > 0 && (
//         <div className="grid grid-cols-3 gap-8">
//           {documents?.map((doc) => (
//             <DocumentCard document={doc} key={doc._id} />
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }

// export default function Home() {
//   return (
//     <ClerkProvider>
//       <ConvexProvider client={convex}>
//         <DocumentPage />
//       </ConvexProvider>
//     </ClerkProvider>
//   );
// }


// "use client";
// import { api } from "@/convex/_generated/api";
// import { useQuery } from "convex/react";
// import { DocumentCard } from "./document-card";
// import CreateDocumentButton from "./upload-document-button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ConvexProvider, ConvexReactClient } from "convex/react";

// // Initialize the Convex client with your deployment URL
// const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");

// function DocumentPage() {
//   // Pass an empty object as the second argument to useQuery
//   const documents = useQuery(api.documents.getDocuments, {});

//   return (
//     <main className="w-full space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold">My Documents</h1>
//         <CreateDocumentButton />
//       </div>

//       {/* Loading state */}
//       {!documents && (
//         <div className="grid grid-cols-3 gap-8">
//           {new Array(8).fill("").map((_, i) => (
//             <Card className="h-[200px] p-6 flex flex-col justify-between" key={i}>
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="h-[20px] rounded" />
//               <Skeleton className="w-[80px] h-[40px] rounded" />
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Empty state */}
//       {documents && documents.length === 0 && (
//         <div className="py-12 flex flex-col justify-center items-center gap-8">
//           <Image
//             src="/documents.svg"
//             width="200"
//             height="200"
//             alt="a picture of a girl holding documents"
//           />
//           <h2 className="text-2xl">You have no documents</h2>
//           <CreateDocumentButton />
//         </div>
//       )}

//       {/* Documents list */}
//       {documents && documents.length > 0 && (
//         <div className="grid grid-cols-3 gap-8">
//           {documents.map((doc) => (
//             <DocumentCard document={doc} key={doc._id} />
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }

// export default function Home() {
//   return (
//     <ClerkProvider>
//       <ConvexProvider client={convex}>
//         <DocumentPage />
//       </ConvexProvider>
//     </ClerkProvider>
//   );
// }


"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import CreateDocumentButton from "./upload-document-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Initialize the Convex client with your deployment URL
const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");

function DocumentPage() {
  const documents = useQuery(api.documents.getDocuments, {});

  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>

      {/* Loading state */}
      {!documents && (
        <div className="grid grid-cols-3 gap-8">
          {new Array(8).fill("").map((_, i) => (
            <Card className="h-[200px] p-6 flex flex-col justify-between" key={i}>
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="w-[80px] h-[40px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {/* Error state */}
      {documents === undefined && (
        <div className="py-12 flex flex-col justify-center items-center gap-8">
          <h2 className="text-2xl text-red-600">Failed to load documents. Please try again later.</h2>
        </div>
      )}

      {/* Empty state */}
      {documents && documents.length === 0 && (
        <div className="py-12 flex flex-col justify-center items-center gap-8">
          <Image
            src="/documents.svg"
            width="200"
            height="200"
            alt="a picture of a girl holding documents"
          />
          <h2 className="text-2xl">You have no documents</h2>
          <CreateDocumentButton />
        </div>
      )}

      {/* Documents list */}
      {documents && documents.length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {documents.map((doc) => (
            <DocumentCard document={doc} key={doc._id} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        <DocumentPage />
      </ConvexProvider>
    </ClerkProvider>
  );
}
