// import { Metadata } from "next"
// import { redirect } from "next/navigation"

// import { authOptions } from "@/lib/auth"
// import { getCurrentUser } from "@/lib/session"
// import { Shell } from "@/components/layout/shell"
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"
// import { AppearanceForm } from "@/components/settings/appearance-form"
// import { UserNameForm } from "@/components/user/user-name-form"

// export const metadata: Metadata = {
//   title: "Settings",
//   description: "Manage account and app settings.",
// }

// export default async function SettingsPage() {
//   const user = await getCurrentUser()

//   if (!user) {
//     redirect(authOptions?.pages?.signIn || "/signin")
//   }

//   return (
//     <Shell>
//       <DashboardHeader
//         heading="Settings"
//         text="Manage account and app settings."
//       />
//       <div className="grid grid-cols-1 gap-6">
//         <UserNameForm user={{ id: user.id, name: user.name || "" }} />
//         <AppearanceForm />
//       </div>
//     </Shell>
//   )
// }


import { Metadata } from "next"

import { getCurrentUser } from "@/lib/session"
import { Shell } from "@/components/layout/shell"
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"
import { AppearanceForm } from "@/components/settings/appearance-form"
import { UserNameForm } from "@/components/user/user-name-form"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage account and app settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) return null // Handle this case if user could ever be undefined

  return (
    <Shell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and app settings."
      />
      <div className="grid grid-cols-1 gap-8">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
        <AppearanceForm />
      </div>
    </Shell>
  )
}




// import { dashboardLinks } from "@/config/links"
// import { getCurrentUser } from "@/lib/session"
// import Footer from "@/components/layout/footer"
// import Navbar from "@/components/layout/navbar"
// import { DashboardNav } from "@/components/pages/dashboard/dashboard-nav"

// interface DashboardLayoutProps {
//   children: React.ReactNode
// }

// export default async function DashboardLayout({
//   children,
// }: DashboardLayoutProps) {
//   const user = await getCurrentUser()

//   return (
//     <div className="flex min-h-screen flex-col space-y-6">
//       <Navbar
//         user={{
//           name: user?.name,
//           image: user?.image,
//           email: user?.email,
//         }}
//       />
//       <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
//         <aside className="hidden w-[200px] flex-col md:flex">
//           <DashboardNav items={dashboardLinks.data} />
//         </aside>
//         <main className="flex w-full flex-1 flex-col">{children}</main>
//       </div>
//       <Footer />
//     </div>
//   )
// }


//layout for Dashboard
// import { cn } from "@/lib/utils"
// import { getCurrentUser } from "@/lib/session"
// import Navbar from "@/components/Navbar"
// import { Provider } from "@/components/Providers"
// import { Toaster } from "@/components/ui/toaster"
// import { SidebarMenu } from "@/components/Sidebar"
// import { AI } from "@/app/LLMSearchEngine/action"
// import { TooltipProvider } from "@radix-ui/react-tooltip"

// interface DashboardLayoutProps {
//   children: React.ReactNode
// }

// export default async function DashboardLayout({
//   children,
// }: DashboardLayoutProps) {
//   const user = await getCurrentUser()

//   return (
//     <html lang="en">
//       <body className={cn("antialiased min-h-screen")}>
//         <AI> {/* Include AI provider here if necessary */}
//           <Provider>
//             <TooltipProvider>
//               <Navbar /> {/* Use Navbar without passing user */}
//               <div className="flex">
//                 <aside className="w-48 bg-gray-100 dark:bg-gray-800 min-h-screen">
//                   <SidebarMenu />
//                 </aside>
//                 <main className="flex-1 p-4 pt-20">
//                   {children}
//                 </main>
//               </div>
//               <Toaster />
//             </TooltipProvider>
//           </Provider>
//         </AI>
//       </body>
//     </html>
//   )
// }
