
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { cn } from "@/lib/utils";
// import { ChevronDownIcon, Home, ListVideo, Menu, Mic2, Music, Play, RadioIcon, SquareStack, User } from "lucide-react";
// import Link from "next/link";
// import * as React from "react";

// type Menu = {
//     label: string
//     name: string
//     icon: React.ReactNode
//     submenu?: Submenu[]
//     href: string
// }

// type Submenu = {
//     name: string
//     icon: React.ReactNode
//     href: string
// }

// export function SidebarMenu() {
//     const menus: Menu[] = [
//         {
//             label: "Discover",
//             name: "Home",
//             icon: <Home size={15} className="mr-2" />,
//             href: "/home",
//         },
//         {
//             label: "Discover",
//             name: "Browse",
//             icon: <SquareStack size={15} className="mr-2" />,
//             href: "/home",
//         },
//         {
//             label: "Discover",
//             name: "Radio",
//             icon: <RadioIcon size={15} className="mr-2" />,
//             href: "/home/",
//         },
//         {
//             label: "Library",
//             name: "Playlist",
//             icon: <Play size={15} className="mr-2" />,
//             href: "/home/playlist",
//             submenu: [
//                 {
//                     name: "Playlist 1",
//                     icon: <ListVideo size={15} className="mr-2" />,
//                     href: "/home/",
//                 },
//                 {
//                     name: "Playlist 2",
//                     icon: <ListVideo size={15} className="mr-2" />,
//                     href: "/home/",
//                 },
//                 {
//                     name: "Playlist 3",
//                     icon: <ListVideo size={15} className="mr-2" />,
//                     href: "/home/",
//                 },
//             ],
//         },
//         {
//             label: "Library",
//             name: "Songs",
//             icon: <Music size={15} className="mr-2" />,
//             href: "/home/",
//         },
//         {
//             label: "Library",
//             name: "Made for You",
//             icon: <User size={15} className="mr-2" />,
//             href: "/home/",
//         },
//         {
//             label: "Library",
//             name: "Artist",
//             icon: <Mic2 size={15} className="mr-2" />,
//             href: "/home/",
//         },
//     ];

//     const uniqueLabels = Array.from(new Set(menus.map((menu) => menu.label)));

//     return (
//         <ScrollArea className="h-screen lg:w-48 sm:w-full rounded-md">
//             <div className="md:px-4 sm:p-0 mt-5 ">
//                 {uniqueLabels.map((label, index) => (
//                     <React.Fragment key={label}>
//                         {label && (
//                             <p className={`mx-4 mb-3 text-xs text-left tracking-wider font-bold text-slate-300 ${index > 0 ? 'mt-10' : ''}`}>
//                                 {label}
//                             </p>
//                         )}
//                         {menus
//                             .filter((menu) => menu.label === label)
//                             .map((menu) => (
//                                 <React.Fragment key={menu.name}>
//                                     {menu.submenu && menu.submenu.length > 0 ? (
//                                         <Accordion
//                                             key={menu.name}
//                                             type="single"
//                                             className="mt-[-10px] mb-[-10px] p-0 font-normal"
//                                             collapsible
//                                         >
//                                             <AccordionItem value="item-1" className="m-0 p-0 font-normal">
//                                                 <AccordionTrigger>
//                                                     <a key={menu.name} className="w-full flex justify-start text-xs font-normal h-10 bg-background my-2 items-center p-4 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background rounded-md">
//                                                         <div className={cn("flex justify-between w-full [&[data-state=open]>svg]:rotate-180")}>
//                                                             <div className="flex">
//                                                                 <div className="w-6">{menu.icon}</div>
//                                                                 {menu.name}
//                                                             </div>
//                                                             <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
//                                                         </div>
//                                                     </a>
//                                                 </AccordionTrigger>
//                                                 <AccordionContent>
//                                                     {menu.submenu.map((submenu) => (
//                                                         <Link key={submenu.name} href={submenu.href} className="text-gray-400 mt-0 mb-0 flex text-xs h-10 bg-white dark:bg-background dark:hover:bg-primary dark:hover:text-background my-2 items-center p-4 hover:bg-primary hover:text-white rounded-md">
//                                                             <div className="w-6">{submenu.icon}</div>
//                                                             {submenu.name}
//                                                         </Link>
//                                                     ))}
//                                                 </AccordionContent>
//                                             </AccordionItem>
//                                         </Accordion>
//                                     ) : (
//                                         <div key={menu.name}>
//                                             <Link href={menu.href} className="flex text-xs h-10 bg-white dark:bg-background my-2 items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-background hover:text-white rounded-md">
//                                                 <div className="w-6">{menu.icon}</div>
//                                                 {menu.name}
//                                             </Link>
//                                         </div>
//                                     )}
//                                 </React.Fragment>
//                             ))}
//                     </React.Fragment>
//                 ))}
//             </div>
//         </ScrollArea>
//     );
// }

// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { cn } from "@/lib/utils";
// import { ChevronDownIcon, Home, Book, Calendar, User, Bell, FileText, Users, Globe, Settings, Clipboard } from "lucide-react"; // Adjust the icons as needed
// import Link from "next/link";
// import * as React from "react";

// type Menu = {
//     name: string;
//     icon: React.ReactNode;
//     submenu?: Submenu[];
//     href?: string;
// }

// type Submenu = {
//     name: string;
//     icon: React.ReactNode;
//     href: string;
// }

// export function SidebarMenu() {
//     const menus: Menu[] = [
//         {
//             name: "Dashboard",
//             icon: <Home size={15} className="mr-2" />,
//             href: "/gallery",
//         },
//         {
//             name: "Courses",
//             icon: <Book size={15} className="mr-2" />,
//             submenu: [
//                 {
//                     name: "Create",
//                     icon: <Calendar size={15} className="mr-2" />,
//                     href: "/create",
//                 },
//                 {
//                     name: "Quiz",
//                     icon: <Clipboard size={15} className="mr-2" />,
//                     href: "/QuizDashboard",
//                 },
//                 {
//                     name: "Gallery",
//                     icon: <Calendar size={15} className="mr-2" />,
//                     href: "/gallery",
//                 }
//             ],
//         },
//         {
//             name: "Lesson Planning",
//             icon: <Calendar size={15} className="mr-2" />,
//             href: "/lesson-planning",
//         },
//         {
//             name: "Profile",
//             icon: <User size={15} className="mr-2" />,
//             href: "/profile",
//         },
//         {
//             name: "Notifications",
//             icon: <Bell size={15} className="mr-2" />,
//             href: "/notifications",
//         },
//         {
//             name: "Resource Finder",
//             icon: <Bell size={15} className="mr-2" />,
//             href: "/search",
//         },
//         {
//             name: "Report Generation",
//             icon: <FileText size={15} className="mr-2" />,
//             href: "/report-generation",
//         },
//         {
//             name: "Teams",
//             icon: <Users size={15} className="mr-2" />,
//             href: "/teams",
//         },
//         {
//             name: "Social Platform",
//             icon: <Globe size={15} className="mr-2" />,
//             href: "/social-platform",
//         },
//         {
//             name: "Settings",
//             icon: <Settings size={15} className="mr-2" />,
//             href: "/settings",
//         },
//     ];

//     return (
//         <ScrollArea className="h-screen lg:w-48 sm:w-full rounded-md">
//             <div className="md:px-4 sm:p-0 mt-5">
//                 {menus.map((menu) => (
//                     <div key={menu.name}>
//                         {menu.submenu ? (
//                             <Accordion type="single" collapsible>
//                                 <AccordionItem value={menu.name}>
//                                     <AccordionTrigger className="flex items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-background hover:text-white rounded-md">
//                                         <div className="w-10">{menu.icon}</div>
//                                         {menu.name}
//                                         <ChevronDownIcon className="ml-auto" />
//                                     </AccordionTrigger>
//                                     <AccordionContent>
//                                         {menu.submenu.map((submenu) => (
//                                             <Link key={submenu.name} href={submenu.href} className="flex text-xs h-10 bg-white dark:bg-background my-2 items-center pl-10 hover:bg-primary dark:hover:bg-primary dark:hover:text-background hover:text-white rounded-md">
//                                                 <div className="w-6">{submenu.icon}</div>
//                                                 {submenu.name}
//                                             </Link>
//                                         ))}
//                                     </AccordionContent>
//                                 </AccordionItem>
//                             </Accordion>
//                         ) : (
//                             <Link href={menu.href || '/default-path'} className="flex text-xs h-10 bg-white dark:bg-background my-2 items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-background hover:text-white rounded-md">
//                                 <div className="w-6">{menu.icon}</div>
//                                 {menu.name}
//                             </Link>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </ScrollArea>
//     );
// }




// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ChevronDownIcon, Home, Book, Calendar, User, Bell, FileText, Users, Globe, Settings, Clipboard } from "lucide-react";
// import Link from "next/link";
// import * as React from "react";

// type Menu = {
//     name: string;
//     icon: React.ReactNode;
//     submenu?: Submenu[];
//     href?: string;
// }

// type Submenu = {
//     name: string;
//     icon: React.ReactNode;
//     href: string;
// }

// export function SidebarMenu() {
//     const menus: Menu[] = [
//         {
//             name: "Dashboard",
//             icon: <Home size={15} className="mr-2" />,
//             href: "/gallery",
//         },
//         {
//             name: "Courses",
//             icon: <Book size={15} className="mr-2" />,
//             submenu: [
//                 {
//                     name: "Create",
//                     icon: <Calendar size={15} className="mr-2" />,
//                     href: "/create",
//                 },
//                 {
//                     name: "Quiz",
//                     icon: <Clipboard size={15} className="mr-2" />,
//                     href: "/QuizDashboard",
//                 },
//                 {
//                     name: "Gallery",
//                     icon: <Calendar size={15} className="mr-2" />,
//                     href: "/gallery",
//                 }
//             ],
//         },
//         {
//             name: "Lesson Planning",
//             icon: <Calendar size={15} className="mr-2" />,
//             href: "/lesson-planning",
//         },
//         {
//             name: "Profile",
//             icon: <User size={15} className="mr-2" />,
//             href: "/profile",
//         },
//         {
//             name: "Notifications",
//             icon: <Bell size={15} className="mr-2" />,
//             href: "/notifications",
//         },
//         {
//             name: "Resource Finder",
//             icon: <Bell size={15} className="mr-2" />,
//             href: "/search",
//         },
//         {
//             name: "Report Generation",
//             icon: <FileText size={15} className="mr-2" />,
//             href: "/report-generation",
//         },
//         {
//             name: "Teams",
//             icon: <Users size={15} className="mr-2" />,
//             href: "/teams",
//         },
//         {
//             name: "Social Platform",
//             icon: <Globe size={15} className="mr-2" />,
//             href: "/social-platform",
//         },
//         {
//             name: "Settings",
//             icon: <Settings size={15} className="mr-2" />,
//             href: "/settings",
//         },
//     ];

//     return (
//         <div className="h-screen w-64 bg-card dark:bg-card fixed">
//             <ScrollArea className="h-full rounded-md">
//                 <div className="px-4 mt-5">
//                     {menus.map((menu) => (
//                         <div key={menu.name}>
//                             {menu.submenu ? (
//                                 <Accordion type="single" collapsible>
//                                     <AccordionItem value={menu.name}>
//                                         <AccordionTrigger className="flex items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md">
//                                             <div className="w-10">{menu.icon}</div>
//                                             {menu.name}
//                                             <ChevronDownIcon className="ml-auto" />
//                                         </AccordionTrigger>
//                                         <AccordionContent>
//                                             {menu.submenu.map((submenu) => (
//                                                 <Link key={submenu.name} href={submenu.href} className="flex text-xs h-10 bg-background dark:bg-background my-2 items-center pl-10 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md">
//                                                     <div className="w-6">{submenu.icon}</div>
//                                                     {submenu.name}
//                                                 </Link>
//                                             ))}
//                                         </AccordionContent>
//                                     </AccordionItem>
//                                 </Accordion>
//                             ) : (
//                                 <Link href={menu.href || '/default-path'} className="flex text-xs h-10 bg-background dark:bg-background my-2 items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md">
//                                     <div className="w-6">{menu.icon}</div>
//                                     {menu.name}
//                                 </Link>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </ScrollArea>
//         </div>
//     );
// }






// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ChevronDownIcon, Home, Book, Calendar, User, Bell, FileText, Users, Globe, Settings, Clipboard } from "lucide-react";
// import Link from "next/link";
// import * as React from "react";

// type Menu = {
//     name: string;
//     icon: React.ReactNode;
//     submenu?: Submenu[];
//     href?: string;
// }

// type Submenu = {
//     name: string;
//     icon: React.ReactNode;
//     href: string;
// }

