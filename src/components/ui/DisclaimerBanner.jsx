import { AlertTriangle, Info } from 'lucide-react';

export default function DisclaimerBanner({ minimal = false }) {
  if (minimal) {
    return (
      <div style={{ fontSize: '10px', color: 'var(--color-text-light)', textAlign: 'center', padding: '8px 0', borderTop: '1px solid var(--color-border-light)', marginTop: 'auto' }}>
        IP-SAKTI Sahayak provides information and decision-support only — not legal advice.
      </div>
    );
  }
  return (
    <div className="disclaimer-banner">
      <AlertTriangle size={15} />
      <span>
        <strong>Information only — not legal advice.</strong> IP-SAKTI Sahayak provides decision-support based on available sources.
        It does not guarantee regulatory approval, patentability, registration, or market access.
        Always consult qualified legal, regulatory, and IP professionals.
      </span>
    </div>
  );
}
