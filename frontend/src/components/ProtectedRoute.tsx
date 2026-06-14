import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

// Envuelve las rutas privadas: si no hay sesión, redirige a /login.
export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p style={{ padding: '2rem' }}>Cargando…</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