// export function SidebarMenu() {
//     const menus: Menu[] = [
//         {
//             name: "Dashboard",
//             icon: <Home size={15} className="mr-2" />,
//             href: "/gallery",
//         },
//         {
//             name: "Dashboard",
//             icon: <Home size={15} className="mr-2" />,
//             href: "/gallery",
//         },
//         {
//             name: "Courses",
//             icon: <Book size={15} className="mr-2" />,
//             submenu: [
//                 {
//                     name: "Create",
//                     icon: <Calendar size={15} className="mr-2" />,
//                     href: "/create",
//                 },
//                 {
//                     name: "Quiz",
//                     icon: <Clipboard size={15} className="mr-2" />,
//                     href: "/QuizDashboard",
//                 },
//                 {
//                     name: "Gallery",
//                     icon: <Calendar size={15} className="mr-2" />,
//                     href: "/gallery",
//                 }
//             ],
//         },
//         {
//             name: "Lesson Planning",
//             icon: <Calendar size={15} className="mr-2" />,
//             href: "/lesson-planning",
//         },
//         {
//             name: "Profile",
//             icon: <User size={15} className="mr-2" />,
//             href: "/profile",
//         },
//         {
//             name: "Notifications",
//             icon: <Bell size={15} className="mr-2" />,
//             href: "/notifications",
//         },
//         {
//             name: "Resource Finder",
//             icon: <Bell size={15} className="mr-2" />,
//             href: "/search",
//         },
//         {
//             name: "Report Generation",
//             icon: <FileText size={15} className="mr-2" />,
//             href: "/report-generation",
//         },
//         {
//             name: "Teams",
//             icon: <Users size={15} className="mr-2" />,
//             href: "/teams",
//         },
//         {
//             name: "Social Platform",
//             icon: <Globe size={15} className="mr-2" />,
//             href: "/social-platform",
//         },
//         {
//             name: "Settings",
//             icon: <Settings size={15} className="mr-2" />,
//             href: "/settings",
//         },
//     ];

//     return (
//         <div className="h-screen w-64 bg-gray-200 dark:bg-gray-800 fixed">
//             <ScrollArea className="h-full rounded-md">
//                 <div className="px-4 mt-5">
//                     {menus.map((menu) => (
//                         <div key={menu.name}>
//                             {menu.submenu ? (
//                                 <Accordion type="single" collapsible>
//                                     <AccordionItem value={menu.name}>
//                                         <AccordionTrigger className="flex items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md">
//                                             <div className="w-10">{menu.icon}</div>
//                                             {menu.name}
//                                             <ChevronDownIcon className="ml-auto" />
//                                         </AccordionTrigger>
//                                         <AccordionContent>
//                                             {menu.submenu.map((submenu) => (
//                                                 <Link key={submenu.name} href={submenu.href} className="flex text-xs h-10 bg-background dark:bg-background my-2 items-center pl-10 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md">
//                                                     <div className="w-6">{submenu.icon}</div>
//                                                     {submenu.name}
//                                                 </Link>
//                                             ))}
//                                         </AccordionContent>
//                                     </AccordionItem>
//                                 </Accordion>
//                             ) : (
//                                 <Link href={menu.href || '/default-path'} className="flex text-xs h-10 bg-background dark:bg-background my-2 items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md">
//                                     <div className="w-6">{menu.icon}</div>
//                                     {menu.name}
//                                 </Link>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </ScrollArea>
//         </div>
//     );
// }

//Working fine

// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ChevronDownIcon, Home, Book, Calendar, User, Bell, FileText, Users, Globe, Settings, Clipboard } from "lucide-react";
// import Link from "next/link";
// import * as React from "react";

// type Menu = {
//     name: string;
//     icon: React.ReactNode;
//     submenu?: Submenu[];
//     href?: string;
// }

// type Submenu = {
//     name: string;
//     icon: React.ReactNode;
//     href: string;
// }

// export function SidebarMenu() {
//     const menus: Menu[] = [

//         {
//             // name: "Dashboard",
//             // icon: <Home size={15} className="mr-2" />,
//             // href: "/dashboard",

