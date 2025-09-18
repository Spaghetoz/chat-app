import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({ baseURL: API_BASE, withCredentials: true });

let isRefreshing = false;
let refreshPromise = null;

api.interceptors.request.use(config => {
  const token = window.__ACCESS_TOKEN__;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = api.post('/auth/refresh')
            .then(r => {
              window.__ACCESS_TOKEN__ = r.data.accessToken;
              return window.__ACCESS_TOKEN__;
            })
            .finally(() => { isRefreshing = false; refreshPromise = null; });
        }
        await refreshPromise;
        original.headers['Authorization'] = `Bearer ${window.__ACCESS_TOKEN__}`;
        return api(original);
      } catch (e) {
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  }
);

export default api;