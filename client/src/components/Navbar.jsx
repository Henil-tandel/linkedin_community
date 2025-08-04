import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate(); // ✅ navigate here

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();        // ✅ clear token
    navigate("/");   // ✅ go to onboard page
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/home" className="text-xl font-bold text-blue-600">
        LinkedIn Clone
      </Link>

      <div className="flex gap-4">
        <Link to="/home" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="text-red-600 hover:underline text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
