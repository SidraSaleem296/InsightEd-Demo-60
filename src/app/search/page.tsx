// "use client";
// import { Result } from "@/components/result";
// import { Search } from "@/components/search";
// import { Title } from "@/components/title";
// import { useSearchParams } from "next/navigation";
// import { redirect } from "next/navigation";
// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = decodeURIComponent(searchParams.get("q") || "");
//   const rid = decodeURIComponent(searchParams.get("rid") || "");
//   return (
//     <div className="absolute inset-0 bg-[url('/ui/bg.svg')]">
//       <div className="mx-auto max-w-3xl absolute inset-4 md:inset-8 bg-white">
//         <div className="h-20 pointer-events-none rounded-t-2xl w-full backdrop-filter absolute top-0 bg-gradient-to-t from-transparent to-white [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
//         <div className="px-4 md:px-8 pt-6 pb-24 rounded-2xl ring-8 ring-zinc-300/20 border border-zinc-200 h-full overflow-auto">
//           <Title query={query}></Title>
//           <Result key={rid} query={query} rid={rid}></Result>
//         </div>
//         <div className="h-80 pointer-events-none w-full rounded-b-2xl backdrop-filter absolute bottom-0 bg-gradient-to-b from-transparent to-white [mask-image:linear-gradient(to_top,white,transparent)]"></div>
//         <div className="absolute z-10 flex items-center justify-center bottom-6 px-4 md:px-8 w-full">
//           <div className="w-full">
//             <Search></Search>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { Result } from "@/components/result";
// import { Search } from "@/components/search";
// import { Title } from "@/components/title";
// import { useSearchParams } from "next/navigation";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = decodeURIComponent(searchParams.get("q") || "");
//   const rid = decodeURIComponent(searchParams.get("rid") || "");

//   return (
//     <div className="relative inset-0 bg-[url('/ui/bg.svg')]">
//       <div className="mx-auto max-w-3xl absolute inset-4 md:inset-8 bg-white">
//         <div className="h-20 pointer-events-none rounded-t-2xl w-full backdrop-filter absolute top-0 bg-gradient-to-t from-transparent to-white [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
//         <div className="px-4 md:px-8 pt-6 pb-24 rounded-2xl ring-8 ring-zinc-300/20 border border-zinc-200 h-full overflow-auto">
//           <Title query={query}></Title>
//           <Result key={rid} query={query} rid={rid}></Result>
//         </div>
//         <div className="h-80 pointer-events-none w-full rounded-b-2xl backdrop-filter absolute bottom-0 bg-gradient-to-b from-transparent to-white [mask-image:linear-gradient(to_top,white,transparent)]"></div>
//         <div className="absolute z-10 flex items-center justify-center bottom-6 px-4 md:px-8 w-full">
//           <div className="w-full">
//             <Search></Search>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";

// import { Result } from "@/components/result";
// import { Search } from "@/components/search";
// import { Title } from "@/components/title";
// import { useSearchParams } from "next/navigation";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = decodeURIComponent(searchParams.get("q") || "");
//   const rid = decodeURIComponent(searchParams.get("rid") || "");

