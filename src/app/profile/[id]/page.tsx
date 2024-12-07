"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import PostForm from "@/components/PostForm";
import FollowerList from "@/components/FollowerList";
import ProfileEditableField from "@/components/ProfileEditableField";
import Post from "@/components/Post"; // Import the Post component
import { useSession } from "next-auth/react";

type PostType = {
  id: string;
  body: string;
  imageUrl?: string;
  likes: number;
  likedByUser: boolean;
  comments: number;
};

type ProfileType = {
  id: string;
  name: string;
  username: string;
  bio: string;
  image: string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
  posts: PostType[];
};

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Extract `id` from the dynamic route

  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  // Check if the logged-in user is viewing their own profile
  const isOwnProfile = session?.user?.id === profile?.id;

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);
        const profileData = response.data as ProfileType;
        setProfile(profileData);
        setIsFollowing(profileData.isFollowing || false);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const updateProfile = async (updates: {
    bio?: string;
    username?: string;
  }) => {
    try {
      const response = await axios.put(`/api/user/${id}`, updates);
      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handlePostCreated = (newPost: PostType) => {
    setPosts((prev) => [newPost, ...prev]); // Add the new post to the top of the feed
  };

  const handleFollowToggle = async () => {
    try {
      await axios.post("/api/user/follow", {
        targetUserId: profile?.id,
      });
      setIsFollowing((prev) => !prev);
    } catch (err) {
      console.error("Error following/unfollowing user:", err);
    }
  };

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(`/api/user/${id}/followers`);
      setFollowers(response.data);
      setShowFollowers(true);
    } catch (err) {
      console.error("Error fetching followers:", err);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(`/api/user/${id}/following`);
      setFollowing(response.data);
      setShowFollowing(true);
    } catch (err) {
      console.error("Error fetching following:", err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts?userId=${id}`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  const handleLikeUpdate = (postId: string, newLikeCount: number, liked: boolean) => {
    console.log("Updating likes for post:", postId, "New Like Count:", newLikeCount, "Liked:", liked);
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: newLikeCount,
              likedByUser: liked, // Dynamically update the state
            }
          : post
      )
    );
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
      <div className="profile-header text-center flex flex-col items-center">
        <div className="relative inline-block">
          <label htmlFor="profileImageUpload" className="cursor-pointer">
            <Image
              src={profile.image || "/default-avatar.png"}
              alt="Profile Image"
              width={128}
              height={128}
              className="rounded-full mx-auto"
            />
          </label>
        </div>
        <h1 className="text-2xl font-bold mt-3">
          {profile.name || "Anonymous"}
        </h1>
        <h1 className="text-2x1 font-bold mt-3">
          {isOwnProfile ? (
            <ProfileEditableField
              value={profile.username || "No username"}
              onSave={(newUsername) => updateProfile({ username: newUsername })}
            />
          ) : (
            profile.username || "No username"
          )}
        </h1>
        <p className="text-gray-800 mt-2">
          {isOwnProfile ? (
            <ProfileEditableField
              value={profile.bio || "No bio available"}
              onSave={(newBio) => updateProfile({ bio: newBio })}
            />
          ) : (
            profile.bio || "No bio available"
          )}
        </p>
      </div>

      {/* Follow/Unfollow Button */}
      <div className="flex justify-center mt-5 mb-5">
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
      </div>

      {/* User Stats */}
      <div className="flex justify-center space-x-4 mb-8">
        <div className="text-center cursor-pointer" onClick={fetchFollowers}>
          <h2 className="text-lg font-semibold">Followers</h2>
          <p className="text-2xl">{profile.followerCount}</p>
        </div>
        <div className="text-center cursor-pointer" onClick={fetchFollowing}>
          <h2 className="text-lg font-semibold">Following</h2>
          <p className="text-2xl">{profile.followingCount}</p>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold">Posts</h2>
          <p className="text-2xl">{posts.length}</p>
        </div>
      </div>

      {isOwnProfile && <PostForm onPostCreated={handlePostCreated} />}

      {/* User Posts */}
      <div className="posts">
        <h2 className="text-xl text-center font-bold mt-4 mb-4">Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onLike={handleLikeUpdate} // Pass the callback to update likes
                onCommentAdded={(postId) => {
                  console.log("Comment added for post:", postId);
                }} // Optional
              
              />
            ))}
          </div>
        )}
      </div>
      {/* Modals */}
      {showFollowers && (
        <FollowerList
          title="Followers"
          users={followers}
          onClose={() => setShowFollowers(false)}
        />
      )}
      {showFollowing && (
        <FollowerList
          title="Following"
          users={following}
          onClose={() => setShowFollowing(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
