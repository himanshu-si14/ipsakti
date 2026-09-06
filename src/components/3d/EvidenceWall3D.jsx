import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';
import { FlaskConical, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export default function EvidenceWall3D({ evidenceList = [], onSelectEvidence = null, className = '' }) {
  const canvasRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeEv = evidenceList[activeIdx] || evidenceList[0];

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera }) => {
      camera.position.set(0, 0, 5.0);

      const ambLight = new THREE.AmbientLight(0xfffaed, 1.8);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xfff3d6, 2.0);
      dirLight.position.set(4, 5, 4);
      scene.add(dirLight);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // Layered 3D Document Slabs
      const cardMeshes = [];
      const count = Math.min(evidenceList.length, 7);

      for (let i = 0; i < count; i++) {
        const cGroup = new THREE.Group();
        const zOffset = -i * 0.35;
        const xOffset = (i - count / 2) * 0.45;
        cGroup.position.set(xOffset, 0, zOffset);
        cGroup.userData = { index: i };

        // Document Slab
        const docGeo = new THREE.BoxGeometry(1.5, 2.0, 0.05);
        const docMat = new THREE.MeshStandardMaterial({
          color: 0xfdfaf3,
          metalness: 0.1,
          roughness: 0.8,
        });
        const docMesh = new THREE.Mesh(docGeo, docMat);
        cGroup.add(docMesh);

        // Gold top band
        const bandGeo = new THREE.BoxGeometry(1.5, 0.2, 0.06);
        const bandMat = new THREE.MeshStandardMaterial({
          color: i === 0 ? 0xc8961e : 0x1b4332,
          metalness: 0.6,
          roughness: 0.3,
        });
        const bandMesh = new THREE.Mesh(bandGeo, bandMat);
        bandMesh.position.set(0, 0.9, 0.01);
        cGroup.add(bandMesh);

        rootGroup.add(cGroup);
        cardMeshes.push(cGroup);
      }

      return {
        animate: ({ mouse, reducedMotion }) => {
          if (reducedMotion) return;

          rootGroup.rotation.y = mouse.x * 0.25;
          rootGroup.rotation.x = -mouse.y * 0.15;

          // Focal shift based on active card
          cardMeshes.forEach((cg, idx) => {
            const isSelected = idx === activeIdx;
            const targetZ = isSelected ? 0.6 : -(idx * 0.35);
            cg.position.z += (targetZ - cg.position.z) * 0.1;
            const targetScale = isSelected ? 1.15 : 0.95;
            cg.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
          });
        },
      };
    },
    { alpha: true, enableParallax: true }
  );

  return (
    <div
      className={`evidence-wall-3d ${className}`}
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
            3D Evidence Archive
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
            Layered Evidence Wall
          </h3>
        </div>
        <span className="badge badge-verified" style={{ fontSize: '10px' }}>
          7 Authoritative Records Ingested
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--space-6)', alignItems: 'center' }}>
        {/* 3D Wall Canvas */}
        <div style={{ position: 'relative', height: '260px', width: '100%' }}>
          <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D Layered Evidence Wall" />
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '10px',
              color: 'var(--color-text-light)',
              pointerEvents: 'none',
            }}
          >
            Focal depth represents citation relevance
          </div>
        </div>

        {/* Selected Evidence Inspector */}
        {activeEv && (
          <div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
              {evidenceList.slice(0, 6).map((ev, i) => (
                <button
                  key={ev.id}
                  onClick={() => {
                    setActiveIdx(i);
                    if (typeof onSelectEvidence === 'function') onSelectEvidence(ev);
                  }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: activeIdx === i ? 'var(--color-primary)' : 'white',
                    color: activeIdx === i ? 'white' : 'var(--color-text)',
                    border: `1px solid ${activeIdx === i ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Source {i + 1}
                </button>
              ))}
            </div>

            <div style={{ background: 'white', padding: '16px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-sage)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {activeEv.source} · {activeEv.provision}
                </span>
                <span className={`badge ${activeEv.strength === 'High' ? 'badge-verified' : 'badge-review'}`} style={{ fontSize: '10px' }}>
                  {activeEv.strength} Confidence
                </span>
              </div>

              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px', lineHeight: 1.4 }}>
                "{activeEv.claim}"
              </div>

              <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                <span><strong>Authority:</strong> {activeEv.authority}</span>
                <span><strong>Date:</strong> {activeEv.date}</span>
                <span><strong>Status:</strong> {activeEv.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
