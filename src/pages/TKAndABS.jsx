import { useState } from 'react';
import { AlertTriangle, Leaf, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatusBadge from '../components/ui/StatusBadge';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import TKBotanicalScene3D from '../components/3d/TKBotanicalScene3D';
import { showToast } from '../components/ui/Toast';
import { DEMO_PRODUCT } from '../data/demo';

export default function TKAndABS() {
  const [tab, setTab] = useState('tk');
  const p = DEMO_PRODUCT;

  const handleGenerateABS = () => {
    showToast('ABS Evidence Pack generation — Demo workflow', 'info');
  };

  return (
    <Layout title="TK & Biodiversity" breadcrumb="Intelligence">
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Herbal-X · Traditional Knowledge & Biodiversity</div>
          <h1 className="page-title">Traditional Knowledge & Biodiversity</h1>
          <p className="page-subtitle">
            Identify potential traditional knowledge overlaps and biodiversity/ABS compliance requirements.
          </p>
        </div>

        <DisclaimerBanner />

        {/* 3D Botanical Ecosystem Scene */}
        <div className="mt-6">
          <TKBotanicalScene3D />
        </div>

        {/* Tab Bar */}
        <div className="tab-bar mt-6">
          <button className={`tab-btn ${tab === 'tk' ? 'active' : ''}`} onClick={() => setTab('tk')}>
            Traditional Knowledge Shield
          </button>
          <button className={`tab-btn ${tab === 'abs' ? 'active' : ''}`} onClick={() => setTab('abs')}>
            ABS Navigator
          </button>
        </div>

        {tab === 'tk' && (
          <div>
            {/* TK Alert */}
            <div className="warning-box mb-6">
              <div style={{ display: 'flex', gap: 12 }}>
                <AlertTriangle size={18} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-warning)', marginBottom: 4 }}>
                    Potential traditional knowledge overlap detected.
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    {p.tk.records.length} ingredients in Herbal-X have documented traditional knowledge associations. This may affect patent eligibility under Section 3(p) of the Patents Act, 1970. Verification through the authorized TKDL prior-art pathway is recommended.
                  </p>
                </div>
              </div>
            </div>

            {/* TKDL Note */}
            <div className="info-box mb-6">
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-sage)', marginBottom: 6 }}>IMPORTANT — TKDL ACCESS</div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                IP-SAKTI Sahayak does not claim direct access to TKDL (Traditional Knowledge Digital Library). TKDL is accessible to patent examiners and, under specific protocols, to applicants. For prior-art searches, engage through the authorized CSIR-NISCAIR / IP India pathway.
              </p>
            </div>

            {/* TK Records */}
            <div className="section-header">
              <span className="section-title">Traditional Knowledge Records</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {p.tk.records.map((rec, idx) => (
                <div key={idx} className="card" style={{ borderLeft: `4px solid ${rec.priorArtConcern === 'High' ? 'var(--color-danger)' : rec.priorArtConcern === 'Medium' ? 'var(--color-accent)' : 'var(--color-success)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text)', marginBottom: 4 }}>
                        <Leaf size={14} style={{ marginRight: 6, color: 'var(--color-primary)' }} />
                        {rec.ingredient}
                      </div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 8 }}>
                        <strong>Basis:</strong> {rec.basis}
                      </div>
                      <StatusBadge status={rec.status} />
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-light)', marginBottom: 4 }}>
                        Prior-art concern
                      </div>
                      <span className={`badge ${rec.priorArtConcern === 'High' ? 'badge-insufficient' : rec.priorArtConcern === 'Medium' ? 'badge-review' : 'badge-verified'}`}>
                        <span className="badge-dot" />
                        {rec.priorArtConcern}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6" style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <button className="btn btn-primary" onClick={() => showToast('TKDL search pathway — contact CSIR-NISCAIR for access. Demo workflow.', 'info')}>
                Verify through TKDL Pathway
              </button>
              <button className="btn btn-outline" onClick={() => showToast('Prior-art report download — coming in Phase 2.', 'info')}>
                Download Prior-Art Report
              </button>
            </div>
          </div>
        )}

        {tab === 'abs' && (
          <div>
            {/* ABS Overview */}
            <div className="warning-box mb-6">
              <div style={{ display: 'flex', gap: 12 }}>
                <AlertTriangle size={18} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-warning)', marginBottom: 4 }}>
                    ABS Assessment Required
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    Herbal-X uses biological resources originating from India. Under the Biological Diversity Act, 2002, access to and use of biological resources for commercial purposes requires compliance with ABS (Access and Benefit-Sharing) provisions.
                  </p>
                </div>
              </div>
            </div>

            {/* ABS Resource Cards */}
            <div className="section-header">
              <span className="section-title">Biological Resources — ABS Review</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {p.abs.resources.map((res, idx) => (
                <div key={idx} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text)' }}>{res.resource}</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 2 }}>{res.origin}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span className={`badge ${res.absRelevance === 'High' ? 'badge-insufficient' : 'badge-review'}`}>
                        <span className="badge-dot" /> ABS: {res.absRelevance}
                      </span>
                      {res.tkAssociation === 'Yes' && <span className="badge badge-review"><span className="badge-dot" /> TK Associated</span>}
                    </div>
                  </div>

                  <div className="grid grid-2 gap-4">
                    <div>
                      {[
                        { label: 'Authority', value: res.authority },
                        { label: 'Pathway', value: res.pathway },
                      ].map((r) => (
                        <div key={r.label} style={{ display: 'flex', gap: 12, padding: '6px 0', borderBottom: '1px solid var(--color-border-light)' }}>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-light)', width: 100, flexShrink: 0 }}>{r.label}</div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>{r.value}</div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-light)', marginBottom: 6 }}>MISSING INFORMATION</div>
                      {res.missingInfo.map((m, i) => (
                        <div key={i} style={{ display: 'flex', gap: 6, fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 4 }}>
                          <AlertTriangle size={11} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6" style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={handleGenerateABS}>
                Generate ABS Evidence Pack
              </button>
              <button className="btn btn-outline" onClick={() => showToast('NBA portal link: nbaindia.org — access the NBA ABS compliance portal. Demo workflow.', 'info')}>
                NBA ABS Portal
              </button>
            </div>

            <div className="info-box mt-5">
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-sage)', marginBottom: 6 }}>LEGAL FRAMEWORK</div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                Biological Diversity Act, 2002 — Sections 3, 6, 7 · Biological Diversity Rules, 2004 · National Biodiversity Authority guidelines. Non-compliance can result in penalties and revocation of IP rights.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8"><DisclaimerBanner /></div>
      </div>
    </Layout>
  );
}
