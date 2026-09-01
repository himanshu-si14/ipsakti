import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Leaf, BookOpen, Globe, FlaskConical,
  CheckCircle, Sparkles, FileText, Zap
} from 'lucide-react';

const JOURNEY_STEPS = [
  { id: 'discover', label: 'Discover', desc: 'Identify your innovation', color: '#1B4332', bg: '#f0f7f4', icon: Sparkles },
  { id: 'classify', label: 'Classify', desc: 'Determine product category', color: '#2d6a4f', bg: '#e8f5ee', icon: Zap },
  { id: 'protect', label: 'Protect', desc: 'IP pathways & TK review', color: '#40916c', bg: '#d8f3e3', icon: Shield },
  { id: 'comply', label: 'Comply', desc: 'Regulatory requirements', color: '#52796F', bg: '#e2ede9', icon: BookOpen },
  { id: 'commercialize', label: 'Commercialize', desc: 'Market access strategy', color: '#C8961E', bg: '#fef3e2', icon: Globe },
  { id: 'monitor', label: 'Monitor', desc: 'Regulatory change radar', color: '#92400e', bg: '#fef3c7', icon: FlaskConical },
];

const FEATURES = [
  {
    icon: FileText,
    title: 'Ayurvedic Innovation Passport',
    desc: 'A structured profile covering classification, IP, TK/ABS, regulatory, evidence, and action plan — all in one place.',
  },
  {
    icon: Shield,
    title: 'IP Intelligence',
    desc: 'Preliminary assessment of patent, trademark, GI, design, and trade secret pathways with evidence-backed reasoning.',
  },
  {
    icon: Leaf,
    title: 'Traditional Knowledge & ABS',
    desc: 'Identify potential TK overlap and biodiversity compliance requirements before they become obstacles.',
  },
  {
    icon: BookOpen,
    title: 'Regulatory Intelligence',
    desc: 'Navigate FSSAI, Ministry of Ayush, CDSCO, and international regulatory frameworks with precision.',
  },
  {
    icon: Globe,
    title: 'Market Access',
    desc: 'Compare regulatory and IP requirements across India, EU, USA, and Middle East jurisdictions.',
  },
  {
    icon: FlaskConical,
    title: 'Evidence Center',
    desc: 'Every claim is backed by authoritative sources — Acts, regulations, guidance — with citations and confidence levels.',
  },
];

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          IP-SAKTI <span>Sahayak</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Ministry of Ayush · All India Institute of Ayurveda</span>
          <Link to="/dashboard" className="btn btn-primary btn-sm">
            Go to Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="landing-hero">
        <div>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            From Ayurvedic Innovation to Compliant Commercialization
          </div>

          <h1 className="hero-title">
            <span className="hero-title-accent">IP-SAKTI</span>
            <br />
            <span className="hero-title-sub">Sahayak</span>
          </h1>

          <p className="hero-subtitle">
            Navigate intellectual property, traditional knowledge, biodiversity, regulatory requirements and market access through evidence-backed intelligence.
          </p>

          <div className="hero-ctas">
            <Link to="/passport/create" className="btn btn-primary btn-lg">
              <Sparkles size={18} />
              Create Innovation Passport
            </Link>
            <Link to="/passport/herbalx-001" className="btn btn-outline btn-lg">
              Explore Platform
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="hero-trust-row">
            {['Evidence-First', 'Sources Cited', 'TK/ABS Aware', 'Multilingual'].map((t) => (
              <div key={t} className="trust-badge">
                <span className="trust-badge-dot" />
                {t}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-3) var(--space-4)', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', color: '#78350f' }}>
            Information only — not legal advice. Consult qualified IP, regulatory, and legal professionals.
          </div>
        </div>

        <div className="hero-visual">
          <div className="journey-visual">
            {JOURNEY_STEPS.map((step, idx) => (
              <div key={step.id}>
                <div className="journey-visual-step">
                  <div className="journey-step-badge" style={{ background: step.bg, color: step.color }}>
                    <step.icon size={18} />
                  </div>
                  <div className="journey-step-info">
                    <div className="journey-step-name">{step.label}</div>
                    <div className="journey-step-desc">{step.desc}</div>
                  </div>
                  {idx < JOURNEY_STEPS.length - 1 && (
                    <CheckCircle size={14} style={{ color: 'var(--color-border)', flexShrink: 0 }} />
                  )}
                </div>
                {idx < JOURNEY_STEPS.length - 1 && (
                  <div className="journey-visual-connector" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: 'var(--color-surface)', padding: '0 var(--space-12) var(--space-16)' }}>
        <div className="landing-section" style={{ padding: 'var(--space-16) 0' }}>
          <div className="landing-section-label">Platform Capabilities</div>
          <h2 className="landing-section-title">Everything your Ayurvedic innovation needs</h2>
          <p className="landing-section-subtitle">
            Built for AYUSH innovators, researchers, startups, MSMEs and practitioners.
          </p>

          <div className="grid grid-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="card">
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: '#f0f7f4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
                  <f.icon size={22} />
                </div>
                <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--color-text)' }}>{f.title}</h5>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ background: 'var(--color-primary)', padding: 'var(--space-16) var(--space-12)', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 'var(--space-4)' }}>
            Start Now
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'white', marginBottom: 'var(--space-4)', letterSpacing: '-0.02em' }}>
            Create your first Innovation Passport
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-base)' }}>
            Build a structured compliance and IP profile for your Ayurvedic product in minutes.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/passport/create" className="btn btn-accent btn-lg">
              <Sparkles size={18} /> Create Innovation Passport
            </Link>
            <Link to="/dashboard" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.10)', color: 'white', border: '1.5px solid rgba(255,255,255,0.20)' }}>
              View Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="landing-footer">
        <div style={{ marginBottom: 8 }}>
          <strong>IP-SAKTI Sahayak</strong> · Evidence-backed intelligence for Ayurvedic innovation.
        </div>
        <div>Ministry of Ayush · All India Institute of Ayurveda</div>
        <div style={{ marginTop: 8, fontSize: '10px' }}>
          This platform provides information and decision-support only. It does not provide legal advice or guarantee regulatory approval, patentability, registration, or market access.
        </div>
      </div>
    </div>
  );
}