//             name: "Dashboard",
//             icon: <Home size={15} className="mr-2" style={{ color: 'grey' }} />,
//             href: "/none"
//         },
//         {
//             name: "Courses",
//             icon: <Book size={15} className="mr-2" />,
//             submenu: [
//                 {
//                     name: "Create",
//                     icon: <Calendar size={15} className="mr-2" />,
//                     href: "/create",
//                 },
//                 {
//                     name: "Lesson Planning",
//                     icon: <Calendar size={15} className="mr-2" />,
//                     href: "/lesson-planning",
//                 },
//                 {
//                     name: "Quiz",
//                     icon: <Clipboard size={15} className="mr-2" />,
//                     href: "/QuizDashboard",
//                 },
//                 {
//                     name: "Gallery",
//                     icon: <Calendar size={15} className="mr-2" />,
//                     href: "/gallery",
//                 },
//                 {
//                     name: "Documents",
//                     icon: <Calendar size={15} className="mr-2" />,
//                     href: "/Docs/documents",
//                 },
//                 {
//                     name: "Notes",
//                     icon: <Clipboard size={15} className="mr-2" />,
//                     href: "/Docs/notes",
//                 },
//                 {
//                     name: "Chat",
//                     icon: <Calendar size={15} className="mr-2" />,
//                     href: "/Docs/search",
//                 }
//             ],
//         },
//         {

//             name: "Habit Tracker",
//             icon: <Home size={15} className="mr-2" style={{ color: 'grey' }} />,
//             submenu:[
//                 {
//                     name: "Habit Analysis",
//                     icon: <Bell size={15} className="mr-2" />,
//                     href: "/dashboard",
//                 },
//                 {
//                     name: "Activities",
//                     icon: <Bell size={15} className="mr-2" />,
//                     href: "/dashboard/activities/",
//                 },

//             ]
//         },
//         {
//             name: "Resource Finder",
//             icon: <Bell size={15} className="mr-2" />,
//             href: "/LLMSearchEngine",
//         },
//         {
//             name: "Report Generation",
//             icon: <FileText size={15} className="mr-2" />,
//             href: "/history",
//         },

//         {
//             name: "Social Platform",
//             icon: <Globe size={15} className="mr-2" />,
//             href: "/social-platform",
//         },
//         {
//             name: "Notifications",
//             icon: <User size={15} className="mr-2" />,
//             href: "/notifications",
//         },
//         {
//             name: "Profile",
//             icon: <User size={15} className="mr-2" />,
//             href: "/profile",
//         },
//         {
//             name: "Settings",
//             icon: <Settings size={15} className="mr-2" />,
//             href: "/settings",
//         },
//     ];

//     return (
//         <div className="h-screen w-64 bg-gray-200 dark:bg-gray-800 fixed">
//             <ScrollArea className="h-full rounded-md overflow-y-auto">
//                 <div className="px-4 mt-5">
//                     {menus.map((menu) => (
//                         <div key={menu.name} className="my-2">
//                             {menu.submenu ? (
//                                 <Accordion type="single" collapsible>
//                                     <AccordionItem value={menu.name}>
//                                         <AccordionTrigger className="flex items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md">
//                                             <div className="w-10">{menu.icon}</div>
//                                             {menu.name}
//                                             <ChevronDownIcon className="ml-auto" />
//                                         </AccordionTrigger>
//                                         <AccordionContent>
//                                             {menu.submenu.map((submenu) => (
//                                                 <Link key={submenu.name} href={submenu.href} className="flex text-xs h-10 bg-background dark:bg-background my-2 items-center pl-10 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md">
//                                                     <div className="w-6">{submenu.icon}</div>
//                                                     {submenu.name}
//                                                 </Link>
//                                             ))}
//                                         </AccordionContent>
//                                     </AccordionItem>
//                                 </Accordion>
//                             ) : (
//                                 <Link href={menu.href || '/default-path'} className="flex text-xs h-10 bg-background dark:bg-background my-2 items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md">
//                                     <div className="w-6">{menu.icon}</div>
//                                     {menu.name}
//                                 </Link>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </ScrollArea>
//         </div>
//     );
// }

"use client"
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDownIcon,
  Home,
  Book,
  Calendar,
  Clipboard,
  Image,
  FileText,
  MessageSquare,
  TrendingUp,
  Activity,
  Search,
  Globe,
  Bell,
  User,
  Settings,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { getAuthSession } from "@/lib/auth";

type Menu = {
  name: string;
  icon: React.ReactNode;
  submenu?: Submenu[];
  href?: string;
};

