// EvidenceCard.jsx
import { ExternalLink, Info, ShieldCheck, AlertCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';

function ConfidenceChip({ level }) {
  const cls = {
    High: 'confidence-high',
    Medium: 'confidence-medium',
    Low: 'confidence-low',
    Insufficient: 'confidence-insufficient',
  }[level] || 'confidence-insufficient';

  return (
    <span className={`confidence-indicator ${cls}`} style={{ padding: '2px 10px', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <ShieldCheck size={11} />
      <span className="confidence-label">{level}</span>
    </span>
  );
}

export default function EvidenceCard({ evidence }) {
  return (
    <div className="evidence-card">
      <div className="evidence-card-header">
        <div style={{ flex: 1 }}>
          {evidence.isDemoEvidence && (
            <span className="demo-tag" style={{ marginBottom: 8, display: 'inline-flex' }}>Demo Evidence</span>
          )}
          <p className="evidence-claim">{evidence.claim}</p>
        </div>
        <ConfidenceChip level={evidence.strength} />
      </div>

      <div className="evidence-meta-row">
        <div className="evidence-meta-item">
          <span className="evidence-meta-label">Source</span>
          <span className="evidence-meta-value">{evidence.source}</span>
        </div>
        {evidence.provision && (
          <div className="evidence-meta-item">
            <span className="evidence-meta-label">Provision</span>
            <span className="evidence-meta-value" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{evidence.provision}</span>
          </div>
        )}
        <div className="evidence-meta-item">
          <span className="evidence-meta-label">Authority</span>
          <span className="evidence-meta-value">{evidence.authority}</span>
        </div>
        <div className="evidence-meta-item">
          <span className="evidence-meta-label">Date</span>
          <span className="evidence-meta-value">{evidence.date}</span>
        </div>
        <div className="evidence-meta-item">
          <span className="evidence-meta-label">Status</span>
          <StatusBadge status={evidence.status} />
        </div>
      </div>

      <div className="evidence-actions">
        <button className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <ExternalLink size={12} /> View Source
        </button>
        <button className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Info size={12} /> Why this matters
        </button>
      </div>
    </div>
  );
}
