"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import PostForm from "@/components/PostForm";

export default function FeedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from followed users
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts/followed");
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle search
  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`/api/user/search?query=${e.target.value}`);
      setSearchResults(response.data);
    } catch (err) {
      console.error("Failed to search users:", err);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]); // Add the new post to the top of the feed
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for users..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border rounded-lg z-10">
            {searchResults.map((user) => (
              <Link
                href={`/profile/${user.id}`}
                key={user.id}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                  <div>
                    <p className="font-semibold">{user.name || "Unknown User"}</p>
                    <p className="text-sm text-gray-500">@{user.username || "unknown"}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <PostForm onPostCreated={handlePostCreated} />

      {/* Posts Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length === 0 ? (
          <p>No posts from followed users.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 shadow">
              <div className="flex items-center mb-4">
                <Image
                  src={post.user?.image || "/default-avatar.png"}
                  alt={post.user?.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <div>
                  <p className="font-semibold">{post.user?.name}</p>
                  <p className="text-sm text-gray-500">@{post.user?.username}</p>
                </div>
              </div>
              <p className="mb-4">{post.body}</p>
              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt="Post Image"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover"
                />
              )}
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>{post.likes} Likes</span>
                <span>{post.comments?.length} Comments</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
