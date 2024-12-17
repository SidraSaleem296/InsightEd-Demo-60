"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Course = {
  id: string;
  name: string;
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
    router.push("/auth");
    return null;
  }

  const handleEdit = (courseId: string, currentName: string) => {
    setEditingCourseId(courseId);
    setNewCourseName(currentName);
  };

  const handleEditSubmit = async (courseId: string) => {
    try {
      await axios.put(`/api/admin/courses/${courseId}`, { name: newCourseName });
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
      <h1 className="text-2xl font-bold mb-4">Course Management</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-black">Course Name</th>
            <th className="border border-gray-300 p-2 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b border-gray-200">
              <td className="p-2">
                {editingCourseId === course.id ? (
                  <input
                    type="text"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  course.name
                )}
              </td>
              <td className="p-2">
                <div className="flex justify-center gap-2">
                  {editingCourseId === course.id ? (
                    <>
                      <button
                        onClick={() => handleEditSubmit(course.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingCourseId(null);
                          setNewCourseName("");
                        }}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(course.id, course.name)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagementPage;
