import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import Link from "next/link"; // Import Link from Next.js

type PostProps = {
  post: {
    id: string;
    body: string;
    imageUrl?: string;
    likes: number;
    likedByUser: boolean;
    comments: number;
    user?: {
      id: string;
      name: string;
      username: string;
      image: string;
    }; // Make user optional
  };
  onLike: (postId: string, newLikeCount: number, liked: boolean) => void;
  onCommentAdded: (postId: string) => void;
};

type Comment = {
  id: string;
  body: string;
  user: {
    id: string;
    username: string;
    name: string;
    image: string;
  };
  createdAt: string;
};

const Post: React.FC<PostProps> = ({ post, onLike, onCommentAdded }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]); // Explicitly set type to Comment[]
  const [loadingComments, setLoadingComments] = useState(false);

  // Handle like action
  const handleLike = async () => {
    if (isLiking) return; // Prevent spamming likes/dislikes
    setIsLiking(true);

    try {
      const response = await axios.post(`/api/posts/${post.id}/like`);
      const { likeCount, liked } = response.data;

      // Trigger the parent `onLike` callback
      onLike(post.id, likeCount, liked);
    } catch (error) {
      console.error("Error liking/disliking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  // Handle opening the comment modal
  const openCommentModal = async () => {
    setIsModalOpen(true);
    setLoadingComments(true);

    try {
      const response = await axios.get(`/api/posts/${post.id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  // Handle closing the comment modal
  const closeCommentModal = () => {
    setIsModalOpen(false);
    setComment("");
    setComments([]); // Clear comments
  };

  // Handle adding a comment
  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await axios.post(`/api/posts/${post.id}/comments`, {
        comment,
      });
      const newComment = response.data as Comment; // Cast response to Comment type
      setComments((prev) => [newComment, ...prev]); // Add new comment to the top of the list
      onCommentAdded(post.id);
      setComment(""); // Clear input
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="post border p-4 rounded shadow hover:shadow-lg">
      {/* Post Header */}
      {post.user ? ( // Render user details only if user exists
        <div className="flex items-center mb-4">
          <Image
            src={post.user.image || "/default-avatar.png"}
            alt={post.user.name || "User"}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <div>
            {/* Link to user profile */}
            <Link href={`/profile/${post.user.id}`}>
              <p className="font-semibold hover:underline">{post.user.name}</p>
            </Link>
            <p className="text-sm text-gray-500">@{post.user.username}</p>
          </div>
        </div>
      ) : null}

      {/* Post Body */}
      <div className="mb-4">
        <p className="font-semibold">{post.body}</p>
      </div>

      {/* Post Image */}
      {post.imageUrl && (
        <Image
          src={post.imageUrl}
          alt="Post Image"
          width={500}
          height={192}
          className="object-cover mt-2"
        />
      )}

      {/* Like and Comment Actions */}
      <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
        {/* Like Button */}
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="flex items-center gap-1 text-red-500"
        >
          {post.likedByUser ? (
            <FaHeart className="text-xl" />
          ) : (
            <FaRegHeart className="text-xl" />
          )}
          {post.likes}
        </button>

        {/* Comment Button */}
        <button
          onClick={openCommentModal}
          className="flex items-center gap-1 text-blue-500"
        >
          <AiOutlineComment className="text-xl" />
          {post.comments} Comments
        </button>
      </div>

      {/* Comment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-[75vh] flex flex-col">
            {/* Post Content and User Details */}
            <div className="mb-4 border-b border-gray-700 pb-4 flex items-start gap-4">
              <Image
                src={post.user?.image || "/default-avatar.png"}
                alt={post.user?.name || "User"}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="text-lg font-semibold">{post.user?.name}</p>
                <p className="text-sm text-gray-400">@{post.user?.username}</p>
                <p className="mt-2">{post.body}</p>
              </div>
            </div>

            {/* Comments Section */}
            <div
              className="flex-grow overflow-y-auto mb-4 border border-gray-700 rounded p-4 bg-gray-900 custom-scrollbar"
              style={{ maxHeight: "50vh" }} // Fixed height for the comments area
            >
              {loadingComments ? (
                <p>Loading comments...</p>
              ) : comments.length > 0 ? (
                <ul>
                  {comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="mb-4 flex items-start gap-3"
                    >
                      <Image
                        src={comment.user.image || "/default-avatar.png"}
                        alt={comment.user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <Link href={`/profile/${comment.user.id}`}>
                          <p className="font-semibold hover:underline text-white">
                            {comment.user.username}
                          </p>
                        </Link>
                        <p className="text-gray-300">{comment.body}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>

            {/* Comment Input and Buttons */}
            <div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2 mb-4 resize-none"
                rows={3}
                placeholder="Write your comment here..."
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleAddComment}
                  className="TaaviButton bg-blue-500 hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  onClick={closeCommentModal}
                  className="TaaviButton bg-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
