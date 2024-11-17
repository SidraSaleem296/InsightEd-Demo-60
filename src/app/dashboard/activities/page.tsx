// import { Metadata } from "next"
// import { redirect } from "next/navigation"

// import { getUserActivities } from "@/lib/api/activities"
// import { authOptions } from "@/lib/auth"
// import { getCurrentUser } from "@/lib/session"
// import { ActivityAddButton } from "@/components/activity/activity-add-button"
// import { ActivityList } from "@/components/activity/activity-list"
// import { Shell } from "@/components/layout/shell"
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"

// export const metadata: Metadata = {
//   title: "Activities",
//   description: "Manage account activities/hobbies.",
// }

// export default async function ActivitiesPage() {
//   const user = await getCurrentUser()

//   if (!user) {
//     redirect(authOptions?.pages?.signIn || "/signin")
//   }

//   const activities = await getUserActivities(user.id)

//   return (
//     <Shell>
//       <DashboardHeader heading="Activities" text="Manage account activities.">
//         <ActivityAddButton />
//       </DashboardHeader>
//       <div className="divide-y divide-border rounded-md border">
//         <ActivityList activities={activities} />
//       </div>
//     </Shell>
//   )
// }


// import { Metadata } from "next"

// import { getUserActivities } from "@/lib/api/activities"
// import { getCurrentUser } from "@/lib/session"
// import { ActivityAddButton } from "@/components/activity/activity-add-button"
// import { ActivityList } from "@/components/activity/activity-list"
// import { Shell } from "@/components/layout/shell"
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"

// export const metadata: Metadata = {
//   title: "Activities",
//   description: "Manage account activities/hobbies.",
// }

// export default async function ActivitiesPage() {
//   const user = await getCurrentUser()

//   if (!user) return null // Handle this if user might be undefined in practice

//   const activities = await getUserActivities(user.id)

//   return (
//     <Shell>
//       <DashboardHeader heading="Activities" text="Manage account activities.">
//         <ActivityAddButton />
//       </DashboardHeader>
//       <div className="divide-y divide-border rounded-md border">
//         <ActivityList activities={activities} />
//       </div>
//     </Shell>
//   )
// }


import { Metadata } from "next";

import { getUserActivities } from "@/lib/api/activities";
import { getCurrentUser } from "@/lib/session";
import { ActivityAddButton } from "@/components/activity/activity-add-button";
import { ActivityList } from "@/components/activity/activity-list";
import { Shell } from "@/components/layout/shell";
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";

export const metadata: Metadata = {
  title: "Activities",
  description: "Manage account activities/hobbies.",
};

export default async function ActivitiesPage() {
  const user = await getCurrentUser();

  if (!user) return null;

  const activities = await getUserActivities(user.id);

  return (
    <Shell>
      <div className="flex justify-center min-h-screen py-6">
        <div className="w-[95%] transform scale-[0.95]">
          <DashboardHeader heading="" text="Manage account activities.">
            <ActivityAddButton />
          </DashboardHeader>
          <div className="divide-y divide-border rounded-md border">
            <ActivityList activities={activities} />
          </div>
        </div>
      </div>
    </Shell>
  );
}
