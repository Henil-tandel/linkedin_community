import { Link } from "react-router-dom";

export default function PostCard({ author, timestamp, content, authorId }) {
  return (
    <div className="bg-gray-50 border rounded p-4 shadow-sm relative">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <Link
          to={`/profile/${authorId}`}
          className="font-semibold text-blue-700 hover:underline"
        >
          {author}
        </Link>
        <span>{timestamp}</span>
      </div>

      <p className="text-gray-800 mb-2">{content}</p>
    </div>
  );
}
