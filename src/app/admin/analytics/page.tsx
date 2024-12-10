"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Shell } from "@/components/layout/shell";
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/data-table";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

type AnalyticsData = {
  totalUsers: number;
  subscribedUsers: number;
  totalCourses: number;
  totalActivities: number;
  feedbackUsers: number;
  accountsByDate: { date: string; count: number }[];
};

const AdminAnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("/api/admin/analytics");
        setAnalyticsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p>Loading analytics...</p>;
  }

  if (!analyticsData) {
    return <p>Failed to load analytics.</p>;
  }

  const pieData = {
    labels: ["Subscribed Users", "Non-Subscribed Users"],
    datasets: [
      {
        label: "User Subscription",
        data: [
          analyticsData.subscribedUsers,
          analyticsData.totalUsers - analyticsData.subscribedUsers,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    rotation: Math.PI, // Start from the top center
    circumference: Math.PI, // Display only half of the circle
    layout: {
      padding: {
        top: 10,
      },
    },
  };
  
  const SemiCirclePieChart = () => {
    return (
      <div style={{ height: "300px", width: "500px" }}> {/* Adjust dimensions as needed */}
        <Pie data={pieData}  />
      </div>
    );
  };

  const lineData = {
    labels: analyticsData.accountsByDate.map((item) => item.date),
    datasets: [
      {
        label: "Accounts Created",
        data: analyticsData.accountsByDate.map((item) => item.count),
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.1,
      },
    ],
  };

  return (
    <Shell>
      <div className="p-8">
        <DashboardHeader
          heading="Admin Analytics"
          text="Monitor key metrics and insights for the platform."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 text-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-xl">{analyticsData.totalUsers}</p>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Courses</h3>
            <p className="text-xl">{analyticsData.totalCourses}</p>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Activities</h3>
            <p className="text-xl">{analyticsData.totalActivities}</p>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Feedback Users</h3>
            <p className="text-xl">
              {analyticsData.feedbackUsers}/{analyticsData.totalUsers}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 text-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">User Subscription</h3>
            <ScrollArea className="h-[300px]">
              <SemiCirclePieChart />
            </ScrollArea>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Account Creation Trend</h3>
            <ScrollArea className="h-[300px]">
              <Line data={lineData} />
            </ScrollArea>
          </div>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded shadow mt-6">
          <h3 className="text-lg font-semibold">Log History</h3>
          <DataTable
            columns={[
              { accessorKey: "date", header: "Date" },
              { accessorKey: "count", header: "Count" },
            ]}
            data={analyticsData.accountsByDate.map((item) => ({
              date: item.date,
              count: item.count,
            }))}
          />
        </div>
      </div>
    </Shell>
  );
};

export default AdminAnalyticsPage;