type Submenu = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export function SidebarMenu() {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle sidebar state
  };

  const [userId, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch("/api/auth/session"); // Fetch session from API route
        if (response.ok) {
          const session = await response.json();
          setUserId(session?.user?.id || null); // Set the user ID
        } else {
          console.error("Failed to fetch session");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    }

    fetchSession();
  }, []);
  const menus: Menu[] = [
    {
      name: "Dashboard",
      icon: <Home size={15} className="mr-2" style={{ color: "grey" }} />,
      href: "/dashboard",
    },
    {
      name: "Courses",
      icon: <Book size={15} className="mr-2" />,
      submenu: [
        {
          name: "Create",
          icon: <Calendar size={15} className="mr-2" />,
          href: "/create",
        },
        {
          name: "Lesson Planning",
          icon: <Calendar size={15} className="mr-2" />,
          href: "/lesson-planning",
        },
        {
          name: "Quiz",
          icon: <Clipboard size={15} className="mr-2" />,
          href: "/QuizDashboard",
        },
        {
          name: "Gallery",
          icon: <Image size={15} className="mr-2" />,
          href: "/gallery",
        },
        {
          name: "Documents",
          icon: <FileText size={15} className="mr-2" />,
          href: "/Docs/documents",
        },
        {
          name: "Notes",
          icon: <Clipboard size={15} className="mr-2" />,
          href: "/Docs/notes",
        },
        {
          name: "Chat",
          icon: <MessageSquare size={15} className="mr-2" />,
          href: "/Docs/search",
        },
      ],
    },
    {
      name: "Habit Tracker",
      icon: <TrendingUp size={15} className="mr-2" style={{ color: "grey" }} />,
      submenu: [
        {
          name: "Habit Analysis",
          icon: <TrendingUp size={15} className="mr-2" />,
          href: "/dashboard",
        },
        {
          name: "Activities",
          icon: <Activity size={15} className="mr-2" />,
          href: "/dashboard/activities/",
        },
      ],
    },
    {
      name: "Resource Finder",
      icon: <Search size={15} className="mr-2" />,
      href: "/LLMSearchEngine",
    },
    {
      name: "Report Generation",
      icon: <FileText size={15} className="mr-2" />,
      href: "/history",
    },
    {
      name: "Social Platform",
      icon: <Globe size={15} className="mr-2" />,
      href: "/social-platform",
    },
    {
      name: "Notifications",
      icon: <Bell size={15} className="mr-2" />,
      href: "/notifications",
    },
    {
      name: "Profile",
      icon: <User size={15} className="mr-2" />,
      href: `/profile/${userId}`,
    },
    {
      name: "Settings",
      icon: <Settings size={15} className="mr-2" />,
      href: "/settings",
    },
  ];

  return (
<div
  className={`h-screen fixed transition-all duration-300 ${
    isCollapsed ? "w-16 bg-gray-200 dark:bg-gray-800" : "w-64 bg-gray-200 dark:bg-gray-800"
  }`}
>
  <ScrollArea className="h-full rounded-md overflow-y-auto">
    {/* Sidebar Content */}
    <div className="px-4 mt-5">
      {menus.map((menu) => (
        <div key={menu.name} className="my-2">
          {menu.submenu ? (
            <Accordion type="single" collapsible>
              <AccordionItem value={menu.name}>
                <AccordionTrigger
                  className={`flex items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                >
                  <div className="w-6">{menu.icon}</div>
                  {!isCollapsed && (
                    <>
                      {menu.name}
                      <ChevronDownIcon className="ml-auto" />
                    </>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  {menu.submenu.map((submenu) => (
                    <Link
                      key={submenu.name}
                      href={submenu.href}
                      className="flex text-xs h-10 bg-background dark:bg-background my-2 items-center pl-10 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md"
                    >
                      <div className="w-6">{submenu.icon}</div>
                      {!isCollapsed && submenu.name}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link
              href={menu.href || "/default-path"}
              className={`flex text-xs h-10 bg-background dark:bg-background my-2 items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground hover:text-primary-foreground rounded-md ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-6">{menu.icon}</div>
              {!isCollapsed && menu.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  </ScrollArea>

  {/* Toggle Button */}
  <button
    onClick={toggleSidebar}
    className="absolute bottom-4 right-4 bg-gray-400 text-white rounded-full p-2 shadow-md hover:bg-gray-500 z-10"
  >
    {isCollapsed ? <ChevronRightIcon size={18} /> : <ChevronLeftIcon size={18} />}
  </button>
</div>

  );
}