//   return (
//     <div className="relative inset-0 bg-[url('/ui/bg.svg')] flex flex-col items-center justify-center min-h-screen">
//       <div className="mx-auto max-w-3xl w-full md:w-4/5 lg:w-3/5 bg-white rounded-2xl shadow-lg overflow-hidden">
//         <div className="h-20 pointer-events-none w-full backdrop-filter bg-gradient-to-t from-transparent to-white mask-image-linear-gradient(to_bottom,white,transparent)"></div>
//         <div className="px-4 md:px-8 pt-6 pb-24 ring-8 ring-zinc-300/20 border border-zinc-200 h-full overflow-auto">
//           <Title query={query} />
//           <Result key={rid} query={query} rid={rid} />
//         </div>
//         <div className="h-80 pointer-events-none w-full backdrop-filter bg-gradient-to-b from-transparent to-white mask-image-linear-gradient(to_top,white,transparent)"></div>
//         <div className="absolute z-10 flex items-center justify-center bottom-6 px-4 md:px-8 w-full">
//           <div className="w-full">
//             <Search />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { Result } from "@/components/result";
// import { Search } from "@/components/search";
// import { Title } from "@/components/title";
// import { useSearchParams } from "next/navigation";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = decodeURIComponent(searchParams.get("q") || "");
//   const rid = decodeURIComponent(searchParams.get("rid") || "");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <div className="relative w-full max-w-3xl p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
//         <div className="px-4 md:px-8 pt-6 pb-8 ring-8 ring-zinc-300/20 border border-zinc-200 dark:border-zinc-700 overflow-auto">
//           <Title query={query} />
//           <Result key={rid} query={query} rid={rid} />
//         </div>
//         <div className="mt-6 flex items-center justify-center">
//           <div className="w-full max-w-md">
//             <Search />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { Result } from "@/components/result";
// import { Search } from "@/components/search";
// import { Title } from "@/components/title";
// import { useSearchParams } from "next/navigation";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = decodeURIComponent(searchParams.get("q") || "");
//   const rid = decodeURIComponent(searchParams.get("rid") || "");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <div className="relative w-full max-w-4xl mx-4 md:mx-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
//         <div className="p-6 md:p-8 ring-8 ring-zinc-300/20 border border-zinc-200 dark:border-zinc-700 overflow-auto">
//           <Title query={query} />
//           <Result key={rid} query={query} rid={rid} />
//         </div>
//         <div className="mt-6 flex items-center justify-center pb-6">
//           <div className="w-full max-w-md">
//             <Search />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { Result } from "@/components/result";
// import { Search } from "@/components/search";
// import { Title } from "@/components/title";
// import { useSearchParams } from "next/navigation";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = decodeURIComponent(searchParams.get("q") || "");
//   const rid = decodeURIComponent(searchParams.get("rid") || "");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <div className="relative w-full max-w-4xl p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
//         <div className="px-6 md:px-10 pt-6 pb-8 ring-8 ring-zinc-300/20 border border-zinc-200 dark:border-zinc-700 overflow-auto">
//           <Title query={query} />
//           <Result key={rid} query={query} rid={rid} />
//         </div>
//         <div className="mt-6 flex items-center justify-center">
//           <div className="w-full max-w-lg mx-auto">
//             <Search />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { Result } from "@/components/result";
// import { Search } from "@/components/search";
// import { Title } from "@/components/title";
// import { useSearchParams } from "next/navigation";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = decodeURIComponent(searchParams.get("q") || "");
//   const rid = decodeURIComponent(searchParams.get("rid") || "");

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="relative w-full max-w-4xl p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
//         <div className="px-6 md:px-10 pt-6 pb-8 ring-8 ring-zinc-300/20 border border-zinc-200 dark:border-zinc-700 overflow-auto">
//           <Title query={query} />
//           <Result key={rid} query={query} rid={rid} />
//         </div>
//         <div className="mt-6 flex items-center justify-center">
//           <div className="w-full max-w-lg mx-auto">
//             <Search />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { Result } from "@/components/result";
// import { Search } from "@/components/search";
// import { Title } from "@/components/title";
// import { useSearchParams } from "next/navigation";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = decodeURIComponent(searchParams.get("q") || "");
//   const rid = decodeURIComponent(searchParams.get("rid") || "");

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
//       <div className="relative w-full max-w-4xl p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
//         <div className="px-6 md:px-10 pt-6 pb-8 ring-8 ring-zinc-300/20 border border-zinc-200 dark:border-zinc-700">
//           <Title query={query} />
//           <Result key={rid} query={query} rid={rid} />
//         </div>
//         <div className="mt-6 flex items-center justify-center">
//           <div className="w-full max-w-lg">
//             <Search />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { Result } from "@/components/result";
// import { Search } from "@/components/search";
// import { Title } from "@/components/title";
// import { useSearchParams } from "next/navigation";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = decodeURIComponent(searchParams.get("q") || "");
//   const rid = decodeURIComponent(searchParams.get("rid") || "");

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white">
//       <div className="relative w-full max-w-4xl p-4 bg-white rounded-2xl">
//         <div className="px-6 md:px-10 pt-6 pb-8 ring-8 ring-zinc-300/20 border border-zinc-200">
//           <Title query={query} />
//           <Result key={rid} query={query} rid={rid} />
//         </div>
//         <div className="mt-6 flex items-center justify-center">
//           <div className="w-full max-w-lg">
//             <Search />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { Result } from "@/components/result";
// import { Search } from "@/components/search";
// import { Title } from "@/components/title";
// import { useSearchParams } from "next/navigation";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = decodeURIComponent(searchParams.get("q") || "");
//   const rid = decodeURIComponent(searchParams.get("rid") || "");

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white">
//       <div className="relative w-full max-w-4xl p-4 bg-white rounded-2xl shadow-none">
//         <div className="px-6 md:px-10 pt-6 pb-8 border border-gray-200">
//           <Title query={query} />
//           <Result key={rid} query={query} rid={rid} />
//         </div>
//         <div className="mt-6 flex items-center justify-center">
//           <div className="w-full max-w-lg">
//             <Search />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { Result } from "@/components/result";
// import { Search } from "@/components/search";
// import { Title } from "@/components/title";
// import { useSearchParams } from "next/navigation";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = decodeURIComponent(searchParams.get("q") || "");
//   const rid = decodeURIComponent(searchParams.get("rid") || "");

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
//       <div className="relative w-full max-w-4xl p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-none">
//         <div className="px-6 md:px-10 pt-6 pb-8 border border-gray-200 dark:border-gray-700">
//           <Title query={query} />
//           <Result key={rid} query={query} rid={rid} />
//         </div>
//         <div className="mt-6 flex items-center justify-center">
//           <div className="w-full max-w-lg">
//             <Search />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { Result } from "@/components/result";
import { Search } from "@/components/search";
import { Title } from "@/components/title";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = decodeURIComponent(searchParams.get("q") || "");
  const rid = decodeURIComponent(searchParams.get("rid") || "");

  return (
    <div className="max-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      <div className="relative w-full max-w-4xl p-4 bg-white dark:bg-black rounded-2xl shadow-none">
        <div className="px-6 md:px-10 pt-6 pb-8 border border-gray-200 dark:border-black dark:bg-black">
          <Title query={query} />
          <Result key={rid} query={query} rid={rid} />
        </div>
        <div className="mt-6 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}


