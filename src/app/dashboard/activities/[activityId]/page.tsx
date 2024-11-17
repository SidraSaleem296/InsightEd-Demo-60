// import { Metadata } from "next"
// import { notFound, redirect } from "next/navigation"

// import { getUserActivities } from "@/lib/api/activities"
// import { getStatsDashboardData } from "@/lib/api/dashboard"
// import { authOptions } from "@/lib/auth"
// import { getCurrentUser } from "@/lib/session"
// import { cn, dateRangeParams } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"
// import { ActivityOperations } from "@/components/activity/activity-operations"
// import { logColumns } from "@/components/activity/logs/logs-columns"
// import { StatsCards } from "@/components/activity/stats/stats-cards"
// import { Heatmap } from "@/components/charts/heatmap"
// import { DataTable } from "@/components/data-table"
// import { DateRangePicker } from "@/components/date-range-picker"
// import { Icons } from "@/components/icons"
// import { Shell } from "@/components/layout/shell"
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"

// interface ActivityPageProps {
//   params: { activityId: string }
//   searchParams: { from: string; to: string }
// }

// export async function generateMetadata({
//   params,
// }: ActivityPageProps): Promise<Metadata> {
//   const user = await getCurrentUser()

//   if (!user) {
//     redirect(authOptions?.pages?.signIn || "/signin")
//   }

//   const activity = await getUserActivities(params.activityId, user.id)

//   return {
//     title: activity?.name || "Not Found",
//     description: activity?.description,
//   }
// }

// export default async function ActivityPage({
//   params,
//   searchParams,
// }: ActivityPageProps) {
//   const user = await getCurrentUser()

//   if (!user) {
//     redirect(authOptions?.pages?.signIn || "/signin")
//   }

//   const activity = await getUserActivities(params.activityId, user.id)

//   if (!activity) {
//     notFound()
//   }

//   const dateRange = dateRangeParams(searchParams)
//   const dashboardData = await getStatsDashboardData(activity.id, dateRange)

//   return (
//     <Shell>
//       <DashboardHeader
//         heading={`${activity.name} Stats`}
//         text={activity.description}
//       >
//         <div className="flex flex-col items-stretch gap-2 md:items-end">
//           <DateRangePicker />
//           <ActivityOperations
//             activity={{
//               id: activity.id,
//             }}
//           >
//             <div
//               className={cn(buttonVariants({ variant: "outline" }), "w-full")}
//             >
//               <Icons.down className="mr-2 h-4 w-4" />
//               Actions
//             </div>
//           </ActivityOperations>
//         </div>
//       </DashboardHeader>
//       <Heatmap data={dashboardData.logs} params={params} />
//       <StatsCards data={dashboardData} searchParams={searchParams} />
//       <DataTable columns={logColumns} data={dashboardData.logs}>
//         Log History
//       </DataTable>
//     </Shell>
//   )
// }

// import { Metadata } from "next"
// import { notFound } from "next/navigation"

// import { getUserActivities } from "@/lib/api/activities"  // Use the new function
// import { getStatsDashboardData } from "@/lib/api/dashboard"
// import { cn, dateRangeParams } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"
// import { ActivityOperations } from "@/components/activity/activity-operations"
// import { logColumns } from "@/components/activity/logs/logs-columns"
// import { StatsCards } from "@/components/activity/stats/stats-cards"
// import { Heatmap } from "@/components/charts/heatmap"
// import { DataTable } from "@/components/data-table"
// import { DateRangePicker } from "@/components/date-range-picker"
// import { Icons } from "@/components/icons"
// import { Shell } from "@/components/layout/shell"
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"

// interface ActivityPageProps {
//   params: { activityId: string }
//   searchParams: { from: string; to: string }
// }

// export async function generateMetadata({
//   params,
// }: ActivityPageProps): Promise<Metadata> {
//   const activity = await getUserActivities(params.activityId)

//   if (!activity) {
//     return {
//       title: "Not Found",
//       description: "The requested activity could not be found.",
//     }
//   }

//   return {
//     title: activity.name || "Activity Stats",
//     description: activity.description || "Detailed statistics for the activity.",
//   }
// }

// export default async function ActivityPage({
//   params,
//   searchParams,
// }: ActivityPageProps) {
//   const activity = await getUserActivity(params.activityId)

//   if (!activity) {
//     notFound()
//   }

//   const dateRange = dateRangeParams(searchParams)
//   const dashboardData = await getStatsDashboardData(activity.id, dateRange)

