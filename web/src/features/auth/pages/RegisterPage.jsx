import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { NavLink, useNavigate  } from "react-router";

// TODO refactor to avoid duplication with loginpage
export default function RegisterPage() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  async function handle(e) {
    e.preventDefault();
    try {
      await auth.register(username, email, password);
      await auth.login(email, password);
      navigate('/app');   
    } catch (err) {
      alert('Register failed: ' + err.response?.data?.error || err.message);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-bold text-neutral-100">
        Register
      </h1>

      <form className="space-y-4" onSubmit={handle}>

        <div>
          <label className="block text-sm text-neutral-300">Username</label>
          <input
            type="text" 
            placeholder="Username"
            value={username} 
            onChange={e => setUsername(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-600 bg-neutral-900 px-3 py-2 text-neutral-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-300">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email} 
            onChange={e => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-600 bg-neutral-900 px-3 py-2 text-neutral-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-300">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password} 
            onChange={e => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-600 bg-neutral-900 px-3 py-2 text-neutral-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <NavLink to="/login" className="text-blue-400 hover:underline">
          Login
        </NavLink>
      </p>
    </div>
  );
}