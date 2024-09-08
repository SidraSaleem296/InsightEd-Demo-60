// "use client";
// import { getSearchUrl } from "@/utils/get-search-url";
// import { ArrowRight } from "lucide-react";
// import { nanoid } from "nanoid";
// import { useRouter } from "next/navigation";
// import React, { FC, useState } from "react";

// export const Search: FC = () => {
//   const [value, setValue] = useState("");
//   const router = useRouter();
//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         if (value) {
//           setValue("");
//           router.push(getSearchUrl(encodeURIComponent(value), nanoid()));
//         }
//       }}
//     >
//       <label
//         className="relative bg-white flex items-center justify-center border ring-8 ring-zinc-300/20 py-2 px-2 rounded-lg gap-2 focus-within:border-zinc-300"
//         htmlFor="search-bar"
//       >
//         <input
//           id="search-bar"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           autoFocus
//           placeholder="Ask InsightEd AI anything ..."
//           className="px-2 pr-6 w-full rounded-md flex-1 outline-none bg-white"
//         />
//         <button
//           type="submit"
//           className="w-auto py-1 px-2 bg-black border-black text-white fill-white active:scale-95 border overflow-hidden relative rounded-xl"
//         >
//           <ArrowRight size={16} />
//         </button>
//       </label>
//     </form>
//   );
// };



"use client";
import { getSearchUrl } from "@/utils/get-search-url";
import { ArrowRight } from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

export const Search: FC = () => {
  const [value, setValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value) {
            setValue("");
            router.push(getSearchUrl(encodeURIComponent(value), nanoid()));
          }
        }}
      >
        <label
          className={`relative flex items-center justify-center border py-2 px-2 rounded-lg gap-2 focus-within:border-zinc-300 ${
            isDarkMode ? 'bg-black ring-8 ring-zinc-600' : 'bg-white ring-8 ring-zinc-300/20'
          }`}
          htmlFor="search-bar"
        >
          <input
            id="search-bar"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            placeholder="Ask InsightEd AI anything ..."
            className={`px-2 pr-6 w-full rounded-md flex-1 outline-none ${
              isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          />
          <button
            type="submit"
            className={`w-auto py-1 px-2 ${
              isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
            } border overflow-hidden relative rounded-xl`}
          >
            <ArrowRight size={16} />
          </button>
        </label>
      </form>
    </div>
  );
};
