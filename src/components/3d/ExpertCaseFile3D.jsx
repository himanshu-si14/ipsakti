import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';
import { Users, FileText, Send, AlertTriangle } from 'lucide-react';

export default function ExpertCaseFile3D({ caseData, onRequestReview, className = '' }) {
  const canvasRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const flapMeshRef = useRef(null);

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera }) => {
      camera.position.set(0, 0, 4.4);

      const ambLight = new THREE.AmbientLight(0xfffaed, 1.8);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xfff3d6, 2.0);
      dirLight.position.set(3, 4, 3);
      scene.add(dirLight);

      const rootGroup = new THREE.Group();
      rootGroup.rotation.set(0.2, -0.2, 0);
      scene.add(rootGroup);

      // Case File Folder (Warm Manila / Kraft Folder with Gold Seal)
      const folderWidth = 2.4;
      const folderHeight = 3.0;

      // Base back cover
      const backGeo = new THREE.BoxGeometry(folderWidth, folderHeight, 0.04);
      const folderMat = new THREE.MeshStandardMaterial({
        color: 0xd4cbbf,
        roughness: 0.65,
        metalness: 0.1,
      });
      const backCover = new THREE.Mesh(backGeo, folderMat);
      rootGroup.add(backCover);

      // Front cover flap that hinges open
      const flapGeo = new THREE.BoxGeometry(folderWidth, folderHeight, 0.04);
      flapGeo.translate(0, 0, 0.05);
      const flapMesh = new THREE.Mesh(flapGeo, folderMat);
      flapMesh.position.set(0, 0, 0.05);
      rootGroup.add(flapMesh);
      flapMeshRef.current = flapMesh;

      // Gold Seal
      const sealGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.06, 24);
      sealGeo.rotateX(Math.PI / 2);
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xc8961e, metalness: 0.85, roughness: 0.2 });
      const seal = new THREE.Mesh(sealGeo, goldMat);
      seal.position.set(0, 0.2, 0.1);
      flapMesh.add(seal);

      return {
        animate: ({ elapsedTime, mouse, reducedMotion }) => {
          if (reducedMotion) return;

          rootGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.05;
          rootGroup.rotation.y = -0.2 + mouse.x * 0.3;
          rootGroup.rotation.x = 0.2 - mouse.y * 0.2;

          // Open flap animation
          const targetRotY = isOpen ? -Math.PI * 0.75 : 0;
          flapMesh.rotation.y += (targetRotY - flapMesh.rotation.y) * 0.08;
        },
      };
    },
    { alpha: true, enableParallax: true }
  );

  return (
    <div
      className={`expert-case-file-3d ${className}`}
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
            3D Expert Escalation Dossier
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
            Case Dossier: {caseData?.id || 'CASE-2026-0042'}
          </h3>
        </div>
        <span className="demo-tag" style={{ fontSize: '10px' }}>
          DEMO WORKFLOW
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--space-6)', alignItems: 'center' }}>
        {/* 3D Folder Canvas */}
        <div style={{ position: 'relative', height: '240px', width: '100%', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
          <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D Physical Case Dossier Folder" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '10px',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'white',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {isOpen ? 'Close 3D Folder' : 'Click to Open Dossier'}
          </button>
        </div>

        {/* Case Summary Preview */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--color-text)' }}>
              Herbal-X Escalation Summary
            </span>
            <span className="badge badge-review" style={{ fontSize: '10px' }}>
              Pending Expert Review
            </span>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '12px' }}>
            Escalation triggers: Section 3(p) traditional knowledge bar assessment, multi-state ABS jurisdiction compliance, and EU Novel Foods classification uncertainty.
          </p>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => typeof onRequestReview === 'function' && onRequestReview()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Send size={13} /> Request Expert Review
          </button>
        </div>
      </div>
    </div>
  );
}
