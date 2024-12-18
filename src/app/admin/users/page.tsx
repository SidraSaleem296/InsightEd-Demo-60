"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  username: string;
  bio: string;
  image: string | null;
};

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = users.filter(
      (user) =>
        (user.name && user.name.toLowerCase().includes(lowerCaseQuery)) ||
        (user.username && user.username.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  if (!session) return <p>Loading...</p>;
  if (session.user.role !== "admin") {
    router.push("/auth");
    return null;
  }

  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setEditedUser(user);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put("/api/admin/users", { ...editedUser });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUserId ? { ...user, ...editedUser } : user
        )
      );
      setEditingUserId(null);
      setEditedUser({});
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete("/api/admin/users", { data: { id: userId } });
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-2 border rounded-lg shadow-sm text-white"
        />
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex flex-col items-center bg-gray-800 rounded-lg shadow-md p-4"
          >
            {/* User Image */}
            <div className="relative w-20 h-20 mb-4">
              <Image
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User"}
                fill
                className="rounded-full object-cover"
              />
            </div>

            {/* User Info */}
            {editingUserId === user.id ? (
              <div className="w-full text-center">
                <input
                  type="text"
                  value={editedUser.name || ""}
                  onChange={(e) =>
                    setEditedUser((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="border rounded p-1 mb-2 w-full text-center"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={editedUser.username || ""}
                  onChange={(e) =>
                    setEditedUser((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="border rounded p-1 mb-2 w-full text-center"
                  placeholder="Username"
                />
                <input
                  type="text"
                  value={editedUser.bio || ""}
                  onChange={(e) =>
                    setEditedUser((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  className="border rounded p-1 mb-2 w-full text-center"
                  placeholder="Bio"
                />
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-white text-center">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-400">@{user.username}</p>
                <div
          className="text-sm text-center max-h-12 break-words mt-2 p-4 bg-gray-800 text-gray-300 rounded-md w-full max-w-md overflow-y-auto"
          style={{ maxHeight: "100px", wordWrap: "break-word" }}
        >
          {user.bio || "No bio available"}
        </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-2 mt-auto">
              {editingUserId === user.id ? (
                <>
                  <button
                    onClick={handleEditSubmit}
                    className="TaaviButton bg-green-500 hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingUserId(null)}
                    className="TaaviButton bg-gray-500 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(user)}
                    className="TaaviButton bg-blue-500 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="TaaviButton bg-red-500 hover:bg-red-600"
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

export default UserManagementPage;
