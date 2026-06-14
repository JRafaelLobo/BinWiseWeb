import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getModules } from '../api/education';
import { getErrorMessage } from '../api/errors';
import type { EducationModule } from '../types';

export function Education() {
  const [modules, setModules] = useState<EducationModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getModules()
      .then(setModules)
      .catch((err) => setError(getErrorMessage(err, 'No se pudieron cargar los módulos.')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Aprende</h1>
          <p className="page-subtitle">
            Módulos de educación ambiental para reciclar mejor.
          </p>
        </div>
      </header>

      {loading && <p className="muted">Cargando…</p>}
      {error && <p className="auth-error">{error}</p>}

      {modules.length > 0 && (
        <div className="modules-grid">
          {modules.map((mod) => (
            <Link to={`/aprende/${mod.id}`} key={mod.id} className="module-card">
              <div className="module-top">
                <h3 className="module-title">{mod.title}</h3>
                {mod.completed && <span className="module-done">Completado</span>}
              </div>
              <p className="module-desc">{mod.description}</p>
              <span className="module-meta">{mod.estimatedMinutes} min de lectura</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
