"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Shell } from "@/components/layout/shell";
import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";

type Course = {
  id: string;
  name: string;
  progress: number;
};

const DashboardPage = () => {
  const [currentCourses, setCurrentCourses] = useState<Course[]>([]);
  const [passedCourses, setPassedCourses] = useState<Course[]>([]);
  const [sortedCourses, setSortedCourses] = useState<Course[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "alphabetical">(
    "alphabetical"
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/student/courses");
        const data = await response.json();
        console.log("Fetched courses:", data); // Debugging

        // Split current and passed courses
        setCurrentCourses(data.currentCourses || []); // Fallback to empty array
        setPassedCourses(data.passedCourses || []); // Fallback to empty array
        setSortedCourses(data.currentCourses || []); // Default to current courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const sortCourses = (order: "asc" | "desc" | "alphabetical") => {
    let sorted: Course[] = [];
    if (order === "asc") {
      sorted = [...currentCourses].sort((a, b) => a.progress - b.progress);
    } else if (order === "desc") {
      sorted = [...currentCourses].sort((a, b) => b.progress - a.progress);
    } else {
      sorted = [...currentCourses].sort((a, b) => a.name.localeCompare(b.name));
    }
    setSortedCourses(sorted);
    setSortOrder(order);
  };

  return (
    <Shell>
      <div className="p-8">
        <DashboardHeader
          heading="Student Dashboard"
          text="View your current and completed courses."
        />

        {/* Sorting Dropdown */}
        <div className="flex justify-end mb-6">
          <select
            className="px-4 py-2 rounded-lg border bg-gray-300 text-black"
            value={sortOrder}
            onChange={(e) => sortCourses(e.target.value as "asc" | "desc" | "alphabetical")}
          >
            <option value="alphabetical">Sort Alphabetically</option>
            <option value="asc">Sort by Progress (Asc)</option>
            <option value="desc">Sort by Progress (Desc)</option>
          </select>
        </div>

        {/* Current Courses */}
        <h2 className="text-xl font-semibold mb-4">Current Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(sortedCourses) && sortedCourses.length > 0 ? (
            sortedCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-bold mb-2">{course.name}</h3>
                <Progress value={course.progress} />
                <p className="mt-2 text-sm">{course.progress}% completed</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No current courses found.
            </p>
          )}
        </div>

        {/* Passed Courses */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Passed Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(passedCourses) && passedCourses.length > 0 ? (
            passedCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 bg-green-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-bold mb-2">{course.name}</h3>
                <p className="mt-2 text-sm">Completed 🎉</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No passed courses found.
            </p>
          )}
        </div>
      </div>
    </Shell>
  );
};

export default DashboardPage;
