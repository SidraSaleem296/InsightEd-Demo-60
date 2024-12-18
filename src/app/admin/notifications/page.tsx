"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CustomNotificationsPage = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return <p>Loading...</p>;
  }

  if (session.user.role !== "admin") {
    router.push("/auth");
    return null;
  }

  const handleSendNotification = async () => {
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("/api/admin/notifications", { message });

      if (response.data.success) {
        setSuccess(true);
        setMessage("");
        setError(null);
        setTimeout(() => setSuccess(false), 3000); // Clear success message after 3 seconds
      }
    } catch (error) {
      console.error("Error sending notifications:", error);
      setError("Failed to send notifications.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Send Custom Notifications</h1>

      <div className="mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Type your notification message here..."
          className="w-full border rounded p-2"
        />
      </div>

      <button
        onClick={handleSendNotification}
        className="TaaviButton"
      >
        Send Notification
      </button>

      {success && <p className="text-green-500 mt-4">Notification sent successfully!</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CustomNotificationsPage;
