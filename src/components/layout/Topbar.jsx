import { useState } from 'react';
import { Bell, Globe, Mic, ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'Tamil (Soon)' },
  { code: 'te', label: 'Telugu (Soon)' },
];

export default function Topbar({ title, breadcrumb }) {
  const [lang, setLang] = useState('en');
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === lang);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-breadcrumb">
          <span>IP-SAKTI Sahayak</span>
          {breadcrumb && (
            <>
              <span style={{ margin: '0 6px', opacity: 0.4 }}>/</span>
              <span>{breadcrumb}</span>
            </>
          )}
          {title && (
            <>
              <span style={{ margin: '0 6px', opacity: 0.4 }}>/</span>
              <span className="topbar-breadcrumb-current">{title}</span>
            </>
          )}
        </div>
      </div>

      <div className="topbar-right" style={{ position: 'relative' }}>
        {/* Language selector */}
        <div style={{ position: 'relative' }}>
          <button
            className="topbar-lang-btn"
            onClick={() => { setLangOpen(!langOpen); setNotifOpen(false); }}
            aria-label="Select language"
          >
            <Globe size={14} />
            {currentLang.label}
            <ChevronDown size={12} />
          </button>
          {langOpen && (
            <div style={{
              position: 'absolute', top: '44px', right: 0, background: 'white',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)', zIndex: 200, minWidth: '160px', padding: '6px',
            }}>
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setLangOpen(false); }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '8px 12px', fontSize: 'var(--text-sm)',
                    borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    background: lang === l.code ? 'var(--color-surface)' : 'none',
                    border: 'none', fontWeight: lang === l.code ? '600' : '400',
                    color: lang === l.code ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    opacity: l.code !== 'en' && l.code !== 'hi' ? 0.5 : 1,
                  }}
                  disabled={l.code !== 'en' && l.code !== 'hi'}
                >
                  {l.label}
                </button>
              ))}
              <div style={{ padding: '8px 12px', fontSize: '10px', color: 'var(--color-text-light)', borderTop: '1px solid var(--color-border-light)', marginTop: '4px' }}>
                Voice input (Bhashini) — Phase 5
              </div>
            </div>
          )}
        </div>

        {/* Voice placeholder */}
        <button
          className="topbar-notif-btn"
          aria-label="Voice input (coming soon)"
          title="Voice Input — Phase 5"
          style={{ opacity: 0.5 }}
          onClick={() => alert('Voice input integration (Bhashini) — coming in Phase 5.')}
        >
          <Mic size={16} />
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            className="topbar-notif-btn"
            aria-label="Notifications"
            onClick={() => { setNotifOpen(!notifOpen); setLangOpen(false); }}
          >
            <Bell size={16} />
            <span className="notif-dot" />
          </button>
          {notifOpen && (
            <div style={{
              position: 'absolute', top: '44px', right: 0, background: 'white',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)', zIndex: 200, width: '320px', overflow: 'hidden',
            }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>Regulatory Alerts</span>
                <span className="badge badge-review" style={{ fontSize: '10px' }}>4 new</span>
              </div>
              {[
                { title: 'FSSAI Amendment Draft', product: 'Herbal-X', severity: 'high' },
                { title: 'Ayush APM Guidance Update', product: 'Herbal-X', severity: 'medium' },
                { title: 'WIPO GRATK Treaty Update', product: 'IP pathway', severity: 'medium' },
              ].map((n, i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border-light)', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text)' }}>{n.title}</div>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-light)', marginTop: '2px' }}>Affects: {n.product}</div>
                </div>
              ))}
              <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                <a href="/radar" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)' }}>View all in Regulatory Radar →</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
