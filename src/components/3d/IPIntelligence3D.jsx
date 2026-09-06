import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';
import { Shield, Tag, Star, Copyright, MapPin, Lock } from 'lucide-react';

const IP_BRANCHES = [
  { id: 'patent', label: 'Patent', icon: Shield, angle: 0, status: 'Review Required', color: '#1B4332', desc: 'Assess potential process & formulation claims against Section 3(p) TK bar' },
  { id: 'trademark', label: 'Trademark', icon: Tag, angle: Math.PI / 3, status: 'In Progress', color: '#2d6a4f', desc: 'Protect brand names Herbal-X and proprietary product identifiers' },
  { id: 'design', label: 'Design', icon: Star, angle: (2 * Math.PI) / 3, status: 'Assessment Required', color: '#52796F', desc: 'Protect unique dispenser, bottle shape, or novel delivery device' },
  { id: 'copyright', label: 'Copyright', icon: Copyright, angle: Math.PI, status: 'Not Applicable', color: '#84a98c', desc: 'Packaging artwork, instructional manuals, and educational literature' },
  { id: 'gi', label: 'GI Tag', icon: MapPin, angle: (4 * Math.PI) / 3, status: 'Not Applicable', color: '#C8961E', desc: 'Geographical Indication not applicable due to multi-state ingredient sourcing' },
  { id: 'trade-secret', label: 'Trade Secret', icon: Lock, angle: (5 * Math.PI) / 3, status: 'Assessment Required', color: '#92400e', desc: 'Confidential extraction parameters, solvent ratios, and temperature protocols' },
];

export default function IPIntelligence3D({ activeType = 'patent', onSelectType, className = '' }) {
  const canvasRef = useRef(null);
  const [hoveredBranch, setHoveredBranch] = useState(IP_BRANCHES[0]);
  const currentBranch = IP_BRANCHES.find((b) => b.id === activeType) || IP_BRANCHES[0];

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera, canvas }) => {
      camera.position.set(0, 0, 5.8);

      const ambLight = new THREE.AmbientLight(0xfffaed, 1.8);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xfff3d6, 2.0);
      dirLight.position.set(4, 5, 4);
      scene.add(dirLight);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // Central Hub: YOUR INNOVATION
      const centerGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.22, 32);
      centerGeo.rotateX(Math.PI / 2);
      const centerMat = new THREE.MeshStandardMaterial({
        color: 0x1b4332,
        roughness: 0.3,
        metalness: 0.4,
      });
      const centerMesh = new THREE.Mesh(centerGeo, centerMat);
      rootGroup.add(centerMesh);

      // Center gold ring
      const centerRingGeo = new THREE.TorusGeometry(0.72, 0.02, 16, 48);
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xc8961e, metalness: 0.8, roughness: 0.2 });
      const centerRing = new THREE.Mesh(centerRingGeo, goldMat);
      rootGroup.add(centerRing);

      // 6 Branch Nodes
      const branchMeshes = [];
      const branchRadius = 2.1;

      IP_BRANCHES.forEach((b) => {
        const bGroup = new THREE.Group();
        const x = Math.cos(b.angle) * branchRadius;
        const y = Math.sin(b.angle) * branchRadius;
        bGroup.position.set(x, y, 0);
        bGroup.userData = { branchId: b.id };

        // Cylindrical coin node
        const nodeGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.16, 24);
        nodeGeo.rotateX(Math.PI / 2);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(b.color),
          metalness: 0.4,
          roughness: 0.3,
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        bGroup.add(nodeMesh);

        // Node gold ring
        const nodeRingGeo = new THREE.TorusGeometry(0.44, 0.015, 16, 32);
        const nodeRing = new THREE.Mesh(nodeRingGeo, goldMat);
        bGroup.add(nodeRing);

        // Spoke line connecting to center
        const spokeGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(x * 0.82, y * 0.82, 0),
        ]);
        const spokeMat = new THREE.LineBasicMaterial({ color: 0xc8961e, transparent: true, opacity: 0.35 });
        const spoke = new THREE.Line(spokeGeo, spokeMat);
        rootGroup.add(spoke);

        rootGroup.add(bGroup);
        branchMeshes.push(bGroup);
      });

      return {
        animate: ({ elapsedTime, mouse, reducedMotion }) => {
          if (reducedMotion) return;

          centerRing.rotation.z = elapsedTime * 0.4;
          rootGroup.rotation.y = mouse.x * 0.3;
          rootGroup.rotation.x = -mouse.y * 0.2;

          // Lift active branch node toward viewer
          branchMeshes.forEach((bg) => {
            const isSelected = bg.userData.branchId === activeType;
            const targetZ = isSelected ? 0.4 : 0.0;
            bg.position.z += (targetZ - bg.position.z) * 0.1;
            const targetScale = isSelected ? 1.15 : 1.0;
            bg.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
          });
        },
      };
    },
    { alpha: true, enableParallax: true }
  );

  return (
    <div
      className={`ip-intelligence-3d ${className}`}
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
            3D IP Topology Explorer
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
            Interactive Intellectual Property Pathways
          </h3>
        </div>
        <span className="badge badge-verified" style={{ fontSize: '10px' }}>
          6 Protection Regimes Analyzed
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', alignItems: 'center' }}>
        {/* 3D Hub Canvas */}
        <div style={{ position: 'relative', height: '280px', width: '100%' }}>
          <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D IP Pathways Topology" />
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
              HERBAL-X
            </div>
          </div>
        </div>

        {/* Pathway Details & Selection */}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'var(--space-4)' }}>
            {IP_BRANCHES.map((b) => {
              const Icon = b.icon;
              const isSelected = activeType === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setHoveredBranch(b);
                    if (typeof onSelectType === 'function') onSelectType(b.id);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: isSelected ? b.color : 'white',
                    color: isSelected ? 'white' : 'var(--color-text)',
                    border: `1px solid ${isSelected ? b.color : 'var(--color-border-light)'}`,
                    fontSize: '11px',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={12} />
                  {b.label}
                </button>
              );
            })}
          </div>

          <div style={{ background: 'white', padding: '16px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: currentBranch.color, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <currentBranch.icon size={16} />
                {currentBranch.label} Assessment
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: currentBranch.status === 'Review Required' ? '#fef3c7' : '#f0fdf4',
                  color: currentBranch.status === 'Review Required' ? '#92400e' : '#166534',
                }}
              >
                {currentBranch.status}
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
              {currentBranch.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
