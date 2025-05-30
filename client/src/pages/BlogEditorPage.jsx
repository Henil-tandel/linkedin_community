import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken } from '../utils/auth';
import BlogEditor from '../components/BlogEditor';

const BlogEditorPage = () => {
  const { id } = useParams();
  const [existingBlog, setExistingBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setExistingBlog(data);
      } catch (err) {
        console.error('Failed to load blog:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-900 tracking-tight">
        {id ? 'Edit Your Blog' : 'Create a New Blog'}
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading blog...</p>
      ) : (
        <BlogEditor existingBlog={existingBlog} />
      )}
    </main>
  );
};

export default BlogEditorPage;
