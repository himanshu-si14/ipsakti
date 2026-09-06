import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';
import { FileText, Shield, Leaf, BookOpen, Globe, FlaskConical, ListChecks } from 'lucide-react';

const CHAPTERS = [
  { id: 'classification', label: 'Classification', icon: FileText, color: '#2d6a4f' },
  { id: 'ip', label: 'IP Landscape', icon: Shield, color: '#C8961E' },
  { id: 'tk', label: 'Traditional Knowledge', icon: Leaf, color: '#40916c' },
  { id: 'abs', label: 'Biodiversity / ABS', icon: Leaf, color: '#276749' },
  { id: 'regulatory', label: 'Regulatory Pathway', icon: BookOpen, color: '#92400e' },
  { id: 'market', label: 'Market Access', icon: Globe, color: '#1e40af' },
  { id: 'evidence', label: 'Evidence', icon: FlaskConical, color: '#52796F' },
  { id: 'action', label: 'Action Plan', icon: ListChecks, color: '#1B4332' },
];

export default function Passport3D({ product, onSelectChapter = null, className = '' }) {
  const canvasRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState('classification');
  const passportMeshRef = useRef(null);

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera }) => {
      camera.position.set(0, 0, 4.8);

      // Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xfffaed, 1.6);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xfff5e6, 2.0);
      dirLight.position.set(4, 5, 4);
      scene.add(dirLight);

      const fillLight = new THREE.DirectionalLight(0x52796f, 1.0);
      fillLight.position.set(-4, -2, 2);
      scene.add(fillLight);

      // Root Passport Group
      const passportGroup = new THREE.Group();
      passportGroup.position.set(0, 0.1, 0);
      passportGroup.rotation.set(0.15, -0.3, 0);
      scene.add(passportGroup);
      passportMeshRef.current = passportGroup;

      // 1. Passport Cover (Deep Forest Green Leather with rounded corners)
      const coverWidth = 2.4;
      const coverHeight = 3.2;
      const coverThickness = 0.12;
      const coverGeo = new THREE.BoxGeometry(coverWidth, coverHeight, coverThickness);
      const coverMat = new THREE.MeshStandardMaterial({
        color: 0x1b4332,
        roughness: 0.45,
        metalness: 0.15,
      });
      const coverMesh = new THREE.Mesh(coverGeo, coverMat);
      passportGroup.add(coverMesh);

      // 2. Gold Foil Emblem Ring on Cover
      const ringGeo = new THREE.TorusGeometry(0.55, 0.02, 16, 64);
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xc8961e,
        metalness: 0.85,
        roughness: 0.25,
      });
      const emblemRing = new THREE.Mesh(ringGeo, goldMat);
      emblemRing.position.set(0, 0.45, coverThickness / 2 + 0.005);
      passportGroup.add(emblemRing);

      // Inner gold emblem icon
      const innerEmblemGeo = new THREE.IcosahedronGeometry(0.28, 1);
      const innerEmblem = new THREE.Mesh(innerEmblemGeo, goldMat);
      innerEmblem.position.set(0, 0.45, coverThickness / 2 + 0.01);
      passportGroup.add(innerEmblem);

      // Gold Title Strip Geometry
      const stripGeo = new THREE.BoxGeometry(1.6, 0.04, 0.005);
      const titleStrip = new THREE.Mesh(stripGeo, goldMat);
      titleStrip.position.set(0, -0.4, coverThickness / 2 + 0.005);
      passportGroup.add(titleStrip);

      const strip2 = new THREE.BoxGeometry(1.2, 0.03, 0.005);
      const subStrip = new THREE.Mesh(strip2, goldMat);
      subStrip.position.set(0, -0.55, coverThickness / 2 + 0.005);
      passportGroup.add(subStrip);

      // 3. Warm Ivory Inner Pages (Visible page block)
      const pageGeo = new THREE.BoxGeometry(coverWidth - 0.08, coverHeight - 0.08, coverThickness * 0.75);
      const pageMat = new THREE.MeshStandardMaterial({
        color: 0xfdfaf3,
        roughness: 0.8,
        metalness: 0.0,
      });
      const pageBlock = new THREE.Mesh(pageGeo, pageMat);
      pageBlock.position.set(0.04, 0, -0.01);
      passportGroup.add(pageBlock);

      // 4. Soft drop shadow plane
      const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x1b4332,
        transparent: true,
        opacity: 0.12,
      });
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.position.set(0.2, -1.8, -0.5);
      shadow.rotation.x = -Math.PI / 2;
      scene.add(shadow);

      return {
        animate: ({ elapsedTime, mouse, reducedMotion }) => {
          if (reducedMotion) return;

          // Floating bob
          passportGroup.position.y = 0.1 + Math.sin(elapsedTime * 1.5) * 0.06;

          // Smooth interactive tilt toward mouse
          const targetRotY = -0.3 + mouse.x * 0.45;
          const targetRotX = 0.15 - mouse.y * 0.35;
          passportGroup.rotation.y += (targetRotY - passportGroup.rotation.y) * 0.05;
          passportGroup.rotation.x += (targetRotX - passportGroup.rotation.x) * 0.05;

          // Emblem gentle spin
          innerEmblem.rotation.y = elapsedTime * 0.4;
        },
      };
    },
    { alpha: true, enableParallax: true }
  );

  const handleChapterClick = (id) => {
    setActiveChapter(id);
    if (typeof onSelectChapter === 'function') onSelectChapter(id);
    const targetEl = document.getElementById(`section-${id}`) || document.querySelector(`[data-section="${id}"]`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className={`passport-3d-card ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(27,67,50,0.04), rgba(200,150,30,0.04))',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-8)',
        boxShadow: '0 12px 36px rgba(27,67,50,0.06)',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 'var(--space-6)', alignItems: 'center' }}>
        {/* 3D Passport Canvas */}
        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
          <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D Physical Passport Representation" />
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '10px',
              color: 'var(--color-text-light)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            Hover to inspect 3D cover · Drag to rotate
          </div>
        </div>

        {/* Passport Overview & Chapters */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
              Interactive 3D Passport Explorer
            </span>
            <span className="demo-tag" style={{ fontSize: '9px', padding: '2px 6px' }}>Verified Dossier</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-primary)', margin: '0 0 6px' }}>
            {product?.name || 'Ayurvedic Innovation Passport'}
          </h2>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
            An evidence-first structured compliance portfolio integrating classification, patent assessment, biodiversity access agreements, and international market clearance.
          </p>

          {/* Chapter Quick Selector */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {CHAPTERS.map((ch) => {
              const Icon = ch.icon;
              const isSelected = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleChapterClick(ch.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: isSelected ? ch.color : 'white',
                    color: isSelected ? 'white' : 'var(--color-text)',
                    border: `1px solid ${isSelected ? ch.color : 'var(--color-border-light)'}`,
                    fontSize: '11px',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  <Icon size={12} />
                  {ch.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
