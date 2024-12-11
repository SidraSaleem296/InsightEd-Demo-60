"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Home, Bell, Clipboard, Activity, User } from "lucide-react";

const AdminDashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return <p>Loading...</p>;
  }

  if (session.user.role !== "admin") {
    router.push("/auth");
    return null;
  }

  const buttons = [
    {
      name: "Manage Courses",
      icon: <Home size={15} className="mr-2" />,
      href: "/admin/courses",
    },
    {
      name: "Manage Notifications",
      icon: <Bell size={15} className="mr-2" />,
      href: "/admin/notifications",
    },
    {
      name: "Manage Users",
      icon: <User size={15} className="mr-2" />,
      href: "/admin/users",
    },
    {
      name: "View Analytics",
      icon: <Activity size={15} className="mr-2" />,
      href: "/admin/analytics",
    },
    {
      name: "Feedback",
      icon: <Clipboard size={15} className="mr-2" />,
      href: "/admin/feedback",
    },
  ];

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl text-center font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full max-w-[800px]">
        {buttons.slice(0, -1).map((button, index) => (
          <button
            key={index}
            className="flex items-center justify-center p-4 text-lg text-white bg-transparent border border-white rounded-md hover:bg-gray-700 hover:text-white transition-all"
            onClick={() => router.push(button.href)}
            style={{ width: "300" }} // Ensure buttons take equal width
          >
            {button.icon}
            <span>{button.name}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-6 w-full max-w-[400px]">
        <button
          className="flex items-center justify-center p-4 text-lg text-white bg-transparent border border-white rounded-md hover:bg-gray-700 hover:text-white transition-all"
          onClick={() => router.push(buttons[buttons.length - 1].href)}
          style={{ width: "100%" }} // Center-align the last button
        >
          {buttons[buttons.length - 1].icon}
          <span>{buttons[buttons.length - 1].name}</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
