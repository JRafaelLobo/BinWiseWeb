import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getModuleById } from '../api/education';
import { getErrorMessage } from '../api/errors';
import type { EducationModuleDetail } from '../types';

export function EducationDetail() {
  const { id } = useParams<{ id: string }>();
  const [module, setModule] = useState<EducationModuleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getModuleById(Number(id))
      .then(setModule)
      .catch((err) => setError(getErrorMessage(err, 'No se pudo cargar el módulo.')))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="page page-narrow">
      <Link to="/aprende" className="back-link">
        ← Volver a módulos
      </Link>

      {loading && <p className="muted">Cargando…</p>}
      {error && <p className="auth-error">{error}</p>}

      {module && (
        <article className="card module-article">
          <h1 className="page-title">{module.title}</h1>
          <span className="module-meta">{module.estimatedMinutes} min de lectura</span>
          <p className="module-article-desc">{module.description}</p>
          <hr className="module-divider" />
          <p className="module-content">{module.content}</p>
        </article>
      )}
    </div>
  );
}
