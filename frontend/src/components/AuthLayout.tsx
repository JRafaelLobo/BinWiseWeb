import type { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

// Marca de la hoja (logo) como SVG, sin emojis.
function LeafMark() {
  return (
    <svg
      className="auth-logo-mark"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 4C9 4 4 10 4 18c0 1 .2 1.8.2 1.8s7.8-.3 12.3-4.8C20.5 11 20 4 20 4Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M5 19C8 13 13 9 18 7"
        stroke="#1b5e20"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Layout de dos columnas: panel de marca a la izquierda, formulario a la derecha.
export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <aside className="auth-brand">
        <div className="auth-brand-content">
          <div className="auth-logo">
            <LeafMark />
            <span className="auth-logo-text">BinWise</span>
          </div>
          <h2 className="auth-brand-title">
            Recicla con inteligencia,<br />vive con propósito.
          </h2>
          <p className="auth-brand-text">
            Una plataforma para clasificar tus residuos, registrar tu impacto y
            avanzar hacia un estilo de vida más sostenible.
          </p>
          <ul className="auth-brand-features">
            <li>Clasificación de residuos asistida</li>
            <li>Seguimiento de puntos y niveles</li>
            <li>Módulos de educación ambiental</li>
          </ul>
        </div>
      </aside>

      <main className="auth-form-side">
        <div className="auth-card">
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  );
}
