import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from 'react-router';

// Component englobing routes that needs authentication
export default function PrivateRoute({ children }) {
  const { user, checkingAuth } = useAuth();

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet></Outlet>;
}