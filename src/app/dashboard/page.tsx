
// import { Metadata } from "next"
// import { redirect } from "next/navigation"

// import { getDashboardData } from "@/lib/api/dashboard"
// import { authOptions } from "@/lib/auth"
// import { getCurrentUser } from "@/lib/session"
// import { dateRangeParams } from "@/lib/utils"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { ActivityList } from "@/components/activity/activity-list"
// import { logColumns } from "@/components/activity/logs/logs-columns"
// import { LineChartComponent } from "@/components/charts/linechart"
// import { PieChartComponent } from "@/components/charts/piechart"
// import { DataTable } from "@/components/data-table"
// import { DateRangePicker } from "@/components/date-range-picker"
// import { Shell } from "@/components/layout/shell"
// import { DashboardCards } from "@/components/pages/dashboard/dashboard-cards"
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"

// export const metadata: Metadata = {
//   title: "InsightEd Streak Management",
//   description: "Monitor your progress.",
// }

// interface DashboardProps {
//   searchParams: { from: string; to: string }
// }
// export default async function Dashboard({ searchParams }: DashboardProps) {
//   const user = await getCurrentUser()

//   // Since the user is already logged in, you don't need to check for undefined
//   if (!user) return null // or handle this scenario appropriately if user could ever be null in practice

//   const dateRange = dateRangeParams(searchParams)
//   const dashboardData = await getDashboardData(user.id, dateRange)

//   const activityData =
//     dashboardData.activityCountByDate.length > 0 &&
//     dashboardData.topActivities.length > 0

//   const layout = activityData
//     ? "grid grid-cols-1 gap-4 md:grid-cols-2"
//     : "grid grid-cols-1"
//   const scrollClass = activityData
//     ? "h-[17rem] rounded-lg border"
//     : "h-[25.1rem] rounded-lg border"

//   return (
//     <Shell>
//       <DashboardHeader heading="InsightEd Habit Tracker" text="Monitor your progress.">
//         <DateRangePicker />
//       </DashboardHeader>
//       <div className={layout}>
//         <ScrollArea className={scrollClass}>
//           <div className="divide-y divide-border">
//             <ActivityList activities={dashboardData.userActivities} />
//           </div>
//         </ScrollArea>
//         {activityData && (
//           <>
//             <DashboardCards data={dashboardData} searchParams={searchParams} />
//             <LineChartComponent data={dashboardData.activityCountByDate} />
//             <PieChartComponent data={dashboardData.topActivities} />
//           </>
//         )}
//       </div>
//       <DataTable columns={logColumns} data={dashboardData.logs}>
//         Log History
//       </DataTable>
//     </Shell>
//   )
// }

// import { Metadata } from "next";
// import { redirect } from "next/navigation";

// import { getDashboardData } from "@/lib/api/dashboard";
// import { authOptions } from "@/lib/auth";
// import { getCurrentUser } from "@/lib/session";
// import { dateRangeParams } from "@/lib/utils";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ActivityList } from "@/components/activity/activity-list";
// import { logColumns } from "@/components/activity/logs/logs-columns";
// import { LineChartComponent } from "@/components/charts/linechart";
// import { PieChartComponent } from "@/components/charts/piechart";
// import { DataTable } from "@/components/data-table";
// import { DateRangePicker } from "@/components/date-range-picker";
// import { Shell } from "@/components/layout/shell";
// import { DashboardCards } from "@/components/pages/dashboard/dashboard-cards";
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";

// export const metadata: Metadata = {
//   title: "InsightEd Streak Management",
//   description: "Monitor your progress.",
// };

// interface DashboardProps {
//   searchParams: { from: string; to: string };
// }

// export default async function Dashboard({ searchParams }: DashboardProps) {
//   const user = await getCurrentUser();

//   if (!user) return null;

//   const dateRange = dateRangeParams(searchParams);
//   const dashboardData = await getDashboardData(user.id, dateRange);

//   const activityData =
//     dashboardData.activityCountByDate.length > 0 &&
//     dashboardData.topActivities.length > 0;

//   // Define CSS classes for layout adjustments
//   const layout = activityData
//     ? "grid grid-cols-1 gap-4 md:grid-cols-4"
//     : "grid grid-cols-1";
//   const scrollClass = activityData
//     ? "h-[18rem] rounded-lg border text-sm p-2" // Reduced padding by 50%
//     : "h-[24rem] rounded-lg border text-sm p-2"; // Reduced padding by 50%

//   return (
//     <Shell>
//       <div className="flex justify-start ml-[19%] max-w-[96%] md:max-w-[90%] lg:max-w-[70%] mx-auto">
//         {/* Container that positions everything to the middle-left */}
//         <div className="w-full">
//           <DashboardHeader
//             heading=""
//             text="Monitor your progress with InsightEd Habit Tracker"
//           >
//             <DateRangePicker />
//           </DashboardHeader>
//           <div className={`${layout} text-base`}>
//             <ScrollArea className={scrollClass}>
//               <div className="divide-y divide-border">
//                 <ActivityList activities={dashboardData.userActivities} />
//               </div>
//             </ScrollArea>
//             {activityData && (
//               <>
//                 <DashboardCards
//                   data={dashboardData}
//                   searchParams={searchParams}
//                   className="text-base"
//                 />
//                 <LineChartComponent
//                   data={dashboardData.activityCountByDate}
//                   className="w-full h-70" // Expanded chart height
//                 />
//                 <PieChartComponent
//                   data={dashboardData.topActivities}
//                   className="w-full h-56" // Expanded chart height
//                 />
//               </>
//             )}
//           </div>
//           <DataTable columns={logColumns} data={dashboardData.logs}>
//             Log History
//           </DataTable>
//         </div>
//       </div>
//     </Shell>
//   );
// }


