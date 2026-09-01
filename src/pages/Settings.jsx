import { Settings as SettingsIcon, User, Bell, Globe, Shield, Database, Info } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { USER } from '../data/demo';

export default function Settings() {
  return (
    <Layout title="Settings" breadcrumb="Tools">
      <div className="page-container" style={{ maxWidth: 800 }}>
        <div className="page-header">
          <h1 className="page-title">Settings & Profile</h1>
          <p className="page-subtitle">Manage your account, preferences, and platform settings.</p>
        </div>

        {/* Profile */}
        <div className="card mb-6">
          <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 'var(--text-xl)', color: 'white' }}>
              {USER.initials}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--text-xl)', color: 'var(--color-text)' }}>{USER.name}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{USER.role}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{USER.organization}</div>
            </div>
          </div>
          <div className="grid grid-2 gap-4">
            {[
              { label: 'Full Name', value: USER.name },
              { label: 'Role', value: USER.role },
              { label: 'Department', value: 'Ayurvedic Innovation & Regulatory Intelligence' },
              { label: 'Organization', value: USER.organization },
            ].map((f) => (
              <div key={f.label} className="form-group">
                <label className="form-label">{f.label}</label>
                <input className="form-input" value={f.value} readOnly />
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="card mb-6">
          <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-5)' }}>Preferences & Alerts</h4>
          <div className="grid grid-2 gap-5">
            <div className="form-group">
              <label className="form-label">Interface Language</label>
              <select className="form-input form-select" defaultValue="en">
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="ta" disabled>Tamil — Phase 5</option>
                <option value="te" disabled>Telugu — Phase 5</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Default Jurisdiction</label>
              <select className="form-input form-select" defaultValue="India">
                <option>India</option>
                <option>European Union</option>
                <option>United States</option>
              </select>
            </div>
          </div>
        </div>

        {/* Platform info */}
        <div className="card mb-6" style={{ background: 'var(--color-surface)' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Platform Information</h4>
          {[
            { label: 'Platform', value: 'IP-SAKTI Sahayak' },
            { label: 'Edition', value: 'Enterprise Intelligence Suite' },
            { label: 'Version', value: 'v1.0.0 (Production Release)' },
            { label: 'Scope', value: 'Ayurvedic IP, Traditional Knowledge, ABS & Regulatory Intelligence' },
            { label: 'Organization', value: 'Ministry of Ayush / All India Institute of Ayurveda' },
            { label: 'Intelligence Engine', value: 'Evidence Verification & Knowledge Graph Engine' },
            { label: 'Build', value: '2026-08-30' },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', gap: 'var(--space-6)', padding: '8px 0', borderBottom: '1px solid var(--color-border-light)', alignItems: 'center' }}>
              <div style={{ width: 180, fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-light)', flexShrink: 0 }}>{row.label}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{row.value}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <Info size={16} style={{ color: '#d97706', flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 'var(--text-sm)', color: '#78350f' }}>
              <strong>IP-SAKTI Sahayak</strong> provides information and decision-support based on available sources. It does not provide legal advice or guarantee regulatory approval, patentability, registration, or market access. Always consult qualified IP, regulatory, and legal professionals before making any commercialization or IP decision.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
