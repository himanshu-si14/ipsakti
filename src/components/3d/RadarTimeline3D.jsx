import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';
import { Radio, AlertCircle, ChevronRight } from 'lucide-react';

export default function RadarTimeline3D({ alerts = [], onSelectAlert = null, className = '' }) {
  const canvasRef = useRef(null);
  const [activeAlertIdx, setActiveAlertIdx] = useState(0);
  const activeAlert = alerts[activeAlertIdx] || alerts[0];
  const targetCamXRef = useRef(0);

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

      // Curved Timeline Spine
      const points = [];
      const nodeCount = Math.min(alerts.length, 6);
      const spacing = 1.4;

      for (let i = 0; i < nodeCount; i++) {
        const x = (i - (nodeCount - 1) / 2) * spacing;
        const y = Math.sin(i * 1.2) * 0.35;
        points.push(new THREE.Vector3(x, y, 0));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.025, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0xc8961e,
        metalness: 0.6,
        roughness: 0.3,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      rootGroup.add(tube);

      // Floating Timeline Nodes
      const nodeMeshes = [];
      points.forEach((pt, i) => {
        const alert = alerts[i];
        const isHigh = alert?.severity === 'high';
        const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: isHigh ? 0x9b1c1c : 0x1b4332,
          emissive: isHigh ? 0x9b1c1c : 0x0f2b1f,
          emissiveIntensity: 0.4,
          metalness: 0.5,
          roughness: 0.2,
        });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.copy(pt);
        rootGroup.add(node);
        nodeMeshes.push(node);

        const haloGeo = new THREE.TorusGeometry(0.26, 0.015, 12, 24);
        const haloMat = new THREE.MeshBasicMaterial({ color: 0xc8961e, transparent: true, opacity: 0.7 });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.copy(pt);
        rootGroup.add(halo);
      });

      return {
        animate: ({ elapsedTime, reducedMotion }) => {
          if (reducedMotion) return;

          // Camera moves toward active node smoothly
          const targetX = points[activeAlertIdx] ? points[activeAlertIdx].x : 0;
          targetCamXRef.current += (targetX - targetCamXRef.current) * 0.08;
          camera.position.x = targetCamXRef.current * 0.7;

          nodeMeshes.forEach((mesh, idx) => {
            const isSelected = idx === activeAlertIdx;
            const targetScale = isSelected ? 1.3 : 1.0;
            mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
          });
        },
      };
    },
    { alpha: true }
  );

  return (
    <div
      className={`radar-timeline-3d ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(27,67,50,0.04), rgba(200,150,30,0.04))',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-8)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
            3D Chronological Radar
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
            Regulatory Change Timeline
          </h3>
        </div>
        <span className="badge badge-review" style={{ fontSize: '10px' }}>
          Real-time Gazette Tracking
        </span>
      </div>

      <div style={{ position: 'relative', height: '140px', width: '100%' }}>
        <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D Regulatory Timeline Curve" />
      </div>

      {/* Timeline Controls & Details */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
        {alerts.map((a, i) => (
          <button
            key={a.id}
            onClick={() => {
              setActiveAlertIdx(i);
              if (typeof onSelectAlert === 'function') onSelectAlert(a);
            }}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              background: activeAlertIdx === i ? 'var(--color-primary)' : 'white',
              color: activeAlertIdx === i ? 'white' : 'var(--color-text)',
              border: `1px solid ${activeAlertIdx === i ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {a.published} · {a.authority}
          </button>
        ))}
      </div>

      {activeAlert && (
        <div style={{ background: 'white', padding: '14px 18px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: 'var(--color-text)' }}>
              {activeAlert.title}
            </span>
            <span className={`badge ${activeAlert.severity === 'high' ? 'badge-insufficient' : 'badge-review'}`} style={{ fontSize: '10px' }}>
              {activeAlert.severity.toUpperCase()} IMPACT
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
            {activeAlert.impact}
          </p>
        </div>
      )}
    </div>
  );
}
