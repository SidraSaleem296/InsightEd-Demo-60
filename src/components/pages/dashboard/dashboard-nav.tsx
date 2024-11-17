// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { NavItem } from "@/types"

// import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"

// interface DashboardNavProps {
//   items: NavItem[]
// }

// export function DashboardNav({ items }: DashboardNavProps) {
//   const path = usePathname()

//   if (!items?.length) {
//     return null
//   }

//   return (
//     <nav className="grid items-start gap-2">
//       {items.map((item, index) => {
//         const Icon = Icons[item.icon || "next"]
//         return (
//           item.href && (
//             <Link key={index} href={item.disabled ? "/" : item.href}>
//               <span
//                 className={cn(
//                   "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
//                   path === item.href ? "bg-accent" : "transparent",
//                   item.disabled && "cursor-not-allowed opacity-80"
//                 )}
//               >
//                 <Icon className="mr-2 h-4 w-4" />
//                 <span>{item.title}</span>
//               </span>
//             </Link>
//           )
//         )
//       })}
//     </nav>
//   )
// }


import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface NavItem {
  icon?: keyof typeof Icons;  // Ensure icon keys match Icons' properties
  href?: string;
  title: string;
  disabled?: boolean;
}

interface DashboardNavProps {
  items: NavItem[];
  path: string;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ items, path }) => {
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        // Safely access icon by ensuring item.icon is a key of Icons
        const Icon = item.icon && Icons[item.icon] ? Icons[item.icon] : Icons.next;
        
        return (
          item.href && (
            <Link key={index} to={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
};

export default DashboardNav;
