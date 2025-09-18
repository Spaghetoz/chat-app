import { useAuth } from "../features/auth/hooks/useAuth";
import { Navigate } from 'react-router';

export default function PrivateRoute({ children }) {
  const { user, checkingAuth } = useAuth();

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}