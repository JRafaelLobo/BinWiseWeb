import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

function LeafMark() {
  return (
    <svg className="nav-logo-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 4C9 4 4 10 4 18c0 1 .2 1.8.2 1.8s7.8-.3 12.3-4.8C20.5 11 20 4 20 4Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M5 19C8 13 13 9 18 7"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const links = [
  { to: '/dashboard', label: 'Inicio' },
  { to: '/clasificar', label: 'Clasificar' },
  { to: '/registrar', label: 'Registrar' },
  { to: '/historial', label: 'Historial' },
];

// Estructura del área autenticada: barra de navegación + contenido.
export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <nav className="app-nav">
        <div className="nav-brand">
          <LeafMark />
          <span>BinWise</span>
        </div>

        <div className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-user">
          <span className="nav-user-name">{user?.name}</span>
          <button className="nav-logout" onClick={handleLogout}>
            Salir
          </button>
        </div>
      </nav>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
