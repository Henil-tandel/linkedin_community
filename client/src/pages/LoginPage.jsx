import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setToken(data.token);
      toast.success('Logged in!');
      navigate('/blogs');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-white px-6 py-20">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Login
        </h2>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-6 p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-8 p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
