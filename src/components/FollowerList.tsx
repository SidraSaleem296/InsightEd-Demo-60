"use client";

import Image from "next/image";
import Link from "next/link";

const FollowerList = ({
  title,
  users,
  onClose,
}: {
  title: string;
  users: any[];
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      {/* Modal Container */}
      <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-3xl h-[75vh] shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            &#x2715; {/* Close icon */}
          </button>
        </div>

        {/* Scrollable List */}
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 pr-2 flex-1">
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.id} className="hover:bg-gray-700 p-3 rounded-lg">
                <Link href={`/profile/${user.id}`}>
                  <div className="flex items-center space-x-4 cursor-pointer">
                    {/* User Avatar */}
                    <Image
                      src={user.image || "/default-avatar.png"}
                      alt={user.name || "User"}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                    {/* User Info */}
                    <div>
                      <p className="font-semibold text-lg">{user.name || "Anonymous"}</p>
                      <p className="text-gray-400 text-sm">@{user.username || "unknown"}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FollowerList;
