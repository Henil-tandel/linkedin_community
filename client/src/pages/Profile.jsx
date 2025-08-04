import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";

export default function Profile() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEditProfile = () => navigate("/edit-profile");

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.message || "Failed to load profile");
          return;
        }
        setUser(data.user);

        const postRes = await fetch(
          `${process.env.REACT_APP_API_URL}/posts?author=${data.user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const postData = await postRes.json();
        if (postRes.ok) setPosts(postData.posts);
        else console.error("Failed to fetch posts");
      } catch (err) {
        console.error("Error loading profile or posts:", err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, [token]);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!user) return <p className="text-center mt-10">Profile not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-center md:text-left">Profile</h2>
          <button
            onClick={handleEditProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Edit Profile
          </button>
        </div>

        <div className="space-y-2 mb-6 text-center">
          <p className="text-lg font-medium text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-700 italic">{user.bio || "No bio yet"}</p>
        </div>

        <hr className="my-4" />
        <h3 className="text-xl font-semibold mb-4">Your Posts</h3>

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                postId={post._id}
                author={post.author.name}
                authorId={post.author._id}
                timestamp={new Date(post.createdAt).toLocaleString()}
                content={post.content}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">You haven’t posted anything yet.</p>
        )}
      </div>
    </div>
  );
}
