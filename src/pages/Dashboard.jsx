import { Link } from 'react-router-dom';
import {
  Sparkles, FileText, AlertTriangle, FlaskConical,
  Radio, TrendingUp, ArrowRight, Clock, ChevronRight
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import MetricCard from '../components/ui/MetricCard';
import InnovationCard from '../components/ui/InnovationCard';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import { USER, METRICS, ALL_INNOVATIONS, DEMO_PRODUCT } from '../data/demo';

export default function Dashboard() {
  return (
    <Layout title="Dashboard">
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Good morning, {USER.name.split(' ')[0]} 🌿</h1>
          <p className="page-subtitle">Your Ayurvedic Innovation Intelligence Workspace</p>
        </div>

        <DisclaimerBanner minimal />

        {/* Metrics */}
        <div className="grid grid-4 gap-5 mt-6">
          <MetricCard
            icon={FileText}
            value={METRICS.activeInnovations}
            label="Active Innovations"
            change="+1 this month"
            changePositive
            iconBg="#f0f7f4"
            iconColor="var(--color-primary)"
          />
          <MetricCard
            icon={Clock}
            value={METRICS.pendingReviews}
            label="Pending Reviews"
            change="Action required"
            changePositive={false}
            iconBg="#fef3c7"
            iconColor="var(--color-warning)"
          />
          <MetricCard
            icon={FlaskConical}
            value={METRICS.evidenceChecked}
            label="Evidence Checked"
            change="7 this week"
            changePositive
            iconBg="#f0f7f4"
            iconColor="var(--color-sage)"
          />
          <MetricCard
            icon={Radio}
            value={METRICS.regulatoryAlerts}
            label="Regulatory Alerts"
            change="1 critical"
            changePositive={false}
            iconBg="#fee2e2"
            iconColor="var(--color-danger)"
          />
        </div>

        {/* Create Passport Feature Card */}
        <div className="mt-8" style={{
          background: 'var(--color-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-6)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'absolute', bottom: -30, left: 200, width: 120, height: 120, borderRadius: '50%', background: 'rgba(200,150,30,0.12)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>
              Core Feature
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'white', marginBottom: 'var(--space-2)' }}>
              Create Innovation Passport
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-sm)', maxWidth: 500 }}>
              Build a structured IP, compliance and regulatory profile for your Ayurvedic product.
            </p>
          </div>
          <Link to="/passport/create" className="btn btn-accent btn-lg" style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
            <Sparkles size={18} />
            Start Assessment
          </Link>
        </div>

        {/* Recent Regulatory Alert */}
        <div className="mt-8">
          <div className="section-header">
            <span className="section-title">⚠️ Regulatory Alert</span>
            <Link to="/radar" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 600 }}>
              View all in Radar →
            </Link>
          </div>
          <div className="reg-alert high">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 4 }}>
                  FSSAI Draft Amendment — Health Supplements Labelling
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  Mandatory new disclosures for polyherbal supplements may affect Herbal-X labelling timeline.
                </div>
                <div style={{ marginTop: 8, display: 'flex', gap: 'var(--space-3)', fontSize: '10px', color: 'var(--color-text-light)' }}>
                  <span>Authority: FSSAI</span>
                  <span>Published: 2026-07-15</span>
                  <span>Effective: Under consultation</span>
                </div>
              </div>
              <Link to="/radar" className="btn btn-ghost btn-sm" style={{ flexShrink: 0 }}>
                Review <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Innovations */}
        <div className="mt-8">
          <div className="section-header">
            <span className="section-title">Your Innovations</span>
            <Link to="/passport/create" className="btn btn-outline btn-sm">
              <Sparkles size={14} /> New Innovation
            </Link>
          </div>
          <div className="grid grid-3 gap-5">
            {ALL_INNOVATIONS.map((inv) => (
              <InnovationCard key={inv.id} innovation={inv} />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <div className="section-header">
            <span className="section-title">Quick Access</span>
          </div>
          <div className="grid grid-4 gap-4">
            {[
              { to: '/ip-intelligence', label: 'IP Intelligence', desc: 'Patent, trademark, GI assessment' },
              { to: '/tk-abs', label: 'TK & Biodiversity', desc: 'Traditional knowledge review' },
              { to: '/regulatory', label: 'Regulatory', desc: 'Compliance requirements' },
              { to: '/evidence', label: 'Evidence Center', desc: 'Sources and citations' },
            ].map((link) => (
              <Link key={link.to} to={link.to} style={{ textDecoration: 'none' }}>
                <div className="card card-hover">
                  <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 4 }}>{link.label}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-light)' }}>{link.desc}</div>
                  <div style={{ marginTop: 12, color: 'var(--color-primary)', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                    Open <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <DisclaimerBanner />
        </div>
      </div>
    </Layout>
  );
}
