// import { Metadata } from "next"
// import { notFound, redirect } from "next/navigation"

// import { getUserActivity} from "@/lib/api/activities"
// import { authOptions } from "@/lib/auth"
// import { getCurrentUser } from "@/lib/session"
// import { ActivityEditForm } from "@/components/activity/activity-edit-form"
// import { Shell } from "@/components/layout/shell"
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header"

// export const metadata: Metadata = {
//   title: "Activity Settings",
// }

// interface ActivityEditProps {
//   params: { activityId: string }
// }

// export default async function ActivityEdit({ params }: ActivityEditProps) {
//   const user = await getCurrentUser()

//   if (!user) {
//     redirect(authOptions?.pages?.signIn || "/signin")
//   }

//   const activity = await getUserActivity(params.activityId, user.id)

//   if (!activity) {
//     notFound()
//   }

//   return (
//     <Shell>
//       <DashboardHeader
//         heading="Activity Settings"
//         text="Modify activity details."
//       />
//       <div className="grid grid-cols-1 gap-10">
//         <ActivityEditForm
//           activity={{
//             id: activity.id,
//             name: activity.name,
//             description: activity.description,
//             colorCode: activity.colorCode,
//           }}
//         />
//       </div>
//     </Shell>
//   )
// }

// import { Metadata } from "next";
// import { notFound } from "next/navigation";

// import { getUserActivities } from "@/lib/api/activities";
// import { getCurrentUser } from "@/lib/session";
// import { ActivityEditForm } from "@/components/activity/activity-edit-form";
// import { Shell } from "@/components/layout/shell";
// import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";

// export const metadata: Metadata = {
//   title: "Activity Settings",
// };

// interface ActivityEditProps {
//   params: { activityId: string };
// }

// export default async function ActivityEdit({ params }: ActivityEditProps) {
//   const user = await getCurrentUser();
//   if (!user) {
//     notFound();
//     return;
//   }

//   const userActivities = await getUserActivities(user.id); // Fetch all activities for the user
//   const activity = userActivities.find((activity) => activity.id === params.activityId); // Filter to find the specific activity by ID

//   if (!activity) {
//     notFound();
//     return;
//   }

//   return (
//     <Shell>
//       <DashboardHeader
//         heading="Activity Settings"
//         text="Modify activity details."
//       />
//       <div className="grid grid-cols-1 gap-10">
//         <ActivityEditForm
//           activity={{
//             id: activity.id,
//             name: activity.name,
//             description: activity.description,
//             colorCode: activity.colorCode,
//           }}
//         />
//       </div>
//     </Shell>
//   );
// }
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getUserActivities } from "@/lib/api/activities";
import { getCurrentUser } from "@/lib/session";
import { ActivityEditForm } from "@/components/activity/activity-edit-form";
import { Shell } from "@/components/layout/shell";
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";

export const metadata: Metadata = {
  title: "Activity Settings",
};

interface ActivityEditProps {
  params: { activityId: string };
}

export default async function ActivityEdit({ params }: ActivityEditProps) {
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

  return (
    <Shell>
      <div className="flex justify-center items-center min-h-screen p-4"> {/* Center content on the page */}
        <div className="w-full max-w-[80%] lg:max-w-[60%]"> {/* Constrain width for larger screens */}
          <DashboardHeader
            heading="Activity Settings"
            text="Modify activity details."
          />
          <div className="grid grid-cols-1 gap-10 mt-4">
            <ActivityEditForm
              activity={{
                id: activity.id,
                name: activity.name,
                description: activity.description,
                colorCode: activity.colorCode,
              }}
            />
          </div>
        </div>
      </div>
    </Shell>
  );
}
