"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from "chart.js";
import { Shell } from "@/components/layout/shell";
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";
import { DataTable } from "@/components/data-table";
import { CustomPieChart } from "@/components/charts/CustomPieChart";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
);

type CourseAnalytics = {
  name: string;
  enrolled: number;
  completed: number;
};

type AnalyticsData = {
  totalUsers: number;
  subscribedUsers: number;
  totalCourses: number;
  totalActivities: number;
  totalPosts: number;
  totalDocuments: number;
  totalNotes: number;
  totalQuizzes: number;
  totalFeedbackSubmitted: number;
  feedbackUsers: number;
  accountsByDate: { date: string; count: number }[];
  postsByDate: { date: string; count: number }[];
  feedbacksByDate: { date: string; count: number }[];
  activitiesByDate: { date: string; count: number }[];
  coursesData: CourseAnalytics[]; // New data for bar chart
};

const AdminAnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
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

  // const userSubscriptionData = {
  //   labels: ["Subscribed Users", "Non-Subscribed Users"],
  //   datasets: [
  //     {
  //       label: "User Subscription",
  //       data: [
  //         analyticsData.subscribedUsers,
  //         analyticsData.totalUsers - analyticsData.subscribedUsers,
  //       ],
  //       backgroundColor: ["#36A2EB", "#FF6384"],
  //     },
  //   ],
  // };

  // const feedbackUsersData = {
  //   labels: ["Feedback Users", "Non-Feedback Users"],
  //   datasets: [
  //     {
  //       label: "Feedback Users",
  //       data: [
  //         analyticsData.feedbackUsers,
  //         analyticsData.totalUsers - analyticsData.feedbackUsers,
  //       ],
  //       backgroundColor: ["#4BC0C0", "#FF9F40"],
  //     },
  //   ],
  // };

  // Combine and sort all unique dates
  const allDates = Array.from(
    new Set([
      ...analyticsData.accountsByDate.map((item) => item.date),
      ...analyticsData.postsByDate.map((item) => item.date),
      ...analyticsData.activitiesByDate.map((item) => item.date),
      ...analyticsData.feedbacksByDate.map((item) => item.date),
    ])
  ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Create data for the accounts dataset
  const accountsData = allDates.map((date) => {
    const match = analyticsData.accountsByDate.find(
      (item) => item.date === date
    );
    return match ? match.count : 0; // Use null for missing dates
  });

  // Create data for the posts dataset
  const postsData = allDates.map((date) => {
    const match = analyticsData.postsByDate.find((item) => item.date === date);
    return match ? match.count : 0; // Use null for missing dates
  });

  // Create data for the activities dataset
  const activitiesData = allDates.map((date) => {
    const match = analyticsData.activitiesByDate.find(
      (item) => item.date === date
    );
    return match ? match.count : 0; // Use 0 for missing dates
  });

  // Create data for the feedback dataset
  const feedbackData = allDates.map((date) => {
    const match = analyticsData.feedbacksByDate.find(
      (item) => item.date === date
    );
    return match ? match.count : 0; // Use 0 for missing dates
  });

  // Construct the lineData object
  const lineData = {
    labels: allDates, // Use the unified dates array as labels
    datasets: [
      {
        label: "Accounts Created",
        data: accountsData, // Aligned accounts data
        borderColor: "#36A2EB",
        fill: false,
        tension: 0.1, // Smoothens the curve
      },
      {
        label: "Posts Created",
        data: postsData, // Aligned posts data
        borderColor: "#FF6384",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Activities Created",
        data: activitiesData, // Aligned activities data
        borderColor: "#4BC0C0",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Feedback Submitted",
        data: feedbackData, // Aligned feedback data
        borderColor: "#FFCE56",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // // Prepare data for CustomPieChart
  // const userSubscriptionData = [
  //   {
  //     name: "Subscribed Users",
  //     count: analyticsData.subscribedUsers,
  //     color: "#36A2EB",
  //   },
  //   {
  //     name: "Non-Subscribed Users",
  //     count: analyticsData.totalUsers - analyticsData.subscribedUsers,
  //     color: "#FF6384",
  //   },
  // ];

  // const feedbackUsersData = [
  //   {
  //     name: "Feedback Users",
  //     count: analyticsData.feedbackUsers,
  //     color: "#4BC0C0",
  //   },
  //   {
  //     name: "Non-Feedback Users",
  //     count: analyticsData.totalUsers - analyticsData.feedbackUsers,
  //     color: "#FF9F40",
  //   },
  // ];

  // // Bar Chart Data for Course Enrollment and Completion
  // const courseBarChartData = {
  //   labels: analyticsData.coursesData.map((course) => course.name),
  //   datasets: [
  //     {
  //       label: "Enrolled Students",
  //       data: analyticsData.coursesData.map((course) => course.enrolled),
  //       backgroundColor: "#36A2EB",
  //       borderRadius: 5,
  //     },
  //     {
  //       label: "Completed Students",
  //       data: analyticsData.coursesData.map((course) => course.completed),
  //       backgroundColor: "#4BC0C0",
  //       borderRadius: 5,
  //     },
  //   ],
  // };

  return (
    <Shell>
      <div className="p-8">
        <DashboardHeader
          heading="Admin Analytics"
          text="Monitor key metrics and insights for the platform."
        />

        {/* Top Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Users", value: analyticsData.totalUsers },
            // { label: "Total Courses", value: analyticsData.totalCourses },
            { label: "Total Activities", value: analyticsData.totalActivities },
            { label: "Total Posts", value: analyticsData.totalPosts },
            // {
            //   label: "Documents Uploaded",
            //   value: analyticsData.totalDocuments,
            // },
            // { label: "Notes Taken", value: analyticsData.totalNotes },
            { label: "Quizzes Attempted", value: analyticsData.totalQuizzes },
            // {
            //   label: "Feedback Submitted",
            //   value: analyticsData.totalFeedbackSubmitted,
            // },
          ].map((metric, idx) => (
            <div
              key={idx}
              className="bg-gray-800 text-white p-4 rounded shadow"
            >
              <h3 className="text-lg font-semibold">{metric.label}</h3>
              <p className="text-xl">{metric.value}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* User Subscription Pie Chart */}
          
            <CustomPieChart
              data={[
                {
                  name: "Subscribed Users",
                  count: analyticsData.subscribedUsers,
                  color: "#36A2EB",
                },
                {
                  name: "Non-Subscribed Users",
                  count:
                    analyticsData.totalUsers - analyticsData.subscribedUsers,
                  color: "#FF6384",
                },
              ]}
              title="User Subscription"
            />
          

          {/* Insights Line Chart */}
          <div
            className="bg-gray-800 text-white p-4 rounded shadow"
            style={{ height: "300px" }} // Set fixed height
          >
            <h3 className="text-lg mb-3 font-semibold text-center">Insights</h3>
            <div style={{ height: "100%" }}>
              {" "}
              {/* Make chart fill container */}
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, // Allow custom height
                  plugins: { legend: { position: "top" } },
                  scales: {
                    x: { title: { display: true, text: "Date" } },
                    y: {
                      title: { display: true, text: "Counts" },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>

          
            <CustomPieChart
              data={[
                {
                  name: "Feedback Users",
                  count: analyticsData.feedbackUsers,
                  color: "#4BC0C0",
                },
                {
                  name: "Non-Feedback Users",
                  count: analyticsData.totalUsers - analyticsData.feedbackUsers,
                  color: "#FF9F40",
                },
              ]}
              title="Feedback Users"
            />
          </div>
        

        {/* Log History
        <div className="bg-gray-800 text-white p-4 rounded shadow mt-6">
          <h3 className="text-lg font-semibold text-center">Log History</h3>
          <DataTable
            columns={[
              { accessorKey: "date", header: "Date" },
              { accessorKey: "count", header: "Count" },
            ]}
            data={Object.entries(analyticsData.accountsByDate).map(
              ([date, count]) => ({
                date, // The date key
                count, // The count value
              })
            )}
          />
        </div> */}

        {/* Bar Chart Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-center mb-4">
            Course Enrollment and Completion
          </h3>
          <div className="bg-gray-800 text-white p-4 rounded shadow">
            <Bar
              data={{
                labels: analyticsData.coursesData.map((course) => course.name),
                datasets: [
                  {
                    label: "Enrolled Students",
                    data: analyticsData.coursesData.map(
                      (course) => course.enrolled
                    ),
                    backgroundColor: "#36A2EB",
                  },
                  {
                    label: "Completed Students",
                    data: analyticsData.coursesData.map(
                      (course) => course.completed
                    ),
                    backgroundColor: "#4BC0C0",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                },
                scales: {
                  x: {
                    stacked: true,
                    title: { display: true, text: "Courses" },
                  },
                  y: {
                    stacked: true,
                    title: { display: true, text: "Students" },
                  },
                },
              }}
              height={300}
            />
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default AdminAnalyticsPage;
