import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobileNo: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (!result.error) navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-800">
        <h2 className="text-4xl font-bold text-center mb-8 text-cyan-400">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full px-5 py-4 bg-zinc-800 rounded-xl border border-zinc-700" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full px-5 py-4 bg-zinc-800 rounded-xl border border-zinc-700" />
          <input name="mobileNo" placeholder="Mobile Number" onChange={handleChange} required className="w-full px-5 py-4 bg-zinc-800 rounded-xl border border-zinc-700" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full px-5 py-4 bg-zinc-800 rounded-xl border border-zinc-700" />

          <button type="submit" className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-cyan-400 transition-all">
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-zinc-400">
          Already have an account? <Link to="/login" className="text-cyan-400">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;