import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';
import { ListChecks, Clock, ChevronRight } from 'lucide-react';

const MILESTONES = [
  { id: '30', label: '30 Days', title: 'Classification & Prior Art Intake', color: '#9b1c1c', desc: 'Confirm nutraceutical vs APM classification and initiate authorized TKDL search.', count: 4 },
  { id: '60', label: '60 Days', title: 'ABS Filings & IP Structuring', color: '#C8961E', desc: 'Complete National Biodiversity Authority filings and assess Section 3(p) claims.', count: 4 },
  { id: '90', label: '90 Days', title: 'Registration & International Dossier', color: '#1B4332', desc: 'Submit FSSAI / Ayush applications and prepare EU Novel Food preliminary files.', count: 4 },
];

export default function ActionTimeline3D({ activePeriod = '30', onSelectPeriod, className = '' }) {
  const canvasRef = useRef(null);

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera }) => {
      camera.position.set(0, 0, 4.5);

      const ambLight = new THREE.AmbientLight(0xfffaed, 1.8);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xfff3d6, 2.0);
      dirLight.position.set(3, 4, 3);
      scene.add(dirLight);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // 3 Milestone Polyhedrons
      const pillars = [];
      MILESTONES.forEach((m, idx) => {
        const x = (idx - 1) * 1.8;
        const pGroup = new THREE.Group();
        pGroup.position.set(x, 0, 0);

        const geo = new THREE.CylinderGeometry(0.4, 0.45, 1.4, 6);
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(m.color),
          metalness: 0.5,
          roughness: 0.25,
        });
        const mesh = new THREE.Mesh(geo, mat);
        pGroup.add(mesh);

        // Gold Ring
        const ringGeo = new THREE.TorusGeometry(0.52, 0.02, 12, 24);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0xc8961e, metalness: 0.8, roughness: 0.2 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        pGroup.add(ring);

        rootGroup.add(pGroup);
        pillars.push({ mesh: pGroup, id: m.id });
      });

      return {
        animate: ({ elapsedTime, mouse, reducedMotion }) => {
          if (reducedMotion) return;

          rootGroup.rotation.y = mouse.x * 0.25;
          pillars.forEach((p, idx) => {
            p.mesh.rotation.y = elapsedTime * 0.4 + idx;
            const isSelected = p.id === activePeriod;
            const targetY = isSelected ? 0.2 : 0;
            p.mesh.position.y += (targetY - p.mesh.position.y) * 0.1;
          });
        },
      };
    },
    { alpha: true, enableParallax: true }
  );

  return (
    <div
      className={`action-timeline-3d ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(27,67,50,0.04), rgba(200,150,30,0.04))',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-8)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
            3D Implementation Roadmap
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
            Milestone Horizon Progression
          </h3>
        </div>
        <span className="badge badge-verified" style={{ fontSize: '10px' }}>
          12 Critical Action Items
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--space-6)', alignItems: 'center' }}>
        <div style={{ position: 'relative', height: '180px', width: '100%' }}>
          <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D Milestone Progression Pillars" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {MILESTONES.map((m) => {
              const isSelected = activePeriod === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => typeof onSelectPeriod === 'function' && onSelectPeriod(m.id)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-lg)',
                    background: isSelected ? m.color : 'white',
                    color: isSelected ? 'white' : 'var(--color-text)',
                    border: `1.5px solid ${isSelected ? m.color : 'var(--color-border-light)'}`,
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {m.label}
                </button>
              );
            })}
          </div>

          {MILESTONES.find((m) => m.id === activePeriod) && (
            <div style={{ background: 'white', padding: '12px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-light)' }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: 'var(--color-text)', marginBottom: '4px' }}>
                {MILESTONES.find((m) => m.id === activePeriod).title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                {MILESTONES.find((m) => m.id === activePeriod).desc}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
