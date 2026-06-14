import { useAuth } from '../auth/useAuth';

export function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Hola, {user?.name} 👋</h1>
        <button onClick={logout}>Cerrar sesión</button>
      </header>

      <section className="dashboard-cards">
        <div className="stat-card">
          <span className="stat-label">Puntos totales</span>
          <span className="stat-value">{user?.totalPoints ?? 0}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Nivel</span>
          <span className="stat-value">{user?.level ?? 1}</span>
        </div>
      </section>

      <p className="dashboard-note">
        Próximamente: clasificar residuos, historial, recompensas y módulos
        educativos.
      </p>
    </div>
  );
}
