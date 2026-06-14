import { useEffect, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategories } from '../api/waste';
import { registerRecycling } from '../api/recycling';
import { getErrorMessage } from '../api/errors';
import type { WasteCategory } from '../types';

interface PrefillState {
  wasteName?: string;
  categoryId?: number;
}

export function RegisterRecycling() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefill = (location.state as PrefillState | null) ?? {};

  const [categories, setCategories] = useState<WasteCategory[]>([]);
  const [wasteName, setWasteName] = useState(prefill.wasteName ?? '');
  const [categoryId, setCategoryId] = useState<number | ''>(
    prefill.categoryId ?? '',
  );
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) =>
        setError(getErrorMessage(err, 'No se pudieron cargar las categorías.')),
      );
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (categoryId === '') {
      setError('Selecciona una categoría.');
      return;
    }

    setSubmitting(true);
    try {
      const record = await registerRecycling({
        wasteName,
        categoryId: Number(categoryId),
        quantity,
        notes: notes || undefined,
      });
      setSuccess(`¡Reciclaje registrado! Ganaste ${record.pointsEarned} puntos.`);
      // Tras un breve momento, vamos al historial.
      setTimeout(() => navigate('/historial'), 1200);
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo registrar el reciclaje.'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page page-narrow">
      <header className="page-header">
        <div>
          <h1 className="page-title">Registrar reciclaje</h1>
          <p className="page-subtitle">
            Anota lo que reciclaste y suma puntos.
          </p>
        </div>
      </header>

      <div className="card">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="wasteName">Nombre del residuo</label>
            <input
              id="wasteName"
              type="text"
              placeholder="Ej. Botella plástica"
              value={wasteName}
              onChange={(e) => setWasteName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value ? Number(e.target.value) : '')
              }
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="quantity">Cantidad</label>
            <input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="notes">Notas (opcional)</label>
            <textarea
              id="notes"
              rows={3}
              placeholder="Ej. Botellas limpias recicladas en casa."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Registrando…' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
