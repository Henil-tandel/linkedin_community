import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { storeToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      storeToken(data.token);
      navigate("/home");
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
        alt="LinkedIn"
        className="h-10 mb-6"
      />

      <div className="w-full max-w-sm bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm text-gray-500">
              <span className="bg-white px-2">or</span>
            </div>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email or phone"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded pr-16 focus:outline-none focus:ring-2 focus:ring-blue-600"
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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Sign in
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm text-gray-600">
        New to LinkedIn?{" "}
        <Link to="/register" className="text-blue-600 font-medium">
          Join now
        </Link>
      </p>
    </div>
  );
}
