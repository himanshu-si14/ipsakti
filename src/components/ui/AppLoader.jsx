import { useState, useEffect } from 'react';

export default function AppLoader({ onComplete }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        if (typeof onComplete === 'function') onComplete();
      }, 400);
    }, 900);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#FDFAF3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
        opacity: fading ? 0 : 1,
        visibility: fading ? 'hidden' : 'visible',
      }}
      role="status"
      aria-live="polite"
    >
      {/* Botanical emblem pulse */}
      <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 24 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid var(--color-accent)',
            animation: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
            opacity: 0.75,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 8,
            borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent)',
            fontSize: '22px',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            boxShadow: '0 8px 24px rgba(27,67,50,0.2)',
          }}
        >
          IP
        </div>
      </div>

      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em', marginBottom: 6 }}>
        IP-SAKTI <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Sahayak</span>
      </div>

      <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
        Preparing your innovation workspace...
      </div>
    </div>
  );
}
