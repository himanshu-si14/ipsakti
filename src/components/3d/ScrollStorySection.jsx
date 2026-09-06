import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Sparkles, Zap, Shield, BookOpen, Globe, ArrowRight } from 'lucide-react';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';
import { Link } from 'react-router-dom';

const STORY_STAGES = [
  {
    step: '01',
    id: 'discover',
    title: 'From Traditional Knowledge',
    journey: 'DISCOVER',
    subtitle: 'Ancient Ayurvedic formulations meet modern scientific documentation.',
    desc: 'Every formulation begins with classical roots — Charaka Samhita, Sushruta Samhita, and regional traditional practices. IP-SAKTI identifies documented prior art and botanical sources before claims are made.',
    icon: Sparkles,
    color: '#1B4332',
    accent: '#C8961E',
    route: '/passport/create',
    cta: 'Start Innovation Intake',
  },
  {
    step: '02',
    id: 'classify',
    title: 'To Structured Classification',
    journey: 'CLASSIFY',
    subtitle: 'Clarifying the legal and regulatory category with confidence metrics.',
    desc: 'Is it an Ayurveda Aahara (nutraceutical), Ayurvedic Proprietary Medicine (APM), Classical Medicine, or Phytopharmaceutical? A correct preliminary classification prevents fatal regulatory delays.',
    icon: Zap,
    color: '#2d6a4f',
    accent: '#52796F',
    route: '/classification',
    cta: 'Explore Classification',
  },
  {
    step: '03',
    id: 'protect',
    title: 'To Intellectual Property Protection',
    journey: 'PROTECT',
    subtitle: 'Navigating Section 3(p) TK bar, patent claims, and brand security.',
    desc: 'Evaluate patentability for novel extraction processes, dosage forms, and synergistic contributions while remaining strictly compliant with Indian and international patent law.',
    icon: Shield,
    color: '#C8961E',
    accent: '#a07214',
    route: '/ip-intelligence',
    cta: 'Assess IP Pathways',
  },
  {
    step: '04',
    id: 'comply',
    title: 'To Regulatory & ABS Compliance',
    journey: 'COMPLY',
    subtitle: 'FSSAI standards, Ayush licensing, and National Biodiversity Authority mandates.',
    desc: 'Biological resources require Access and Benefit-Sharing (ABS) clearance from NBA and State Biodiversity Boards. Ensure every compliance requirement is mapped before launch.',
    icon: BookOpen,
    color: '#276749',
    accent: '#40916c',
    route: '/regulatory',
    cta: 'View Regulatory Roadmaps',
  },
  {
    step: '05',
    id: 'commercialize',
    title: 'To Compliant Commercialization',
    journey: 'COMMERCIALIZE & MONITOR',
    subtitle: 'Unified Ayurvedic Innovation Passport for domestic and global markets.',
    desc: 'From India to EU Novel Foods and US FDA dietary supplement pathways, your Innovation Passport aggregates evidence, action plans, and regulatory change tracking in one single source of truth.',
    icon: Globe,
    color: '#1e40af',
    accent: '#3b82f6',
    route: '/passport/herbalx-001',
    cta: 'View Demo Passport',
  },
];

