import { Clipboard, Cog, FilesIcon } from "lucide-react";
import Link from "next/link";
// import NavBar from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-24 container mx-auto pt-12">
      {/* <NavBar /> */}

      {children}
    </div>
  );
}
