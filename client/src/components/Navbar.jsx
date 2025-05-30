import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition">
          Blogify
        </Link>

        {isAuthenticated() && (
          <>
            <Link to="/blogs" className="text-gray-700 hover:text-blue-600 transition">
              All Blogs
            </Link>
            <Link to="/editor" className="text-gray-700 hover:text-blue-600 transition">
              Write
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated() ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