// import { Metadata } from "next";
// import { redirect } from "next/navigation";

// import { getDashboardData } from "@/lib/api/dashboard";
// import { authOptions } from "@/lib/auth";
// import { getCurrentUser } from "@/lib/session";
// import { dateRangeParams } from "@/lib/utils";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ActivityList } from "@/components/activity/activity-list";
// import { logColumns } from "@/components/activity/logs/logs-columns";
// import { LineChartComponent } from "@/components/charts/linechart";
// import { PieChartComponent } from "@/components/charts/piechart";
// import { DataTable } from "@/components/data-table";
// import { DateRangePicker } from "@/components/date-range-picker";
// import { Shell } from "@/components/layout/shell";
// import { DashboardCards } from "@/components/pages/dashboard/dashboard-cards";
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";

// export const metadata: Metadata = {
//   title: "",
//   description: "Monitor your progress with InsightEd Streak Management",
// };

// interface DashboardProps {
//   searchParams: { from: string; to: string };
// }

// export default async function Dashboard({ searchParams }: DashboardProps) {
//   const user = await getCurrentUser();

//   if (!user) return null;

//   const dateRange = dateRangeParams(searchParams);
//   const dashboardData = await getDashboardData(user.id, dateRange);

//   const activityData =
//     dashboardData.activityCountByDate.length > 0 &&
//     dashboardData.topActivities.length > 0;

//   const layout = activityData
//     ? "grid grid-cols-1 gap-4 md:grid-cols-2"
//     : "grid grid-cols-1";
//   const scrollClass = activityData
//     ? "h-[17rem] rounded-lg border"
//     : "h-[25.1rem] rounded-lg border";

//   return (
//     <Shell>
//       <div className="flex justify-center min-h-screen py-6">
//         <div className="w-[95%] transform scale-[0.95]">
//           <DashboardHeader heading="" text="Monitor your progress with InsightEd Habit Tracker">
//             <DateRangePicker />
//           </DashboardHeader>
//           <div className={layout}>
//             <ScrollArea className={scrollClass}>
//               <div className="divide-y divide-border">
//                 <ActivityList activities={dashboardData.userActivities} />
//               </div>
//             </ScrollArea>
//             {activityData && (
//               <>
//                 <DashboardCards data={dashboardData} searchParams={searchParams} />
//                 <LineChartComponent data={dashboardData.activityCountByDate} />
//                 <PieChartComponent data={dashboardData.topActivities} />
//               </>
//             )}
//           </div>
//           <DataTable columns={logColumns} data={dashboardData.logs}>
//             Log History
//           </DataTable>
//         </div>
//       </div>
//     </Shell>
//   );
// }

import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getDashboardData } from "@/lib/api/dashboard";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { dateRangeParams } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActivityList } from "@/components/activity/activity-list";
import { logColumns } from "@/components/activity/logs/logs-columns";
import { LineChartComponent } from "@/components/charts/linechart";
import { PieChartComponent } from "@/components/charts/piechart";
import { DataTable } from "@/components/data-table";
import { DateRangePicker } from "@/components/date-range-picker";
import { Shell } from "@/components/layout/shell";
import { DashboardCards } from "@/components/pages/dashboard/dashboard-cards";
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";
import ActivityAddButtonWrapper from "@/components/activity/activity-add-button-wrapper"; // New wrapper for client component

export const metadata: Metadata = {
  title: "",
  description: "Monitor your progress with InsightEd Streak Management",
};

interface DashboardProps {
  searchParams: { from: string; to: string };
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const user = await getCurrentUser();

  if (!user) return null;

  const dateRange = dateRangeParams(searchParams);
  const dashboardData = await getDashboardData(user.id, dateRange);

  const activityData =
    dashboardData.activityCountByDate.length > 0 &&
    dashboardData.topActivities.length > 0;

  const layout = activityData
    ? "grid grid-cols-1 gap-4 md:grid-cols-2"
    : "grid grid-cols-1";
  const scrollClass = activityData
    ? "h-[17rem] rounded-lg border"
    : "h-[25.1rem] rounded-lg border";

  return (
    <Shell>
      <div className="flex justify-center min-h-screen py-6">
        <div className="w-[95%] transform scale-[0.95]">
          <DashboardHeader heading="" text="Monitor your progress with InsightEd Habit Tracker">
            <div className="flex gap-4 items-center">
              <DateRangePicker />
              <ActivityAddButtonWrapper /> {/* Use the wrapper instead */}
            </div>
          </DashboardHeader>
          <div className={layout}>
            <ScrollArea className={scrollClass}>
              <div className="divide-y divide-border">
                <ActivityList activities={dashboardData.userActivities} />
              </div>
            </ScrollArea>
            {activityData && (
              <>
                <DashboardCards data={dashboardData} searchParams={searchParams} />
                <LineChartComponent data={dashboardData.activityCountByDate} />
                <PieChartComponent data={dashboardData.topActivities} />
              </>
            )}
          </div>
          <DataTable columns={logColumns} data={dashboardData.logs}>
            Log History
          </DataTable>
        </div>
      </div>
    </Shell>
  );
}
