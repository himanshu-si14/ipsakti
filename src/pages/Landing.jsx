import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Leaf, BookOpen, Globe, FlaskConical,
  CheckCircle, Sparkles, FileText, Zap
} from 'lucide-react';
import KnowledgeCore3D from '../components/3d/KnowledgeCore3D';
import BotanicalParticles from '../components/3d/BotanicalParticles';
import ScrollStorySection from '../components/3d/ScrollStorySection';
import SahayakOrbButton from '../components/layout/SahayakOrbButton';

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
    <div className="landing-page" style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Subtle Floating Botanical Particles */}
      <BotanicalParticles count={45} opacity={0.4} />

      {/* Nav */}
      <nav className="landing-nav" style={{ position: 'relative', zIndex: 10 }}>
        <div className="landing-nav-brand">
          IP-SAKTI <span>Sahayak</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            Ministry of Ayush · All India Institute of Ayurveda
          </span>
          <Link to="/dashboard" className="btn btn-primary btn-sm">
            Go to Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section with 3D Knowledge Core */}
      <div className="landing-hero" style={{ position: 'relative', zIndex: 10, alignItems: 'center', gap: 'var(--space-8)' }}>
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
            An evidence-first intelligence platform for Ayurvedic intellectual property, traditional knowledge, biodiversity, regulatory and market-access guidance.
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

          <div
            style={{
              marginTop: 'var(--space-6)',
              padding: 'var(--space-3) var(--space-4)',
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-xs)',
              color: '#78350f',
            }}
          >
            IP-SAKTI Sahayak provides information and decision-support based on available sources. It does not provide legal advice or guarantee regulatory approval, patentability, registration, or market access.
          </div>
        </div>

        {/* Major 3D Knowledge Core */}
        <div style={{ position: 'relative', width: '100%', height: '480px' }}>
          <KnowledgeCore3D />
        </div>
      </div>

      {/* 3D Scroll Storytelling: The Ayurvedic Innovation Journey */}
      <ScrollStorySection />

      {/* Features Grid */}
      <div style={{ background: 'var(--color-surface)', padding: '0 var(--space-12) var(--space-16)', position: 'relative', zIndex: 10 }}>
        <div className="landing-section" style={{ padding: 'var(--space-16) 0' }}>
          <div className="landing-section-label">Platform Capabilities</div>
          <h2 className="landing-section-title">Everything your Ayurvedic innovation needs</h2>
          <p className="landing-section-subtitle">
            Built for AYUSH innovators, researchers, startups, MSMEs and practitioners.
          </p>

          <div className="grid grid-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="card" style={{ transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-md)',
                    background: '#f0f7f4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--space-4)',
                    color: 'var(--color-primary)',
                  }}
                >
                  <f.icon size={22} />
                </div>
                <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--color-text)' }}>
                  {f.title}
                </h5>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ background: 'var(--color-primary)', padding: 'var(--space-16) var(--space-12)', textAlign: 'center', position: 'relative', zIndex: 10 }}>
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
      <div className="landing-footer" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ marginBottom: 8 }}>
          <strong>IP-SAKTI Sahayak</strong> · Evidence-backed intelligence for Ayurvedic innovation.
        </div>
        <div>Ministry of Ayush · All India Institute of Ayurveda</div>
        <div style={{ marginTop: 8, fontSize: '10px' }}>
          IP-SAKTI Sahayak provides information and decision-support based on available sources. It does not provide legal advice or guarantee regulatory approval, patentability, registration, or market access.
        </div>
      </div>

      {/* Global Floating Sahayak Assistant */}
      <SahayakOrbButton />
    </div>
  );
}