//   return (
//     <Shell>
//       <DashboardHeader
//         heading={`${activity.name} Stats`}
//         text={activity.description}
//       >
//         <div className="flex flex-col items-stretch gap-2 md:items-end">
//           <DateRangePicker />
//           <ActivityOperations
//             activity={{
//               id: activity.id,
//             }}
//           >
//             <div
//               className={cn(buttonVariants({ variant: "outline" }), "w-full")}
//             >
//               <Icons.down className="mr-2 h-4 w-4" />
//               Actions
//             </div>
//           </ActivityOperations>
//         </div>
//       </DashboardHeader>
//       <Heatmap data={dashboardData.logs} params={params} />
//       <StatsCards data={dashboardData} searchParams={searchParams} />
//       <DataTable columns={logColumns} data={dashboardData.logs}>
//         Log History
//       </DataTable>
//     </Shell>
//   )
// }

// import { Metadata } from "next";
// import { notFound } from "next/navigation";

// import { getUserActivities } from "@/lib/api/activities"; // Use the new function
// import { getStatsDashboardData } from "@/lib/api/dashboard";
// import { getCurrentUser } from "@/lib/session"; // Assuming it retrieves the current user's info
// import { cn, dateRangeParams } from "@/lib/utils";
// import { buttonVariants } from "@/components/ui/button";
// import { ActivityOperations } from "@/components/activity/activity-operations";
// import { logColumns } from "@/components/activity/logs/logs-columns";
// import { StatsCards } from "@/components/activity/stats/stats-cards";
// import { Heatmap } from "@/components/charts/heatmap";
// import { DataTable } from "@/components/data-table";
// import { DateRangePicker } from "@/components/date-range-picker";
// import { Icons } from "@/components/icons";
// import { Shell } from "@/components/layout/shell";
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";

// interface ActivityPageProps {
//   params: { activityId: string };
//   searchParams: { from: string; to: string };
// }

// export async function generateMetadata({
//   params,
// }: ActivityPageProps): Promise<Metadata> {
//   const user = await getCurrentUser();
//   if (!user) {
//     return {
//       title: "Not Found",
//       description: "User not authenticated.",
//     };
//   }

//   const userActivities = await getUserActivities(user.id);
//   const activity = userActivities.find((activity) => activity.id === params.activityId);

//   if (!activity) {
//     return {
//       title: "Not Found",
//       description: "The requested activity could not be found.",
//     };
//   }

//   return {
//     title: activity.name || "Activity Stats",
//     description: activity.description || "Detailed statistics for the activity.",
//   };
// }

// export default async function ActivityPage({
//   params,
//   searchParams,
// }: ActivityPageProps) {
//   const user = await getCurrentUser();
//   if (!user) {
//     notFound();
//     return;
//   }

//   const userActivities = await getUserActivities(user.id);
//   const activity = userActivities.find((activity) => activity.id === params.activityId);

//   if (!activity) {
//     notFound();
//     return;
//   }

//   const dateRange = dateRangeParams(searchParams);
//   const dashboardData = await getStatsDashboardData(activity.id, dateRange);

//   return (
//     <Shell>
//       <DashboardHeader
//         heading={`${activity.name} Stats`}
//         text={activity.description}
//       >
//         <div className="flex flex-col items-stretch gap-2 md:items-end">
//           <DateRangePicker />
//           <ActivityOperations
//             activity={{
//               id: activity.id,
//             }}
//           >
//             <div
//               className={cn(buttonVariants({ variant: "outline" }), "w-full")}
//             >
//               <Icons.down className="mr-2 h-4 w-4" />
//               Actions
//             </div>
//           </ActivityOperations>
//         </div>
//       </DashboardHeader>
//       <Heatmap data={dashboardData.logs} params={params} />
//       <StatsCards data={dashboardData} searchParams={searchParams} />
//       <DataTable columns={logColumns} data={dashboardData.logs}>
//         Log History
//       </DataTable>
//     </Shell>
//   );
// }

// import { Metadata } from "next";
// import { notFound } from "next/navigation";

// import { getUserActivities } from "@/lib/api/activities";
// import { getStatsDashboardData } from "@/lib/api/dashboard";
// import { getCurrentUser } from "@/lib/session";
// import { cn, dateRangeParams } from "@/lib/utils";
// import { buttonVariants } from "@/components/ui/button";
// import { ActivityOperations } from "@/components/activity/activity-operations";
// import { logColumns } from "@/components/activity/logs/logs-columns";
// import { StatsCards } from "@/components/activity/stats/stats-cards";
// import { Heatmap } from "@/components/charts/heatmap";
// import { DataTable } from "@/components/data-table";
// import { DateRangePicker } from "@/components/date-range-picker";
// import { Icons } from "@/components/icons";
// import { Shell } from "@/components/layout/shell";
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";

// interface ActivityPageProps {
//   params: { activityId: string };
//   searchParams: { from: string; to: string };
// }

// export async function generateMetadata({
//   params,
// }: ActivityPageProps): Promise<Metadata> {
//   const user = await getCurrentUser();
//   if (!user) {
//     return {
//       title: "Not Found",
//       description: "User not authenticated.",
//     };
//   }

