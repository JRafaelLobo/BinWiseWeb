import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { classifyWaste } from '../api/waste';
import { getErrorMessage } from '../api/errors';
import type { ClassifyResponse } from '../types';

export function ClassifyWaste() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [result, setResult] = useState<ClassifyResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setResult(null);
    setError('');
    setPreview(selected ? URL.createObjectURL(selected) : '');
  }

  async function handleClassify() {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const res = await classifyWaste(file);
      setResult(res);
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo clasificar la imagen.'));
    } finally {
      setLoading(false);
    }
  }

  function goToRegister() {
    if (!result) return;
    // Pre-llenamos el formulario de registro con el resultado de la clasificación.
    navigate('/registrar', {
      state: {
        wasteName: result.wasteName,
        categoryId: result.category.id,
      },
    });
  }

  return (
    <div className="page page-narrow">
      <header className="page-header">
        <div>
          <h1 className="page-title">Clasificar residuo</h1>
          <p className="page-subtitle">
            Sube una foto del residuo para identificar su categoría.
          </p>
        </div>
      </header>

      <div className="card">
        <label className="upload-box">
          {preview ? (
            <img src={preview} alt="Vista previa" className="upload-preview" />
          ) : (
            <span className="upload-hint">
              Haz clic para seleccionar una imagen
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button
          className="btn-primary"
          onClick={handleClassify}
          disabled={!file || loading}
        >
          {loading ? 'Analizando…' : 'Clasificar'}
        </button>
      </div>

      {result && (
        <div className="card result-card">
          <h2 className="result-title">Resultado</h2>
          <div className="result-row">
            <span className="result-label">Residuo</span>
            <span className="result-value">{result.wasteName}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Categoría</span>
            <span
              className="category-chip"
              style={{
                background: result.category.color ?? 'var(--green-50)',
              }}
            >
              {result.category.name}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Confianza</span>
            <span className="result-value">
              {Math.round(result.confidence * 100)}%
            </span>
          </div>
          <p className="result-recommendation">{result.recommendation}</p>
          <button className="btn-primary" onClick={goToRegister}>
            Registrar este reciclaje
          </button>
        </div>
      )}
    </div>
  );
}
