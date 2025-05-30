import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlog(res.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading blog...</p>
      </div>
    );

  if (!blog)
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        Blog not found.
      </div>
    );

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-blue-600 mb-4 hover:underline cursor-pointer" onClick={() => navigate('/')}>
        ← Back to Home
      </nav>

      <article className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <header>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">{blog.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide ${
                blog.status === 'published'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {blog.status}
            </span>
          </div>
        </header>

        <section className="prose prose-lg max-w-none mb-10">
          {/* Using prose from Tailwind Typography plugin for nice content */}
          <p style={{ whiteSpace: 'pre-line' }}>{blog.content}</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Tags:</h3>
          <ul className="flex flex-wrap gap-3">
            {blog.tags.map((tag, i) => (
              <li
                key={i}
                className="cursor-pointer rounded-full bg-blue-100 text-blue-700 px-4 py-1 font-semibold hover:bg-blue-200 transition"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>

        <button
          onClick={() => navigate(`/editor/${blog._id}`)}
          className="mt-10 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-8 py-3 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
          aria-label="Edit Blog"
        >
          Edit Blog
        </button>
      </article>
    </main>
  );
};

export default BlogDetail;
