import { useState } from 'react';
import { FlaskConical, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import EvidenceCard from '../components/ui/EvidenceCard';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import EvidenceWall3D from '../components/3d/EvidenceWall3D';
import RAGVisualizer3D from '../components/3d/RAGVisualizer3D';
import { DEMO_PRODUCT } from '../data/demo';

const STRENGTH_LEVELS = ['All', 'High', 'Medium', 'Low'];

export default function EvidenceCenter() {
  const [filter, setFilter] = useState('All');
  const evidence = DEMO_PRODUCT.evidence;

  const filtered = filter === 'All' ? evidence : evidence.filter((e) => e.strength === filter);

  const counts = {
    All: evidence.length,
    High: evidence.filter((e) => e.strength === 'High').length,
    Medium: evidence.filter((e) => e.strength === 'Medium').length,
    Low: evidence.filter((e) => e.strength === 'Low').length,
  };

  return (
    <Layout title="Evidence Center" breadcrumb="Intelligence">
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Herbal-X · Evidence Center</div>
          <h1 className="page-title">Evidence Center</h1>
          <p className="page-subtitle">
            Every claim is backed by authoritative sources. All evidence is traceable to Acts, regulations, and official guidance.
          </p>
        </div>

        <DisclaimerBanner />

        {/* 3D Evidence Wall */}
        <div className="mt-6">
          <EvidenceWall3D evidenceList={evidence} />
        </div>

        {/* 3D RAG Architecture: How Sahayak Builds an Answer */}
        <div className="mt-6">
          <RAGVisualizer3D />
        </div>

        {/* Confidence explanation */}
        <div className="card mt-6">
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>
            Evidence Confidence System
          </div>
          <div className="grid grid-4 gap-4">
            {[
              { level: 'High', desc: 'Official Acts, regulations, gazette notifications from authoritative government sources', cls: 'confidence-high' },
              { level: 'Medium', desc: 'Government guidance, secondary regulatory sources, research-backed references', cls: 'confidence-medium' },
              { level: 'Low', desc: 'Limited sources, jurisdiction mismatch, outdated references, or conflicting information', cls: 'confidence-low' },
              { level: 'Insufficient', desc: 'Evidence is inadequate to support a reliable assessment. Human review required.', cls: 'confidence-insufficient' },
            ].map((c) => (
              <div key={c.level} className={`confidence-indicator ${c.cls}`} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                <div className="confidence-label">{c.level}</div>
                <p style={{ fontSize: '11px', lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            <Filter size={15} /> Filter by strength:
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {STRENGTH_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`btn btn-sm ${filter === level ? 'btn-primary' : 'btn-ghost'}`}
              >
                {level} <span style={{ opacity: 0.7, marginLeft: 4 }}>({counts[level]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Evidence Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
          {filtered.map((ev) => (
            <EvidenceCard key={ev.id} evidence={ev} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon"><FlaskConical size={28} /></div>
            <h5 className="empty-state-title">No evidence at this level</h5>
            <p className="empty-state-desc">Try a different filter or add more sources.</p>
          </div>
        )}

        {/* Missing evidence note */}
        <div className="warning-box mt-6">
          <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-warning)', marginBottom: 6 }}>Insufficient Evidence Areas</div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            The following areas currently have insufficient evidence to support a reliable assessment: <strong>EU Novel Food classification, US NDI notification requirements, ABS cross-state compliance.</strong> Additional specialist sources are required. Human review recommended.
          </p>
        </div>

        <div className="mt-8"><DisclaimerBanner /></div>
      </div>
    </Layout>
  );
}
