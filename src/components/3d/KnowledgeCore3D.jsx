import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';

const LAYERS = [
  { id: 'core', name: 'Traditional Knowledge Core', desc: 'Classical Ayurvedic foundations & documented heritage', color: '#1B4332', accent: '#C8961E', radius: 0.9 },
  { id: 'ring1', name: 'Botanical Ingredients', desc: 'Biological resources & botanical profiling (Ashwagandha, Brahmi...)', color: '#2d6a4f', accent: '#52796F', radius: 1.4, tiltX: 0.25, tiltY: 0.1 },
  { id: 'ring2', name: 'Intellectual Property', desc: 'Patentability, Section 3(p) screening, trademark & design pathways', color: '#C8961E', accent: '#e8b44a', radius: 1.85, tiltX: -0.35, tiltY: 0.2 },
  { id: 'ring3', name: 'Regulatory Intelligence', desc: 'FSSAI, Ministry of Ayush, CDSCO standards & compliance mandates', color: '#92400e', accent: '#d97706', radius: 2.3, tiltX: 0.4, tiltY: -0.25 },
  { id: 'ring4', name: 'Jurisdiction & ABS', desc: 'State Biodiversity Boards, NBA access approvals & benefit-sharing', color: '#276749', accent: '#40916c', radius: 2.75, tiltX: -0.2, tiltY: 0.4 },
  { id: 'ring5', name: 'Market Access', desc: 'India, EU Novel Foods, US FDA NDI, and Middle East commercialization', color: '#1e40af', accent: '#3b82f6', radius: 3.2, tiltX: 0.3, tiltY: 0.15 },
];

