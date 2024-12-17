"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Course = {
  id: string;
  name: string;
  image: string; // Assuming courses have an image URL field
};

const CourseManagementPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [newCourseName, setNewCourseName] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/admin/courses");
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (!session) {
    return <p>Loading...</p>;
  }

  if (session.user.role !== "admin") {
    router.push("/");
    return null;
  }

  const handleEdit = (courseId: string, currentName: string) => {
    setEditingCourseId(courseId);
    setNewCourseName(currentName);
  };

  const handleEditSubmit = async (courseId: string) => {
    try {
      await axios.put(`/api/admin/courses/${courseId}`, {
        name: newCourseName,
      });
      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseId ? { ...course, name: newCourseName } : course
        )
      );
      setEditingCourseId(null);
      setNewCourseName("");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDelete = async (courseId: string) => {
    try {
      await axios.delete(`/api/admin/courses/${courseId}`);
      setCourses((prev) => prev.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Course Management</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-4"
          >
            <div className="relative w-full h-40 mb-4">
              <Image
                src={course.image || "/default-course.jpg"}
                alt={course.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-grow text-center">
              {editingCourseId === course.id ? (
                <input
                  type="text"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  className="border rounded p-2 w-full text-center mb-4"
                />
              ) : (
                <h2 className="text-lg font-semibold text-white mb-2 text-center">
                  {course.name}
                </h2>
              )}
            </div>
            <div className="flex justify-center gap-2 w-full">
              {editingCourseId === course.id ? (
                <>
                  <button
                    onClick={() => handleEditSubmit(course.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-1/2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingCourseId(null);
                      setNewCourseName("");
                    }}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 w-1/2"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(course.id, course.name)}
                    className="TaaviButton"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="TaaviButton"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagementPage;
