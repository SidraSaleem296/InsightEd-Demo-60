"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          className="bg-blue-500 text-white p-4 rounded"
          onClick={() => router.push("/admin/courses")}
        >
          Manage Courses
        </button>
        <button
          className="bg-green-500 text-white p-4 rounded"
          onClick={() => router.push("/admin/notifications")}
        >
          Manage Notifications
        </button>
        <button
          className="bg-yellow-500 text-white p-4 rounded"
          onClick={() => router.push("/admin/users")}
        >
          Manage Users
        </button>
        <button
          className="bg-red-500 text-white p-4 rounded"
          onClick={() => router.push("/admin/analytics")}
        >
          View Analytics
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
