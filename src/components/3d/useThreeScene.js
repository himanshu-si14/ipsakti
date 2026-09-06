import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function useThreeScene(canvasRef, setupFn, options = {}) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const cleanupRef = useRef(null);
  const isVisibleRef = useRef(true);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    if (!isWebGLAvailable()) {
      setHasWebGL(false);
      return;
    }

    const canvas = canvasRef.current;
    const parent = canvas.parentElement || document.body;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Renderer setup
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: options.alpha !== false,
        antialias: options.antialias !== false,
        powerPreference: 'high-performance',
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const width = parent.clientWidth || 300;
    const height = parent.clientHeight || 300;
    renderer.setSize(width, height, false);
    renderer.setClearColor(options.clearColor || 0x000000, options.alpha !== false ? 0 : 1);

    // Camera setup
    const fov = options.fov || 45;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
    const camPos = options.cameraPos || [0, 0, 5];
    camera.position.set(camPos[0], camPos[1], camPos[2]);

    // Scene setup
    const scene = new THREE.Scene();

    // Call setup function
    let userState = {};
    if (typeof setupFn === 'function') {
      userState = setupFn({ scene, camera, renderer, THREE, canvas, width, height }) || {};
    }

    // Mouse parallax tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.targetX = (clientX / rect.width) * 2 - 1;
      mouseRef.current.targetY = -(clientY / rect.height) * 2 + 1;
    };

    if (options.enableParallax) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight, false);
          if (typeof userState.onResize === 'function') {
            userState.onResize(newWidth, newHeight);
          }
        }
      }
    });
    resizeObserver.observe(parent);

    // Intersection observer for performance (pause when off-screen)
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    // Animation Loop
    let animId = null;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisibleRef.current || document.hidden) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (typeof userState.animate === 'function') {
        userState.animate({
          scene,
          camera,
          renderer,
          delta,
          elapsedTime,
          mouse: mouseRef.current,
          reducedMotion: prefersReducedMotion,
        });
      }

      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      // Single static render
      if (typeof userState.animate === 'function') {
        userState.animate({
          scene,
          camera,
          renderer,
          delta: 0,
          elapsedTime: 0,
          mouse: { x: 0, y: 0 },
          reducedMotion: true,
        });
      }
      renderer.render(scene, camera);
    } else {
      animate();
    }

    setIsReady(true);

    // Cleanup function
    cleanupRef.current = () => {
      if (animId) cancelAnimationFrame(animId);
      if (options.enableParallax) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (typeof userState.onDestroy === 'function') {
        userState.onDestroy();
      }

      // Dispose scene objects
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
    };

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [canvasRef]);

  return { hasWebGL, isReady };
}
