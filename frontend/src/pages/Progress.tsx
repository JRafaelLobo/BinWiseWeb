import { useEffect, useState } from 'react';
import { getLevel, getPoints } from '../api/gamification';
import { getErrorMessage } from '../api/errors';
import type { LevelResponse, PointsResponse } from '../types';

export function Progress() {
  const [level, setLevel] = useState<LevelResponse | null>(null);
  const [points, setPoints] = useState<PointsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getLevel(), getPoints()])
      .then(([lvl, pts]) => {
        setLevel(lvl);
        setPoints(pts);
      })
      .catch((err) => setError(getErrorMessage(err, 'No se pudo cargar tu progreso.')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page page-narrow">
      <header className="page-header">
        <div>
          <h1 className="page-title">Mi progreso</h1>
          <p className="page-subtitle">Tu nivel y puntos acumulados.</p>
        </div>
      </header>

      {loading && <p className="muted">Cargando…</p>}
      {error && <p className="auth-error">{error}</p>}

      {level && points && (
        <>
          <div className="card level-card">
            <span className="level-badge">Nivel {level.currentLevel}</span>
            <h2 className="level-name">{level.currentLevelName}</h2>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(level.progressPercentage, 100)}%` }}
              />
            </div>

            <p className="progress-text">
              {level.pointsToNextLevel > 0
                ? `Te faltan ${level.pointsToNextLevel} puntos para el siguiente nivel.`
                : '¡Has alcanzado el nivel máximo!'}
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Puntos totales</span>
              <span className="stat-value">{points.totalPoints}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Puntos este mes</span>
              <span className="stat-value">{points.pointsThisMonth}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
