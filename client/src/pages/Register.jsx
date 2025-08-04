import { useState  } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    keepLoggedIn: false,
  });
  const { storeToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      } 

      storeToken(data.token);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
        alt="LinkedIn"
        className="h-10 mb-6"
      />

      <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
        Make the most of your professional life
      </h1>

      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Email or phone number"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded pr-16 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              name="keepLoggedIn"
              checked={form.keepLoggedIn}
              onChange={handleChange}
              className="mr-2"
            />
            Keep me logged in
          </label>

          <p className="text-xs text-gray-500">
            By clicking Agree & Join, you agree to the LinkedIn{" "}
            <a href="/" className="text-blue-600 underline">User Agreement</a>,{" "}
            <a href="/" className="text-blue-600 underline">Privacy Policy</a>, and{" "}
            <a href="/" className="text-blue-600 underline">Cookie Policy</a>.
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Agree & Join
          </button>

          <p className="text-center text-sm mt-4">
            Already on LinkedIn?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>

      <p className="mt-6 text-sm text-gray-500 text-center">
        Looking to create a page for a business?{" "}
        <a href="/" className="text-blue-600 underline">Get help</a>
      </p>
    </div>
  );
}
