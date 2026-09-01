import { Radio, ChevronRight, CheckCircle, AlertTriangle, Clock, Info } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatusBadge from '../components/ui/StatusBadge';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import { DEMO_PRODUCT } from '../data/demo';

const SEVERITY_CONFIG = {
  high: { color: 'var(--color-danger)', bg: '#fef2f2', label: 'High Impact' },
  medium: { color: 'var(--color-warning)', bg: '#fffbeb', label: 'Medium Impact' },
  low: { color: 'var(--color-info)', bg: '#eff6ff', label: 'Low Impact' },
};

export default function RadarPage() {
  const alerts = DEMO_PRODUCT.radarAlerts;

  return (
    <Layout title="Regulatory Change Radar" breadcrumb="Planning">
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Regulatory Change Radar</div>
          <h1 className="page-title">Regulatory Change Radar</h1>
          <p className="page-subtitle">
            Monitor regulatory developments that may affect your innovation.
          </p>
        </div>

        <DisclaimerBanner />

        {/* Summary */}
        <div className="grid grid-4 gap-4 mt-6">
          {[
            { label: 'Total Alerts', count: alerts.length, color: 'var(--color-text)' },
            { label: 'High Impact', count: alerts.filter(a => a.severity === 'high').length, color: 'var(--color-danger)' },
            { label: 'Medium Impact', count: alerts.filter(a => a.severity === 'medium').length, color: 'var(--color-warning)' },
            { label: 'Low Impact', count: alerts.filter(a => a.severity === 'low').length, color: 'var(--color-info)' },
          ].map((s) => (
            <div key={s.label} className="metric-card">
              <div className="metric-card-value" style={{ color: s.color }}>{s.count}</div>
              <div className="metric-card-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Alert cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
          {alerts.map((alert) => {
            const cfg = SEVERITY_CONFIG[alert.severity];
            return (
              <div key={alert.id} className="reg-alert" style={{ borderLeftColor: cfg.color }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text)' }}>{alert.title}</span>
                      <span className="badge" style={{ background: cfg.bg, color: cfg.color }}>
                        <span className="badge-dot" style={{ background: cfg.color }} />
                        {cfg.label}
                      </span>
                      <StatusBadge status={alert.status} />
                    </div>

                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 10 }}>
                      {alert.impact}
                    </p>

                    <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
                      {[
                        { label: 'Framework', value: alert.framework },
                        { label: 'Authority', value: alert.authority },
                        { label: 'Published', value: alert.published },
                        { label: 'Effective', value: alert.effective },
                        { label: 'Source', value: alert.source },
                        { label: 'Products affected', value: alert.products },
                      ].map((m) => (
                        <div key={m.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-light)' }}>{m.label}</span>
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
                    <button className="btn btn-outline btn-sm">Review Impact <ChevronRight size={12} /></button>
                    <button className="btn btn-ghost btn-sm">Dismiss</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="mt-8">
          <div className="section-header">
            <span className="section-title">Regulatory Timeline</span>
          </div>
          <div className="timeline">
            {alerts.sort((a, b) => new Date(b.published) - new Date(a.published)).map((alert, i) => (
              <div key={alert.id} className="timeline-item">
                <div className="timeline-dot" style={{ background: SEVERITY_CONFIG[alert.severity].color }} />
                <div className="timeline-item-title">{alert.title}</div>
                <div className="timeline-item-meta">{alert.authority} · Published {alert.published} · Effective {alert.effective}</div>
                <div className="timeline-item-desc">{alert.impact}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8"><DisclaimerBanner /></div>
      </div>
    </Layout>
  );
}
