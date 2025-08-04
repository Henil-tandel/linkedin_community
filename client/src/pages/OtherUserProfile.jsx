import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";

export default function OtherUserProfile() {
  const { id } = useParams();
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to load user profile");
          return;
        }

        setUser(data.user);
        setPosts(data.posts);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [id, token]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <button
          className="text-sm text-blue-600 mb-4"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="text-center space-y-2 mb-6">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm italic text-gray-700">{user.bio || "No bio"}</p>
        </div>

        <hr className="my-4" />
        <h3 className="text-lg font-semibold mb-4">Posts</h3>

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                author={post.author.name}
                authorId={post.author._id}
                timestamp={new Date(post.createdAt).toLocaleString()}
                content={post.content}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
