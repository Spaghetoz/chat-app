import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-4">
      <div className="w-full max-w-md rounded-xl bg-neutral-800 p-8 shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}