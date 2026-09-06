import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './useThreeScene';
import Canvas3D from './Canvas3D';
import { RotateCcw, ZoomIn, ZoomOut, Eye, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MAP_NODES = [
  { id: 'product', label: 'Herbal-X', type: 'Innovation Product', pos: [0, 1.4, 0], color: '#1B4332', desc: 'Proprietary polyherbal adaptogenic dietary supplement formulation.', link: '/passport/herbalx-001' },
  { id: 'ashwa', label: 'Ashwagandha', type: 'Botanical Ingredient', pos: [-1.9, 0.7, 0.6], color: '#2d6a4f', desc: 'Withania somnifera · Cultivated Rajasthan · Balya Gana classical reference.', link: '/passport/herbalx-001' },
  { id: 'brahmi', label: 'Brahmi', type: 'Botanical Ingredient', pos: [-1.1, 0.2, -0.7], color: '#2d6a4f', desc: 'Bacopa monnieri · Wild Bihar · Medhya Rasayana classical reference.', link: '/passport/herbalx-001' },
  { id: 'shatavari', label: 'Shatavari', type: 'Botanical Ingredient', pos: [0.9, 0.5, -0.8], color: '#2d6a4f', desc: 'Asparagus racemosus · Cultivated Uttarakhand · Vitalya Gana reference.', link: '/passport/herbalx-001' },
  { id: 'pepper', label: 'Black Pepper', type: 'Botanical Ingredient', pos: [1.9, 0.8, 0.4], color: '#52796F', desc: 'Piper nigrum · Cultivated Kerala · Bioavailability enhancer component.', link: '/passport/herbalx-001' },
  { id: 'tk1', label: 'Charaka Samhita', type: 'Traditional Knowledge', pos: [-2.2, -0.7, 0.8], color: '#C8961E', desc: 'Ancient treatise establishing prior art for Balya and Medhya Rasayana herbs.', link: '/tk-abs' },
  { id: 'tk2', label: 'Sushruta Samhita', type: 'Traditional Knowledge', pos: [-1.2, -1.3, -0.5], color: '#C8961E', desc: 'Classical surgical and pharmacological text documenting Shatavari formulations.', link: '/tk-abs' },
  { id: 'bio1', label: 'NBA / State Boards', type: 'ABS Authority', pos: [0.3, -0.8, 1.1], color: '#276749', desc: 'National Biodiversity Authority & State Boards governing commercial biological access.', link: '/tk-abs' },
  { id: 'ip', label: 'IP Intelligence', type: 'IP Assessment', pos: [-0.8, -1.8, 0.2], color: '#1e40af', desc: 'Process patent feasibility review under Section 3(p) and trademark filing.', link: '/ip-intelligence' },
  { id: 'reg', label: 'FSSAI & Ayush', type: 'Regulatory Framework', pos: [1.3, -1.1, 0.5], color: '#92400e', desc: 'Nutraceutical Regulations 2022 and Ayush APM guidelines compliance.', link: '/regulatory' },
  { id: 'market', label: 'Market Access', type: 'Global Commercialization', pos: [2.3, -0.6, -0.6], color: '#6b21a8', desc: 'Jurisdiction-specific dossiers for India, EU Novel Foods, and US FDA NDI.', link: '/market-access' },
  { id: 'evidence', label: 'Evidence Base', type: 'Statutory Grounding', pos: [1.6, -1.9, 0.0], color: '#52796F', desc: '7 authoritative sources cited across Acts, gazettes, and official notifications.', link: '/evidence' },
];

const MAP_EDGES = [
  ['product', 'ashwa'],
  ['product', 'brahmi'],
  ['product', 'shatavari'],
  ['product', 'pepper'],
  ['ashwa', 'tk1'],
  ['brahmi', 'tk1'],
  ['shatavari', 'tk2'],
  ['ashwa', 'bio1'],
  ['brahmi', 'bio1'],
  ['tk1', 'ip'],
  ['tk2', 'ip'],
  ['bio1', 'reg'],
  ['ip', 'reg'],
  ['reg', 'market'],
  ['product', 'ip'],
  ['reg', 'evidence'],
];

export default function KnowledgeMap3D({ className = '' }) {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(MAP_NODES[0]);
  const graphGroupRef = useRef(null);
  const zoomLevelRef = useRef(6.2);

  const { hasWebGL } = useThreeScene(
    canvasRef,
    ({ scene, camera, canvas }) => {
      camera.position.set(0, 0, zoomLevelRef.current);

      const ambLight = new THREE.AmbientLight(0xfffaed, 1.8);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xfff3d6, 2.0);
      dirLight.position.set(5, 6, 5);
      scene.add(dirLight);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);
      graphGroupRef.current = rootGroup;

      const nodeMeshes = [];
      const nodeMap = {};

      // Build 3D Nodes
      MAP_NODES.forEach((n) => {
        const isCore = n.id === 'product';
        const geo = new THREE.SphereGeometry(isCore ? 0.38 : 0.22, 20, 20);
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(n.color),
          metalness: 0.4,
          roughness: 0.25,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(n.pos[0], n.pos[1], n.pos[2]);
        mesh.userData = { nodeData: n };
        rootGroup.add(mesh);
        nodeMeshes.push(mesh);
        nodeMap[n.id] = mesh;

        // Gold Halo Ring around nodes
        const haloGeo = new THREE.TorusGeometry(isCore ? 0.5 : 0.28, 0.015, 12, 32);
        const haloMat = new THREE.MeshStandardMaterial({ color: 0xc8961e, metalness: 0.8, roughness: 0.2 });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.set(n.pos[0], n.pos[1], n.pos[2]);
        rootGroup.add(halo);
      });

      // Build 3D Connecting Tubes
      MAP_EDGES.forEach(([fromId, toId]) => {
        const a = nodeMap[fromId];
        const b = nodeMap[toId];
        if (!a || !b) return;

        const points = [a.position, b.position];
        const curve = new THREE.LineCurve3(a.position, b.position);
        const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.016, 8, false);
        const tubeMat = new THREE.MeshStandardMaterial({
          color: 0xc8961e,
          metalness: 0.5,
          roughness: 0.3,
          transparent: true,
          opacity: 0.45,
        });
        const tube = new THREE.Mesh(tubeGeo, tubeMat);
        rootGroup.add(tube);
      });

      // Interactive Click Raycasting
      const raycaster = new THREE.Raycaster();
      const mouseVec = new THREE.Vector2();

      const handleCanvasClick = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouseVec, camera);
        const intersects = raycaster.intersectObjects(nodeMeshes);
        if (intersects.length > 0) {
          const clickedNode = intersects[0].object.userData.nodeData;
          if (clickedNode) setSelectedNode(clickedNode);
        }
      };

      canvas.addEventListener('click', handleCanvasClick);

      // Drag Rotation Tracking
      let isDragging = false;
      let prevX = 0;
      let prevY = 0;

      const handlePointerDown = (e) => {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
      };

      const handlePointerMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;
        rootGroup.rotation.y += deltaX * 0.008;
        rootGroup.rotation.x += deltaY * 0.008;
        prevX = e.clientX;
        prevY = e.clientY;
      };

      const handlePointerUp = () => {
        isDragging = false;
      };

      canvas.addEventListener('mousedown', handlePointerDown);
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);

      return {
        animate: ({ elapsedTime, reducedMotion }) => {
          if (reducedMotion) return;
          if (!isDragging) {
            rootGroup.rotation.y += 0.002;
          }
          camera.position.z += (zoomLevelRef.current - camera.position.z) * 0.1;
        },
        onDestroy: () => {
          canvas.removeEventListener('click', handleCanvasClick);
          canvas.removeEventListener('mousedown', handlePointerDown);
          window.removeEventListener('mousemove', handlePointerMove);
          window.removeEventListener('mouseup', handlePointerUp);
        },
      };
    },
    { alpha: true }
  );

  const handleReset = () => {
    if (graphGroupRef.current) {
      graphGroupRef.current.rotation.set(0, 0, 0);
    }
    zoomLevelRef.current = 6.2;
    setSelectedNode(MAP_NODES[0]);
  };

  const handleZoom = (delta) => {
    zoomLevelRef.current = Math.max(3.8, Math.min(9.0, zoomLevelRef.current + delta));
  };

  return (
    <div
      className={`knowledge-map-3d ${className}`}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-6)',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(27,67,50,0.08)',
      }}
    >
      {/* Canvas Controls Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => handleZoom(-0.8)} className="btn btn-ghost btn-sm" aria-label="Zoom In">
            <ZoomIn size={14} /> Zoom In
          </button>
          <button onClick={() => handleZoom(0.8)} className="btn btn-ghost btn-sm" aria-label="Zoom Out">
            <ZoomOut size={14} /> Zoom Out
          </button>
          <button onClick={handleReset} className="btn btn-ghost btn-sm" aria-label="Reset View">
            <RotateCcw size={14} /> Reset View
          </button>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--color-text-light)' }}>
          Click any 3D node to inspect · Drag to orbit 360°
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-6)', alignItems: 'center' }}>
        {/* 3D Knowledge Network Canvas */}
        <div
          style={{
            position: 'relative',
            height: '460px',
            background: 'linear-gradient(135deg, rgba(27,67,50,0.06), rgba(200,150,30,0.06))',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            cursor: 'grab',
          }}
        >
          <Canvas3D canvasRef={canvasRef} hasWebGL={hasWebGL} ariaLabel="3D Interactive Ayurvedic Knowledge Graph" />
        </div>

        {/* Selected Node Inspector Panel */}
        <div
          style={{
            background: 'white',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: selectedNode.color }} />
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)' }}>
              {selectedNode.type}
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '8px' }}>
            {selectedNode.label}
          </h3>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-5)' }}>
            {selectedNode.desc}
          </p>

          <Link to={selectedNode.link} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
            Explore {selectedNode.label} <ChevronRight size={14} />
          </Link>

          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--color-border-light)' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Connected Entities:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {MAP_EDGES.filter(([a, b]) => a === selectedNode.id || b === selectedNode.id).map(([a, b], idx) => {
                const otherId = a === selectedNode.id ? b : a;
                const otherNode = MAP_NODES.find((n) => n.id === otherId);
                return (
                  <button
                    key={idx}
                    onClick={() => otherNode && setSelectedNode(otherNode)}
                    style={{
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border-light)',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                    }}
                  >
                    {otherNode?.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
