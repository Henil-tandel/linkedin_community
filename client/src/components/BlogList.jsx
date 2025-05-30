import { useNavigate } from "react-router-dom";

const BlogList = ({ blogs }) => {
  const navigate = useNavigate();

  if (blogs.length === 0) {
    return (
      <p className="text-center text-gray-500 italic mt-12 select-none">
        No blogs found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          onClick={() => navigate(`/blogs/${blog._id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate(`/blogs/${blog._id}`);
          }}
          className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-6 flex flex-col justify-between focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label={`View blog titled ${blog.title}`}
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 truncate" title={blog.title}>
              {blog.title}
            </h3>
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full select-none ${
                blog.status === "published"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
              aria-label={`Blog status: ${blog.status}`}
            >
              {blog.status.toUpperCase()}
            </span>
            <p
              className="mt-4 text-gray-700 line-clamp-3 leading-relaxed"
              title={blog.content}
            >
              {blog.content}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default BlogList;
