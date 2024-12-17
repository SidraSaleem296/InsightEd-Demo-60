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
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (!session) {
    return <p>Loading...</p>;
  }

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

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-black">
              Profile Picture
            </th>
            <th className="border border-gray-300 p-2 text-black">Name</th>
            <th className="border border-gray-300 p-2 text-black">Username</th>
            <th className="border border-gray-300 p-2 text-black">Bio</th>
            <th className="border border-gray-300 p-2 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="p-2">
                <div className="flex justify-center">
                <Image
                  src={user.image || "/default-avatar.png"} // Fallback to default avatar
                  alt={`${user.name}'s profile`}
                  width={40} // Specify a default width
                  height={40} // Specify a default height
                  className="rounded-full object-cover"
                />
                </div>
              </td>
              <td className="p-2">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUser.name || ""}
                    onChange={(e) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="p-2">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUser.username || ""}
                    onChange={(e) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="p-2">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUser.bio || ""}
                    onChange={(e) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  user.bio
                )}
              </td>
              <td className="p-2 flex justify-center gap-2">
                {editingUserId === user.id ? (
                  <>
                    <button
                      onClick={handleEditSubmit}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUserId(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
