import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ChevronRight, Info } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatusBadge from '../components/ui/StatusBadge';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import ClassificationPathway3D from '../components/3d/ClassificationPathway3D';
import { DEMO_PRODUCT } from '../data/demo';

const CATEGORIES = [
  {
    id: 'aahara',
    name: 'Ayurveda Aahara / Nutraceutical',
    authority: 'FSSAI + Ministry of Ayush',
    desc: 'Dietary supplements, functional foods, and health supplements based on Ayurvedic principles.',
    selected: true,
  },
  {
    id: 'patent-prop',
    name: 'Patent / Proprietary Medicine',
    authority: 'Ministry of Ayush (CDSCO)',
    desc: 'Ayurvedic medicines with proprietary formulations not in classical texts.',
    selected: false,
  },
  {
    id: 'classical',
    name: 'Classical Medicine',
    authority: 'Ministry of Ayush',
    desc: 'Medicines described in classical Ayurvedic texts; formulation as per shastra.',
    selected: false,
  },
  {
    id: 'phyto',
    name: 'Phytopharmaceutical',
    authority: 'CDSCO',
    desc: 'Plant-derived drugs meeting pharmaceutical quality standards.',
    selected: false,
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic',
    authority: 'CDSCO (Cosmetics Rules)',
    desc: 'Products intended for external application; no therapeutic claims.',
    selected: false,
  },
  {
    id: 'new-drug',
    name: 'New / Non-Classical Drug',
    authority: 'CDSCO',
    desc: 'Novel Ayurvedic drugs not fitting classical formulations; requires clinical data.',
    selected: false,
  },
];

export default function Classification() {
  const p = DEMO_PRODUCT;
  const [selected, setSelected] = useState('aahara');

  return (
    <Layout title="Product Classification" breadcrumb="Innovation Passport">
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Herbal-X · Classification Engine</div>
          <h1 className="page-title">Product Classification</h1>
          <p className="page-subtitle">
            Classification determines the regulatory and intellectual-property pathway for your innovation.
          </p>
        </div>

        <DisclaimerBanner />

        {/* 3D Classification Pathway Animation */}
        <div className="mt-6">
          <ClassificationPathway3D selectedCategory={selected} onSelectCategory={setSelected} />
        </div>

        {/* Preliminary result */}
        <div className="card mt-6" style={{ borderLeft: '4px solid var(--color-primary)', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div className="demo-tag mb-3" style={{ display: 'inline-flex' }}>Demo Product · Herbal-X</div>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-light)', marginBottom: 6 }}>
                Preliminary Classification
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-primary)', marginBottom: 4 }}>
                {p.classification.likelyCategory}
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-light)', marginBottom: 'var(--space-4)' }}>
                Alternate consideration: <strong>{p.classification.alternateCategory}</strong>
              </div>
              <div className="confidence-indicator confidence-medium" style={{ display: 'inline-flex' }}>
                <span className="confidence-label">Confidence: Medium</span>
              </div>
            </div>
            <div style={{ maxWidth: 360 }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-light)', marginBottom: 8 }}>WHY THIS CLASSIFICATION</div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                {p.classification.reasoning}
              </p>
            </div>
          </div>

          <hr className="divider" />

          <div className="grid grid-2 gap-5">
            <div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-light)', marginBottom: 8 }}>INFORMATION NEEDED</div>
              {p.classification.missingInfo.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 6, alignItems: 'flex-start' }}>
                  <AlertTriangle size={13} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} />
                  {m}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-light)', marginBottom: 8 }}>RELEVANT EVIDENCE</div>
              {p.classification.relevantEvidence.map((e, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 6, alignItems: 'flex-start' }}>
                  <Info size={13} style={{ color: 'var(--color-info)', flexShrink: 0, marginTop: 2 }} />
                  {e}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category cards */}
        <div className="mt-8">
          <div className="section-header">
            <span className="section-title">All Candidate Categories</span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-light)' }}>Select a category to explore its pathway</span>
          </div>

          <div className="grid grid-2 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className={`classification-card ${selected === cat.id ? 'selected' : ''}`}
                onClick={() => setSelected(cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected(cat.id); }}
                aria-pressed={selected === cat.id}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-text)' }}>{cat.name}</div>
                  {cat.id === 'aahara' && <span className="badge badge-accent">Likely</span>}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-sage)', fontWeight: 600, marginBottom: 6 }}>{cat.authority}</div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important note */}
        <div className="warning-box mt-6">
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <AlertTriangle size={16} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-warning)', marginBottom: 4 }}>
                Preliminary Classification Only
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                This classification is based on the information provided and is not a legal determination. The appropriate regulatory authority must make the final classification decision. Consult qualified regulatory professionals before proceeding.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
          <Link to="/regulatory" className="btn btn-primary">
            View Regulatory Requirements <ChevronRight size={15} />
          </Link>
          <Link to="/passport/herbalx-001" className="btn btn-ghost">
            Back to Passport
          </Link>
        </div>

        <div className="mt-8"><DisclaimerBanner /></div>
      </div>
    </Layout>
  );
}
