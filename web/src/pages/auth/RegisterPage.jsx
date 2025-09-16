import { NavLink } from "react-router";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-bold text-neutral-100">
        Register
      </h1>

      <form className="space-y-4">
        <div>
          <label className="block text-sm text-neutral-300">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-md border border-neutral-600 bg-neutral-900 px-3 py-2 text-neutral-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-300">Password</label>
          <input
            type="password"
            placeholder="••••••••"
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