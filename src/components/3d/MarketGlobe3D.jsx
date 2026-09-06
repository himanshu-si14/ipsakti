import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';

const JURISDICTION_PINS = [
  { id: 'India', label: 'India', lat: 20.59, lon: 78.96, color: '#1B4332', flag: '🇮🇳' },
  { id: 'European Union', label: 'European Union', lat: 50.85, lon: 4.35, color: '#1e40af', flag: '🇪🇺' },
  { id: 'United States', label: 'United States', lat: 37.09, lon: -95.71, color: '#92400e', flag: '🇺🇸' },
  { id: 'Middle East', label: 'Middle East', lat: 24.71, lon: 46.67, color: '#C8961E', flag: '🇦🇪' },
];

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function MarketGlobe3D({ selectedMarket = 'India', onSelectMarket, className = '' }) {
  const canvasRef = useRef(null);
  const globeGroupRef = useRef(null);
  const targetRotationRef = useRef({ y: 0, x: 0 });

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera }) => {
      camera.position.set(0, 0, 4.8);

      const ambLight = new THREE.AmbientLight(0xfffaed, 1.8);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xfff3d6, 2.0);
      dirLight.position.set(4, 5, 4);
      scene.add(dirLight);

      const globeGroup = new THREE.Group();
      scene.add(globeGroup);
      globeGroupRef.current = globeGroup;

      const globeRadius = 1.6;

      // 1. Stylized Inner Core Sphere
      const sphereGeo = new THREE.SphereGeometry(globeRadius, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xfdfaf3,
        roughness: 0.7,
        metalness: 0.1,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      globeGroup.add(sphereMesh);

      // 2. Geometric Latitude / Longitude Wireframe Rings
      const wireGeo = new THREE.SphereGeometry(globeRadius + 0.01, 18, 18);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xc8961e,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      globeGroup.add(wireMesh);

      // 3. Continental Point Clusters (Dot Grid)
      const dotCount = 180;
      const dotGeo = new THREE.BufferGeometry();
      const dotPositions = new Float32Array(dotCount * 3);
      for (let i = 0; i < dotCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / dotCount);
        const theta = Math.sqrt(dotCount * Math.PI) * phi;
        dotPositions[i * 3] = (globeRadius + 0.02) * Math.cos(theta) * Math.sin(phi);
        dotPositions[i * 3 + 1] = (globeRadius + 0.02) * Math.sin(theta) * Math.sin(phi);
        dotPositions[i * 3 + 2] = (globeRadius + 0.02) * Math.cos(phi);
      }
      dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
      const dotMat = new THREE.PointsMaterial({ color: 0x52796f, size: 0.03, transparent: true, opacity: 0.5 });
      const dotMesh = new THREE.Points(dotGeo, dotMat);
      globeGroup.add(dotMesh);

      // 4. Jurisdiction Beacon Pins
      const pinMeshes = [];
      JURISDICTION_PINS.forEach((pin) => {
        const pos = latLonToVector3(pin.lat, pin.lon, globeRadius);

        const pinGroup = new THREE.Group();
        pinGroup.position.copy(pos);
        pinGroup.lookAt(0, 0, 0);

        // Pin Beacon Sphere
        const bGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const bMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(pin.color),
          emissive: new THREE.Color(pin.color),
          emissiveIntensity: 0.6,
          metalness: 0.8,
        });
        const beacon = new THREE.Mesh(bGeo, bMat);
        pinGroup.add(beacon);

        // Pin Halo
        const hGeo = new THREE.TorusGeometry(0.12, 0.01, 12, 24);
        const hMat = new THREE.MeshBasicMaterial({ color: 0xc8961e, transparent: true, opacity: 0.8 });
        const halo = new THREE.Mesh(hGeo, hMat);
        pinGroup.add(halo);

        globeGroup.add(pinGroup);
        pinMeshes.push({ pin, mesh: pinGroup });
      });

      return {
        animate: ({ mouse, reducedMotion }) => {
          if (reducedMotion) return;

          // Smooth interpolation toward active target jurisdiction orientation
          globeGroup.rotation.y += (targetRotationRef.current.y - globeGroup.rotation.y) * 0.05;
          globeGroup.rotation.x += (targetRotationRef.current.x - globeGroup.rotation.x) * 0.05;

          // Subtle mouse tilt
          globeGroup.rotation.y += mouse.x * 0.005;
          globeGroup.rotation.x += -mouse.y * 0.005;
        },
      };
    },
    { alpha: true, enableParallax: true }
  );

  // Rotate globe when selected market changes
  useEffect(() => {
    const pin = JURISDICTION_PINS.find((p) => p.id === selectedMarket);
    if (pin) {
      const targetY = -((pin.lon + 180) * (Math.PI / 180)) + Math.PI / 2;
      const targetX = (pin.lat * (Math.PI / 180)) * 0.5;
      targetRotationRef.current = { y: targetY, x: targetX };
    }
  }, [selectedMarket]);

  return (
    <div
      className={`market-globe-3d ${className}`}
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
            3D International Radar
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
            Jurisdiction Geopolitical Navigator
          </h3>
        </div>
        <span className="badge badge-verified" style={{ fontSize: '10px' }}>
          4 Regimes Active
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'var(--space-6)', alignItems: 'center' }}>
        {/* 3D Globe Canvas */}
        <div style={{ position: 'relative', height: '240px', width: '100%' }}>
          <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D Stylized Market Access Globe" />
        </div>

        {/* Jurisdiction Selector Buttons */}
        <div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '8px', fontWeight: 600 }}>
            TARGET JURISDICTION:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {JURISDICTION_PINS.map((pin) => {
              const isSelected = selectedMarket === pin.id;
              return (
                <button
                  key={pin.id}
                  onClick={() => {
                    if (typeof onSelectMarket === 'function') onSelectMarket(pin.id);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-lg)',
                    background: isSelected ? pin.color : 'white',
                    color: isSelected ? 'white' : 'var(--color-text)',
                    border: `1.5px solid ${isSelected ? pin.color : 'var(--color-border-light)'}`,
                    fontSize: '12px',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  <span>{pin.flag}</span>
                  <span>{pin.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            Never merge jurisdictions. Every market enforces independent regulatory bodies, IP prior-art constraints, and novel ingredient classification standards.
          </div>
        </div>
      </div>
    </div>
  );
}
