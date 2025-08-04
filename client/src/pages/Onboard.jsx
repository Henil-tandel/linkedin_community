import { Link } from "react-router-dom";

export default function Onboard() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10">
      {/* Left Content */}
      <div className="md:w-1/2 w-full mb-10 md:mb-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
          alt="Logo"
          className="w-28 mb-8"
        />
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to your professional network
        </h1>

        {/* Buttons */}
        <div className="space-y-4 max-w-sm">
          <Link to="/login">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Sign in with Email
            </button>
          </Link>
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <span className="text-blue-600 underline">User Agreement</span>,{" "}
            <span className="text-blue-600 underline">Privacy Policy</span> and{" "}
            <span className="text-blue-600 underline">Cookie Policy</span>.
          </p>
          <p className="text-sm">
            New to this site?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Join now
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src="./job_offers.svg"
          alt="Illustration"
          className="w-full max-w-md md:max-w-lg"
        />
      </div>
    </div>
  );
}
