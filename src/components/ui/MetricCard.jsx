import { TrendingUp } from 'lucide-react';

export default function MetricCard({ icon: Icon, value, label, change, changePositive, iconBg, iconColor }) {
  return (
    <div className="metric-card">
      <div className="metric-card-icon" style={{ background: iconBg || 'var(--color-surface)', color: iconColor || 'var(--color-primary)' }}>
        <Icon size={22} />
      </div>
      <div className="metric-card-value">{value}</div>
      <div className="metric-card-label">{label}</div>
      {change && (
        <div className="metric-card-change" style={{ color: changePositive ? 'var(--color-success)' : 'var(--color-warning)' }}>
          {change}
        </div>
      )}
    </div>
  );
}
