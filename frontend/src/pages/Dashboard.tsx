import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
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
      .catch((err) =>
        setError(getErrorMessage(err, 'No se pudieron cargar las estadísticas.')),
      )
      .finally(() => setLoading(false));
  }, []);

  const totalRecycledItems = stats?.totalRecycledItems ?? 0;
  const totalPoints = stats?.totalPoints ?? 0;
  const currentLevel = stats?.currentLevel ?? 1;
  const rewardsEarned = stats?.rewardsEarned ?? 0;

  const progressPercentage = Math.min((totalPoints % 100), 100);
  const pointsToNextLevel = 100 - progressPercentage;

  const lastRecyclingDate = stats?.lastRecyclingDate
    ? new Date(stats.lastRecyclingDate).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    : 'Aún sin registros';

  const dashboardChartData = [
    {
      name: 'Reciclados',
      total: totalRecycledItems,
    },
    {
      name: 'Puntos',
      total: totalPoints,
    },
    {
      name: 'Nivel',
      total: currentLevel,
    },
    {
      name: 'Recompensas',
      total: rewardsEarned,
    },
  ];

  return (
    <div className="page dashboard-page">
      <section className="dashboard-hero">
        <div>
          <span className="dashboard-badge">Resumen ambiental</span>
          <h1 className="page-title">Hola, {user?.name || 'usuario'}</h1>
          <p className="page-subtitle">
            Este es el resumen de tu impacto en BinWise. Seguí clasificando,
            reciclando y ganando puntos por tus buenas acciones.
          </p>

          <div className="dashboard-actions">
            <Link to="/clasificar" className="btn-primary btn-inline">
              Clasificar residuo
            </Link>
            <Link to="/registrar" className="btn-secondary-dashboard">
              Registrar reciclaje
            </Link>
          </div>
        </div>

        <div className="eco-card">
          <span className="eco-icon">♻️</span>
          <p>Nivel actual</p>
          <strong>{currentLevel}</strong>
          <small>Eco usuario en progreso</small>
        </div>
      </section>

      {loading && (
        <section className="dashboard-message">
          <div className="dashboard-loader"></div>
          <p>Cargando estadísticas…</p>
        </section>
      )}

      {error && <p className="auth-error">{error}</p>}

      {stats && (
        <>
          <section className="stats-grid dashboard-stats">
            <div className="stat-card dashboard-stat-card">
              <div className="stat-icon">🌱</div>
              <span className="stat-label">Materiales reciclados</span>
              <span className="stat-value">{totalRecycledItems}</span>
              <p className="stat-helper">Registros realizados</p>
            </div>

            <div className="stat-card dashboard-stat-card">
              <div className="stat-icon">⭐</div>
              <span className="stat-label">Puntos totales</span>
              <span className="stat-value">{totalPoints}</span>
              <p className="stat-helper">Puntos acumulados</p>
            </div>

            <div className="stat-card dashboard-stat-card">
              <div className="stat-icon">📈</div>
              <span className="stat-label">Nivel actual</span>
              <span className="stat-value">{currentLevel}</span>
              <p className="stat-helper">Según tu progreso</p>
            </div>

            <div className="stat-card dashboard-stat-card">
              <div className="stat-icon">🏆</div>
              <span className="stat-label">Recompensas</span>
              <span className="stat-value">{rewardsEarned}</span>
              <p className="stat-helper">Logros desbloqueados</p>
            </div>
          </section>

          <section className="dashboard-panels">
            <article className="dashboard-panel chart-panel">
              <div className="panel-header">
                <div>
                  <span className="stat-label">Gráfico general</span>
                  <h2>Resumen de impacto</h2>
                </div>
                <span className="panel-icon">📊</span>
              </div>

              <div className="dashboard-chart">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={dashboardChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="total" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="panel-text">
                Este gráfico resume tus reciclajes, puntos, nivel y recompensas dentro de BinWise.
              </p>
            </article>
            <article className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span className="stat-label">Progreso del nivel</span>
                  <h2>Camino al siguiente nivel</h2>
                </div>
                <strong>{progressPercentage}%</strong>
              </div>

              <div className="level-progress">
                <div style={{ width: `${progressPercentage}%` }}></div>
              </div>

              <p className="panel-text">
                Te faltan aproximadamente {pointsToNextLevel} puntos para avanzar
                al siguiente nivel.
              </p>
            </article>

            <article className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span className="stat-label">Categoría más reciclada</span>
                  <h2>{stats.mostRecycledCategory || 'Aún sin datos'}</h2>
                </div>
                <span className="panel-icon">🗂️</span>
              </div>

              <p className="panel-text">
                Esta sección muestra el tipo de residuo que más has registrado en
                la aplicación.
              </p>
            </article>

            <article className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span className="stat-label">Último reciclaje</span>
                  <h2>{lastRecyclingDate}</h2>
                </div>
                <span className="panel-icon">🕒</span>
              </div>

              <p className="panel-text">
                Mantené tu actividad constante para mejorar tus estadísticas y
                ganar más recompensas.
              </p>
            </article>

            <article className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span className="stat-label">Acciones rápidas</span>
                  <h2>¿Qué querés hacer?</h2>
                </div>
                <span className="panel-icon">🚀</span>
              </div>

              <div className="quick-dashboard-links">
                <Link to="/clasificar">Clasificar</Link>
                <Link to="/historial">Historial</Link>
                <Link to="/progreso">Progreso</Link>
                <Link to="/aprende">Aprende</Link>
              </div>
            </article>
          </section>
        </>
      )}
    </div>
  );
}