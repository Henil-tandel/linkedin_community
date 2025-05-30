import { useEffect, useState } from 'react';
import { getToken } from '../utils/auth';
import BlogList from '../components/BlogList';

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await fetch('http://localhost:5000/api/blogs', {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    if (res.ok) setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const drafts = blogs.filter((b) => b.status === 'draft');
  const published = blogs.filter((b) => b.status === 'published');

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">My Blogs</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📢 Published Blogs</h2>
        {published.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BlogList blogs={published} />
          </div>
        ) : (
          <p className="text-gray-500 italic">No published blogs yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📝 Drafts</h2>
        {drafts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BlogList blogs={drafts} />
          </div>
        ) : (
          <p className="text-gray-500 italic">No drafts saved.</p>
        )}
      </section>
    </div>
  );
};

export default AllBlogsPage;
