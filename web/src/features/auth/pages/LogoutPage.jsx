import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export default function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function doLogout() {
      await logout();       
      navigate('/home');   
    }

    doLogout();
  }, [logout, navigate]);

  return <p>Disconnecting.</p>; 
}