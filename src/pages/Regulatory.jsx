import { BookOpen, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatusBadge from '../components/ui/StatusBadge';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import { DEMO_PRODUCT } from '../data/demo';

const STATUS_ICONS = {
  'Assessment Required': <AlertTriangle size={14} style={{ color: 'var(--color-warning)' }} />,
  'In Progress': <Clock size={14} style={{ color: 'var(--color-info)' }} />,
  'Review Required': <AlertTriangle size={14} style={{ color: 'var(--color-warning)' }} />,
  'Pending decision': <Clock size={14} style={{ color: 'var(--color-info)' }} />,
  'Verified': <CheckCircle size={14} style={{ color: 'var(--color-success)' }} />,
};

function EvidenceStrengthBar({ level }) {
  const bars = { High: 3, Medium: 2, Low: 1 };
  const n = bars[level] || 1;
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          width: 10, height: 10, borderRadius: 2,
          background: i <= n ? (n === 3 ? 'var(--color-success)' : n === 2 ? 'var(--color-accent)' : 'var(--color-danger)') : 'var(--color-border)',
        }} />
      ))}
    </div>
  );
}

export default function Regulatory() {
  const p = DEMO_PRODUCT;

  return (
    <Layout title="Regulatory Intelligence" breadcrumb="Intelligence">
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Herbal-X · Regulatory Intelligence</div>
          <h1 className="page-title">Regulatory Intelligence</h1>
          <p className="page-subtitle">
            Applicable regulatory framework, requirements, and compliance status for Herbal-X.
          </p>
        </div>

        <DisclaimerBanner />

        {/* Applicable Framework */}
        <div className="card mt-6" style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-xl)', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 6 }}>
                Applicable Framework
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'white', marginBottom: 4 }}>
                {p.regulatory.primaryPathway}
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.65)' }}>
                Primary authority: {p.regulatory.authority}
              </div>
            </div>
            <div>
              <StatusBadge status={p.regulatory.status} />
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
                Final pathway subject to classification confirmation
              </div>
            </div>
          </div>
        </div>

        {/* Requirements Table */}
        <div className="mt-8">
          <div className="section-header">
            <span className="section-title">Regulatory Requirements</span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-light)' }}>All requirements are preliminary — confirm with qualified regulatory professional</span>
          </div>

          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 3fr 1.2fr 1fr', gap: 0, background: 'var(--color-surface)', padding: '12px 20px', borderBottom: '1px solid var(--color-border-light)' }}>
              {['Area', 'Authority', 'Requirement', 'Status', 'Evidence'].map((h) => (
                <div key={h} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-light)' }}>{h}</div>
              ))}
            </div>

            {p.regulatory.requirements.map((req, idx) => (
              <div key={idx} style={{
                display: 'grid', gridTemplateColumns: '1.5fr 2fr 3fr 1.2fr 1fr', gap: 0,
                padding: '16px 20px', borderBottom: idx < p.regulatory.requirements.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                background: idx % 2 === 0 ? 'white' : 'var(--color-secondary)',
                alignItems: 'center',
              }}>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{req.area}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{req.authority}</div>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 2 }}>{req.regulation}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-light)' }}>{req.requirement}</div>
                </div>
                <div>{STATUS_ICONS[req.status]} <StatusBadge status={req.status} /></div>
                <div><EvidenceStrengthBar level={req.evidence} /></div>
              </div>
            ))}
          </div>
        </div>

        {/* Key regulations */}
        <div className="mt-8">
          <div className="section-header">
            <span className="section-title">Key Regulatory References</span>
          </div>
          <div className="grid grid-2 gap-4">
            {[
              { name: 'Drugs and Cosmetics Act, 1940', authority: 'CDSCO / Ministry of Health', relevance: 'Manufacturing and drug standards', note: 'Schedule T — GMP for Ayurvedic drugs' },
              { name: 'FSS (Health Supplements...) Regulations, 2022', authority: 'FSSAI', relevance: 'Nutraceutical classification and labelling', note: 'Applicable if classified as health supplement' },
              { name: 'Drugs and Magic Remedies Act, 1954', authority: 'Ministry of Ayush', relevance: 'Advertising restrictions', note: 'Prohibited disease claims and endorsements' },
              { name: 'FSS (Labelling & Display) Regulations, 2020', authority: 'FSSAI', relevance: 'Label requirements', note: 'Mandatory information and health claim limits' },
            ].map((ref) => (
              <div key={ref.name} className="card">
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-primary)', marginBottom: 4 }}>{ref.name}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-sage)', fontWeight: 600, marginBottom: 6 }}>{ref.authority}</div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 6 }}>{ref.relevance}</p>
                <div style={{ padding: '4px 10px', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', fontSize: '11px', color: 'var(--color-text-muted)', display: 'inline-block' }}>
                  {ref.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8"><DisclaimerBanner /></div>
      </div>
    </Layout>
  );
}
