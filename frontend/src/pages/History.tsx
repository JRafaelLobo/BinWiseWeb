import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHistory } from '../api/recycling';
import { getErrorMessage } from '../api/errors';
import type { RecyclingRecord } from '../types';

export function History() {
  const [records, setRecords] = useState<RecyclingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getHistory()
      .then(setRecords)
      .catch((err) =>
        setError(getErrorMessage(err, 'No se pudo cargar el historial.')),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Historial de reciclaje</h1>
          <p className="page-subtitle">Todo lo que has reciclado hasta ahora.</p>
        </div>
      </header>

      {loading && <p className="muted">Cargando historial…</p>}
      {error && <p className="auth-error">{error}</p>}

      {!loading && !error && records.length === 0 && (
        <div className="empty-state">
          <p>Aún no has registrado ningún reciclaje.</p>
          <Link to="/clasificar" className="btn-primary btn-inline">
            Reciclar ahora
          </Link>
        </div>
      )}

      {records.length > 0 && (
        <div className="table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th>Residuo</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Puntos</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.wasteName}</td>
                  <td>
                    <span
                      className="category-chip"
                      style={{
                        background: rec.category?.color ?? 'var(--green-50)',
                      }}
                    >
                      {rec.category?.name ?? '—'}
                    </span>
                  </td>
                  <td>{rec.quantity}</td>
                  <td className="points-cell">+{rec.pointsEarned}</td>
                  <td>
                    {new Date(rec.recycledAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
