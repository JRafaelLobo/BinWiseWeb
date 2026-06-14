import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserRewards } from '../api/rewards';
import { getErrorMessage } from '../api/errors';
import type { UserReward } from '../types';

export function Rewards() {
  const [rewards, setRewards] = useState<UserReward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getUserRewards()
      .then(setRewards)
      .catch((err) => setError(getErrorMessage(err, 'No se pudieron cargar las recompensas.')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Mis recompensas</h1>
          <p className="page-subtitle">Logros que has desbloqueado reciclando.</p>
        </div>
      </header>

      {loading && <p className="muted">Cargando…</p>}
      {error && <p className="auth-error">{error}</p>}

      {!loading && !error && rewards.length === 0 && (
        <div className="empty-state">
          <p>Aún no has desbloqueado recompensas. ¡Empieza a reciclar!</p>
          <Link to="/clasificar" className="btn-primary btn-inline">
            Reciclar ahora
          </Link>
        </div>
      )}

      {rewards.length > 0 && (
        <div className="rewards-grid">
          {rewards.map((reward) => (
            <div key={reward.id} className="reward-card">
              <div className="reward-medal" aria-hidden="true">★</div>
              <h3 className="reward-name">{reward.name}</h3>
              <p className="reward-desc">{reward.description}</p>
              <span className="reward-date">
                Obtenida el{' '}
                {new Date(reward.earnedAt).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
