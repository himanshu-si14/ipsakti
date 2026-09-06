import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';

const PATHWAY_DATA = {
  aahara: { name: 'Ayurveda Aahara', reg: 'FSSAI + Ayush (Regulations 2022)', ip: 'Process Patent (Sec 3(p) check) + Trademark', color: '#1B4332', x: -1.8 },
  'patent-prop': { name: 'Proprietary (APM)', reg: 'State Drug Authority / Ayush GMP', ip: 'Composition/Process Patent + Trademark', color: '#2d6a4f', x: -1.0 },
  classical: { name: 'Classical Medicine', reg: 'Ministry of Ayush (Schedule T)', ip: 'Trademark Only (TK Prior-Art Bar)', color: '#40916c', x: -0.2 },
  phyto: { name: 'Phytopharmaceutical', reg: 'CDSCO (Phyto Rules 2015)', ip: 'Substantial Patentability + Data Exclusivity', color: '#52796F', x: 0.6 },
  cosmetic: { name: 'Cosmetic', reg: 'CDSCO Cosmetics Rules 2020', ip: 'Design Protection + Trademark', color: '#C8961E', x: 1.4 },
  'new-drug': { name: 'New / Non-Classical', reg: 'CDSCO New Drugs & Clinical Trials', ip: 'Full Compound/Process Patent Pathway', color: '#92400e', x: 2.2 },
};

