import axios from 'axios';

export const TOKEN_KEY = 'binwise_token';

// baseURL '/api' lo reenvía Vite al backend (ver vite.config.ts).
// Las rutas del backend ya viven bajo /api (ej. /api/auth/login), por eso
// al llamar a '/auth/login' la URL final es '/api/auth/login'.
const apiClient = axios.create({
  baseURL: '/api',
});

// Inyecta el token JWT en cada petición si existe.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si el backend responde 401 (token inválido/expirado), limpiamos sesión
// y redirigimos al login.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
