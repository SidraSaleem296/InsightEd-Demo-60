"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EditProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // State for profile updates
  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch session data to prefill form
  useEffect(() => {
    if (session?.user) {
      setProfileData({
        username: session.user.username || "",
        bio: session.user.bio || "",
      });
    }
  }, [session]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated profile
  const handleSave = async () => {
    if (!session?.user?.id) return; // Ensure we have the user id
    setLoading(true);

    try {
      const updates = { username: profileData.username, bio: profileData.bio };
      await axios.put(`/api/user/${session.user.id}`, updates); // Using old working logic
      router.push(`/profile/${session.user.id}`); // Redirect back to profile page
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded shadow-lg text-white">
        <label className="block mb-4">
          Username:
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
          />
        </label>
        <label className="block mb-4">
          Bio:
          <textarea
            name="bio"
            rows={5}
            value={profileData.bio}
            onChange={handleChange}
            className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
          />
        </label>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="TaaviButton bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
