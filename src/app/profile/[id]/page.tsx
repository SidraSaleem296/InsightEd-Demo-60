"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import PostForm from "@/components/PostForm";
import { useSession } from "next-auth/react";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Extract `id` from the dynamic route
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const [posts, setPosts] = useState(profile?.posts || []);
  const [isFollowing, setIsFollowing] = useState(profile?.isFollowing || false);


  // Check if the logged-in user is viewing their own profile
  const isOwnProfile = session?.user?.id === profile?.id;



  useEffect(() => {
    console.log("Dynamic Route ID:", id); // Debug the ID
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);
        console.log("API Response:", response.data); // Debug API response
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err); // Debug error
        setError(err.response?.data?.error || "Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]); // Add the new post to the top of the feed
  };

  const handleFollowToggle = async () => {
    try {
      const response = await axios.post("/api/user/follow", {
        targetUserId: profile.id,
      });
      setIsFollowing((prev) => !prev);
      console.log(response.data.message);
    } catch (err) {
      console.error("Error following/unfollowing user:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error state
  }

  if (!profile) {
    return <div>Failed to load profile data.</div>; // Handle null profile
  }

  return (
    <div className="container mx-auto p-4">
      {/* User Info */}
      <div className="profile-header text-center mb-8">
        <Image
          src={profile.image || "/default-avatar.png"}
          alt={`${profile.name || "User"}'s Avatar`}
          width={128}
          height={128}
          className="rounded-full"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          priority
        />
        <h1 className="text-2xl font-bold">{profile.name || "Anonymous"}</h1>
        <p className="text-gray-600">@{profile.username || "No username"}</p>
        <p className="text-gray-800 mt-2">{profile.bio || "No bio available"}</p>
      </div>

      {/* User Stats */}
      <div className="flex justify-center space-x-4 mb-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Followers</h2>
          <p className="text-2xl">{profile.followerCount}</p>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold">Posts</h2>
          <p className="text-2xl">{profile.posts.length}</p>
        </div>
      </div>

      {/* Follow/Unfollow Button */}
      {!isOwnProfile && (
        <button
          onClick={handleFollowToggle}
          className={`px-4 py-2 rounded ${
            isFollowing ? "bg-red-500" : "bg-blue-500"
          } text-white`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}

      {isOwnProfile && <PostForm onPostCreated={handlePostCreated} />}

      {/* User Posts */}
      <div className="posts">
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        {profile.posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.posts.map((post) => (
              <div
                key={post.id}
                className="post border p-4 rounded shadow hover:shadow-lg"
              >
                <p className="text-gray-800">{post.body}</p>
                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt="Post Image"
                    width={500}
                    height={192}
                    className="object-cover mt-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                  <span>{post.likeCount} Likes</span>
                  <span>{post.commentCount} Comments</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
