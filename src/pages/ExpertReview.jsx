import { AlertTriangle, Users, Send } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatusBadge from '../components/ui/StatusBadge';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import ExpertCaseFile3D from '../components/3d/ExpertCaseFile3D';
import { showToast } from '../components/ui/Toast';
import { DEMO_PRODUCT } from '../data/demo';

export default function ExpertReview() {
  const expertCase = DEMO_PRODUCT.expertCase;

  const handleRequest = () => {
    showToast('Expert review request submitted — Demo workflow. In Phase 2, this will connect to a qualified expert network.', 'info');
  };

  return (
    <Layout title="Expert Review" breadcrumb="Planning">
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Herbal-X · Expert Escalation</div>
          <h1 className="page-title">Expert Review</h1>
          <p className="page-subtitle">
            Complex issues identified during assessment have been escalated for expert review.
          </p>
        </div>

        <DisclaimerBanner />

        {/* 3D Case File Object */}
        <div className="mt-6">
          <ExpertCaseFile3D caseData={expertCase} onRequestReview={handleRequest} />
        </div>

        {/* Trigger reasons */}
        <div className="warning-box mt-6">
          <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-warning)', marginBottom: 8 }}>
            Expert Review Triggered
          </div>
          <div className="grid grid-2 gap-3">
            {[
              'Patentability uncertainty — Section 3(p) TK bar',
              'Low evidence confidence in patent assessment',
              'ABS compliance across multiple jurisdictions',
              'International regulatory uncertainty (EU Novel Food)',
              'Conflicting classification indicators',
            ].map((reason, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', alignItems: 'flex-start' }}>
                <AlertTriangle size={13} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} />
                {reason}
              </div>
            ))}
          </div>
        </div>

        {/* Case Summary */}
        <div className="card mt-6" style={{ borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-5)' }}>
            <div>
              <div className="demo-tag mb-2" style={{ display: 'inline-flex' }}>Demo Workflow</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'var(--text-xl)', color: 'var(--color-text)' }}>
                Case Summary
              </h3>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Case ID: {expertCase.id}</div>
            </div>
            <StatusBadge status={expertCase.status} />
          </div>

          <div className="grid grid-2 gap-6">
            <div>
              {[
                { label: 'Product', value: expertCase.product },
                { label: 'Classification', value: expertCase.classification },
              ].map((r) => (
                <div key={r.label} style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '10px 0', borderBottom: '1px solid var(--color-border-light)' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-light)' }}>{r.label}</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{r.value}</div>
                </div>
              ))}

              <div style={{ marginTop: 'var(--space-4)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-light)', marginBottom: 8 }}>
                  Questions for Expert
                </div>
                {expertCase.questions.map((q, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', alignItems: 'flex-start' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    {q}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>
                AI Preliminary Assessment
              </div>
              <div className="info-box mb-4">
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {expertCase.aiAssessment}
                </p>
              </div>

              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-light)', marginBottom: 8 }}>
                Unresolved Issues
              </div>
              {expertCase.unresolvedIssues.map((issue, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', alignItems: 'flex-start' }}>
                  <AlertTriangle size={13} style={{ color: 'var(--color-danger)', flexShrink: 0, marginTop: 2 }} />
                  {issue}
                </div>
              ))}

              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-light)', marginBottom: 8, marginTop: 'var(--space-4)' }}>
                Missing Information
              </div>
              {expertCase.missingInformation.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 700, flexShrink: 0 }}>·</span>
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expert Types */}
        <div className="mt-8">
          <div className="section-header">
            <span className="section-title">Expert Areas Required</span>
          </div>
          <div className="grid grid-3 gap-4">
            {[
              { title: 'Patent Attorney', focus: 'Section 3(p) analysis, process patent assessment', icon: '⚖️' },
              { title: 'Regulatory Consultant', focus: 'FSSAI / Ministry of Ayush classification', icon: '📋' },
              { title: 'ABS / Biodiversity Specialist', focus: 'NBA compliance, multi-state ABS', icon: '🌿' },
              { title: 'International IP Counsel', focus: 'EU / US patent and regulatory strategy', icon: '🌍' },
              { title: 'Ayurveda Classification Expert', focus: 'Classical text verification and documentation', icon: '📖' },
              { title: 'TKDL Prior-Art Specialist', focus: 'Authorized prior-art search pathway', icon: '🔍' },
            ].map((exp) => (
              <div key={exp.title} className="card">
                <div style={{ fontSize: '24px', marginBottom: 8 }}>{exp.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 4 }}>{exp.title}</div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{exp.focus}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card mt-6" style={{ background: 'var(--color-surface)' }}>
          <div className="demo-tag mb-3" style={{ display: 'inline-flex' }}>Demo Workflow — Expert Network coming in Phase 2</div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 8 }}>Request Expert Review</h4>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
            In the production platform, this will submit the case summary to a curated network of IP, regulatory, Ayurveda, and biodiversity experts. The expert will receive the case summary, evidence pack, and AI preliminary assessment.
          </p>
          <button className="btn btn-primary" onClick={handleRequest}>
            <Send size={16} /> Request Expert Review
          </button>
        </div>

        <div className="mt-8"><DisclaimerBanner /></div>
      </div>
    </Layout>
  );
}
