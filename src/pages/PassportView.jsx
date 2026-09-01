import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, Share2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatusBadge from '../components/ui/StatusBadge';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import { DEMO_PRODUCT } from '../data/demo';

function PassportSection({ title, children }) {
  return (
    <div className="passport-section">
      <div className="passport-section-title">{title}</div>
      {children}
    </div>
  );
}

function FieldRow({ label, value, badge }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)', padding: '10px 0', borderBottom: '1px solid var(--color-border-light)', alignItems: 'center' }}>
      <div style={{ width: 200, fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>
        {label}
      </div>
      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)', flex: 1 }}>
        {badge ? <StatusBadge status={badge} /> : value}
      </div>
    </div>
  );
}

export default function PassportView() {
  const p = DEMO_PRODUCT;
  const [activeSection, setActiveSection] = useState('identity');

  return (
    <Layout title="Innovation Passport" breadcrumb="Innovation Passport">
      <div className="page-container">
        {/* Header bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <div>
            <div className="section-label">Ayurvedic Innovation Passport</div>
            <h1 className="page-title">Herbal-X</h1>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <span className="demo-tag">Demo Product</span>
            <button className="btn btn-ghost btn-sm"><Download size={14} /> Export</button>
            <button className="btn btn-ghost btn-sm"><Share2 size={14} /> Share</button>
          </div>
        </div>

        <DisclaimerBanner />

        <div className="passport-container mt-6">
          {/* Passport Header */}
          <div className="passport-header">
            <div className="passport-emblem">
              Ministry of Ayush · All India Institute of Ayurveda
            </div>
            <div className="passport-title">Ayurvedic Innovation Passport</div>
            <div className="passport-product">{p.name}</div>
            <div className="passport-header-meta">
              <div className="passport-header-field">
                <span className="passport-header-label">Passport ID</span>
                <span className="passport-header-value">{p.passportId}</span>
              </div>
              <div className="passport-header-field">
                <span className="passport-header-label">Organization</span>
                <span className="passport-header-value">{p.organization}</span>
              </div>
              <div className="passport-header-field">
                <span className="passport-header-label">Stage</span>
                <span className="passport-header-value">{p.stage}</span>
              </div>
              <div className="passport-header-field">
                <span className="passport-header-label">Last Updated</span>
                <span className="passport-header-value">{p.lastUpdated}</span>
              </div>
              <div className="passport-header-field">
                <span className="passport-header-label">Overall Status</span>
                <span className="passport-header-value" style={{ color: 'var(--color-accent)' }}>Assessment in Progress</span>
              </div>
            </div>
          </div>

          {/* Status Row */}
          <div className="passport-body">
            <div className="passport-status-row">
              {[
                { label: 'IP Status', value: p.ip.patent.status },
                { label: 'TK Assessment', value: p.tk.overallRisk },
                { label: 'ABS Status', value: p.abs.status },
                { label: 'Regulatory', value: p.regulatory.status },
                { label: 'Evidence', value: `${p.evidence.length} Sources Checked` },
                { label: 'Classification', value: 'Medium Confidence' },
              ].map((s) => (
                <div key={s.label} className="passport-status-item">
                  <span className="passport-status-label">{s.label}</span>
                  <StatusBadge status={s.value} />
                </div>
              ))}
            </div>

            {/* Sections */}
            <PassportSection title="Product Identity">
              <FieldRow label="Product Name" value={p.name} />
              <FieldRow label="Description" value={p.description} />
              <FieldRow label="Organization" value={p.organization} />
              <FieldRow label="Innovation Stage" value={p.stage} />
              <FieldRow label="Traditional Basis" value={p.traditionalBasis} />
              <FieldRow label="Innovation Types" value={p.innovationType.join(', ')} />
              <FieldRow label="Target Markets" value={p.targetMarkets.join(', ')} />
            </PassportSection>

            <PassportSection title="Classification">
              <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-light)', marginBottom: 6 }}>Preliminary Classification</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {p.classification.likelyCategory}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-light)', marginTop: 4 }}>
                      Alternate: {p.classification.alternateCategory}
                    </div>
                  </div>
                  <div className="confidence-indicator confidence-medium">
                    <span className="confidence-label">Confidence: {p.classification.confidence}</span>
                  </div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
                  {p.classification.reasoning}
                </p>
                <Link to="/classification" className="btn btn-outline btn-sm">
                  Review Classification <ChevronRight size={13} />
                </Link>
              </div>
            </PassportSection>

            <PassportSection title="IP Landscape">
              <div className="grid grid-3 gap-4">
                {[
                  { type: 'Patent', status: p.ip.patent.status, note: p.ip.patent.novelty },
                  { type: 'Trademark', status: p.ip.trademark.status, note: p.ip.trademark.suggestion },
                  { type: 'GI Tag', status: p.ip.gi.status, note: p.ip.gi.reasoning },
                ].map((ip) => (
                  <div key={ip.type} className="card" style={{ background: 'var(--color-surface)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--color-sage)', marginBottom: 6 }}>{ip.type}</div>
                    <StatusBadge status={ip.status} />
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 8 }}>{ip.note}</p>
                  </div>
                ))}
              </div>
              <Link to="/ip-intelligence" className="btn btn-outline btn-sm mt-4">
                View Full IP Assessment <ChevronRight size={13} />
              </Link>
            </PassportSection>

            <PassportSection title="Traditional Knowledge">
              <div className="warning-box">
                <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-warning)', marginBottom: 6 }}>
                  Potential traditional knowledge overlap detected.
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  {p.tk.records.length} ingredients have documented traditional knowledge associations. Verification through the authorized TKDL prior-art pathway is recommended.
                </p>
              </div>
              <Link to="/tk-abs" className="btn btn-outline btn-sm mt-4">
                View TK / ABS Assessment <ChevronRight size={13} />
              </Link>
            </PassportSection>

            <PassportSection title="Biodiversity / ABS">
              <FieldRow label="Overall Status" badge={p.abs.status} />
              <FieldRow label="Biological Resources" value={`${p.abs.resources.length} resources require ABS assessment`} />
              <FieldRow label="Primary Authority" value="National Biodiversity Authority (NBA)" />
              <Link to="/tk-abs" className="btn btn-outline btn-sm mt-4">
                Generate ABS Evidence Pack <ChevronRight size={13} />
              </Link>
            </PassportSection>

            <PassportSection title="Regulatory Pathway">
              <FieldRow label="Primary Pathway" value={p.regulatory.primaryPathway} />
              <FieldRow label="Authority" value={p.regulatory.authority} />
              <FieldRow label="Status" badge={p.regulatory.status} />
              <Link to="/regulatory" className="btn btn-outline btn-sm mt-4">
                View Regulatory Intelligence <ChevronRight size={13} />
              </Link>
            </PassportSection>

            <PassportSection title="Evidence">
              <FieldRow label="Sources Checked" value={`${p.evidence.length} authoritative sources`} />
              <FieldRow label="Evidence Strength" value="High (5 sources) · Medium (2 sources)" />
              <Link to="/evidence" className="btn btn-outline btn-sm mt-4">
                View Evidence Center <ChevronRight size={13} />
              </Link>
            </PassportSection>

            <PassportSection title="Action Plan">
              <div className="grid grid-3 gap-4">
                {[
                  { period: '30 Days', items: p.actionPlan.thirtyDays.slice(0, 2) },
                  { period: '60 Days', items: p.actionPlan.sixtyDays.slice(0, 2) },
                  { period: '90 Days', items: p.actionPlan.ninetyDays.slice(0, 2) },
                ].map((plan) => (
                  <div key={plan.period} className="card" style={{ background: 'var(--color-surface)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-sage)', marginBottom: 10 }}>{plan.period}</div>
                    {plan.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--color-accent)', fontWeight: 700, flexShrink: 0 }}>·</span>
                        {item.task}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <Link to="/action-plan" className="btn btn-outline btn-sm mt-4">
                View Full Action Plan <ChevronRight size={13} />
              </Link>
            </PassportSection>

            <PassportSection title="Expert Review">
              <div className="info-box">
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  Expert review is recommended for: patent pathway assessment (Section 3(p) analysis), ABS compliance across multiple State Biodiversity Boards, and EU Novel Food classification.
                </p>
              </div>
              <Link to="/expert-review" className="btn btn-primary btn-sm mt-4">
                Request Expert Review <ChevronRight size={13} />
              </Link>
            </PassportSection>

            <DisclaimerBanner />
          </div>
        </div>
      </div>
    </Layout>
  );
}
