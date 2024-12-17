"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

const FeedbackPage = () => {
  const { data: session } = useSession();
  const [feedback, setFeedback] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const feedbackData = {
      feedback,
      userId: isAnonymous ? null : session?.user?.id || null, // Use the user's ID or null for anonymous feedback
      isAnonymous,
    };

    try {
      // Example API call
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        alert("Thank you for your feedback!");
        setFeedback("");
        setIsAnonymous(false);
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="py-12 px-6 mx-auto max-w-4xl bg-gray-800 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Feedback</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="feedback" className="block text-lg font-semibold mb-2">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
            placeholder="Share your thoughts or suggestions..."
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            id="anonymous"
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-5 h-5 text-blue-500 focus:ring-blue-500 focus:ring-2 rounded"
          />
          <label htmlFor="anonymous" className="ml-3 text-lg">
            Submit Anonymously
          </label>
        </div>
        <button
          type="submit"
          className="TaaviButton w-full"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;
