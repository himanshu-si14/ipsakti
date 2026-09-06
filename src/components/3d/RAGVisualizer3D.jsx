import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';
import { HelpCircle, Brain, Globe, Search, GitMerge, CheckCheck, Gauge, MessageSquareCheck } from 'lucide-react';

const RAG_STEPS = [
  { id: 0, title: 'User Question', desc: 'Natural language input from innovator or researcher', icon: HelpCircle, x: -3.5 },
  { id: 1, title: 'Query Understanding', desc: 'Entity extraction: ingredients, classical basis & claims', icon: Brain, x: -2.5 },
  { id: 2, title: 'Jurisdiction', desc: 'Targeting Indian, EU, or US regulatory frameworks', icon: Globe, x: -1.5 },
  { id: 3, title: 'Document Retrieval', desc: 'Searching Acts, gazettes, pharmacopoeias & TKDL guidelines', icon: Search, x: -0.5 },
  { id: 4, title: 'Evidence Matching', desc: 'Mapping statutory provisions to formulation parameters', icon: GitMerge, x: 0.5 },
  { id: 5, title: 'Claim Validation', desc: 'Cross-verifying contraindications & Section 3(p) bars', icon: CheckCheck, x: 1.5 },
  { id: 6, title: 'Confidence Scoring', desc: 'Assigning High, Medium, or Low evidence reliability rating', icon: Gauge, x: 2.5 },
  { id: 7, title: 'Evidence-Backed Answer', desc: 'Synthesizing verified citations with legal guardrails', icon: MessageSquareCheck, x: 3.5 },
];

export default function RAGVisualizer3D({ className = '' }) {
  const canvasRef = useRef(null);
  const [activeStep, setActiveStep] = useState(3);
  const activeStepRef = useRef(3);

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera }) => {
      camera.position.set(0, 0, 5.0);

      const ambLight = new THREE.AmbientLight(0xfffaed, 1.8);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xfff3d6, 2.0);
      dirLight.position.set(2, 4, 3);
      scene.add(dirLight);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // Connecting horizontal beam
      const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 7.2, 16);
      beamGeo.rotateZ(Math.PI / 2);
      const beamMat = new THREE.MeshStandardMaterial({
        color: 0xd4cbbf,
        metalness: 0.2,
        roughness: 0.5,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      rootGroup.add(beam);

      // 8 Pipeline Nodes
      const nodeMeshes = [];
      const haloMeshes = [];

      RAG_STEPS.forEach((step, idx) => {
        const nodeGeo = new THREE.SphereGeometry(0.22, 16, 16);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: 0x1b4332,
          metalness: 0.4,
          roughness: 0.3,
        });
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);
        mesh.position.set(step.x, 0, 0);
        rootGroup.add(mesh);
        nodeMeshes.push(mesh);

        // Gold Halo for active node
        const haloGeo = new THREE.TorusGeometry(0.3, 0.015, 12, 32);
        const haloMat = new THREE.MeshStandardMaterial({
          color: 0xc8961e,
          metalness: 0.8,
          roughness: 0.2,
          transparent: true,
          opacity: 0.0,
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.set(step.x, 0, 0);
        rootGroup.add(halo);
        haloMeshes.push(halo);
      });

      return {
        animate: ({ elapsedTime, reducedMotion }) => {
          if (reducedMotion) return;

          const current = activeStepRef.current;

          nodeMeshes.forEach((mesh, idx) => {
            const isCurrent = idx === current;
            const halo = haloMeshes[idx];

            if (isCurrent) {
              mesh.material.color.setHex(0xc8961e);
              mesh.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
              halo.material.opacity = 0.95;
              halo.rotation.z = elapsedTime * 2;
            } else if (idx < current) {
              mesh.material.color.setHex(0x2d6a4f); // past verified nodes
              mesh.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
              halo.material.opacity = 0.0;
            } else {
              mesh.material.color.setHex(0xd4cbbf); // upcoming nodes
              mesh.scale.lerp(new THREE.Vector3(0.85, 0.85, 0.85), 0.1);
              halo.material.opacity = 0.0;
            }
          });
        },
      };
    },
    { alpha: true }
  );

  // Auto-cycle through the 8 RAG steps smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % RAG_STEPS.length;
        activeStepRef.current = next;
        return next;
      });
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const currentStep = RAG_STEPS[activeStep];

  return (
    <div
      className={`rag-visualizer-3d ${className}`}
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
            Evidence Retrieval Architecture
          </span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
            How Sahayak Builds an Answer
          </h3>
        </div>
        <span className="badge badge-verified" style={{ fontSize: '10px' }}>
          Real-time Statutory Grounding
        </span>
      </div>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)', maxWidth: 640 }}>
        IP-SAKTI does not hallucinate answers. Every query traverses an 8-stage verification pipeline grounded in official Acts, gazettes, and pharmacopoeias.
      </p>

      {/* 3D Pipeline Canvas */}
      <div style={{ position: 'relative', height: '140px', width: '100%' }}>
        <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D Evidence Retrieval Pipeline" />
      </div>

      {/* Current Step Highlight Box */}
      <div
        style={{
          background: 'white',
          border: '1px solid var(--color-border-light)',
          borderRadius: 'var(--radius-xl)',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: '#fef3e2',
              color: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <currentStep.icon size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                STAGE {currentStep.id + 1} OF 8
              </span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: 'var(--color-primary)' }}>
                {currentStep.title}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: 2 }}>
              {currentStep.desc}
            </div>
          </div>
        </div>

        {/* Manual Step Switcher */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {RAG_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveStep(idx);
                activeStepRef.current = idx;
              }}
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                border: 'none',
                background: activeStep === idx ? 'var(--color-accent)' : idx < activeStep ? 'var(--color-primary)' : 'var(--color-border-light)',
                color: 'white',
                fontSize: '10px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              aria-label={`Step ${idx + 1}: ${s.title}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
