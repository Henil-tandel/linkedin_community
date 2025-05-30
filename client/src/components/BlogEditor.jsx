import { useEffect, useState, useRef } from 'react';
import { getToken } from '../utils/auth';
import { toast } from 'react-toastify';

const BlogEditor = ({ existingBlog }) => {
  const [title, setTitle] = useState(existingBlog?.title || '');
  const [content, setContent] = useState(existingBlog?.content || '');
  const [tags, setTags] = useState(existingBlog?.tags?.join(',') || '');
  const [blogId, setBlogId] = useState(existingBlog?._id || null);
  const timeout = useRef(null);

  const autoSaveDraft = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/blogs/save-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ id: blogId, title, content, tags: tags.split(',') })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setBlogId(data._id);
      toast.info('Draft auto-saved', { toastId: 'autosave', autoClose: 1000 });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAutoSave = () => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(autoSaveDraft, 5000);
  };

  useEffect(() => {
    const interval = setInterval(autoSaveDraft, 30000);
    return () => clearInterval(interval);
  });

  const handlePublish = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/blogs/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ id: blogId, title, content, tags: tags.split(',') })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success('Blog published!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
      <input
        value={title}
        onChange={e => { setTitle(e.target.value); handleAutoSave(); }}
        placeholder="Blog Title"
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        value={content}
        onChange={e => { setContent(e.target.value); handleAutoSave(); }}
        placeholder="Write your content here..."
        rows={12}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        value={tags}
        onChange={e => { setTags(e.target.value); handleAutoSave(); }}
        placeholder="Tags (comma separated)"
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex items-center justify-end gap-4 mt-4">
        <button
          onClick={autoSaveDraft}
          className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Save Draft
        </button>
        <button
          onClick={handlePublish}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;
