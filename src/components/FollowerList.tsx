"use client";

import Image from "next/image";
import Link from "next/link";

const FollowerList = ({ title, users, onClose }: { title: string; users: any[]; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            Close
          </button>
        </div>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="flex items-center space-x-4">
              <Link href={`/profile/${user.id}`}>
                <div className="flex items-center space-x-4 hover:text-blue-500 cursor-pointer">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{user.name || "Anonymous"}</p>
                    <p className="text-sm text-gray-500">@{user.username || "unknown"}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowerList;
