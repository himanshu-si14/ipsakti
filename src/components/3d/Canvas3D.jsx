import React from 'react';

export default function Canvas3D({
  canvasRef,
  hasWebGL = true,
  fallback = null,
  className = '',
  style = {},
  children,
  ariaLabel = '3D Interactive Visualization',
}) {
  if (!hasWebGL) {
    return (
      <div
        className={`canvas3d-fallback ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(27,67,50,0.05), rgba(200,150,30,0.05))',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          minHeight: '280px',
          ...style,
        }}
        role="region"
        aria-label={ariaLabel}
      >
        {fallback || (
          <div style={{ textAlign: 'center', color: 'var(--color-sage)' }}>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Interactive 3D Overview</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-light)', marginTop: 4 }}>
              (Visual simplified for your display device)
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`canvas3d-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '200px',
        overflow: 'hidden',
        ...style,
      }}
      role="region"
      aria-label={ariaLabel}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          outline: 'none',
        }}
      />
      {children}
    </div>
  );
}
