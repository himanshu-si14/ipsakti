import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';
import { Leaf, AlertTriangle, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

const BOTANICAL_MODELS = [
  {
    id: 'ashwagandha',
    commonName: 'Ashwagandha',
    botanicalName: 'Withania somnifera',
    family: 'Solanaceae',
    traditionalBasis: 'Charaka Samhita — Balya Gana, Rasayana',
    source: 'Cultivated — Rajasthan',
    tkRisk: 'High',
    biological: true,
    color: '#2d6a4f',
    accentColor: '#C8961E',
    type: 'root',
  },
  {
    id: 'brahmi',
    commonName: 'Brahmi',
    botanicalName: 'Bacopa monnieri',
    family: 'Plantaginaceae',
    traditionalBasis: 'Charaka Samhita — Medhya Rasayana',
    source: 'Wild-collected — Bihar',
    tkRisk: 'High',
    biological: true,
    color: '#40916c',
    accentColor: '#52796F',
    type: 'leaf',
  },
  {
    id: 'shatavari',
    commonName: 'Shatavari',
    botanicalName: 'Asparagus racemosus',
    family: 'Asparagaceae',
    traditionalBasis: 'Sushruta Samhita — Vitalya Gana',
    source: 'Cultivated — Uttarakhand',
    tkRisk: 'Medium',
    biological: true,
    color: '#52796F',
    accentColor: '#84a98c',
    type: 'tuber',
  },
  {
    id: 'pepper',
    commonName: 'Black Pepper',
    botanicalName: 'Piper nigrum',
    family: 'Piperaceae',
    traditionalBasis: 'Trikatu formulation component',
    source: 'Cultivated — Kerala',
    tkRisk: 'Low',
    biological: true,
    color: '#1B4332',
    accentColor: '#C8961E',
    type: 'berry',
  },
];

export default function IngredientVisualizer3D({ className = '', onSelect = null }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = BOTANICAL_MODELS[selectedIdx];
  const canvasRef = useRef(null);
  const modelGroupRef = useRef(null);

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera }) => {
      camera.position.set(0, 0, 4.2);

      const ambLight = new THREE.AmbientLight(0xfffaed, 1.8);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xfff3d6, 2.0);
      dirLight.position.set(3, 4, 3);
      scene.add(dirLight);

      const backLight = new THREE.DirectionalLight(0x52796f, 1.2);
      backLight.position.set(-3, -2, -2);
      scene.add(backLight);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);
      modelGroupRef.current = rootGroup;

      return {
        animate: ({ elapsedTime, mouse, reducedMotion }) => {
          if (reducedMotion) return;
          rootGroup.rotation.y = elapsedTime * 0.4 + mouse.x * 0.4;
          rootGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1 - mouse.y * 0.3;
        },
      };
    },
    { alpha: true, enableParallax: true }
  );

  // Build model geometry whenever selected ingredient changes
  useEffect(() => {
    const root = modelGroupRef.current;
    if (!root) return;

    // Clear previous children
    while (root.children.length > 0) {
      const obj = root.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
      root.remove(obj);
    }

    const matMain = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selected.color),
      roughness: 0.35,
      metalness: 0.2,
    });

    const matGold = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selected.accentColor),
      metalness: 0.8,
      roughness: 0.2,
      emissive: new THREE.Color(selected.accentColor),
      emissiveIntensity: 0.3,
    });

    if (selected.type === 'root') {
      // Ashwagandha: Stylized conical root tuber + stem + radiating vitality nodes
      const rootGeo = new THREE.ConeGeometry(0.5, 2.0, 16);
      rootGeo.rotateX(Math.PI);
      const rootMesh = new THREE.Mesh(rootGeo, matMain);
      root.add(rootMesh);

      // Root branchlets
      for (let i = 0; i < 4; i++) {
        const branchGeo = new THREE.CylinderGeometry(0.04, 0.08, 0.8, 8);
        const branch = new THREE.Mesh(branchGeo, matMain);
        branch.position.set(Math.cos((i / 4) * Math.PI * 2) * 0.35, -0.4 - i * 0.2, Math.sin((i / 4) * Math.PI * 2) * 0.35);
        branch.rotation.z = 0.5 * (i % 2 === 0 ? 1 : -1);
        root.add(branch);
      }

      // Golden Vitality Nodes
      for (let i = 0; i < 8; i++) {
        const nodeGeo = new THREE.SphereGeometry(0.06, 12, 12);
        const node = new THREE.Mesh(nodeGeo, matGold);
        node.position.set((Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.2);
        root.add(node);
      }
    } else if (selected.type === 'leaf') {
      // Brahmi: Paired succulent curved oval leaves
      for (let i = 0; i < 6; i++) {
        const leafGeo = new THREE.SphereGeometry(0.35, 16, 16);
        leafGeo.scale(1.2, 0.3, 0.8);
        const leafMesh = new THREE.Mesh(leafGeo, matMain);
        const angle = (i / 6) * Math.PI * 2;
        const height = (i - 2.5) * 0.28;
        leafMesh.position.set(Math.cos(angle) * 0.65, height, Math.sin(angle) * 0.65);
        leafMesh.rotation.y = angle;
        leafMesh.rotation.x = 0.3;
        root.add(leafMesh);
      }

      // Central stem
      const stemGeo = new THREE.CylinderGeometry(0.05, 0.08, 2.2, 12);
      const stem = new THREE.Mesh(stemGeo, matGold);
      root.add(stem);
    } else if (selected.type === 'tuber') {
      // Shatavari: Clustered slender root tubers
      for (let i = 0; i < 8; i++) {
        const tuberGeo = new THREE.CylinderGeometry(0.08, 0.16, 1.8, 12);
        const tuber = new THREE.Mesh(tuberGeo, matMain);
        const angle = (i / 8) * Math.PI * 2;
        tuber.position.set(Math.cos(angle) * 0.45, -0.2, Math.sin(angle) * 0.45);
        tuber.rotation.z = Math.sin(angle) * 0.3;
        tuber.rotation.x = Math.cos(angle) * 0.3;
        root.add(tuber);
      }
      const crownGeo = new THREE.SphereGeometry(0.25, 16, 16);
      const crown = new THREE.Mesh(crownGeo, matGold);
      crown.position.y = 0.8;
      root.add(crown);
    } else {
      // Black Pepper: Curved vine spike with glistening peppercorns
      const vineCurve = new THREE.CylinderGeometry(0.06, 0.08, 2.4, 12);
      const vine = new THREE.Mesh(vineCurve, matMain);
      root.add(vine);

      for (let i = 0; i < 18; i++) {
        const berryGeo = new THREE.SphereGeometry(0.12, 12, 12);
        const berry = new THREE.Mesh(berryGeo, matGold);
        const angle = i * 0.8;
        const y = (i / 18) * 2.0 - 1.0;
        berry.position.set(Math.cos(angle) * 0.28, y, Math.sin(angle) * 0.28);
        root.add(berry);
      }
    }
  }, [selectedIdx]);

  return (
    <div
      className={`ingredient-visualizer-3d ${className}`}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-6)',
        boxShadow: '0 8px 30px rgba(27,67,50,0.06)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-sage)' }}>
            3D Botanical Intelligence
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
            Botanical Resource Visualizer
          </h3>
        </div>

        {/* Botanical Selector Tabs */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {BOTANICAL_MODELS.map((bot, i) => (
            <button
              key={bot.id}
              onClick={() => {
                setSelectedIdx(i);
                if (typeof onSelect === 'function') onSelect(bot);
              }}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${selectedIdx === i ? bot.color : 'var(--color-border-light)'}`,
                background: selectedIdx === i ? bot.color : 'white',
                color: selectedIdx === i ? 'white' : 'var(--color-text)',
                fontSize: '11px',
                fontWeight: selectedIdx === i ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {bot.commonName}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-6)', alignItems: 'center' }}>
        {/* 3D Botanical Canvas */}
        <div
          style={{
            position: 'relative',
            height: '240px',
            background: 'linear-gradient(135deg, rgba(27,67,50,0.05), rgba(200,150,30,0.05))',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}
        >
          <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel={`3D Botanical Model of ${selected.commonName}`} />
          <div
            style={{
              position: 'absolute',
              bottom: 6,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '9px',
              color: 'var(--color-text-light)',
              pointerEvents: 'none',
            }}
          >
            Rotate model to inspect morphology
          </div>
        </div>

        {/* Botanical Dossier Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-text)' }}>
                {selected.commonName}
              </span>
              <span style={{ fontSize: 'var(--text-xs)', fontStyle: 'italic', color: 'var(--color-sage)' }}>
                ({selected.botanicalName})
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-light)', marginTop: 2 }}>
              Family: {selected.family}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                background: selected.tkRisk === 'High' ? '#fee2e2' : '#fef3c7',
                color: selected.tkRisk === 'High' ? '#9b1c1c' : '#92400e',
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              <AlertTriangle size={12} />
              TK Prior-Art Risk: {selected.tkRisk}
            </span>

            {selected.biological && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#d1fae5',
                  color: '#276749',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                <ShieldCheck size={12} />
                NBA / ABS Regulated
              </span>
            )}

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                background: 'white',
                border: '1px solid var(--color-border-light)',
                color: 'var(--color-text-muted)',
                fontSize: '11px',
              }}
            >
              <MapPin size={12} />
              {selected.source}
            </span>
          </div>

          <div style={{ background: 'white', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-light)', marginBottom: 2 }}>
              Classical Ayurvedic Basis
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
              {selected.traditionalBasis}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
