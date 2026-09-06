import { useRef } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';

export default function BotanicalParticles({ count = 50, opacity = 0.45, className = '', style = {} }) {
  const canvasRef = useRef(null);

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera }) => {
      camera.position.z = 10;

      // Particle Geometry
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const speeds = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const scales = new Float32Array(count);

      const colorPalette = [
        new THREE.Color('#2d6a4f'), // soft forest green
        new THREE.Color('#C8961E'), // ayurvedic saffron gold
        new THREE.Color('#84a98c'), // soft sage
        new THREE.Color('#D4CBBF'), // warm ivory dust
      ];

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

        speeds[i * 3] = (Math.random() - 0.5) * 0.003;
        speeds[i * 3 + 1] = 0.002 + Math.random() * 0.005; // gentle upward drift
        speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

        const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        scales[i] = 12.0 + Math.random() * 20.0;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Circular particle texture generator
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 32;
      pCanvas.height = 32;
      const ctx = pCanvas.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();

      const texture = new THREE.CanvasTexture(pCanvas);

      const material = new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        map: texture,
        transparent: true,
        opacity: opacity,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      return {
        animate: ({ mouse }) => {
          const pos = geometry.attributes.position.array;
          for (let i = 0; i < count; i++) {
            pos[i * 3] += speeds[i * 3] + mouse.x * 0.001;
            pos[i * 3 + 1] += speeds[i * 3 + 1];
            pos[i * 3 + 2] += speeds[i * 3 + 2];

            // Wrap around boundaries
            if (pos[i * 3 + 1] > 6) pos[i * 3 + 1] = -6;
            if (pos[i * 3] > 8) pos[i * 3] = -8;
            if (pos[i * 3] < -8) pos[i * 3] = 8;
          }
          geometry.attributes.position.needsUpdate = true;
        },
        onDestroy: () => {
          texture.dispose();
        },
      };
    },
    { alpha: true, enableParallax: true }
  );

  return (
    <div
      className={`botanical-particles-layer ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
      }}
      aria-hidden="true"
    >
      <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} />
    </div>
  );
}
