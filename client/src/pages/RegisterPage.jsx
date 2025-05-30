import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setToken(data.token);
      toast.success('Registered successfully!');
      navigate('/blogs');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-50 to-white px-6 py-20">
      <form
        onSubmit={handleRegister}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Register
        </h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full mb-6 p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full mb-6 p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full mb-8 p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
