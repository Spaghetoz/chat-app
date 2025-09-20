import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  // Indicates whether the app is currently verifying the user's JWT
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  useEffect(() => {
    // Fetching user when the page loads
    async function initAuth() {
      try {
        await refresh();
      } catch (err) {
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    }
    initAuth();
  }, []);

  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    window.__ACCESS_TOKEN__ = res.data.accessToken;
    setUser(res.data.user);
    return res.data.user;
  }

  async function register(username, email, password) {
    const res = await api.post('/auth/register', { username, email, password });
    return res.data.user;
  }

  async function logout() {
    await api.post('/auth/logout');
    window.__ACCESS_TOKEN__ = null;
    setUser(null);
    setCheckingAuth(false);
  }

  async function refresh() {
    const res = await api.post('/auth/refresh');
    window.__ACCESS_TOKEN__ = res.data.accessToken;
    setUser(res.data.user);
    return res.data.user;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refresh, checkingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}