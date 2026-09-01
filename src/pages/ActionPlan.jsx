import { CheckCircle, Circle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import { DEMO_PRODUCT } from '../data/demo';

const PRIORITY_COLOR = {
  Critical: 'var(--color-danger)',
  High: 'var(--color-warning)',
  Medium: 'var(--color-info)',
  Low: 'var(--color-text-light)',
};

function ActionGroup({ period, color, items }) {
  return (
    <div className="card">
      <div style={{
        display: 'inline-block', padding: '4px 12px', borderRadius: 'var(--radius-full)',
        background: color, color: 'white',
        fontWeight: 800, fontSize: 'var(--text-sm)', fontFamily: 'var(--font-heading)',
        marginBottom: 'var(--space-5)',
      }}>
        {period}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {items.map((item, i) => (
          <div key={i} className="action-card">
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Circle size={14} style={{ color: PRIORITY_COLOR[item.priority] }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 2 }}>{item.task}</div>
              <div style={{ display: 'flex', gap: 12, fontSize: '11px', color: 'var(--color-text-light)' }}>
                <span style={{ color: PRIORITY_COLOR[item.priority], fontWeight: 700 }}>{item.priority}</span>
                <span>·</span>
                <span>{item.assignee}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ActionPlan() {
  const plan = DEMO_PRODUCT.actionPlan;

  return (
    <Layout title="Action Plan" breadcrumb="Planning">
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Herbal-X · Action Plan</div>
          <h1 className="page-title">Your Next Steps</h1>
          <p className="page-subtitle">
            A structured action plan based on the preliminary Innovation Passport assessment. Prioritize Critical and High items first.
          </p>
        </div>

        <DisclaimerBanner />

        {/* Summary */}
        <div className="grid grid-4 gap-4 mt-6">
          {[
            { label: 'Critical', count: [...plan.thirtyDays, ...plan.sixtyDays, ...plan.ninetyDays].filter(i => i.priority === 'Critical').length, color: 'var(--color-danger)' },
            { label: 'High', count: [...plan.thirtyDays, ...plan.sixtyDays, ...plan.ninetyDays].filter(i => i.priority === 'High').length, color: 'var(--color-warning)' },
            { label: 'Medium', count: [...plan.thirtyDays, ...plan.sixtyDays, ...plan.ninetyDays].filter(i => i.priority === 'Medium').length, color: 'var(--color-info)' },
            { label: 'Low', count: [...plan.thirtyDays, ...plan.sixtyDays, ...plan.ninetyDays].filter(i => i.priority === 'Low').length, color: 'var(--color-text-light)' },
          ].map((s) => (
            <div key={s.label} className="metric-card">
              <div className="metric-card-value" style={{ color: s.color }}>{s.count}</div>
              <div className="metric-card-label">{s.label} Priority</div>
            </div>
          ))}
        </div>

        <div className="grid grid-3 gap-6 mt-8">
          <ActionGroup period="30 Days" color="var(--color-danger)" items={plan.thirtyDays} />
          <ActionGroup period="60 Days" color="var(--color-accent)" items={plan.sixtyDays} />
          <ActionGroup period="90 Days" color="var(--color-primary)" items={plan.ninetyDays} />
        </div>

        <div className="info-box mt-6">
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            This action plan is generated from the preliminary Innovation Passport assessment. Actions and timelines should be confirmed with qualified legal, regulatory, and IP professionals before implementation.
          </p>
        </div>

        <div className="mt-8"><DisclaimerBanner /></div>
      </div>
    </Layout>
  );
}