export default function KnowledgeCore3D({ className = '', onSelectLayer = null }) {
  const canvasRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState(LAYERS[0]);
  const [isHovered, setIsHovered] = useState(false);

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera, renderer, canvas }) => {
      camera.position.set(0, 0, 7.2);

      // Main root group
      const mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // Soft natural studio lighting
      const ambientLight = new THREE.AmbientLight(0xfffaed, 1.8);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xfff3d6, 2.2);
      keyLight.position.set(5, 6, 6);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x52796f, 1.2);
      fillLight.position.set(-5, -4, -3);
      scene.add(fillLight);

      const goldLight = new THREE.PointLight(0xc8961e, 2.5, 10);
      goldLight.position.set(0, 0, 1.5);
      scene.add(goldLight);

      // 1. Central Core Sphere (Ayurvedic Knowledge)
      const coreGroup = new THREE.Group();
      coreGroup.userData = { layerId: 'core' };
      mainGroup.add(coreGroup);

      // Inner glowing nucleus
      const coreGeo = new THREE.SphereGeometry(0.85, 36, 36);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x1b4332,
        roughness: 0.35,
        metalness: 0.25,
        emissive: 0x0f2b1f,
        emissiveIntensity: 0.4,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreGroup.add(coreMesh);

      // Core Botanical Wireframe / Lattice
      const latticeGeo = new THREE.IcosahedronGeometry(0.92, 2);
      const latticeMat = new THREE.MeshBasicMaterial({
        color: 0xc8961e,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
      coreGroup.add(latticeMesh);

      // Inner Core Leaf Points
      const leafCount = 28;
      const leafGeo = new THREE.BufferGeometry();
      const leafPos = new Float32Array(leafCount * 3);
      for (let i = 0; i < leafCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / leafCount);
        const theta = Math.sqrt(leafCount * Math.PI) * phi;
        leafPos[i * 3] = 0.95 * Math.cos(theta) * Math.sin(phi);
        leafPos[i * 3 + 1] = 0.95 * Math.sin(theta) * Math.sin(phi);
        leafPos[i * 3 + 2] = 0.95 * Math.cos(phi);
      }
      leafGeo.setAttribute('position', new THREE.BufferAttribute(leafPos, 3));
      const leafMat = new THREE.PointsMaterial({
        color: 0xe8b44a,
        size: 0.08,
        transparent: true,
        opacity: 0.85,
      });
      const leafPoints = new THREE.Points(leafGeo, leafMat);
      coreGroup.add(leafPoints);

      // 2. Concentric Knowledge Rings
      const ringMeshes = [];
      const nodeMeshes = [];
      const raycastTargets = [coreMesh];

      LAYERS.slice(1).forEach((layer, idx) => {
        const ringGroup = new THREE.Group();
        ringGroup.rotation.x = layer.tiltX || 0;
        ringGroup.rotation.y = layer.tiltY || 0;
        ringGroup.userData = { layerId: layer.id };

        // Tube ring geometry
        const tubeGeo = new THREE.TorusGeometry(layer.radius, 0.018, 16, 100);
        const tubeMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(layer.color),
          roughness: 0.4,
          metalness: 0.5,
          transparent: true,
          opacity: 0.65,
        });
        const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
        tubeMesh.userData = { layerId: layer.id, originalColor: layer.color, accentColor: layer.accent };
        ringGroup.add(tubeMesh);
        ringMeshes.push(tubeMesh);
        raycastTargets.push(tubeMesh);

        // Orbital Data Nodes on each ring
        const nodesOnRing = 4 + idx;
        for (let n = 0; n < nodesOnRing; n++) {
          const angle = (n / nodesOnRing) * Math.PI * 2;
          const nodeGeo = new THREE.SphereGeometry(0.065 + idx * 0.008, 16, 16);
          const nodeMat = new THREE.MeshStandardMaterial({
            color: 0xc8961e,
            emissive: 0x8b5e08,
            emissiveIntensity: 0.5,
            metalness: 0.8,
            roughness: 0.2,
          });
          const node = new THREE.Mesh(nodeGeo, nodeMat);
          node.position.x = Math.cos(angle) * layer.radius;
          node.position.y = Math.sin(angle) * layer.radius;
          node.userData = { layerId: layer.id, angle, radius: layer.radius, ringGroup };
          ringGroup.add(node);
          nodeMeshes.push(node);
          raycastTargets.push(node);

          // Subtle radial connecting line from node to inner core
          const lineMat = new THREE.LineBasicMaterial({
            color: 0xc8961e,
            transparent: true,
            opacity: 0.15,
          });
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(node.position.x * 0.8, node.position.y * 0.8, 0),
          ]);
          const connectLine = new THREE.Line(lineGeo, lineMat);
          ringGroup.add(connectLine);
        }

        mainGroup.add(ringGroup);
      });

      // Raycaster for hover detection
      const raycaster = new THREE.Raycaster();
      const mouseVec = new THREE.Vector2();
      let currentHoverId = 'core';

      const handleCanvasPointerMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouseVec, camera);
        const intersects = raycaster.intersectObjects(raycastTargets, true);

        if (intersects.length > 0) {
          const hitObj = intersects[0].object;
          const targetId = hitObj.userData?.layerId || 'core';
          if (targetId !== currentHoverId) {
            currentHoverId = targetId;
            const found = LAYERS.find((l) => l.id === targetId) || LAYERS[0];
            setActiveLayer(found);
            setIsHovered(true);
            if (typeof onSelectLayer === 'function') onSelectLayer(found);
          }
        }
      };

      canvas.addEventListener('mousemove', handleCanvasPointerMove, { passive: true });

      return {
        animate: ({ elapsedTime, mouse, reducedMotion }) => {
          if (reducedMotion) return;

          // Parallax camera rotation
          mainGroup.rotation.y = mouse.x * 0.45 + elapsedTime * 0.06;
          mainGroup.rotation.x = -mouse.y * 0.35 + Math.sin(elapsedTime * 0.4) * 0.05;

          // Gentle core breathing
          const breathe = 1 + Math.sin(elapsedTime * 1.4) * 0.035;
          coreGroup.scale.set(breathe, breathe, breathe);
          latticeMesh.rotation.y += 0.003;
          latticeMesh.rotation.x += 0.002;

          // Counter-rotating rings
          ringMeshes.forEach((rm, i) => {
            const dir = i % 2 === 0 ? 1 : -1;
            rm.parent.rotation.z += 0.002 * dir;

            // Highlight ring if active
            const isSelected = rm.userData.layerId === currentHoverId;
            if (isSelected) {
              rm.material.color.set(rm.userData.accentColor);
              rm.material.opacity = 0.95;
            } else {
              rm.material.color.set(rm.userData.originalColor);
              rm.material.opacity = 0.55;
            }
          });
        },
        onDestroy: () => {
          canvas.removeEventListener('mousemove', handleCanvasPointerMove);
        },
      };
    },
    { alpha: true, enableParallax: true, fov: 42 }
  );

  return (
    <div
      className={`knowledge-core-3d-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '440px',
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas3D
        canvasRef={canvasRef}
        hasWebGL={hasWebGL}
        ariaLabel="Ayurvedic Innovation Knowledge Core 3D"
        fallback={
          <div className="knowledge-core-fallback">
            <div style={{ width: 140, height: 140, margin: '0 auto', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid var(--color-accent)', opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', border: '2px solid var(--color-primary)', opacity: 0.6 }} />
              <div style={{ position: 'absolute', inset: 40, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', fontWeight: 800 }}>
                IP-SAKTI
              </div>
            </div>
          </div>
        }
      />

      {/* Floating Glassmorphic Layer Indicator / Tooltip */}
      <div
        className="knowledge-core-tooltip"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(253, 250, 243, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(200, 150, 30, 0.4)',
          borderRadius: 'var(--radius-xl)',
          padding: '12px 20px',
          boxShadow: '0 12px 32px rgba(27, 67, 50, 0.12)',
          pointerEvents: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          maxWidth: '380px',
          width: '90%',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: activeLayer.accent || 'var(--color-accent)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
            }}
          >
            {activeLayer.name}
          </span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4 }}>
          {activeLayer.desc}
        </p>
      </div>

      {/* Layer Navigation Quick Chips */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 5,
        }}
      >
        {LAYERS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setActiveLayer(l)}
            style={{
              background: activeLayer.id === l.id ? 'var(--color-primary)' : 'rgba(253, 250, 243, 0.85)',
              color: activeLayer.id === l.id ? '#ffffff' : 'var(--color-text-muted)',
              border: `1px solid ${activeLayer.id === l.id ? 'var(--color-accent)' : 'var(--color-border-light)'}`,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '10px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(6px)',
              textAlign: 'left',
            }}
          >
            {l.name}
          </button>
        ))}
      </div>
    </div>
  );
}
