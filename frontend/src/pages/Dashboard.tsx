import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { getUserStats } from '../api/stats';
import { getErrorMessage } from '../api/errors';
import type { UserStats } from '../types';

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getUserStats()
      .then(setStats)
      .catch((err) => setError(getErrorMessage(err, 'No se pudieron cargar las estadísticas.')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Hola, {user?.name}</h1>
          <p className="page-subtitle">Este es el resumen de tu impacto.</p>
        </div>
        <Link to="/clasificar" className="btn-primary btn-inline">
          Clasificar residuo
        </Link>
      </header>

      {loading && <p className="muted">Cargando estadísticas…</p>}
      {error && <p className="auth-error">{error}</p>}

      {stats && (
        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Materiales reciclados</span>
            <span className="stat-value">{stats.totalRecycledItems}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Puntos totales</span>
            <span className="stat-value">{stats.totalPoints}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Nivel actual</span>
            <span className="stat-value">{stats.currentLevel}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Recompensas</span>
            <span className="stat-value">{stats.rewardsEarned}</span>
          </div>
          <div className="stat-card stat-card-wide">
            <span className="stat-label">Categoría más reciclada</span>
            <span className="stat-value-sm">
              {stats.mostRecycledCategory || 'Aún sin datos'}
            </span>
          </div>
          <div className="stat-card stat-card-wide">
            <span className="stat-label">Último reciclaje</span>
            <span className="stat-value-sm">
              {stats.lastRecyclingDate
                ? new Date(stats.lastRecyclingDate).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Aún sin registros'}
            </span>
          </div>
        </section>
      )}
    </div>
  );
}
