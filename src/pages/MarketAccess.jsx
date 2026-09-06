import { useState } from 'react';
import { Globe, AlertTriangle, Info } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatusBadge from '../components/ui/StatusBadge';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import MarketGlobe3D from '../components/3d/MarketGlobe3D';
import { DEMO_PRODUCT } from '../data/demo';

const MARKETS = ['India', 'European Union', 'United States'];
const MARKET_KEYS = { 'India': 'india', 'European Union': 'eu', 'United States': 'usa' };
const MARKET_FLAGS = { 'India': '🇮🇳', 'European Union': '🇪🇺', 'United States': '🇺🇸' };

export default function MarketAccess() {
  const [primaryMarket, setPrimaryMarket] = useState('India');
  const [targetMarket, setTargetMarket] = useState('European Union');
  const p = DEMO_PRODUCT;

  const primaryData = p.market[MARKET_KEYS[primaryMarket]];
  const targetData = p.market[MARKET_KEYS[targetMarket]];

  const Section = ({ title, data, jurisdiction }) => (
    <div className="card" style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-light)', marginBottom: 4 }}>
            Jurisdiction
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-primary)' }}>
            {MARKET_FLAGS[jurisdiction]} {jurisdiction}
          </div>
        </div>
      </div>

      {!data ? (
        <div className="info-box">
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Market access data for this jurisdiction is not available in the current demo. Select India, EU, or USA.</p>
        </div>
      ) : (
        <>
          {[
            { label: 'IP Pathway', value: data.ipPathway },
            { label: 'Product Category', value: data.productCategory },
            { label: 'Regulatory Authority', value: data.regulatory },
            { label: 'Import / Market Access', value: data.importExport },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '10px 0', borderBottom: '1px solid var(--color-border-light)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-light)' }}>{row.label}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{row.value}</div>
            </div>
          ))}

          <div style={{ marginTop: 'var(--space-4)' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-light)', marginBottom: 8 }}>
              Required Documentation
            </div>
            {data.documentation.map((doc, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 6, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 700, flexShrink: 0 }}>·</span>
                {doc}
              </div>
            ))}
          </div>

          {data.openQuestions && data.openQuestions.length > 0 && (
            <div className="warning-box mt-4">
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-warning)', marginBottom: 6 }}>OPEN QUESTIONS</div>
              {data.openQuestions.map((q, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 4 }}>
                  <AlertTriangle size={11} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} />
                  {q}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <Layout title="Market Access" breadcrumb="Intelligence">
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Herbal-X · International Market Intelligence</div>
          <h1 className="page-title">Market Access</h1>
          <p className="page-subtitle">
            Jurisdiction-specific IP, regulatory, and market-access requirements. Requirements differ significantly across jurisdictions.
          </p>
        </div>

        <DisclaimerBanner />

        {/* 3D Stylized Market Globe */}
        <div className="mt-6">
          <MarketGlobe3D selectedMarket={targetMarket} onSelectMarket={setTargetMarket} />
        </div>

        {/* Jurisdiction selectors */}
        <div className="grid grid-2 gap-6 mt-6">
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)', marginBottom: 10 }}>
              Home / Primary Jurisdiction
            </div>
            <div className="jurisdiction-toggle">
              {MARKETS.map((m) => (
                <button key={m} className={`jurisdiction-btn ${primaryMarket === m ? 'active' : ''}`}
                  onClick={() => { if (m !== targetMarket) setPrimaryMarket(m); }}>
                  {MARKET_FLAGS[m]} {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)', marginBottom: 10 }}>
              Target Export Market
            </div>
            <div className="jurisdiction-toggle">
              {MARKETS.map((m) => (
                <button key={m} className={`jurisdiction-btn ${targetMarket === m ? 'active' : ''}`}
                  onClick={() => { if (m !== primaryMarket) setTargetMarket(m); }}>
                  {MARKET_FLAGS[m]} {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="info-box mt-4">
          <div style={{ display: 'flex', gap: 10 }}>
            <Info size={14} style={{ color: 'var(--color-sage)', flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Each jurisdiction maintains independent IP, regulatory, and market access requirements. IP-SAKTI displays them separately. Never merge requirements across jurisdictions.
            </p>
          </div>
        </div>

        {/* Side by side */}
        <div style={{ display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-8)', alignItems: 'flex-start' }}>
          <Section title="Home" data={primaryData} jurisdiction={primaryMarket} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Globe size={24} style={{ color: 'var(--color-border)' }} />
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>vs</div>
            </div>
          </div>
          <Section title="Target" data={targetData} jurisdiction={targetMarket} />
        </div>

        <div className="warning-box mt-6">
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            <strong>International market access requires specialist guidance.</strong> Requirements change frequently. Regulatory and IP differences between India, EU, and USA are significant. Engage qualified professionals in each jurisdiction.
          </p>
        </div>

        <div className="mt-8"><DisclaimerBanner /></div>
      </div>
    </Layout>
  );
}
