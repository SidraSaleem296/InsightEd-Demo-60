// import { Clipboard, Cog, FilesIcon } from "lucide-react";
// import Link from "next/link";
// // import NavBar from "./side-nav";

// export default function DashboardLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="flex gap-24 container mx-auto pt-12">
//       {/* <NavBar /> */}

//       {children}
//     </div>
//   );
// }


"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Clipboard, Cog, FilesIcon } from "lucide-react";
import Link from "next/link";

// Initialize the Convex client with your deployment URL
const convex = new ConvexReactClient("https://secret-squid-182.convex.cloud");

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexProvider client={convex}>
      <div className="flex gap-24 container mx-auto pt-12">
        {/* <NavBar /> */}
        {children}
      </div>
    </ConvexProvider>
  );
}
