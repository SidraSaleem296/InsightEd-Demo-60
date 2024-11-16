// import { cn } from "@/lib/utils";
// import "./globals.css";
// import type { Metadata } from "next";
// import { Lexend } from "next/font/google";
// import Navbar from "@/components/Navbar";
// import { Provider } from "@/components/Providers";
// import { Toaster } from "@/components/ui/toaster";

// const lexend = Lexend({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "InsightEd",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={cn(lexend.className, "antialiased min-h-screen pt-16")}>
//         <Provider>
//           <Navbar />
//           {children}
//           <Toaster />
//         </Provider>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx (or wherever your RootLayout is defined)
// import { cn } from "@/lib/utils";
// import "./globals.css";
// import type { Metadata } from "next";
// import { Lexend } from "next/font/google";
// import Navbar from "@/components/Navbar";
// import { Provider } from "@/components/Providers";
// import { Toaster } from "@/components/ui/toaster";
// import { SidebarMenu } from "@/components/Sidebar"; // Adjust the import path as needed

// const lexend = Lexend({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "InsightEd",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={cn(lexend.className, "antialiased min-h-screen")}>
//         <Provider>
//           <Navbar />
//           <div className="flex">
//             <aside className="w-48 bg-gray-100 dark:bg-gray-800">
//               <SidebarMenu />
//             </aside>
//             <main className="flex-1 p-4">
//               {children}
//             </main>
//           </div>
//           <Toaster />
//         </Provider>
//       </body>
//     </html>
//   );
// }

// import { cn } from "@/lib/utils";
// import "./globals.css";
// import type { Metadata } from "next";
// import { Lexend } from "next/font/google";
// import Navbar from "@/components/Navbar";
// import { Provider } from "@/components/Providers";
// import { Toaster } from "@/components/ui/toaster";
// import { SidebarMenu } from "@/components/Sidebar"; // Adjust the import path as needed

// const lexend = Lexend({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "InsightEd",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={cn(lexend.className, "antialiased min-h-screen")}>
//         <Provider>
//           <Navbar />
//           <div className="flex">
//             <aside className="w-48 bg-gray-100 dark:bg-gray-800 min-h-screen">
//               <SidebarMenu />
//             </aside>
//             <main className="flex-1 p-4 pt-16"> {/* Add padding-top to avoid content hiding behind Navbar */}
//               {children}
//             </main>
//           </div>
//           <Toaster />
//         </Provider>
//       </body>
//     </html>
//   );
// }


//Working Fine
// import { cn } from "@/lib/utils";
// import "./globals.css";
// import type { Metadata } from "next";
// import { Lexend } from "next/font/google";
// import Navbar from "@/components/Navbar";
// import { Provider } from "@/components/Providers";
// import { Toaster } from "@/components/ui/toaster";
// import { SidebarMenu } from "@/components/Sidebar"; // Adjust the import path as needed

// const lexend = Lexend({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "InsightEd",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={cn(lexend.className, "antialiased min-h-screen")}>//bring back to original
//         <Provider>
//           <Navbar />
//           <div className="flex">
//             <aside className="w-48 bg-gray-100 dark:bg-gray-800 min-h-screen">
//               <SidebarMenu/>
//             </aside>
//             <main className="flex-1 p-4 pt-20"> {/* Adjust the padding-top value to match the Navbar height */}
//               {children}
//             </main>
//           </div>
//           <Toaster />
//         </Provider>
//       </body>
//     </html>
//   );
// }



import { cn } from "@/lib/utils";
import "./globals.css";
// import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Provider } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { SidebarMenu } from "@/components/Sidebar"; // Adjust the import path as needed
import { AI } from "@/app/LLMSearchEngine/action"; // Import AI provider if necessary
import { TooltipProvider } from '@radix-ui/react-tooltip';  // Import TooltipProvider

const lexend = Lexend({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "InsightEd",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(lexend.className, "antialiased min-h-screen")}>
        <AI>  {/* Include AI provider here if necessary */}
          <Provider>
            <TooltipProvider>  {/* Wrap your application with TooltipProvider */}
              <Navbar />
              <div className="flex">
                <aside className="w-48 bg-gray-100 dark:bg-gray-800 min-h-screen">
                  <SidebarMenu />
                </aside>
                <main className="flex-1 p-4 pt-20"> {/* Adjust the padding-top value to match the Navbar height */}
                  {children}
                </main>
              </div>
              <Toaster />
            </TooltipProvider>
          </Provider>
        </AI>
      </body>
    </html>
  );
}