export default function ScrollStorySection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = STORY_STAGES[activeStageIndex];
  const canvasRef = useRef(null);
  const stageGroupRef = useRef(null);
  const morphTargetRef = useRef(0);

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera }) => {
      camera.position.set(0, 0, 6.5);

      const light1 = new THREE.DirectionalLight(0xfffaed, 2.2);
      light1.position.set(4, 5, 5);
      scene.add(light1);

      const light2 = new THREE.DirectionalLight(0x52796f, 1.2);
      light2.position.set(-4, -3, -2);
      scene.add(light2);

      const ambient = new THREE.AmbientLight(0xffffff, 1.0);
      scene.add(ambient);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);
      stageGroupRef.current = rootGroup;

      // 50 Transformative Nodes
      const nodeCount = 42;
      const nodes = [];
      const nodeGeo = new THREE.SphereGeometry(0.1, 16, 16);

      // Predefined target positions for each stage
      const stageCoords = {
        // Stage 0: Botanical organic sphere / cluster
        0: Array.from({ length: nodeCount }, (_, i) => {
          const phi = Math.acos(-1 + (2 * i) / nodeCount);
          const theta = Math.sqrt(nodeCount * Math.PI) * phi;
          const r = 1.4 + Math.sin(i * 3) * 0.3;
          return new THREE.Vector3(r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi));
        }),
        // Stage 1: Structured Classification Grid
        1: Array.from({ length: nodeCount }, (_, i) => {
          const row = Math.floor(i / 7) - 2.5;
          const col = (i % 7) - 3;
          return new THREE.Vector3(col * 0.55, row * 0.55, (Math.sin(col) * 0.3));
        }),
        // Stage 2: Radiating IP Tree (Center hub + branching spokes)
        2: Array.from({ length: nodeCount }, (_, i) => {
          if (i === 0) return new THREE.Vector3(0, 0, 0);
          const branch = i % 6;
          const branchAngle = (branch / 6) * Math.PI * 2;
          const dist = 0.6 + Math.floor(i / 6) * 0.45;
          return new THREE.Vector3(Math.cos(branchAngle) * dist, Math.sin(branchAngle) * dist, (i % 2) * 0.2);
        }),
        // Stage 3: Regulatory Pillars & Scales
        3: Array.from({ length: nodeCount }, (_, i) => {
          const pillar = i % 3; // 3 regulatory pillars
          const x = (pillar - 1) * 1.5;
          const y = (Math.floor(i / 3) / (nodeCount / 3)) * 3 - 1.5;
          return new THREE.Vector3(x, y, 0);
        }),
        // Stage 4: Unified Innovation Passport Polyhedron
        4: Array.from({ length: nodeCount }, (_, i) => {
          const angle = (i / nodeCount) * Math.PI * 2;
          const z = (i / nodeCount) * 2.2 - 1.1;
          const r = Math.sqrt(1 - Math.pow(z / 1.3, 2)) * 1.5;
          return new THREE.Vector3(Math.cos(angle * 3) * r, Math.sin(angle * 3) * r, z);
        }),
      };

      for (let i = 0; i < nodeCount; i++) {
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(STORY_STAGES[0].color),
          emissive: new THREE.Color(STORY_STAGES[0].accent),
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 0.3,
        });
        const mesh = new THREE.Mesh(nodeGeo, mat);
        mesh.position.copy(stageCoords[0][i]);
        rootGroup.add(mesh);
        nodes.push({ mesh, currentPos: mesh.position.clone() });
      }

      // Connecting lines
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xc8961e,
        transparent: true,
        opacity: 0.22,
      });
      const linePositions = new Float32Array(nodeCount * 3 * 2);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      rootGroup.add(lines);

      return {
        animate: ({ elapsedTime, mouse, reducedMotion }) => {
          if (reducedMotion) return;

          rootGroup.rotation.y = elapsedTime * 0.15 + mouse.x * 0.3;
          rootGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1 - mouse.y * 0.2;

          const targetStage = morphTargetRef.current;
          const targets = stageCoords[targetStage];
          const stageColor = new THREE.Color(STORY_STAGES[targetStage].color);
          const accentColor = new THREE.Color(STORY_STAGES[targetStage].accent);

          const lPos = lineGeo.attributes.position.array;
          let lIdx = 0;

          nodes.forEach((n, i) => {
            const targetPos = targets[i] || targets[0];
            n.mesh.position.lerp(targetPos, 0.05);

            // Interpolate color
            n.mesh.material.color.lerp(stageColor, 0.05);
            n.mesh.material.emissive.lerp(accentColor, 0.05);

            // Update lines to adjacent node
            if (i < nodeCount - 1 && lIdx < linePositions.length - 6) {
              const nextNode = nodes[i + 1];
              lPos[lIdx++] = n.mesh.position.x;
              lPos[lIdx++] = n.mesh.position.y;
              lPos[lIdx++] = n.mesh.position.z;
              lPos[lIdx++] = nextNode.mesh.position.x;
              lPos[lIdx++] = nextNode.mesh.position.y;
              lPos[lIdx++] = nextNode.mesh.position.z;
            }
          });

          lineGeo.attributes.position.needsUpdate = true;
        },
      };
    },
    { alpha: true, enableParallax: true }
  );

  useEffect(() => {
    morphTargetRef.current = activeStageIndex;
  }, [activeStageIndex]);

  return (
    <section className="scroll-story-section" style={{ padding: 'var(--space-16) 0', background: 'var(--color-secondary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 var(--space-8)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '8px' }}>
            The Ayurvedic Innovation Journey
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
            From Ancient Wisdom to Structured Intelligence
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: 640, margin: '12px auto 0', fontSize: 'var(--text-base)' }}>
            Discover how IP-SAKTI transforms unstructured Ayurvedic knowledge into an evidence-first, commercially viable Innovation Passport.
          </p>
        </div>

        {/* Interactive Narrative Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 'var(--space-10)', alignItems: 'center' }}>
          {/* Left: 3D Metaphor Scene */}
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(27,67,50,0.06), rgba(200,150,30,0.06))',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--color-border-light)',
              overflow: 'hidden',
              minHeight: '420px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D Transformation Stage Metaphor" />

            <div
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(253,250,243,0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--color-border-light)',
                fontSize: '11px',
                fontWeight: 700,
                color: activeStage.color,
                letterSpacing: '0.08em',
              }}
            >
              PHASE {activeStage.step} · {activeStage.journey}
            </div>
          </div>

          {/* Right: Narrative Step Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {STORY_STAGES.map((s, idx) => {
              const isCurrent = idx === activeStageIndex;
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  onClick={() => setActiveStageIndex(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveStageIndex(idx); }}
                  style={{
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-xl)',
                    background: isCurrent ? 'var(--color-white)' : 'rgba(255,255,255,0.4)',
                    border: `1.5px solid ${isCurrent ? s.color : 'transparent'}`,
                    boxShadow: isCurrent ? '0 8px 24px rgba(27,67,50,0.08)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 'var(--radius-md)',
                        background: isCurrent ? s.color : 'rgba(27,67,50,0.08)',
                        color: isCurrent ? '#ffffff' : s.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: s.accent, letterSpacing: '0.1em' }}>
                          STEP {s.step}
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text)' }}>
                          {s.title}
                        </span>
                      </div>
                      {isCurrent && (
                        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
                          {s.desc}
                        </p>
                      )}
                    </div>
                  </div>

                  {isCurrent && (
                    <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                      <Link
                        to={s.route}
                        className="btn btn-sm"
                        style={{
                          background: s.color,
                          color: 'white',
                          fontSize: '11px',
                          padding: '4px 12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {s.cta} <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
