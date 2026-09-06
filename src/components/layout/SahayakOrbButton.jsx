import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, BookOpen, HelpCircle, RotateCcw, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Crisp, high-performance Animated Ayurvedic Intelligence Orb
function SahayakOrbVisual({ size = 36, active = false }) {
  return (
    <div
      className="sahayak-orb-wrap"
      style={{
        width: size,
        height: size,
        position: 'relative',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      {/* Outer ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: '-15%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,150,30,0.32) 0%, rgba(27,67,50,0) 70%)',
          animation: 'sahayakGlowPulse 3s ease-in-out infinite alternate',
          pointerEvents: 'none',
        }}
      />

      {/* Rotating orbit ring 1 */}
      <div
        style={{
          position: 'absolute',
          width: '116%',
          height: '116%',
          borderRadius: '50%',
          border: '1.5px dashed rgba(200, 150, 30, 0.75)',
          animation: 'sahayakOrbitSpin 12s linear infinite',
          transform: 'rotateX(62deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Rotating orbit ring 2 */}
      <div
        style={{
          position: 'absolute',
          width: '92%',
          height: '92%',
          borderRadius: '50%',
          border: '1px solid rgba(243, 208, 129, 0.45)',
          animation: 'sahayakOrbitSpinRev 8s linear infinite',
          transform: 'rotateY(55deg) rotateZ(30deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Core Sphere */}
      <div
        style={{
          width: '74%',
          height: '74%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #40916C 0%, #1B4332 55%, #0A2118 100%)',
          boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.35), 0 3px 8px rgba(10,33,24,0.35)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Specular highlight */}
        <div
          style={{
            position: 'absolute',
            top: '12%',
            left: '18%',
            width: '32%',
            height: '24%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)',
            transform: 'rotate(-25deg)',
          }}
        />

        {/* Golden Central Sparkle Emblem */}
        <Sparkles
          size={Math.max(12, Math.round(size * 0.4))}
          style={{
            color: '#F3D081',
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))',
            position: 'relative',
            zIndex: 1,
            animation: 'sahayakSparkleGlitz 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Live Active Status Dot */}
      {active && (
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: '#10B981',
            border: '2px solid #1B4332',
            boxShadow: '0 0 6px #10B981',
          }}
        />
      )}
    </div>
  );
}

const RESPONSES = {
  patent: {
    text: 'Before assessing the patent pathway, I need to understand whether the formulation is based on traditional knowledge, a classical Ayurvedic text, or a new technical contribution.\n\nSection 3(p) of the Patents Act, 1970 excludes inventions that are essentially traditional knowledge or an aggregation of known properties of traditionally known components.',
    chips: [
      { label: 'View Evidence', link: '/evidence' },
      { label: 'Why?', action: 'why_patent' },
      { label: 'Related Passport Data', link: '/passport/herbalx-001' },
    ],
  },
  abs: {
    text: 'Access and Benefit-Sharing (ABS) compliance is governed by the Biological Diversity Act, 2002. Commercial utilization of biological resources (such as Ashwagandha from Rajasthan or Brahmi from Bihar) triggers mandatory prior approval from NBA or the respective State Biodiversity Boards.',
    chips: [
      { label: 'View Evidence', link: '/evidence' },
      { label: 'Why?', action: 'why_abs' },
      { label: 'Related Passport Data', link: '/tk-abs' },
    ],
  },
  classify: {
    text: 'For Herbal-X, the preliminary classification indicates Ayurveda Aahara / Nutraceutical under FSSAI 2022 Regulations, because it is positioned as a dietary supplement for cognitive support without therapeutic disease-cure claims.',
    chips: [
      { label: 'View Evidence', link: '/evidence' },
      { label: 'Why?', action: 'why_classify' },
      { label: 'Related Passport Data', link: '/classification' },
    ],
  },
  tkdl: {
    text: 'The Traditional Knowledge Digital Library (TKDL) contains documented formulations from classical Ayurvedic texts (Charaka Samhita, Sushruta Samhita, Astanga Hridaya). Prior art cited from TKDL is routinely used by global patent offices to reject non-novel Ayurvedic patent filings under Section 3(p).',
    chips: [
      { label: 'View Evidence', link: '/evidence' },
      { label: 'Why?', action: 'why_tkdl' },
      { label: 'TK & ABS Center', link: '/tk-abs' },
    ],
  },
  default: {
    text: 'I can assist you with IP pathways, traditional knowledge prior-art review, ABS compliance under the Biological Diversity Act, regulatory classification, and market access for Ayurvedic innovations. What specific area would you like to explore?',
    chips: [
      { label: 'View Evidence', link: '/evidence' },
      { label: 'Related Passport Data', link: '/passport/herbalx-001' },
    ],
  },
};

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    text: 'Namaste! I am Sahayak, your contextual intelligence assistant for Ayurvedic IP, traditional knowledge validation, and regulatory compliance. How can I guide your assessment today?',
    chips: [
      { label: 'View Evidence', link: '/evidence' },
      { label: 'Related Passport Data', link: '/passport/herbalx-001' },
    ],
  },
];

const SUGGESTED_INQUIRIES = [
  'Can I patent my herbal formulation?',
  'What ABS compliance do I need?',
  'How is Herbal-X classified?',
  'What is TKDL prior art?',
];

export default function SahayakOrbButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSend = (textToSend = null) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: query }]);
    if (!textToSend) setInput('');
    setLoading(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let match = RESPONSES.default;
      if (lower.includes('patent') || lower.includes('protect') || lower.includes('novelty') || lower.includes('section 3')) {
        match = RESPONSES.patent;
      } else if (lower.includes('abs') || lower.includes('biodiversity') || lower.includes('nba') || lower.includes('benefit sharing')) {
        match = RESPONSES.abs;
      } else if (lower.includes('class') || lower.includes('aahara') || lower.includes('category') || lower.includes('fssai')) {
        match = RESPONSES.classify;
      } else if (lower.includes('tkdl') || lower.includes('traditional knowledge') || lower.includes('prior art')) {
        match = RESPONSES.tkdl;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: match.text,
          chips: match.chips,
        },
      ]);
      setLoading(false);
    }, 750);
  };

  const handleChipAction = (action) => {
    if (action === 'why_patent') {
      handleSend('Why does Section 3(p) exclude traditional knowledge?');
    } else if (action === 'why_abs') {
      handleSend('Why is ABS compliance mandatory under the Biological Diversity Act?');
    } else if (action === 'why_classify') {
      handleSend('Why is Herbal-X classified as Ayurveda Aahara rather than APM?');
    } else if (action === 'why_tkdl') {
      handleSend('How does TKDL establish prior art against patent applications?');
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
  };

  return (
    <>
      <style>{`
        @keyframes sahayakGlowPulse {
          0% { opacity: 0.45; transform: scale(0.95); }
          100% { opacity: 0.9; transform: scale(1.08); }
        }
        @keyframes sahayakOrbitSpin {
          from { transform: rotateX(62deg) rotateZ(0deg); }
          to { transform: rotateX(62deg) rotateZ(360deg); }
        }
        @keyframes sahayakOrbitSpinRev {
          from { transform: rotateY(55deg) rotateZ(0deg); }
          to { transform: rotateY(55deg) rotateZ(-360deg); }
        }
        @keyframes sahayakSparkleGlitz {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
          50% { transform: scale(1.15) rotate(12deg); opacity: 1; }
        }
        @keyframes sahayakPopIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sahayakDotJump {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
        .sahayak-custom-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .sahayak-custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sahayak-custom-scroll::-webkit-scrollbar-thumb {
          background: #D4CBBF;
          border-radius: 10px;
        }
        .sahayak-custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #B5A896;
        }
        .sahayak-query-chip {
          transition: all 0.18s ease;
        }
        .sahayak-query-chip:hover {
          background: #1B4332 !important;
          color: #FFFFFF !important;
          border-color: #1B4332 !important;
          transform: translateY(-1px);
        }
        .sahayak-action-btn:hover {
          background: rgba(255, 255, 255, 0.18) !important;
          transform: scale(1.06);
        }
      `}</style>

      {/* Floating Launcher Button */}
      {!isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 990,
          }}
        >
          <button
            onClick={() => setIsOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '6px 18px 6px 10px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #1B4332 0%, #0D281E 100%)',
              color: 'white',
              border: '1.5px solid #C8961E',
              boxShadow: '0 8px 32px rgba(27, 67, 50, 0.35), 0 0 0 1px rgba(200, 150, 30, 0.25)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 38px rgba(27, 67, 50, 0.45), 0 0 16px rgba(200, 150, 30, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(27, 67, 50, 0.35), 0 0 0 1px rgba(200, 150, 30, 0.25)';
            }}
            aria-label="Open Sahayak Ayurvedic Intelligence Assistant"
          >
            <SahayakOrbVisual size={36} active={true} />
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.08em', color: '#F3D081', lineHeight: 1.2 }}>
                  SAHAYAK
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: '#10B981',
                    background: 'rgba(16, 185, 129, 0.15)',
                    padding: '1px 5px',
                    borderRadius: '6px',
                    lineHeight: 1.2,
                  }}
                >
                  AI
                </span>
              </div>
              <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.2, marginTop: '2px' }}>
                Ayurvedic Intelligence
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Floating Modern Chatbox Card Widget */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '410px',
            maxWidth: 'calc(100vw - 32px)',
            height: '620px',
            maxHeight: 'calc(100vh - 48px)',
            background: '#FAF8F5',
            borderRadius: '20px',
            boxShadow: '0 24px 60px -10px rgba(10, 33, 24, 0.38), 0 0 0 1px rgba(200, 150, 30, 0.3)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'sahayakPopIn 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
          role="dialog"
          aria-label="Sahayak Ayurvedic AI Assistant"
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 18px',
              background: 'linear-gradient(135deg, #1B4332 0%, #0F2D21 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(200, 150, 30, 0.3)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <SahayakOrbVisual size={38} active={true} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.02em', lineHeight: 1.2 }}>
                    Sahayak
                  </span>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 800,
                      color: '#F3D081',
                      background: 'rgba(200, 150, 30, 0.22)',
                      border: '1px solid rgba(243, 208, 129, 0.35)',
                      padding: '1px 6px',
                      borderRadius: '8px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Ayurvedic AI
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(253, 250, 243, 0.78)', marginTop: '2px', lineHeight: 1.2 }}>
                  Evidence-first IP & regulatory guidance
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="sahayak-action-btn"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'white',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                aria-label="Reset Conversation"
              >
                <RotateCcw size={13} style={{ color: 'rgba(255,255,255,0.85)' }} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close assistant"
                className="sahayak-action-btn"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'white',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                aria-label="Close Assistant"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Suggested Inquiries / Starter Chips */}
          <div
            style={{
              padding: '10px 16px',
              background: '#F3EFE6',
              borderBottom: '1px solid #E5DEC9',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '10px',
                fontWeight: 700,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '6px',
              }}
            >
              <Sparkles size={11} style={{ color: '#C8961E' }} />
              <span>Suggested Inquiries</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              {SUGGESTED_INQUIRIES.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="sahayak-query-chip"
                  style={{
                    padding: '4px 9px',
                    borderRadius: '12px',
                    background: '#FFFFFF',
                    border: '1px solid #D6CCBC',
                    fontSize: '11px',
                    color: '#1B4332',
                    cursor: 'pointer',
                    fontWeight: 600,
                    lineHeight: 1.25,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div
            className="sahayak-custom-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              background: '#FAF8F5',
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '86%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                {/* Assistant Message Bubble */}
                {m.role === 'assistant' ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: '#1B4332',
                        border: '1px solid #C8961E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <Sparkles size={12} style={{ color: '#F3D081' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          padding: '11px 15px',
                          borderRadius: '16px 16px 16px 4px',
                          background: '#FFFFFF',
                          color: '#1F2937',
                          fontSize: '12.5px',
                          lineHeight: 1.58,
                          border: '1px solid #E6DFD3',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {m.text}
                      </div>

                      {/* Evidence & Action Chips */}
                      {m.chips && m.chips.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '7px', paddingLeft: '2px' }}>
                          {m.chips.map((chip, cIdx) =>
                            chip.link ? (
                              <Link
                                key={cIdx}
                                to={chip.link}
                                onClick={() => setIsOpen(false)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '3px 9px',
                                  borderRadius: '9999px',
                                  background: '#FEF3E2',
                                  color: '#92400E',
                                  fontSize: '10.5px',
                                  fontWeight: 700,
                                  textDecoration: 'none',
                                  border: '1px solid rgba(200, 150, 30, 0.35)',
                                  boxShadow: '0 1px 3px rgba(200,150,30,0.1)',
                                  transition: 'all 0.15s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#FDE68A';
                                  e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#FEF3E2';
                                  e.currentTarget.style.transform = 'translateY(0)';
                                }}
                              >
                                <BookOpen size={11} style={{ color: '#C8961E' }} />
                                <span>{chip.label}</span>
                                <ArrowRight size={10} style={{ opacity: 0.6 }} />
                              </Link>
                            ) : (
                              <button
                                key={cIdx}
                                onClick={() => handleChipAction(chip.action)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '3px 9px',
                                  borderRadius: '9999px',
                                  background: '#ECFDF5',
                                  color: '#065F46',
                                  fontSize: '10.5px',
                                  fontWeight: 700,
                                  border: '1px solid #A7F3D0',
                                  cursor: 'pointer',
                                  boxShadow: '0 1px 3px rgba(16,185,129,0.1)',
                                  transition: 'all 0.15s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#D1FAE5';
                                  e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#ECFDF5';
                                  e.currentTarget.style.transform = 'translateY(0)';
                                }}
                              >
                                <HelpCircle size={11} style={{ color: '#059669' }} />
                                <span>{chip.label}</span>
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* User Message Bubble */
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '16px 16px 4px 16px',
                      background: 'linear-gradient(135deg, #1B4332 0%, #245A44 100%)',
                      color: '#FFFFFF',
                      fontSize: '12.5px',
                      lineHeight: 1.55,
                      boxShadow: '0 3px 10px rgba(27,67,50,0.2)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {m.text}
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', alignSelf: 'flex-start' }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: '#1B4332',
                    border: '1px solid #C8961E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={12} style={{ color: '#F3D081' }} />
                </div>
                <div
                  style={{
                    padding: '9px 14px',
                    background: '#FFFFFF',
                    borderRadius: '16px 16px 16px 4px',
                    border: '1px solid #E6DFD3',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#C8961E',
                          animation: `sahayakDotJump 1.2s ${i * 0.18}s infinite ease-in-out`,
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>
                    Consulting statutory corpus...
                  </span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Legal Guardrail Footer */}
          <div
            style={{
              padding: '7px 16px',
              background: '#FFFDF9',
              borderTop: '1px solid #EFE8DA',
              fontSize: '10.5px',
              color: '#846C38',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={12} style={{ color: '#C8961E', flexShrink: 0 }} />
            <span>Decision support only · Backed by official legal & IP sources · Not legal advice</span>
          </div>

          {/* Modern Input Bar */}
          <div
            style={{
              padding: '11px 14px',
              background: '#FFFFFF',
              borderTop: '1px solid #E8E2D7',
              flexShrink: 0,
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  background: '#F8F6F1',
                  borderRadius: '24px',
                  border: '1.5px solid #DDD6C9',
                  padding: '3px 8px 3px 14px',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#C8961E';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200, 150, 30, 0.15)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#DDD6C9';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = '#F8F6F1';
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about IP, TKDL, ABS or regulations..."
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '12.5px',
                    color: '#1A1A1A',
                    padding: '6px 0',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !input.trim()}
                style={{
                  background: loading || !input.trim() ? '#9CA3AF' : 'linear-gradient(135deg, #1B4332 0%, #0D281E 100%)',
                  color: loading || !input.trim() ? 'white' : '#F3D081',
                  border: '1px solid rgba(200,150,30,0.3)',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !input.trim() ? 0.45 : 1,
                  transition: 'all 0.18s ease',
                  flexShrink: 0,
                  boxShadow: loading || !input.trim() ? 'none' : '0 2px 8px rgba(27,67,50,0.25)',
                }}
                onMouseEnter={(e) => {
                  if (!loading && input.trim()) {
                    e.currentTarget.style.transform = 'scale(1.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label="Send message"
              >
                <Send size={14} style={{ marginLeft: 1 }} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
