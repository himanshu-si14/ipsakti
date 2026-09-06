import { useState } from 'react';
import { Shield, Tag, Star, Copyright, MapPin, Lock, ChevronRight, AlertTriangle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatusBadge from '../components/ui/StatusBadge';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import IPIntelligence3D from '../components/3d/IPIntelligence3D';
import { DEMO_PRODUCT } from '../data/demo';

const IP_TYPES = [
  {
    id: 'patent',
    icon: Shield,
    title: 'Patent',
    desc: 'Assess potential patent pathway',
    status: 'Review Required',
  },
  {
    id: 'trademark',
    icon: Tag,
    title: 'Trademark',
    desc: 'Explore brand protection',
    status: 'In Progress',
  },
  {
    id: 'design',
    icon: Star,
    title: 'Design',
    desc: 'Evaluate design protection',
    status: 'Assessment Required',
  },
  {
    id: 'copyright',
    icon: Copyright,
    title: 'Copyright',
    desc: 'Identify applicable creative protection',
    status: 'Not Applicable',
  },
  {
    id: 'gi',
    icon: MapPin,
    title: 'Geographical Indication',
    desc: 'Explore GI relevance',
    status: 'Not Applicable',
  },
  {
    id: 'trade-secret',
    icon: Lock,
    title: 'Trade Secret',
    desc: 'Consider confidential know-how protection',
    status: 'Assessment Required',
  },
];

export default function IPIntelligence() {
  const [activeType, setActiveType] = useState('patent');
  const p = DEMO_PRODUCT;
  const ip = p.ip;

  return (
    <Layout title="IP Intelligence" breadcrumb="Intelligence">
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Herbal-X · IP Intelligence</div>
          <h1 className="page-title">Protect Your Innovation</h1>
          <p className="page-subtitle">
            Assess your available intellectual property pathways.
          </p>
        </div>

        <DisclaimerBanner />

        {/* 3D IP Topology Explorer */}
        <div className="mt-6">
          <IPIntelligence3D activeType={activeType} onSelectType={setActiveType} />
        </div>

        {/* IP Type Cards */}
        <div className="grid grid-3 gap-4 mt-6">
          {IP_TYPES.map((type) => (
            <div
              key={type.id}
              className={`ip-card ${activeType === type.id ? 'selected' : ''}`}
              onClick={() => setActiveType(type.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveType(type.id); }}
              aria-pressed={activeType === type.id}
              style={activeType === type.id ? { border: '1.5px solid var(--color-primary)', background: '#f0f7f4' } : {}}
            >
              <div className="ip-card-icon">
                <type.icon size={22} />
              </div>
              <div className="ip-card-title">{type.title}</div>
              <div className="ip-card-desc">{type.desc}</div>
              <div style={{ marginTop: 'var(--space-3)' }}>
                <StatusBadge status={type.status} />
              </div>
            </div>
          ))}
        </div>

        {/* Patent Detail */}
        {activeType === 'patent' && (
          <div className="card mt-6" style={{ borderRadius: 'var(--radius-xl)' }}>
            <div className="demo-tag mb-4" style={{ display: 'inline-flex' }}>Herbal-X · Patent Assessment</div>

            <div className="warning-box mb-5">
              <div style={{ display: 'flex', gap: 10 }}>
                <AlertTriangle size={15} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  <strong>Preliminary assessment indicates</strong> potential for process-level patent protection, subject to novelty and inventive step determination. Human IP review recommended.
                </p>
              </div>
            </div>

            <div className="grid grid-2 gap-6">
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>
                  Patent Assessment
                </h4>

                {[
                  { label: 'Novelty', value: ip.patent.novelty, conf: 'Medium' },
                  { label: 'Inventive Step', value: ip.patent.inventiveStep, conf: 'Low' },
                  { label: 'TK Overlap', value: ip.patent.tkOverlap, conf: null, warning: true },
                  { label: 'Overall Confidence', value: 'Low — specialist assessment required', conf: 'Low' },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid var(--color-border-light)', gap: 12 }}>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.06em', width: 140, flexShrink: 0 }}>{row.label}</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: row.warning ? 'var(--color-danger)' : 'var(--color-text)', flex: 1 }}>{row.value}</div>
                    {row.conf && (
                      <span className={`confidence-indicator confidence-${row.conf.toLowerCase()}`} style={{ padding: '2px 8px', display: 'inline-flex' }}>
                        <span className="confidence-label" style={{ fontSize: '10px' }}>{row.conf}</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>
                  Patentability Concerns
                </h4>
                {ip.patent.concerns.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', alignItems: 'flex-start' }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#fee2e2', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>!</span>
                    {c}
                  </div>
                ))}

                <div className="info-box mt-4">
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-sage)', marginBottom: 6 }}>REQUIRED EVIDENCE</div>
                  <ul style={{ listStyle: 'none', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    {['Detailed extraction process documentation', 'TKDL prior-art search results', 'Comparative efficacy data', 'Novelty claim specification'].map((e) => (
                      <li key={e} style={{ marginBottom: 4, display: 'flex', gap: 8 }}>
                        <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>·</span>{e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', color: '#78350f' }}>
              <strong>Never state: "Your invention is patentable."</strong> This preliminary assessment must be reviewed by a registered patent agent or attorney. Section 3(p) of the Patents Act, 1970 prohibits patents on traditional knowledge.
            </div>
          </div>
        )}

        {activeType === 'trademark' && (
          <div className="card mt-6" style={{ borderRadius: 'var(--radius-xl)' }}>
            <div className="demo-tag mb-4" style={{ display: 'inline-flex' }}>Herbal-X · Trademark Assessment</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Trademark Protection</h4>
            <div className="success-box mb-4">
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                Preliminary assessment: <strong>"Herbal-X"</strong> appears to be a registrable trademark in Class 5 (pharmaceutical preparations) and Class 30 (health supplements). Prior-art search on IP India Trademark Registry recommended.
              </p>
            </div>
            {[
              { label: 'Proposed Mark', value: '"Herbal-X"' },
              { label: 'Applicable Class', value: 'Class 5, Class 30 (NICE Classification)' },
              { label: 'Registry', value: 'Trade Marks Registry, IP India' },
              { label: 'Distinctiveness', value: 'Medium — "Herbal" is descriptive; combination may be distinctive' },
              { label: 'Status', value: 'In Progress' },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--color-border-light)' }}>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-light)', width: 180, flexShrink: 0 }}>{row.label}</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{row.value === 'In Progress' ? <StatusBadge status={row.value} /> : row.value}</div>
              </div>
            ))}
          </div>
        )}

        {(activeType === 'gi' || activeType === 'copyright') && (
          <div className="card mt-6" style={{ borderRadius: 'var(--radius-xl)' }}>
            <div className="demo-tag mb-4" style={{ display: 'inline-flex' }}>Herbal-X</div>
            <div className="info-box">
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                {activeType === 'gi'
                  ? 'Geographical Indication protection does not appear applicable for Herbal-X. The multi-origin ingredient sourcing and novel extraction process are not tied to a specific geographical area.'
                  : 'Copyright protection is generally not applicable to pharmaceutical or nutraceutical formulations. It may be relevant for original marketing materials, packaging design, and documentation.'}
              </p>
            </div>
          </div>
        )}

        {(activeType === 'design' || activeType === 'trade-secret') && (
          <div className="card mt-6" style={{ borderRadius: 'var(--radius-xl)' }}>
            <div className="demo-tag mb-4" style={{ display: 'inline-flex' }}>Herbal-X</div>
            <div className="warning-box">
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                {activeType === 'design'
                  ? 'Design protection (Designs Act, 2000) may be applicable for distinctive packaging or delivery device. Assessment requires final packaging design. Insufficient information to assess at this stage.'
                  : 'Trade secret protection may apply to the cold-press extraction process and standardization protocol. This does not require registration but requires active confidentiality measures. Assess before public disclosure.'}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8"><DisclaimerBanner /></div>
      </div>
    </Layout>
  );
}
