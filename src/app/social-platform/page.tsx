"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "@/components/PostForm";
import Post from "@/components/Post";
import Image from "next/image";

type PostType = {
  id: string;
  body: string;
  imageUrl?: string;
  likes: number;
  likedByUser: boolean;
  comments: number;
};

export default function FeedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Handle new post creation
  const handlePostCreated = (newPost: PostType) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // Handle like updates
  const handleLikeUpdate = (postId: string, newLikeCount: number, liked: boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: newLikeCount,
              likedByUser: liked, // Update the `likedByUser` property dynamically
            }
          : post
      )
    );
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
            {searchResults.map((user: any) => (
              <a
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
                    <p className="font-semibold text-black">{user.name || "Unknown User"}</p>
                    <p className="text-sm text-gray-500">@{user.username || "unknown"}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <PostForm onPostCreated={handlePostCreated} />

      {/* Posts Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {posts.length === 0 ? (
          <p>No posts from followed users.</p>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={handleLikeUpdate}
              onCommentAdded={(postId: string) => {
                console.log(`Comment added to post ${postId}`);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
