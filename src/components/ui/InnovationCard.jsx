import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function InnovationCard({ innovation }) {
  return (
    <Link to={`/passport/${innovation.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="innovation-card">
        <div className="innovation-card-header">
          <div>
            <div className="innovation-card-name">
              {innovation.name}
              {innovation.isDemo && (
                <span className="demo-tag" style={{ marginLeft: 8 }}>Demo</span>
              )}
            </div>
            <div className="innovation-card-meta">{innovation.classification}</div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-light)', flexShrink: 0 }}>
            {innovation.lastUpdated}
          </div>
        </div>

        <div className="innovation-card-statuses">
          {[
            { key: 'IP Status', val: innovation.ipStatus },
            { key: 'TK / ABS', val: innovation.tkStatus },
            { key: 'Regulatory', val: innovation.regulatoryStatus },
            { key: 'Evidence', val: innovation.evidenceStatus },
          ].map((s) => (
            <div className="innovation-status-item" key={s.key}>
              <span className="innovation-status-key">{s.key}</span>
              <StatusBadge status={s.val} />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
