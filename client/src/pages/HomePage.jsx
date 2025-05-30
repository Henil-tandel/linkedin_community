const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-blue-50 to-white text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 max-w-4xl leading-tight">
        Welcome to <span className="text-blue-600">Blog Editor App</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-10">
        Create blogs, save drafts, and publish your thoughts with ease. Manage your content with powerful yet simple tools.
      </p>
      <button
        onClick={() => window.location.href = '/register'}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-lg shadow-lg transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
