// StatusBadge.jsx
export default function StatusBadge({ status }) {
  const map = {
    'Verified': 'badge-verified',
    'Compliant': 'badge-verified',
    'Registered': 'badge-verified',
    'Documented': 'badge-verified',
    'Review Required': 'badge-review',
    'Potential Overlap': 'badge-review',
    'Assessment Required': 'badge-review',
    'Verify through TKDL pathway': 'badge-review',
    'Verify through authorized pathway': 'badge-review',
    'Requires specialist review': 'badge-review',
    'In Progress': 'badge-progress',
    'Application Filed': 'badge-progress',
    'Pathway Identified': 'badge-progress',
    'Preliminary Pathway Identified': 'badge-progress',
    'Monitor': 'badge-progress',
    'Not Applicable': 'badge-neutral',
    'Pending decision': 'badge-neutral',
    'Pending Expert Assignment': 'badge-neutral',
    'Insufficient Evidence': 'badge-insufficient',
    'DEMO': 'badge-accent',
  };

  const cls = map[status] || 'badge-neutral';

  return (
    <span className={`badge ${cls}`}>
      <span className="badge-dot" />
      {status}
    </span>
  );
}
