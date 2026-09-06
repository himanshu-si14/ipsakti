import { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import KnowledgeMap3D from '../components/3d/KnowledgeMap3D';
import { Box, Map } from 'lucide-react';

// Node positions (relative to 800x500 SVG)
const NODES = [
  { id: 'product', label: 'Herbal-X', sublabel: 'Innovation', x: 400, y: 60, color: '#1B4332', textColor: 'white', r: 38 },
  { id: 'ashwa', label: 'Ashwagandha', sublabel: 'Ingredient', x: 180, y: 180, color: '#40916c', textColor: 'white', r: 30 },
  { id: 'brahmi', label: 'Brahmi', sublabel: 'Ingredient', x: 350, y: 200, color: '#40916c', textColor: 'white', r: 28 },
  { id: 'shatavari', label: 'Shatavari', sublabel: 'Ingredient', x: 530, y: 180, color: '#40916c', textColor: 'white', r: 28 },
  { id: 'pepper', label: 'Black Pepper', sublabel: 'Ingredient', x: 680, y: 160, color: '#52796F', textColor: 'white', r: 26 },
  { id: 'tk1', label: 'Charaka\nSamhita', sublabel: 'TK Record', x: 100, y: 320, color: '#C8961E', textColor: 'white', r: 32 },
  { id: 'tk2', label: 'Sushruta\nSamhita', sublabel: 'TK Record', x: 260, y: 340, color: '#C8961E', textColor: 'white', r: 30 },
  { id: 'bio1', label: 'NBA', sublabel: 'ABS Authority', x: 600, y: 310, color: '#276749', textColor: 'white', r: 28 },
  { id: 'ip', label: 'IP\nAssessment', sublabel: 'Patent · TM', x: 180, y: 440, color: '#1e40af', textColor: 'white', r: 30 },
  { id: 'reg', label: 'FSSAI\nAyush', sublabel: 'Regulatory', x: 400, y: 420, color: '#92400e', textColor: 'white', r: 30 },
  { id: 'market', label: 'Market\nAccess', sublabel: 'IN · EU · US', x: 650, y: 430, color: '#6b21a8', textColor: 'white', r: 28 },
];

const EDGES = [
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
  ['ip', 'reg'],
  ['reg', 'market'],
  ['product', 'reg'],
  ['product', 'ip'],
];

function getNode(id) {
  return NODES.find((n) => n.id === id);
}

export default function KnowledgeMap() {
  const [viewMode, setViewMode] = useState('3d');

  return (
    <Layout title="Knowledge Map" breadcrumb="Tools">
      <div className="page-container">
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="section-label">Knowledge Map</div>
            <h1 className="page-title">Knowledge Map</h1>
            <p className="page-subtitle">
              A visual representation of the relationships between Herbal-X, its ingredients, traditional knowledge, biodiversity, IP, and regulatory pathways.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div style={{ display: 'flex', gap: '4px', background: 'var(--color-surface)', padding: '4px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setViewMode('3d')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                background: viewMode === '3d' ? 'var(--color-primary)' : 'transparent',
                color: viewMode === '3d' ? 'white' : 'var(--color-text)',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Box size={14} /> 3D Interactive
            </button>
            <button
              onClick={() => setViewMode('2d')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                background: viewMode === '2d' ? 'var(--color-primary)' : 'transparent',
                color: viewMode === '2d' ? 'white' : 'var(--color-text)',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Map size={14} /> 2D Schematic
            </button>
          </div>
        </div>

        <DisclaimerBanner />

        {/* 3D View */}
        {viewMode === '3d' ? (
          <div className="mt-6">
            <KnowledgeMap3D />
          </div>
        ) : (
          <div>

        {/* Legend */}
        <div className="card mt-6" style={{ padding: 'var(--space-4) var(--space-6)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Legend:</span>
            {[
              { color: '#1B4332', label: 'Innovation' },
              { color: '#40916c', label: 'Ingredient' },
              { color: '#C8961E', label: 'TK Record' },
              { color: '#276749', label: 'ABS Authority' },
              { color: '#1e40af', label: 'IP Assessment' },
              { color: '#92400e', label: 'Regulatory' },
              { color: '#6b21a8', label: 'Market Access' },
            ].map((l) => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: l.color }} />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 500 }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SVG Graph */}
        <div className="kg-container mt-6">
          <svg width="100%" height="100%" viewBox="0 0 800 500" style={{ overflow: 'visible' }}>
            {/* Edges */}
            {EDGES.map(([from, to], i) => {
              const a = getNode(from);
              const b = getNode(to);
              if (!a || !b) return null;
              return (
                <line
                  key={i}
                  x1={a.x} y1={a.y}
                  x2={b.x} y2={b.y}
                  stroke="var(--color-border)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  opacity="0.6"
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node) => (
              <g key={node.id} style={{ cursor: 'pointer' }}>
                <circle cx={node.x} cy={node.y} r={node.r + 4} fill={node.color} opacity="0.12" />
                <circle cx={node.x} cy={node.y} r={node.r} fill={node.color} />
                {node.label.split('\n').map((line, li) => (
                  <text
                    key={li}
                    x={node.x}
                    y={node.y + (li - (node.label.split('\n').length - 1) / 2) * 13}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={node.textColor}
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="Manrope, Inter, sans-serif"
                  >
                    {line}
                  </text>
                ))}
                <text
                  x={node.x}
                  y={node.y + node.r + 12}
                  textAnchor="middle"
                  fill="var(--color-text-muted)"
                  fontSize="8"
                  fontFamily="Inter, sans-serif"
                >
                  {node.sublabel}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    )}

        {/* Architecture panel */}
        <div className="mt-8">
          <div className="section-header">
            <span className="section-title">System Architecture</span>
          </div>
          <div className="card" style={{ background: 'var(--color-surface)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-1)' }}>
              {[
                { layer: 'USER', desc: 'Ayurvedic innovator' },
                { layer: '↓', desc: '' },
                { layer: 'INNOVATION PASSPORT', desc: 'Structured profile' },
                { layer: '↓', desc: '' },
                { layer: 'CLASSIFICATION ENGINE', desc: 'Category determination' },
                { layer: '↓', desc: '' },
                { layer: 'KNOWLEDGE GRAPH + RAG', desc: 'Entity relationships + retrieval' },
                { layer: '↓', desc: '' },
                { layer: 'EVIDENCE ENGINE', desc: 'Claim validation' },
                { layer: '↓', desc: '' },
                { layer: 'CONFIDENCE ENGINE', desc: 'Evidence quality scoring' },
                { layer: '↓', desc: '' },
                { layer: 'ACTION PLANNER', desc: 'Next steps generation' },
                { layer: '↓', desc: '' },
                { layer: 'EXPERT ESCALATION', desc: 'Human review routing' },
              ].filter(l => l.layer !== '↓').map((l, i) => (
                <div key={i} style={{ textAlign: 'center', padding: 'var(--space-3)', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: '0.05em' }}>{l.layer}</div>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-light)', marginTop: 2 }}>{l.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-5)' }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)', marginBottom: 10 }}>
                Data Sources
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  { name: 'IP India', type: 'Official' },
                  { name: 'Ministry of Ayush', type: 'Official' },
                  { name: 'TKDL (Auth. pathway)', type: 'Official' },
                  { name: 'National Biodiversity Authority', type: 'Official' },
                  { name: 'FSSAI', type: 'Official' },
                  { name: 'CDSCO', type: 'Official' },
                  { name: 'WIPO', type: 'Official' },
                  { name: 'India Code', type: 'Official' },
                  { name: 'Demo / Mock Data', type: 'Demo' },
                ].map((s) => (
                  <span key={s.name} style={{
                    padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 600,
                    background: s.type === 'Official' ? '#f0f7f4' : '#fef3e2',
                    color: s.type === 'Official' ? 'var(--color-primary)' : 'var(--color-accent-dark)',
                    border: `1px solid ${s.type === 'Official' ? '#a7f3d0' : '#fde68a'}`,
                  }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8"><DisclaimerBanner /></div>
      </div>
    </Layout>
  );
}