export default function ClassificationPathway3D({ selectedCategory = 'aahara', onSelectCategory, className = '' }) {
  const canvasRef = useRef(null);
  const activePathGroupRef = useRef(null);
  const targetXRef = useRef(-1.8);

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera }) => {
      camera.position.set(0, 0, 5.2);

      const ambLight = new THREE.AmbientLight(0xfffaed, 1.8);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xfff3d6, 2.0);
      dirLight.position.set(3, 4, 4);
      scene.add(dirLight);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);
      activePathGroupRef.current = rootGroup;

      // 1. Root Product Node (Top)
      const topGeo = new THREE.SphereGeometry(0.32, 24, 24);
      const topMat = new THREE.MeshStandardMaterial({
        color: 0x1b4332,
        emissive: 0x0f2b1f,
        metalness: 0.6,
        roughness: 0.2,
      });
      const topNode = new THREE.Mesh(topGeo, topMat);
      topNode.position.set(0, 1.8, 0);
      rootGroup.add(topNode);

      // Gold halo for Top Node
      const haloGeo = new THREE.TorusGeometry(0.42, 0.015, 16, 48);
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xc8961e, metalness: 0.8, roughness: 0.2 });
      const topHalo = new THREE.Mesh(haloGeo, goldMat);
      topHalo.position.set(0, 1.8, 0);
      rootGroup.add(topHalo);

      // 2. Category Nodes (Middle row)
      const categoryNodes = {};
      const catGeo = new THREE.BoxGeometry(0.5, 0.25, 0.15);

      Object.entries(PATHWAY_DATA).forEach(([key, val]) => {
        const catMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(val.color),
          metalness: 0.4,
          roughness: 0.3,
        });
        const mesh = new THREE.Mesh(catGeo, catMat);
        mesh.position.set(val.x, 0.5, 0);
        mesh.userData = { categoryKey: key };
        rootGroup.add(mesh);
        categoryNodes[key] = mesh;

        // Static thin connection line from top
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 1.8, 0),
          new THREE.Vector3(val.x, 0.5, 0),
        ]);
        const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xd4cbbf, transparent: true, opacity: 0.35 }));
        rootGroup.add(line);
      });

      // 3. Active Highlighted Pathway Spline (Lights up)
      const activeLineGeo = new THREE.BufferGeometry();
      const activeLineMat = new THREE.LineBasicMaterial({
        color: 0xc8961e,
        linewidth: 3,
        transparent: true,
        opacity: 0.95,
      });
      const activeLine = new THREE.Line(activeLineGeo, activeLineMat);
      rootGroup.add(activeLine);

      // 4. Downstream Destination Nodes (Regulatory & IP)
      const regGeo = new THREE.SphereGeometry(0.25, 20, 20);
      const regMat = new THREE.MeshStandardMaterial({ color: 0x92400e, metalness: 0.5, roughness: 0.3 });
      const regNode = new THREE.Mesh(regGeo, regMat);
      regNode.position.set(-0.9, -1.2, 0);
      rootGroup.add(regNode);

      const ipGeo = new THREE.SphereGeometry(0.25, 20, 20);
      const ipMat = new THREE.MeshStandardMaterial({ color: 0x1e40af, metalness: 0.5, roughness: 0.3 });
      const ipNode = new THREE.Mesh(ipGeo, ipMat);
      ipNode.position.set(0.9, -1.2, 0);
      rootGroup.add(ipNode);

      return {
        animate: ({ elapsedTime, mouse, reducedMotion }) => {
          if (reducedMotion) return;

          topHalo.rotation.z = elapsedTime * 0.5;
          rootGroup.rotation.y = mouse.x * 0.25;
          rootGroup.rotation.x = -mouse.y * 0.15;

          // Pulse active category
          const activeKey = selectedCategory;
          const activeX = PATHWAY_DATA[activeKey]?.x || -1.8;
          targetXRef.current += (activeX - targetXRef.current) * 0.1;

          // Dynamic bezier curve through: Top -> Category -> Split to Reg & IP
          const curve1 = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 1.8, 0),
            new THREE.Vector3(targetXRef.current * 0.5, 1.1, 0),
            new THREE.Vector3(targetXRef.current, 0.5, 0)
          );
          const curve2 = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(targetXRef.current, 0.5, 0),
            new THREE.Vector3((targetXRef.current - 0.9) * 0.5, -0.35, 0),
            new THREE.Vector3(-0.9, -1.2, 0)
          );
          const curve3 = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(targetXRef.current, 0.5, 0),
            new THREE.Vector3((targetXRef.current + 0.9) * 0.5, -0.35, 0),
            new THREE.Vector3(0.9, -1.2, 0)
          );

          const points = [
            ...curve1.getPoints(12),
            ...curve2.getPoints(12),
            ...curve3.getPoints(12),
          ];
          activeLineGeo.setFromPoints(points);

          // Animate selected node scale
          Object.entries(categoryNodes).forEach(([k, mesh]) => {
            const isTarget = k === activeKey;
            const targetScale = isTarget ? 1.25 : 1.0;
            mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
          });
        },
      };
    },
    { alpha: true, enableParallax: true }
  );

  return (
    <div
      className={`classification-pathway-3d ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(27,67,50,0.04), rgba(200,150,30,0.04))',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-8)',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
            3D Pathway Simulation
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
            Classification to Regulatory & IP Cascade
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="badge badge-review" style={{ fontSize: '10px' }}>
            Preliminary Classification · Decision-Support Only
          </span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div style={{ position: 'relative', height: '260px', width: '100%' }}>
        <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D Product Classification Pathway" />

        {/* Floating Labels over 3D nodes */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', background: 'rgba(253,250,243,0.92)', padding: '2px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border-light)' }}>
            HERBAL-X INNOVATION
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 12, left: '26%', transform: 'translateX(-50%)', pointerEvents: 'none', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-warning)', background: 'rgba(255,251,235,0.92)', padding: '2px 8px', borderRadius: 'var(--radius-full)', border: '1px solid #fde68a' }}>
            REGULATORY PATHWAY
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 12, right: '26%', transform: 'translateX(50%)', pointerEvents: 'none', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-info)', background: 'rgba(239,246,255,0.92)', padding: '2px 8px', borderRadius: 'var(--radius-full)', border: '1px solid #bfdbfe' }}>
            IP PATHWAY
          </div>
        </div>
      </div>

      {/* Selected Pathway Summary Bar */}
      {PATHWAY_DATA[selectedCategory] && (
        <div style={{ marginTop: 'var(--space-3)', padding: '10px 16px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: PATHWAY_DATA[selectedCategory].color }} />
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text)' }}>
              Active Route: {PATHWAY_DATA[selectedCategory].name}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
            <strong>Regulatory:</strong> {PATHWAY_DATA[selectedCategory].reg} · <strong>IP:</strong> {PATHWAY_DATA[selectedCategory].ip}
          </div>
        </div>
      )}
    </div>
  );
}
