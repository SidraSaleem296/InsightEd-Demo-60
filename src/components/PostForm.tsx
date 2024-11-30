import { useState } from "react";
import axios from "axios";

const PostForm = ({ onPostCreated }) => {
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/posts/create", { body, imageUrl });
      setBody("");
      setImageUrl("");
      onPostCreated(response.data); // Call parent callback to refresh posts
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write something..."
        className="w-full border rounded p-2"
      ></textarea>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
