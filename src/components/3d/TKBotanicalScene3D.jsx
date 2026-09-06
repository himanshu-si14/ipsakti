import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';
import { Leaf, AlertTriangle, Shield, BookOpen, Globe, Scale } from 'lucide-react';

const TK_CLUSTERS = [
  { id: 'tk', label: 'Traditional Knowledge', sub: 'Charaka / Sushruta Samhita', icon: Leaf, color: '#C8961E', angle: 0, detail: 'Documented Ayurvedic textual references indicating prior art under Section 3(p)' },
  { id: 'abs', label: 'Access & Benefit Sharing', sub: 'NBA & State Boards', icon: Scale, color: '#276749', angle: (2 * Math.PI) / 5, detail: 'Mandatory Prior Approval under Biological Diversity Act, 2002 (Sections 3, 6, 7)' },
  { id: 'prior-art', label: 'Prior Art Screening', sub: 'Authorized TKDL Channel', icon: Shield, color: '#92400e', angle: (4 * Math.PI) / 5, detail: 'CSIR-NISCAIR authorized prior-art search protocol for patent applicants' },
  { id: 'jurisdiction', label: 'Resource Jurisdiction', sub: 'RJ · BR · UK · KL', icon: Globe, color: '#52796F', angle: (6 * Math.PI) / 5, detail: 'Multi-state sourcing triggers compliance with respective State Biodiversity Boards' },
  { id: 'evidence', label: 'Legal Evidence', sub: 'BDA 2002 & WIPO GRATK', icon: BookOpen, color: '#1e40af', angle: (8 * Math.PI) / 5, detail: 'Authoritative statutory provisions, official circulars, and treaty disclosure mandates' },
];

export default function TKBotanicalScene3D({ className = '' }) {
  const canvasRef = useRef(null);
  const [selectedCluster, setSelectedCluster] = useState(TK_CLUSTERS[0]);

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera }) => {
      camera.position.set(0, 0, 5.5);

      const ambLight = new THREE.AmbientLight(0xfffaed, 1.8);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xfff3d6, 2.0);
      dirLight.position.set(4, 5, 4);
      scene.add(dirLight);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // Center: Biological Resource Orb
      const centerGeo = new THREE.IcosahedronGeometry(0.75, 2);
      const centerMat = new THREE.MeshStandardMaterial({
        color: 0x1b4332,
        roughness: 0.35,
        metalness: 0.25,
        wireframe: false,
      });
      const centerMesh = new THREE.Mesh(centerGeo, centerMat);
      rootGroup.add(centerMesh);

      // Core Botanical Glow
      const glowGeo = new THREE.SphereGeometry(0.85, 24, 24);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xc8961e,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      rootGroup.add(glowMesh);

      // 5 Clustered Nodes
      const clusterMeshes = [];
      const dist = 2.2;

      TK_CLUSTERS.forEach((c) => {
        const cGroup = new THREE.Group();
        const x = Math.cos(c.angle) * dist;
        const y = Math.sin(c.angle) * dist;
        cGroup.position.set(x, y, 0);

        const nodeGeo = new THREE.SphereGeometry(0.32, 16, 16);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(c.color),
          metalness: 0.5,
          roughness: 0.25,
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        cGroup.add(nodeMesh);

        // Gold Halo
        const haloGeo = new THREE.TorusGeometry(0.4, 0.015, 12, 32);
        const haloMat = new THREE.MeshStandardMaterial({ color: 0xc8961e, metalness: 0.8, roughness: 0.2 });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        cGroup.add(halo);

        // Connecting botanical vine/spline to center
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(x * 0.5, y * 0.5, 0.3),
          new THREE.Vector3(x * 0.85, y * 0.85, 0)
        );
        const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(16));
        const lineMat = new THREE.LineBasicMaterial({ color: 0x40916c, transparent: true, opacity: 0.4 });
        const line = new THREE.Line(lineGeo, lineMat);
        rootGroup.add(line);

        rootGroup.add(cGroup);
        clusterMeshes.push(cGroup);
      });

      return {
        animate: ({ elapsedTime, mouse, reducedMotion }) => {
          if (reducedMotion) return;

          centerMesh.rotation.y = elapsedTime * 0.25;
          glowMesh.rotation.y = -elapsedTime * 0.15;
          rootGroup.rotation.y = mouse.x * 0.3;
          rootGroup.rotation.x = -mouse.y * 0.2;

          clusterMeshes.forEach((cg, idx) => {
            cg.position.z = Math.sin(elapsedTime * 1.5 + idx) * 0.15;
          });
        },
      };
    },
    { alpha: true, enableParallax: true }
  );

  return (
    <div
      className={`tk-botanical-scene-3d ${className}`}
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
            3D Botanical Ecosystem
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
            Biological Resource & Traditional Knowledge Shield
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fffbeb', border: '1px solid #fde68a', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
          <AlertTriangle size={13} style={{ color: '#92400e' }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#78350f' }}>
            Potential TK overlap detected (Sec 3(p) bar)
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 'var(--space-6)', alignItems: 'center' }}>
        {/* 3D Canvas */}
        <div style={{ position: 'relative', height: '280px', width: '100%' }}>
          <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D Botanical Knowledge Scene" />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              BIOLOGICAL RESOURCE
            </div>
          </div>
        </div>

        {/* Cluster Tabs & Details */}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'var(--space-4)' }}>
            {TK_CLUSTERS.map((c) => {
              const Icon = c.icon;
              const isSelected = selectedCluster.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCluster(c)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: isSelected ? c.color : 'white',
                    color: isSelected ? 'white' : 'var(--color-text)',
                    border: `1px solid ${isSelected ? c.color : 'var(--color-border-light)'}`,
                    fontSize: '11px',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={12} />
                  {c.label}
                </button>
              );
            })}
          </div>

          <div style={{ background: 'white', padding: '16px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: selectedCluster.color }}>
                {selectedCluster.label}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-light)', fontWeight: 600 }}>
                {selectedCluster.sub}
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
              {selectedCluster.detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
