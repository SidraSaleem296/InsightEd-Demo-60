"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Feedback = {
  id: string;
  content: string;
  isAnonymous: boolean;
  userId: string | null;
  user?: {
    name: string | null;
    email: string | null;
  };
};

const AdminFeedbackPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not an admin
    if (!session?.user?.role || session.user.role !== "admin") {
      router.push("/");
      return;
    }

    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("/api/feedback");
        setFeedbacks(response.data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to fetch feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [session, router]);

  if (loading) {
    return <p className="text-center">Loading feedback...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">All Feedback</h1>
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="p-4 bg-gray-700 rounded-md shadow-md space-y-2"
          >
            <p className="text-lg font-semibold">
              {feedback.isAnonymous || !feedback.userId
                ? "Submitted Anonymously"
                : feedback.user?.name || "Unknown User"}
            </p>
            <p className="text-sm text-gray-300">
              {feedback.isAnonymous || !feedback.userId
                ? "No associated email"
                : feedback.user?.email || "No email available"}
            </p>
            <p className="text-gray-200">{feedback.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFeedbackPage;
