import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() === "") return;

    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newPost }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create post");
        return;
      }

      setPosts([data.post, ...posts]);
      setNewPost("");
    } catch (err) {
      console.error("Post creation failed", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Home Feed</h2>

        <form onSubmit={handlePostSubmit} className="mb-6 space-y-2">
          <textarea
            className="w-full p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
            >
              Post
            </button>
          </div>
        </form>

        <hr className="my-4" />

        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-sm text-gray-500">Loading posts...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post._id}
                author={post.author.name}
                timestamp={new Date(post.createdAt).toLocaleString()}
                content={post.content}
                authorId={post.author._id}
              />
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
