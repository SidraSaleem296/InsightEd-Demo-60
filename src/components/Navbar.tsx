// import Link from "next/link";
// import React from "react";
// import SignInButton from "./SignInButton";
// import { getAuthSession } from "@/lib/auth";
// import UserAccountNav from "./UserAccountNav";
// import { ThemeToggle } from "./ThemeToggle";

// type Props = {};

// const Navbar = async (props: Props) => {
//   const session = await getAuthSession();
//   return (
//     <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
//       <div className="flex items-center justify-center h-full gap-2 px-8 mx-auto sm:justify-between max-w-7xl">
//         <Link href="/gallery" className="items-center hidden gap-2 sm:flex">
//           <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
//             InsightEd
//           </p>
//         </Link>
//         <div className="flex items-center">
//           <Link href="/gallery" className="mr-3">
//             Gallery
//           </Link>
//           {session?.user && (
//             <>
//               <Link href="/create" className="mr-3">
//                 Create Course
//               </Link>
//               <Link href="/settings" className="mr-3">
//                 Settings
//               </Link>
//             </>
//           )}
//           <ThemeToggle className="mr-3" />
//           <div className="flex items-center">
//             {session?.user ? (
//               <UserAccountNav user={session.user} />
//             ) : (
//               <SignInButton />
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
//Fixed One without Logo


//Working fine
import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
type Props = {};
const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full px-8 mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <Link href="/gallery" className="hidden sm:flex items-center gap-2">
            <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] dark:border-white">
              InsightEd
            </p>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {session?.user && (
            <>
            </>
          )}
          <ThemeToggle className="mr-3" />
          <div className="flex items-center">
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// import Link from "next/link";
// import React from "react";
// import SignInButton from "./SignInButton";
// import { getAuthSession } from "@/lib/auth";
// import UserAccountNav from "./UserAccountNav";
// import { ThemeToggle } from "./ThemeToggle";

// type Props = {};

// const Navbar = async (props: Props) => {
//   const session = await getAuthSession();

//   return (
//     <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
//       <div className="flex items-center justify-between h-full px-8 mx-auto max-w-7xl">
//         <div className="flex items-center gap-4">
//           <Link href="/gallery" className="hidden sm:flex items-center gap-2">
//             <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] dark:border-white">
//               InsightEd
//             </p>
//           </Link>
//         </div>
//         <div className="flex items-center gap-4">
//           {/* You can add additional links or buttons for authenticated users here */}
//           {session?.user && (
//             <span className="text-sm text-gray-600 dark:text-gray-300">
//               Welcome, {session.user.name}
//             </span>
//           )}
//           <ThemeToggle className="mr-3" />
//           <div className="flex items-center">
//             {session?.user ? (
//               <UserAccountNav user={session.user} />
//             ) : (
//               <SignInButton />
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
