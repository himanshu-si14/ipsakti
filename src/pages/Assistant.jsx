import { useState } from 'react';
import { Send, MessageSquare, AlertTriangle, Sparkles } from 'lucide-react';
import Layout from '../components/layout/Layout';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    text: "Namaste! I am Sahayak, your evidence-first guide to Ayurvedic IP, traditional knowledge, biodiversity, regulation and market access.\n\nI can help you understand IP pathways, traditional knowledge considerations, ABS requirements, regulatory frameworks, and market access for your Ayurvedic innovations.\n\nI provide information backed by authoritative sources — not legal advice. For legal decisions, please consult qualified professionals.\n\nHow can I assist you today?",
  },
];

const DEMO_RESPONSES = {
  patent: {
    trigger: ['patent', 'patentable', 'patentability', 'protect invention'],
    text: "Before assessing the patent pathway, I need to understand a few things:\n\n1. Is your formulation based on a classical Ayurvedic text, community knowledge, or new technical research?\n2. What is specifically new — the composition, the extraction process, the dosage form, or something else?\n3. Have the ingredients or a similar combination been used traditionally?\n\nThis is important because Section 3(p) of the Patents Act, 1970 excludes from patentability anything that is essentially traditional knowledge or a combination or duplication of known properties of traditionally known components.\n\nWould you like to tell me more about your innovation?",
  },
  tkdl: {
    trigger: ['tkdl', 'traditional knowledge', 'tk', 'prior art'],
    text: "Traditional Knowledge Digital Library (TKDL) is a database of traditional knowledge in Ayurveda, Unani, Siddha, and Yoga — managed by CSIR-NISCAIR and the Ministry of Ayush.\n\nIMPORTANT: IP-SAKTI Sahayak does not have direct access to TKDL. TKDL is accessible to:\n• Patent examiners at national and international patent offices\n• Applicants through authorized access protocols\n\nFor prior-art searches related to traditional knowledge, the recommended pathway is through the authorized CSIR-NISCAIR / IP India channel.\n\nEvidence source: TKDL website, CSIR-NISCAIR official documentation.",
  },
  abs: {
    trigger: ['abs', 'biodiversity', 'nba', 'biological resource'],
    text: "Access and Benefit-Sharing (ABS) compliance is governed by the Biological Diversity Act, 2002 (Sections 3, 6, 7) and the Biological Diversity Rules, 2004.\n\nKey requirements for Herbal-X:\n• Any use of biological resources for commercial purposes requires prior approval from NBA or the State Biodiversity Board\n• Traditional knowledge associated with those resources also triggers ABS obligations\n• Benefit-sharing arrangements must be established with local communities\n\nFor Herbal-X, three biological resources — Ashwagandha, Brahmi, and Shatavari — require ABS compliance.\n\nAuthority: National Biodiversity Authority (nbaindia.org)\nLegal basis: Biological Diversity Act, 2002",
  },
  classify: {
    trigger: ['classify', 'classification', 'category', 'nutraceutical', 'ayurveda aahara'],
    text: "Product classification for Ayurvedic innovations determines the entire regulatory pathway. For Herbal-X, the preliminary classification is:\n\nLIKELY: Ayurveda Aahara / Nutraceutical\n• If positioned as a health supplement with no therapeutic claims: regulated under FSSAI (FSS Health Supplements Regulations, 2022)\n\nALTERNATE: Patent / Proprietary Medicine (APM)\n• If therapeutic claims are made: regulated under Drugs and Cosmetics Act, 1940 via Ministry of Ayush\n\nThis is a PRELIMINARY classification only. The competent authority makes the final determination. A wrong classification can lead to compliance failures and product withdrawal.\n\nWould you like me to explain the differences in regulatory pathways?",
  },
  default: {
    text: "I understand your question. Based on the information available for Herbal-X, let me provide some context.\n\nFor detailed assessment, I need more specific information. Please clarify:\n1. Which specific aspect are you asking about — IP, regulatory, TK, ABS, or market access?\n2. Which jurisdiction is most relevant?\n\nAll assessments I provide are preliminary, evidence-backed information — not legal advice. Please consult qualified professionals for any regulatory or legal decisions.",
  },
};

function findResponse(text) {
  const lower = text.toLowerCase();
  for (const key of Object.keys(DEMO_RESPONSES)) {
    if (key === 'default') continue;
    const resp = DEMO_RESPONSES[key];
    if (resp.trigger && resp.trigger.some((t) => lower.includes(t))) {
      return resp.text;
    }
  }
  return DEMO_RESPONSES.default.text;
}

export default function Assistant() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', text: input.trim() };
    const question = input.trim();
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const response = findResponse(question);
      setMessages((m) => [...m, { role: 'assistant', text: response }]);
      setLoading(false);
    }, 1200);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const QUICK_PROMPTS = [
    'Can I patent my herbal formulation?',
    'What is TKDL and how does it affect my patent?',
    'What ABS compliance do I need?',
    'How is Herbal-X classified?',
  ];

  return (
    <Layout title="Sahayak" breadcrumb="Tools">
      <div className="page-container" style={{ maxWidth: 900 }}>
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-full)', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} style={{ color: 'var(--color-accent)' }} />
            </div>
            <div>
              <h1 className="page-title" style={{ fontSize: 'var(--text-3xl)' }}>Sahayak</h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', margin: 0 }}>
                Your evidence-first guide to Ayurvedic IP, traditional knowledge, biodiversity, regulation and market access.
              </p>
            </div>
          </div>
        </div>

        <DisclaimerBanner />

        {/* Not a chatbot note */}
        <div className="info-box mt-4">
          <div style={{ display: 'flex', gap: 10 }}>
            <AlertTriangle size={14} style={{ color: 'var(--color-sage)', flexShrink: 0 }} />
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Sahayak is a <strong>contextual intelligence assistant</strong> — not a generic AI chatbot. It operates within the Innovation Passport framework, cites sources, and applies evidence confidence levels to all outputs.
            </p>
          </div>
        </div>

        {/* Chat area */}
        <div className="card mt-5" style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-xl)' }}>
          {/* Messages */}
          <div style={{ height: 460, overflowY: 'auto', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={14} style={{ color: 'var(--color-accent)' }} />
                  </div>
                )}
                <div style={{
                  maxWidth: '72%', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)',
                  background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: msg.role === 'user' ? 'white' : 'var(--color-text)',
                  fontSize: 'var(--text-sm)', lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={14} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', display: 'flex', gap: 6 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-sage)', animation: `pulse 1s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          <div style={{ padding: '0 var(--space-6) var(--space-3)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {QUICK_PROMPTS.map((p) => (
              <button key={p} className="btn btn-ghost btn-sm" onClick={() => { setInput(p); }}>
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--color-border-light)', display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-end', background: 'var(--color-white)' }}>
            <textarea
              className="form-input form-textarea"
              style={{ resize: 'none', minHeight: 48, flex: 1 }}
              placeholder="Ask about IP, TK/ABS, regulatory requirements, or market access..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              aria-label="Message to Sahayak"
            />
            <button className="btn btn-primary btn-icon" onClick={sendMessage} disabled={!input.trim() || loading} aria-label="Send message">
              <Send size={16} />
            </button>
          </div>
        </div>

        <div className="mt-8"><DisclaimerBanner /></div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </Layout>
  );
}