//   const userActivities = await getUserActivities(user.id);
//   const activity = userActivities.find((activity) => activity.id === params.activityId);

//   if (!activity) {
//     return {
//       title: "Not Found",
//       description: "The requested activity could not be found.",
//     };
//   }

//   return {
//     title: activity.name || "Activity Stats",
//     description: activity.description || "Detailed statistics for the activity.",
//   };
// }

// export default async function ActivityPage({
//   params,
//   searchParams,
// }: ActivityPageProps) {
//   const user = await getCurrentUser();
//   if (!user) {
//     notFound();
//     return;
//   }

//   const userActivities = await getUserActivities(user.id);
//   const activity = userActivities.find((activity) => activity.id === params.activityId);

//   if (!activity) {
//     notFound();
//     return;
//   }

//   const dateRange = dateRangeParams(searchParams);
//   const dashboardData = await getStatsDashboardData(activity.id, dateRange);

//   return (
//     <Shell>
//       <div className="flex justify-center min-h-screen py-6"> {/* Center the main content */}
//         <div className="w-[85%] transform scale-[0.85]"> {/* Reduce size by ~30% */}
//           <DashboardHeader
//             heading={`${activity.name} Stats`}
//             text={activity.description}
//           >
//             <div className="flex flex-col items-stretch gap-2 md:items-end">
//               <DateRangePicker />
//               <ActivityOperations
//                 activity={{
//                   id: activity.id,
//                 }}
//               >
//                 <div
//                   className={cn(buttonVariants({ variant: "outline" }), "w-full")}
//                 >
//                   <Icons.down className="mr-2 h-4 w-4" />
//                   Actions
//                 </div>
//               </ActivityOperations>
//             </div>
//           </DashboardHeader>
//           <Heatmap data={dashboardData.logs} params={params} />
//           <StatsCards data={dashboardData} searchParams={searchParams} />
//           <DataTable columns={logColumns} data={dashboardData.logs}>
//             Log History
//           </DataTable>
//         </div>
//       </div>
//     </Shell>
//   );
// }


import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // Fallback icon

import { getUserActivities } from "@/lib/api/activities";
import { getStatsDashboardData } from "@/lib/api/dashboard";
import { getCurrentUser } from "@/lib/session";
import { cn, dateRangeParams } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ActivityOperations } from "@/components/activity/activity-operations";
import { logColumns } from "@/components/activity/logs/logs-columns";
import { StatsCards } from "@/components/activity/stats/stats-cards";
import { Heatmap } from "@/components/charts/heatmap";
import { DataTable } from "@/components/data-table";
import { DateRangePicker } from "@/components/date-range-picker";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/layout/shell";
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";

interface ActivityPageProps {
  params: { activityId: string };
  searchParams: { from: string; to: string };
}

export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      title: "Not Found",
      description: "User not authenticated.",
    };
  }

  const userActivities = await getUserActivities(user.id);
  const activity = userActivities.find((activity) => activity.id === params.activityId);

  if (!activity) {
    return {
      title: "Not Found",
      description: "The requested activity could not be found.",
    };
  }

  return {
    title: activity.name || "Activity Stats",
    description: activity.description || "Detailed statistics for the activity.",
  };
}

export default async function ActivityPage({
  params,
  searchParams,
}: ActivityPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    notFound();
    return;
  }

  const userActivities = await getUserActivities(user.id);
  const activity = userActivities.find((activity) => activity.id === params.activityId);

  if (!activity) {
    notFound();
    return;
  }

  const dateRange = dateRangeParams(searchParams);
  const dashboardData = await getStatsDashboardData(activity.id, dateRange);

  return (
    <Shell>
      <div className="flex justify-center min-h-screen py-6">
        <div className="w-[92%] transform scale-[0.9]">
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "link" }), "text-sm mb-4 inline-flex items-center text-primary hover:text-primary-foreground")}>
            <ArrowLeft className="mr-1 h-4 w-4" /> {/* Using fallback icon */}
            Back to Dashboard
          </Link>
          <DashboardHeader
            heading={`${activity.name} Stats`}
            text={activity.description}
          >
            <div className="flex flex-col items-stretch gap-2 md:items-end">
              <DateRangePicker />
              <ActivityOperations
                activity={{
                  id: activity.id,
                }}
              >
                <div
                  className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                >
                  <Icons.down className="mr-2 h-4 w-4" />
                  Actions
                </div>
              </ActivityOperations>
            </div>
          </DashboardHeader>
          <Heatmap data={dashboardData.logs} params={params} />
          <StatsCards data={dashboardData} searchParams={searchParams} />
          <DataTable columns={logColumns} data={dashboardData.logs}>
            Log History
          </DataTable>
        </div>
      </div>
    </Shell>
  );
}
